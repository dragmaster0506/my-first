const MOCK = {
  summary: {
    totalTokens: 4_823_150,
    totalCost: 28.74,
    totalRequests: 3_412,
    avgLatency: 842,
  },

  daily: [
    { date: '05/30', input: 210000, output: 98000, cost: 2.14 },
    { date: '05/31', input: 380000, output: 142000, cost: 3.87 },
    { date: '06/01', input: 295000, output: 115000, cost: 2.93 },
    { date: '06/02', input: 520000, output: 198000, cost: 5.21 },
    { date: '06/03', input: 170000, output: 72000, cost: 1.76 },
    { date: '06/04', input: 445000, output: 168000, cost: 4.44 },
    { date: '06/05', input: 310000, output: 119000, cost: 3.12 },
  ],

  models: [
    { name: 'gpt-4o',          tokens: 2_100_000, cost: 14.70 },
    { name: 'gpt-4o-mini',     tokens: 1_850_000, cost:  7.40 },
    { name: 'gpt-4-turbo',     tokens:   520_000, cost:  5.20 },
    { name: 'gpt-3.5-turbo',   tokens:   353_150, cost:  1.44 },
  ],

  monthly: [
    { month: '2026/01', cost: 18.40 },
    { month: '2026/02', cost: 22.10 },
    { month: '2026/03', cost: 15.80 },
    { month: '2026/04', cost: 31.50 },
    { month: '2026/05', cost: 26.30 },
    { month: '2026/06', cost: 28.74 },
  ],

  apiKeys: [
    {
      id: 1,
      name: '本番環境キー',
      purpose: 'プロダクション',
      model: 'gpt-4o',
      registered: '2025-12-01',
      status: 'active',
      memo: 'メインサービス用',
    },
    {
      id: 2,
      name: 'ステージングキー',
      purpose: 'テスト・検証',
      model: 'gpt-4o-mini',
      registered: '2026-01-15',
      status: 'active',
      memo: 'QA環境で使用',
    },
    {
      id: 3,
      name: '開発用キー（個人）',
      purpose: '開発',
      model: 'gpt-3.5-turbo',
      registered: '2026-02-10',
      status: 'active',
      memo: 'ローカル開発用',
    },
    {
      id: 4,
      name: '旧プロジェクトキー',
      purpose: 'レガシー',
      model: 'gpt-4-turbo',
      registered: '2025-08-20',
      status: 'inactive',
      memo: '旧システム移行済み',
    },
    {
      id: 5,
      name: 'バッチ処理キー',
      purpose: 'データ処理',
      model: 'gpt-4o-mini',
      registered: '2026-03-05',
      status: 'active',
      memo: '夜間バッチ処理用',
    },
  ],
};
