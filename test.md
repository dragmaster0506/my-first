(function () {
  "use strict";

  /********************************************************
   *  設定（ここだけ編集してください）
   ********************************************************/
  const FIELD = {
    DATE: "サービス提供日",      // 日付フィールドのフィールドコード
    USER: "利用者名",  // 利用者名フィールドのフィールドコード
    TEXT: "行動の状況"    // 記録本文フィールドのフィールドコード（チェック対象）
  };

  const OPENAI_API_KEY = "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"; // ← 本番では安全に管理してください
  const OPENAI_MODEL = "gpt-4.1-mini";         // 適宜変更可

  /********************************************************
   *  ユーティリティ
   ********************************************************/
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // テキストの高さを計算する関数
  function calculateTextHeight(text, baseLineHeight = 24) {
    if (!text) return 120;
    
    // 改行数をカウント
    const lines = text.split('\n');
    const lineCount = lines.length;
    
    // 長い行があれば折り返しを考慮（1行あたり約50文字で折り返しと仮定）
    let totalLines = 0;
    lines.forEach(line => {
      const wrappedLines = Math.ceil(line.length / 50) || 1;
      totalLines += wrappedLines;
    });
    
    // 行数 × 行高 + パディング
    const calculatedHeight = totalLines * baseLineHeight + 16;
    
    // 最小150px、最大500px
    return Math.min(Math.max(calculatedHeight, 150), 500);
  }

  // モーダル表示（HTMLを直接渡す）
  function showModal(htmlContent) {
    const old = document.getElementById("aiResultModal");
    if (old) old.remove();

    const modal = document.createElement("div");
    modal.id = "aiResultModal";
    modal.style = `
      position:fixed; inset:0;
      background: rgba(0,0,0,0.35);
      display:flex; justify-content:center; align-items:center;
      z-index: 9999;
    `;

    const box = document.createElement("div");
    box.style = `
      width: 900px; max-width: 95%; max-height: 80%;
      background: #fff; border-radius: 10px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      padding: 18px; overflow:auto; font-size:14px;
      position: relative;
      box-sizing: border-box;
    `;

    // 閉じるボタン（右上）
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "×";
    closeBtn.style = `
      position: absolute; right: 18px; top: 12px;
      background: transparent; border: none; font-size:20px; cursor:pointer;
    `;
    closeBtn.onclick = () => modal.remove();

    // コンテンツ
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlContent;

    // 下部OKボタン
    const ok = document.createElement("button");
    ok.innerText = "OK";
    ok.style = `
      margin-top: 12px; padding:8px 14px; border-radius:6px;
      border:none; background:#3b82f6; color:white; cursor:pointer;
      font-size:14px;
    `;
    ok.onclick = () => modal.remove();

    box.appendChild(closeBtn);
    box.appendChild(wrapper);
    box.appendChild(ok);
    modal.appendChild(box);
    document.body.appendChild(modal);

    // ESCで閉じる
    function escHandler(e) {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escHandler);
      }
    }
    document.addEventListener("keydown", escHandler);
  }

  // ローディング（画面を遮る）
  function showLoading(text = "チェック中…") {
    const old = document.getElementById("aiLoadingOverlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "aiLoadingOverlay";
    overlay.style = `
      position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
      background: rgba(255,255,255,0.6); z-index:9998;
    `;

    const box = document.createElement("div");
    box.style = `
      display:flex; flex-direction:column; align-items:center; gap:10px;
      background: transparent;
    `;
    const spinner = document.createElement("div");
    spinner.style = `
      width:48px; height:48px; border:6px solid #e5e7eb; border-top-color:#3b82f6;
      border-radius:50%; animation: spin 1s linear infinite;
    `;
    const label = document.createElement("div");
    label.innerText = text;
    label.style = `font-size:14px; color:#111;`;

    // keyframes
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
    `;
    box.appendChild(spinner);
    box.appendChild(label);
    overlay.appendChild(box);
    overlay.appendChild(style);
    document.body.appendChild(overlay);
  }

  function hideLoading() {
    const el = document.getElementById("aiLoadingOverlay");
    if (el) el.remove();
  }

  // 安全なテキスト置換（HTMLエスケープも兼ねる）
  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /********************************************************
   *  AI呼び出し（誤字箇所のリストだけ返すように促す）
   *  -> 戻り値： { hasError: bool, errors: [{ wrong: "...", correct: "..." }, ...], usage: {...} }
   ********************************************************/
  async function askAiForErrors(text) {
    const systemPrompt = `
You are a Japanese proofreading assistant specialized for short care-record texts.
Return ONLY a compact JSON object (no extra commentary). The object must have:
{
  "hasError": true/false,
  "errors": [
    {"wrong": "<exact substring as appears in the text>", "correct": "<suggested correction>"}
  ]
}
If there are no errors, return {"hasError": false, "errors": []}.
Do not include HTML, markdown, or any explanation.
`;
    const userPrompt = `本文:\n${text}\n\nFind misspellings, typos, obvious kana/kanji conversion mistakes and provide them as "wrong"/"correct" pairs. Keep the JSON minimal.`;

    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 300,
          temperature: 0.0,
        }),
      });

      const payload = await resp.json();
      const content = payload?.choices?.[0]?.message?.content;
      const usage = payload?.usage || null; // 使用トークン情報を取得
      
      if (!content) return { hasError: false, errors: [], usage };

      // なるべく安全にJSONを抽出（AIが余分なテキストを入れた場合にも対応）
      const firstBrace = content.indexOf("{");
      const lastBrace = content.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) return { hasError: false, errors: [], usage };

      const jsonText = content.slice(firstBrace, lastBrace + 1);
      try {
        const parsed = JSON.parse(jsonText);
        if (!parsed || typeof parsed !== "object") return { hasError: false, errors: [], usage };
        // validate shape
        if (!Array.isArray(parsed.errors)) parsed.errors = [];
        parsed.usage = usage; // usageを追加
        return parsed;
      } catch (e) {
        // パース失敗 → 安全に空
        return { hasError: false, errors: [], usage };
      }
    } catch (err) {
      console.error("AI request failed", err);
      return { hasError: false, errors: [], usage: null };
    }
  }

  /********************************************************
   *  レコード一括保存関数
   ********************************************************/
  async function saveRecords(updates) {
    try {
      showLoading("保存中…");
      
      const appId = kintone.app.getId();
      const records = updates.map(u => ({
        id: u.recordId,
        record: {
          [FIELD.TEXT]: { value: u.newText }
        }
      }));

      const resp = await kintone.api(kintone.api.url('/k/v1/records', true), 'PUT', {
        app: appId,
        records: records
      });

      hideLoading();
      
      // 保存成功メッセージ
      showModal(`<b>${updates.length}件のレコードを保存しました。</b><p style="margin-top:8px; color:#6b7280;">画面を再読み込みして最新の状態を確認してください。</p>`);
      
      // 少し待ってから画面をリロード
      setTimeout(() => {
        location.reload();
      }, 2000);
      
      return true;
    } catch (err) {
      hideLoading();
      console.error("保存エラー:", err);
      showModal(`<b style="color:#dc2626;">保存に失敗しました。</b><p style="margin-top:8px;">${escapeHtml(err.message || "不明なエラー")}</p>`);
      return false;
    }
  }

  /********************************************************
   *  一覧画面イベント：ボタンを追加し動作
   ********************************************************/
  kintone.events.on("app.record.index.show", function (event) {
    // 多重追加防止
    if (document.getElementById("aiCheckButton")) return;

    // ヘッダースペース取得（一覧画面で安定して使える領域）
    const header = kintone.app.getHeaderSpaceElement();
    if (!header) return;

    const wrapper = document.createElement("div");
    // 左寄せ、下マージン（指示どおり左と下に余白）
    wrapper.style = "display:flex; align-items:center; margin-left:12px; margin-bottom:8px;";

    const button = document.createElement("button");
    button.id = "aiCheckButton";
    button.innerText = "AI 誤字チェック";
    button.style = `
      background: linear-gradient(180deg,#2563eb,#3b82f6);
      color: #fff; border: none; padding: 8px 14px;
      border-radius: 8px; font-size:14px; cursor:pointer;
      box-shadow: 0 2px 8px rgba(37,99,235,0.18);
    `;
    button.onmouseover = () => (button.style.opacity = "0.95");
    button.onmouseout = () => (button.style.opacity = "1");

    // クリック時処理
    button.onclick = async function () {
      showLoading("誤字チェック中…");

      try {
        // event.records は一覧表示中のレコード配列
        const records = event.records || [];
        if (!records.length) {
          hideLoading();
          showModal("<b>レコードがありません。</b>");
          return;
        }
        
        // 15件を超えた場合はアラートを出して処理を中断
        if (records.length > 15) {
          hideLoading();
          alert("レコード数が15件を超えています。処理を中断します。");
          return;
        }

        const results = []; // { date, user, original, highlightedHtml, comments[], recordId }
        let totalPromptTokens = 0;
        let totalCompletionTokens = 0;
        let totalTokens = 0;

        // 逐次処理（平行でAIを大量叩きするとAPIレートやコストの問題があるため）
        for (const rec of records) {
          const text = rec[FIELD.TEXT] && rec[FIELD.TEXT].value ? rec[FIELD.TEXT].value : "";
          const date = rec[FIELD.DATE] && rec[FIELD.DATE].value ? rec[FIELD.DATE].value : "";
          const user = rec[FIELD.USER] && rec[FIELD.USER].value ? rec[FIELD.USER].value : "";
          const recordId = rec.$id.value;

          if (!text) continue;

          // AIに尋ねる（誤字の列挙だけ返す）
          const aiRes = await askAiForErrors(text);

          // トークン数を累計
          if (aiRes.usage) {
            totalPromptTokens += aiRes.usage.prompt_tokens || 0;
            totalCompletionTokens += aiRes.usage.completion_tokens || 0;
            totalTokens += aiRes.usage.total_tokens || 0;
          }

          if (aiRes.hasError && Array.isArray(aiRes.errors) && aiRes.errors.length > 0) {
            // JS側で確実にハイライトする（黄色固定）
            let highlighted = escapeHtml(text);

            // errors配列を使って置換（長い誤りから置換すると部分一致で崩れにくい）
            const errorsSorted = aiRes.errors.slice().sort((a, b) => {
              return (b.wrong?.length || 0) - (a.wrong?.length || 0);
            });

            // コメント配列を作る
            const comments = [];

            for (const e of errorsSorted) {
              if (!e || !e.wrong) continue;
              const wrongEsc = escapeRegExp(escapeHtml(e.wrong));
              const regex = new RegExp(wrongEsc, "g");
              // highlightには <span style="background:yellow;">...</span>
              highlighted = highlighted.replace(regex, function (match) {
                // matchは既にHTMLエスケープ済みの文字列（安全）
                return `<span style="background: #fff59d; font-weight:600;">${match}</span>`;
              });

              const corr = e.correct ? e.correct : "";
              comments.push(`${e.wrong} → ${corr}`);
            }

            results.push({
              date,
              user,
              original: text,
              highlightedHtml: highlighted,
              comments,
              recordId
            });
          }
        } // for records

        hideLoading();

        if (results.length === 0) {
          // 誤字がない場合もトークン数を表示
          let html = "<b>誤字脱字は見つかりませんでした。</b>";
          if (totalTokens > 0) {
            html += `<div style="margin-top:12px; padding:8px; background:#f3f4f6; border-radius:6px; font-size:13px;">
              <strong>使用トークン数:</strong> ${totalTokens.toLocaleString()} tokens<br>
              <span style="color:#6b7280;">（入力: ${totalPromptTokens.toLocaleString()} / 出力: ${totalCompletionTokens.toLocaleString()}）</span>
            </div>`;
          }
          showModal(html);
          return;
        }

        // モーダル用HTMLを作る（左右2分割表示）
        let html = `<h3 style="margin-top:0; margin-bottom:8px;">誤字・脱字の検出結果</h3>`;
        
        // トークン数の表示
        if (totalTokens > 0) {
          html += `<div style="margin-bottom:12px; padding:8px; background:#f3f4f6; border-radius:6px; font-size:13px;">
            <strong>使用トークン数:</strong> ${totalTokens.toLocaleString()} tokens<br>
            <span style="color:#6b7280;">（入力: ${totalPromptTokens.toLocaleString()} / 出力: ${totalCompletionTokens.toLocaleString()}）</span>
          </div>`;
        }
        
        html += `<div style="max-height:420px; overflow:auto;" id="resultsContainer">`;

        results.forEach((r, idx) => {
          // テキストの高さを動的に計算
          const dynamicHeight = calculateTextHeight(r.original);
          
          html += `<div style="padding:10px 0; border-bottom:1px solid #eef2ff;"><div style="margin-bottom:8px;"><strong style="font-size:15px;">日付：</strong><span style="font-size:15px;">${escapeHtml(r.date)}</span> &nbsp;&nbsp; <strong style="font-size:15px;">利用者：</strong><span style="font-size:15px;">${escapeHtml(r.user)}</span><span style="margin-left:8px; font-size:12px; color:#6b7280;">ID: ${r.recordId}</span></div><div style="margin-bottom:8px;"><strong style="color:#dc2626;">指摘：</strong>${escapeHtml(r.comments.join(" ／ "))}</div><div style="display:flex; gap:10px;"><div style="flex:1; min-width:0;"><label style="display:block; margin-bottom:4px; font-weight:600; font-size:12px; color:#6b7280;">原文（指摘箇所）</label><div style="background:#fbfbfb; padding:8px; border-radius:6px; border:1px solid #e5e7eb; height:${dynamicHeight}px; overflow:visible; font-size:13px; white-space:pre-wrap; word-wrap:break-word; line-height:1.6;">${r.highlightedHtml}</div></div><div style="flex:1; min-width:0;"><label style="display:block; margin-bottom:4px; font-weight:600; font-size:12px; color:#6b7280;">修正後のテキスト</label><textarea id="edit_${r.recordId}" data-record-id="${r.recordId}" style="width:100%; height:${dynamicHeight}px; padding:8px; border:1px solid #d1d5db; border-radius:6px; font-size:13px; font-family:inherit; line-height:1.6; resize:vertical; box-sizing:border-box; overflow:visible;">${escapeHtml(r.original)}</textarea></div></div></div>`;
        });

        html += `</div>`;
        
        // 保存ボタンを追加
        html += `
          <div style="margin-top:16px; display:flex; gap:8px; justify-content:flex-end;">
            <button id="saveAllButton" style="padding:8px 16px; border-radius:6px; border:none; background:#10b981; color:white; cursor:pointer; font-size:14px; font-weight:600;">
              すべて保存
            </button>
          </div>
        `;

        // モーダルを表示（カスタムバージョン）
        const old = document.getElementById("aiResultModal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.id = "aiResultModal";
        modal.style = `
          position:fixed; inset:0;
          background: rgba(0,0,0,0.35);
          display:flex; justify-content:center; align-items:center;
          z-index: 9999;
        `;

        const box = document.createElement("div");
        box.style = `
          width: 960px; max-width: 96%; max-height: 88%;
          background: #fff; border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          padding: 24px; overflow:auto; font-size:14px;
          position: relative;
          box-sizing: border-box;
        `;

        // 閉じるボタン（右上）
        const closeBtn = document.createElement("button");
        closeBtn.innerText = "×";
        closeBtn.style = `
          position: absolute; right: 18px; top: 12px;
          background: transparent; border: none; font-size:20px; cursor:pointer; z-index:1;
        `;
        closeBtn.onclick = () => modal.remove();

        box.innerHTML = html;
        box.insertBefore(closeBtn, box.firstChild);
        modal.appendChild(box);
        document.body.appendChild(modal);

        // ESCで閉じる
        function escHandler(e) {
          if (e.key === "Escape") {
            modal.remove();
            document.removeEventListener("keydown", escHandler);
          }
        }
        document.addEventListener("keydown", escHandler);

        // 保存ボタンのイベントハンドラ
        const saveBtn = document.getElementById("saveAllButton");
        if (saveBtn) {
          saveBtn.onclick = async () => {
            const updates = [];
            
            // 各テキストエリアから編集後のテキストを取得
            results.forEach(r => {
              const textarea = document.getElementById(`edit_${r.recordId}`);
              if (textarea) {
                const newText = textarea.value;
                // 元のテキストと異なる場合のみ保存対象に
                if (newText !== r.original) {
                  updates.push({
                    recordId: r.recordId,
                    newText: newText
                  });
                }
              }
            });

            if (updates.length === 0) {
              alert("変更されたレコードがありません。");
              return;
            }

            // 確認ダイアログ
            if (!confirm(`${updates.length}件のレコードを保存しますか？`)) {
              return;
            }

            // モーダルを閉じてから保存処理
            modal.remove();
            await saveRecords(updates);
          };
        }

      } catch (err) {
        hideLoading();
        console.error(err);
        showModal("<b>エラーが発生しました。コンソールを確認してください。</b>");
      }
    };

    wrapper.appendChild(button);
    header.appendChild(wrapper);
  });
})();