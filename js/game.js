let state = {
  screen: 'title',
  slot: null,
  save: null,
  questions: [],
  qIndex: 0,
  correct: 0,
  combo: 0,
  sessionPoints: 0,
  hintShown: false
};

const POINTS_PER_CORRECT = 10;
const COMBO_BONUS = [0, 0, 2, 4, 6, 8];

function $(id) { return document.getElementById(id); }

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(`screen-${name}`);
  if (el) { el.classList.add('active'); state.screen = name; }
}

function playSound(type) {
  const ctx = window._audioCtx || (window._audioCtx = new (window.AudioContext || window.webkitAudioContext)());
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  const configs = {
    correct:  { freq: [523, 659, 784], dur: 0.12, wave: 'sine' },
    wrong:    { freq: [200, 150],      dur: 0.15, wave: 'sawtooth' },
    buy:      { freq: [523, 659, 784, 1047], dur: 0.1, wave: 'sine' },
    start:    { freq: [392, 523],      dur: 0.15, wave: 'sine' }
  };
  const c = configs[type] || configs.correct;
  o.type = c.wave;
  let t = ctx.currentTime;
  c.freq.forEach((f, i) => {
    o.frequency.setValueAtTime(f, t + i * c.dur);
  });
  g.gain.setValueAtTime(0.3, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + c.freq.length * c.dur + 0.1);
  o.start(t); o.stop(t + c.freq.length * c.dur + 0.15);
}

