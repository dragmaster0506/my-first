let usageChart, modelChart, monthlyChart, donutChart;

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

function initDashboard() {
  const s = MOCK.summary;
  document.getElementById('stat-tokens').textContent = fmt(s.totalTokens);
  document.getElementById('stat-cost').textContent = '$' + s.totalCost.toFixed(2);
  document.getElementById('stat-requests').textContent = fmt(s.totalRequests);
  document.getElementById('stat-latency').textContent = s.avgLatency + 'ms';

  const labels = MOCK.daily.map(d => d.date);
  const inputData = MOCK.daily.map(d => d.input);
  const outputData = MOCK.daily.map(d => d.output);

  if (usageChart) usageChart.destroy();
  usageChart = new Chart(document.getElementById('usageChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Input tokens',
          data: inputData,
          borderColor: '#818cf8',
          backgroundColor: 'rgba(129,140,248,0.15)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
        },
        {
          label: 'Output tokens',
          data: outputData,
          borderColor: '#34d399',
          backgroundColor: 'rgba(52,211,153,0.15)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
        },
      ],
    },
    options: chartOptions('トークン数'),
  });

  if (modelChart) modelChart.destroy();
  modelChart = new Chart(document.getElementById('modelChart'), {
    type: 'bar',
    data: {
      labels: MOCK.models.map(m => m.name),
      datasets: [{
        label: 'トークン数',
        data: MOCK.models.map(m => m.tokens),
        backgroundColor: ['#818cf8', '#34d399', '#fb923c', '#f472b6'],
        borderRadius: 6,
      }],
    },
    options: {
      ...chartOptions('トークン'),
      indexAxis: 'y',
    },
  });
}

function initCost() {
  if (monthlyChart) monthlyChart.destroy();
  monthlyChart = new Chart(document.getElementById('monthlyChart'), {
    type: 'bar',
    data: {
      labels: MOCK.monthly.map(m => m.month),
      datasets: [{
        label: 'コスト (USD)',
        data: MOCK.monthly.map(m => m.cost),
        backgroundColor: 'rgba(129,140,248,0.7)',
        borderColor: '#818cf8',
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: chartOptions('USD'),
  });

  if (donutChart) donutChart.destroy();
  donutChart = new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
      labels: MOCK.models.map(m => m.name),
      datasets: [{
        data: MOCK.models.map(m => m.cost),
        backgroundColor: ['#818cf8', '#34d399', '#fb923c', '#f472b6'],
        borderWidth: 2,
        borderColor: '#1e1e2e',
      }],
    },
    options: {
      plugins: {
        legend: { labels: { color: '#94a3b8' } },
      },
    },
  });
}

function initKintone(filterText = '') {
  const tbody = document.getElementById('keys-tbody');
  const filtered = MOCK.apiKeys.filter(k =>
    k.name.includes(filterText) ||
    k.purpose.includes(filterText) ||
    k.model.includes(filterText)
  );

  tbody.innerHTML = filtered.map(k => `
    <tr class="border-b border-slate-700 hover:bg-slate-700/40 transition-colors">
      <td class="px-4 py-3 font-medium text-slate-100">${k.name}</td>
      <td class="px-4 py-3 text-slate-400">${k.purpose}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded bg-slate-700 text-indigo-300 text-xs font-mono">${k.model}</span>
      </td>
      <td class="px-4 py-3 text-slate-400 text-sm">${k.registered}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 rounded-full text-xs font-semibold ${k.status === 'active' ? 'bg-emerald-900/60 text-emerald-400' : 'bg-slate-700 text-slate-400'}">
          ${k.status === 'active' ? '有効' : '無効'}
        </span>
      </td>
      <td class="px-4 py-3">
        <button onclick="openModal(${k.id})" class="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">詳細</button>
      </td>
    </tr>
  `).join('');
}

function openModal(id) {
  const k = MOCK.apiKeys.find(k => k.id === id);
  if (!k) return;
  document.getElementById('modal-title').textContent = k.name;
  document.getElementById('modal-body').innerHTML = `
    <dl class="space-y-3 text-sm">
      <div class="flex justify-between"><dt class="text-slate-400">用途</dt><dd class="text-slate-100">${k.purpose}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">モデル</dt><dd class="font-mono text-indigo-300">${k.model}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">登録日</dt><dd class="text-slate-100">${k.registered}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">ステータス</dt>
        <dd><span class="px-2 py-0.5 rounded-full text-xs font-semibold ${k.status === 'active' ? 'bg-emerald-900/60 text-emerald-400' : 'bg-slate-700 text-slate-400'}">${k.status === 'active' ? '有効' : '無効'}</span></dd>
      </div>
      <div class="pt-2 border-t border-slate-700"><dt class="text-slate-400 mb-1">メモ</dt><dd class="text-slate-300">${k.memo}</dd></div>
    </dl>
  `;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}

function chartOptions(unit) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', boxWidth: 12 } },
    },
    scales: {
      x: {
        ticks: { color: '#64748b' },
        grid: { color: 'rgba(100,116,139,0.1)' },
      },
      y: {
        ticks: { color: '#64748b' },
        grid: { color: 'rgba(100,116,139,0.1)' },
      },
    },
  };
}

function switchTab(tab) {
  ['dashboard', 'cost', 'kintone', 'settings'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('hidden', t !== tab);
    document.getElementById('btn-' + t).classList.toggle('tab-active', t === tab);
  });
  if (tab === 'dashboard') initDashboard();
  if (tab === 'cost') initCost();
  if (tab === 'kintone') initKintone();
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();

  document.getElementById('search-keys').addEventListener('input', e => {
    initKintone(e.target.value);
  });

  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  document.getElementById('save-settings').addEventListener('click', () => {
    const url = document.getElementById('cf-url').value;
    const sub = document.getElementById('kintone-subdomain').value;
    const appId = document.getElementById('kintone-appid').value;
    localStorage.setItem('cf_url', url);
    localStorage.setItem('kintone_subdomain', sub);
    localStorage.setItem('kintone_appid', appId);
    const btn = document.getElementById('save-settings');
    btn.textContent = '保存しました ✓';
    setTimeout(() => btn.textContent = '設定を保存', 1500);
  });

  const saved = {
    url: localStorage.getItem('cf_url') || '',
    sub: localStorage.getItem('kintone_subdomain') || '',
    appId: localStorage.getItem('kintone_appid') || '',
  };
  if (saved.url) document.getElementById('cf-url').value = saved.url;
  if (saved.sub) document.getElementById('kintone-subdomain').value = saved.sub;
  if (saved.appId) document.getElementById('kintone-appid').value = saved.appId;
});
