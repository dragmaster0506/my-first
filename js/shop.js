const ITEMS_DATA = [
  { "id": "dress_pink",    "name": "ピンクドレス",       "category": "coord",  "cost": 150, "rarity": "normal", "emoji": "👗", "color": "#FFB7C5", "desc": "ふわふわのピンクドレス" },
  { "id": "dress_mint",    "name": "ミントドレス",       "category": "coord",  "cost": 150, "rarity": "normal", "emoji": "👗", "color": "#B7EFC5", "desc": "さわやかなミントドレス" },
  { "id": "dress_lavender","name": "ラベンダードレス",   "category": "coord",  "cost": 240, "rarity": "rare",   "emoji": "👗", "color": "#C9B7FF", "desc": "まほうのラベンダードレス" },
  { "id": "dress_gold",    "name": "ゴールドドレス",     "category": "coord",  "cost": 450, "rarity": "super",  "emoji": "👗", "color": "#FFD700", "desc": "きらきらゴールドドレス" },
  { "id": "ribbon_pink",   "name": "ピンクリボン",       "category": "coord",  "cost": 90,  "rarity": "normal", "emoji": "🎀", "color": "#FFB7C5", "desc": "かわいいピンクリボン" },
  { "id": "ribbon_star",   "name": "ほしリボン",         "category": "coord",  "cost": 180, "rarity": "rare",   "emoji": "🎀", "color": "#FFE066", "desc": "ほしのついたリボン" },
  { "id": "cat_white",     "name": "しろねこ",           "category": "pet",    "cost": 240, "rarity": "normal", "emoji": "🐱", "color": "#FFFFFF", "desc": "ふわふわしろねこ" },
  { "id": "cat_pink",      "name": "ももねこ",           "category": "pet",    "cost": 300, "rarity": "rare",   "emoji": "🐱", "color": "#FFB7C5", "desc": "ももいろのかわいいねこ" },
  { "id": "bunny",         "name": "うさぎ",             "category": "pet",    "cost": 270, "rarity": "rare",   "emoji": "🐰", "color": "#FFFACD", "desc": "もふもふうさぎ" },
  { "id": "unicorn",       "name": "ユニコーン",         "category": "pet",    "cost": 600, "rarity": "super",  "emoji": "🦄", "color": "#E8D5FF", "desc": "まほうのユニコーン" },
  { "id": "star_cushion",  "name": "ほしクッション",     "category": "room",   "cost": 120, "rarity": "normal", "emoji": "⭐", "color": "#FFE066", "desc": "ほし型クッション" },
  { "id": "flower_pot",    "name": "おはなポット",       "category": "room",   "cost": 105, "rarity": "normal", "emoji": "🌸", "color": "#FFB7C5", "desc": "さくらのおはなポット" },
  { "id": "rainbow_lamp",  "name": "にじランプ",         "category": "room",   "cost": 210, "rarity": "rare",   "emoji": "🌈", "color": "#B7E4FF", "desc": "にじいろのランプ" },
  { "id": "magic_mirror",  "name": "まほうの鏡",         "category": "room",   "cost": 360, "rarity": "super",  "emoji": "🪞", "color": "#C9B7FF", "desc": "まほうが宿る鏡" },
  { "id": "sparkle_fx",    "name": "キラキラエフェクト", "category": "effect", "cost": 180, "rarity": "rare",   "emoji": "✨", "color": "#FFE066", "desc": "正解のときキラキラ光る" },
  { "id": "heart_fx",      "name": "ハートエフェクト",   "category": "effect", "cost": 150, "rarity": "normal", "emoji": "💖", "color": "#FFB7C5", "desc": "正解のときハートが舞う" },
  { "id": "rainbow_fx",    "name": "にじエフェクト",     "category": "effect", "cost": 300, "rarity": "super",  "emoji": "🌈", "color": "#B7E4FF", "desc": "正解のときにじが出る" },
  { "id": "badge_math1",   "name": "さんすうしょしんしゃ","category": "badge", "cost": 0,   "rarity": "normal", "emoji": "🏅", "color": "#FFD700", "desc": "はじめての10もん正解" },
  { "id": "badge_combo5",  "name": "コンボマスター",     "category": "badge",  "cost": 0,   "rarity": "rare",   "emoji": "🏆", "color": "#C9B7FF", "desc": "5コンボ達成" },
  { "id": "badge_perfect", "name": "パーフェクト",       "category": "badge",  "cost": 0,   "rarity": "super",  "emoji": "💎", "color": "#B7FFEA", "desc": "5問全問正解" }
];

let allItems = [];

async function loadItems() {
  allItems = ITEMS_DATA;
  return allItems;
}

function getItemById(id) {
  return allItems.find(i => i.id === id);
}

function renderShop(save, onBuy) {
  const categories = [
    { id: 'coord',  label: '👗 コーデ商品' },
    { id: 'pet',    label: '🐾 ペット商品' },
    { id: 'room',   label: '🏠 インテリア商品' },
    { id: 'effect', label: '✨ エフェクト商品' },
    { id: 'badge',  label: '🏅 バッジ' }
  ];

  const rarityLabel = { normal: '', rare: '✦ レア', super: '★ スーパーレア' };
  const rarityClass = { normal: '', rare: 'rarity-rare', super: 'rarity-super' };

  let html = `<div class="shop-points">🪙 もっているコイン: <b>${save.points}</b>コイン</div>
    <p class="shop-desc">計算チャレンジでコインを貯めて、お店の商品を仕入れよう！</p>`;

  categories.forEach(cat => {
    const items = allItems.filter(i => i.category === cat.id);
    if (items.length === 0) return;
    html += `<div class="shop-category"><h3>${cat.label}</h3><div class="shop-grid">`;
    items.forEach(item => {
      const owned = save.inventory.includes(item.id);
      const canBuy = !owned && save.points >= item.cost && item.cost > 0;
      const isFree = item.cost === 0;
      html += `
        <div class="shop-item ${owned ? 'owned' : ''} ${rarityClass[item.rarity]}">
          <div class="item-emoji" style="background:${item.color}20;border-color:${item.color}">${item.emoji}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-rarity">${rarityLabel[item.rarity]}</div>
          <div class="item-desc">${item.desc}</div>
          ${isFree
            ? `<div class="item-cost free">チャレンジでゲット！</div>`
            : owned
              ? `<div class="item-cost owned-label">✓ もっている</div>`
              : `<button class="btn-buy ${canBuy ? '' : 'disabled'}" onclick="shopBuy('${item.id}')" ${canBuy ? '' : 'disabled'}>
                   🪙 ${item.cost}コイン で仕入れる
                 </button>`
          }
        </div>`;
    });
    html += `</div></div>`;
  });

  return html;
}

function shopBuy(itemId) {
  window._shopBuyCallback && window._shopBuyCallback(itemId);
}