function spawnParticles(type) {
  const effect = state.save?.equipped?.effect || 'heart_fx';
  const symbols = {
    heart_fx: ['💖','💗','💕','💓'],
    sparkle_fx: ['✨','⭐','🌟','💫'],
    rainbow_fx: ['🌈','💜','💙','💚','💛','🧡','❤️']
  };
  const list = symbols[effect] || symbols.heart_fx;
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = list[Math.floor(Math.random() * list.length)];
    p.style.left = `${30 + Math.random() * 40}%`;
    p.style.top = `${20 + Math.random() * 30}%`;
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
    p.style.setProperty('--dy', `${-50 - Math.random() * 100}px`);
    p.style.animationDelay = `${Math.random() * 0.3}s`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// ── Title ──────────────────────────────────────────────────────────────────
function initTitle() {
  showScreen('title');
  renderSaveSlots();
}

function renderSaveSlots() {
  const saves = loadAllSaves();
  const container = $('save-slots');
  container.innerHTML = '';
  saves.forEach((save, i) => {
    const div = document.createElement('div');
    div.className = `save-slot ${save ? 'used' : 'empty'}`;
    if (save) {
      const pct = save.totalQuestions > 0
        ? Math.round(save.totalCorrect / save.totalQuestions * 100) : 0;
      div.innerHTML = `
        <div class="slot-avatar">${getCharSVG(save.grade)}</div>
        <div class="slot-info">
          <div class="slot-name">${escHtml(save.name)}</div>
          <div class="slot-detail">${save.grade}ねんせい 🪙 ${save.points}コイン 正解率 ${pct}%</div>
        </div>
        <div class="slot-actions">
          <button class="btn btn-primary" onclick="startGame(${i})">つづきから</button>
          <button class="btn btn-danger btn-sm" onclick="confirmDelete(${i})">削除</button>
        </div>`;
    } else {
      div.innerHTML = `
        <div class="slot-empty-icon">＋</div>
        <div class="slot-empty-label">あたらしくはじめる</div>
        <button class="btn btn-accent" onclick="showNewGame(${i})">スタート</button>`;
    }
    container.appendChild(div);
  });
}

function showNewGame(slot) {
  $('new-game-slot').value = slot;
  $('new-name').value = '';
  $('new-grade').value = '1';
  showScreen('new-game');
}

function createGame() {
  const slot = parseInt($('new-game-slot').value);
  const name = $('new-name').value.trim();
  const grade = parseInt($('new-grade').value);
  if (!name) { showToast('なまえをいれてね！'); return; }
  state.save = createNewSave(slot, name, grade);
  state.slot = slot;
  showScreen('main-menu');
  renderMainMenu();
}

function startGame(slot) {
  state.slot = slot;
  state.save = getSave(slot);
  if (!state.save) return;
  showScreen('main-menu');
  renderMainMenu();
}

function confirmDelete(slot) {
  const save = getSave(slot);
  if (!save) return;
  if (confirm(`「${save.name}」のデータを削除しますか？`)) {
    deleteSave(slot);
    renderSaveSlots();
    showToast('データを削除しました');
  }
}

// ── Main Menu ──────────────────────────────────────────────────────────────
function renderMainMenu() {
  const s = state.save;
  $('menu-name').textContent = s.name;
  $('menu-grade').textContent = `${s.grade}ねんせい`;
  $('menu-points').textContent = s.points;
  $('menu-correct').textContent = s.totalCorrect;
  $('menu-char').innerHTML = getCharSVG(s.grade, s.equipped?.coord);

  const today = new Date().toDateString();
  const dailyBtn = $('btn-daily');
  if (dailyBtn) {
    if (s.dailyDate === today && s.dailyDone) {
      dailyBtn.textContent = '✓ デイリー完了';
      dailyBtn.disabled = true;
    } else {
      dailyBtn.textContent = '⭐ デイリーチャレンジ';
      dailyBtn.disabled = false;
    }
  }
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function startQuiz(isDaily) {
  state.questions = [];
  state.qIndex = 0;
  state.correct = 0;
  state.combo = 0;
  state.sessionPoints = 0;
  state.isDaily = isDaily;

  const count = isDaily ? 10 : 5;
  for (let i = 0; i < count; i++) {
    state.questions.push(generateQuestion(state.save.grade));
  }
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.qIndex];
  const total = state.questions.length;
  $('quiz-progress').textContent = `${state.qIndex + 1} / ${total}もん`;
  $('quiz-progress-bar').style.width = `${(state.qIndex / total) * 100}%`;
  $('quiz-combo').textContent = state.combo >= 2 ? `🔥 ${state.combo}コンボ！` : '';
  $('quiz-question').innerHTML = q.display || escHtml(q.q);
  $('quiz-answer').value = '';
  $('quiz-answer').focus();
  $('quiz-hint').textContent = '';
  $('quiz-feedback').textContent = '';
  $('quiz-feedback').className = 'quiz-feedback';
  state.hintShown = false;
  $('btn-hint').disabled = false;
}

function showHint() {
  const q = state.questions[state.qIndex];
  $('quiz-hint').textContent = `💡 ヒント: ${q.hint}`;
  state.hintShown = true;
  $('btn-hint').disabled = true;
}

function submitAnswer() {
  const q = state.questions[state.qIndex];
  const input = $('quiz-answer').value;
  if (!input.trim()) return;

  const correct = checkAnswer(q, input);

  if (correct) {
    state.combo++;
    state.correct++;
    const bonus = COMBO_BONUS[Math.min(state.combo, COMBO_BONUS.length - 1)];
    const hintPenalty = state.hintShown ? 0.5 : 1;
    const pts = Math.round((POINTS_PER_CORRECT + bonus) * hintPenalty);
    state.sessionPoints += pts;

    $('quiz-feedback').textContent = `⭕ せいかい！ +${pts}🪙${bonus > 0 ? ` (コンボボーナス +${bonus})` : ''}`;
    $('quiz-feedback').className = 'quiz-feedback correct';
    playSound('correct');
    spawnParticles();

    if (state.combo === 5) {
      checkAndAwardBadge('badge_combo5');
    }
  } else {
    state.combo = 0;
    $('quiz-feedback').textContent = `❌ ざんねん… こたえは ${q.answer} だよ`;
    $('quiz-feedback').className = 'quiz-feedback wrong';
    playSound('wrong');
  }

  setTimeout(() => {
    state.qIndex++;
    if (state.qIndex >= state.questions.length) {
      finishQuiz();
    } else {
      renderQuestion();
    }
  }, 1200);
}

function finishQuiz() {
  const s = state.save;
  const newPoints = s.points + state.sessionPoints;
  const newCorrect = s.totalCorrect + state.correct;
  const newTotal = s.totalQuestions + state.questions.length;
  const newMaxCombo = Math.max(s.maxCombo || 0, state.combo);

  let newStamps = s.stamps + (state.correct === state.questions.length ? 1 : 0);
  let stampReward = false;
  if (newStamps >= 10) { newStamps -= 10; stampReward = true; }

  const today = new Date().toDateString();
  const updates = {
    points: newPoints,
    totalCorrect: newCorrect,
    totalQuestions: newTotal,
    maxCombo: newMaxCombo,
    stamps: newStamps
  };
  if (state.isDaily) { updates.dailyDate = today; updates.dailyDone = true; }

  state.save = updateSave(state.slot, updates);

  if (newCorrect >= 10) checkAndAwardBadge('badge_math1');
  if (state.correct === state.questions.length) checkAndAwardBadge('badge_perfect');

  showScreen('result');
  $('result-correct').textContent = state.correct;
  $('result-total').textContent = state.questions.length;
  $('result-points').textContent = state.sessionPoints;
  $('result-total-points').textContent = newPoints;
  $('result-combo').textContent = state.combo > 0 ? `最高コンボ: ${state.combo}🔥` : '';
  $('result-stamp').textContent = stampReward
    ? '🎁 スタンプ10こ達成！ショップでレアアイテムをゲット！'
    : `スタンプ: ${'★'.repeat(newStamps)}${'☆'.repeat(10 - newStamps)}`;

  if (stampReward) {
    awardRandomRareItem();
  }
}

function checkAndAwardBadge(id) {
  if (!state.save.inventory.includes(id)) {
    state.save = updateSave(state.slot, { inventory: [...state.save.inventory, id] });
    showToast(`🏅 バッジ獲得！「${getItemById(id)?.name || id}」`);
  }
}

function awardRandomRareItem() {
  const rareItems = allItems.filter(i =>
    (i.rarity === 'rare' || i.rarity === 'super') && !state.save.inventory.includes(i.id) && i.cost > 0
  );
  if (rareItems.length === 0) return;
  const item = rareItems[Math.floor(Math.random() * rareItems.length)];
  state.save = updateSave(state.slot, { inventory: [...state.save.inventory, item.id] });
  showToast(`🎁 スタンプ達成！「${item.name}」を仕入れた！`);
}

// ── Shop ───────────────────────────────────────────────────────────────────
function openShop() {
  showScreen('shop');
  $('shop-points-header').textContent = `🪙 ${state.save.points}コイン`;
  $('shop-content').innerHTML = renderShop(state.save);
  window._shopBuyCallback = buyItem;
}

function buyItem(itemId) {
  const item = getItemById(itemId);
  if (!item || state.save.inventory.includes(item.id)) return;
  if (state.save.points < item.cost) {
    showToast('まほうコインがたりないよ！もっと計算チャレンジしよう！');
    return;
  }
  const newPoints = state.save.points - item.cost;
  const newInv = [...state.save.inventory, item.id];
  state.save = updateSave(state.slot, { points: newPoints, inventory: newInv });
  playSound('buy');
  showToast(`🎁 「${item.name}」を仕入れた！`);
  $('shop-content').innerHTML = renderShop(state.save);
  window._shopBuyCallback = buyItem;
  $('shop-points-header').textContent = `🪙 ${state.save.points}コイン`;
}

// ── Collection ─────────────────────────────────────────────────────────────
function openCollection() {
  showScreen('collection');
  renderCollection();
}

function renderCollection() {
  const categories = [
    { id: 'coord',  label: '👗 コーデ商品' },
    { id: 'pet',    label: '🐾 ペット商品' },
    { id: 'room',   label: '🏠 インテリア商品' },
    { id: 'effect', label: '✨ エフェクト商品' },
    { id: 'badge',  label: '🏅 バッジ' }
  ];
  let html = '';
  categories.forEach(cat => {
    const items = allItems.filter(i => i.category === cat.id);
    html += `<div class="collection-category"><h3>${cat.label}</h3><div class="collection-grid">`;
    items.forEach(item => {
      const owned = state.save.inventory.includes(item.id);
      const equipped = Object.values(state.save.equipped || {}).includes(item.id);
      html += `
        <div class="collection-item ${owned ? 'owned' : 'locked'} ${equipped ? 'equipped' : ''}"
             onclick="${owned ? `equipItem('${item.id}','${item.category}')` : ''}">
          <div class="item-emoji" style="background:${owned ? item.color + '30' : '#eee'};border-color:${owned ? item.color : '#ccc'}">${owned ? item.emoji : '🔒'}</div>
          <div class="item-name">${owned ? item.name : '???'}</div>
          ${equipped ? '<div class="equipped-label">飾り中</div>' : ''}
        </div>`;
    });
    html += `</div></div>`;
  });
  $('collection-content').innerHTML = html;
}

function equipItem(itemId, category) {
  const catMap = { coord: 'coord', pet: 'pet', room: 'room', effect: 'effect', badge: 'badge' };
  const key = catMap[category] || category;
  const equipped = { ...state.save.equipped };
  equipped[key] = equipped[key] === itemId ? null : itemId;
  state.save = updateSave(state.slot, { equipped });
  renderCollection();
  showToast(equipped[key] ? `${getItemById(itemId)?.name} をお店に飾った！` : 'お店から外した');
}

// ── Report ─────────────────────────────────────────────────────────────────
function openReport() {
  showScreen('report');
  const s = state.save;
  const pct = s.totalQuestions > 0 ? Math.round(s.totalCorrect / s.totalQuestions * 100) : 0;
  $('report-content').innerHTML = `
    <div class="report-card">
      <div class="report-row"><span>なまえ</span><b>${escHtml(s.name)}</b></div>
      <div class="report-row"><span>学年</span><b>${s.grade}ねんせい</b></div>
      <div class="report-row"><span>もっているコイン</span><b>${s.points} 🪙</b></div>
      <div class="report-row"><span>とういた問題数</span><b>${s.totalQuestions} もん</b></div>
      <div class="report-row"><span>正解数</span><b>${s.totalCorrect} もん</b></div>
      <div class="report-row"><span>正解率</span><b>${pct} %</b></div>
      <div class="report-row"><span>最高コンボ</span><b>${s.maxCombo || 0} 🔥</b></div>
      <div class="report-row"><span>スタンプ</span><b>${'★'.repeat(s.stamps)}${'☆'.repeat(10 - s.stamps)}</b></div>
      <div class="report-row"><span>仕入れた商品数</span><b>${s.inventory.length} / ${allItems.length}</b></div>
    </div>
    <div class="report-bar-wrap">
      <div class="report-bar-label">正解率</div>
      <div class="report-bar-bg"><div class="report-bar-fill" style="width:${pct}%">${pct}%</div></div>
    </div>`;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2500);
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function getCharSVG(grade, coord) {
  const colors = ['','#FFB7C5','#B7EFC5','#C9B7FF','#FFE4B7','#B7E4FF','#FFB7B7'];
  const hair = ['','#8B4513','#FFD700','#C0392B','#2C3E50','#7D3C98','#E67E22'];
  const g = Math.min(6, Math.max(1, grade));
  const bodyColor = coord ? (allItems.find(i=>i.id===coord)?.color || colors[g]) : colors[g];
  return `<svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="28" r="20" fill="#FDDBB4"/>
    <rect x="22" y="48" width="36" height="38" rx="8" fill="${bodyColor}"/>
    <rect x="10" y="50" width="14" height="28" rx="6" fill="${bodyColor}"/>
    <rect x="56" y="50" width="14" height="28" rx="6" fill="${bodyColor}"/>
    <rect x="26" y="86" width="12" height="14" rx="4" fill="#8B6F6F"/>
    <rect x="42" y="86" width="12" height="14" rx="4" fill="#8B6F6F"/>
    <ellipse cx="40" cy="12" rx="22" ry="14" fill="${hair[g]}"/>
    <circle cx="33" cy="27" r="2.5" fill="#3D2B1F"/>
    <circle cx="47" cy="27" r="2.5" fill="#3D2B1F"/>
    <path d="M35 34 Q40 38 45 34" stroke="#C0837A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="26" r="1" fill="white"/>
    <circle cx="48" cy="26" r="1" fill="white"/>
  </svg>`;
}

// ── Boot ───────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  await loadItems();
  initTitle();
});
