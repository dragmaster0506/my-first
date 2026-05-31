const ITEMS_DATA = [
  { "id": "dress_pink",    "name": "ピンクドレス",       "category": "coord",  "cost": 50,  "rarity": "normal", "emoji": "👗", "color": "#FFB7C5", "desc": "ふわふわのピンクドレス" },
  { "id": "dress_mint",    "name": "ミントドレス",       "category": "coord",  "cost": 50,  "rarity": "normal", "emoji": "👗", "color": "#B7EFC5", "desc": "さわやかなミントドレス" },
  { "id": "dress_lavender","name": "ラベンダードレス",   "category": "coord",  "cost": 80,  "rarity": "rare",   "emoji": "👗", "color": "#C9B7FF", "desc": "まほうのラベンダードレス" },
  { "id": "dress_gold",    "name": "ゴールドドレス",     "category": "coord",  "cost": 150, "rarity": "super",  "emoji": "👗", "color": "#FFD700", "desc": "きらきらゴールドドレス" },
  { "id": "ribbon_pink",   "name": "ピンクリボン",       "category": "coord",  "cost": 30,  "rarity": "normal", "emoji": "🎀", "color": "#FFB7C5", "desc": "かわいいピンクリボン" },
  { "id": "ribbon_star",   "name": "ほしリボン",         "category": "coord",  "cost": 60,  "rarity": "rare",   "emoji": "🎀", "color": "#FFE066", "desc": "ほしのついたリボン" },
  { "id": "cat_white",     "name": "しろねこ",           "category": "pet",    "cost": 80,  "rarity": "normal", "emoji": "🐱", "color": "#FFFFFF", "desc": "ふわふわしろねこ" },
  { "id": "cat_pink",      "name": "ももねこ",           "category": "pet",    "cost": 100, "rarity": "rare",   "emoji": "🐱", "color": "#FFB7C5", "desc": "ももいろのかわいいねこ" },
  { "id": "bunny",         "name": "うさぎ",             "category": "pet",    "cost": 90,  "rarity": "rare",   "emoji": "🐰", "color": "#FFFACD", "desc": "もふもふうさぎ" },
  { "id": "unicorn",       "name": "ユニコーン",         "category": "pet",    "cost": 200, "rarity": "super",  "emoji": "🦄", "color": "#E8D5FF", "desc": "まほうのユニコーン" },
  { "id": "star_cushion",  "name": "ほしクッション",     "category": "room",   "cost": 40,  "rarity": "normal", "emoji": "⭐", "color": "#FFE066", "desc": "ほし型クッション" },
  { "id": "flower_pot",    "name": "おはなポット",       "category": "room",   "cost": 35,  "rarity": "normal", "emoji": "🌸", "color": "#FFB7C5", "desc": "さくらのおはなポット" },
  { "id": "rainbow_lamp",  "name": "にじランプ",         "category": "room",   "cost": 70,  "rarity": "rare",   "emoji": "🌈", "color": "#B7E4FF", "desc": "にじいろのランプ" },
  { "id": "magic_mirror",  "name": "まほうの鏡",         "category": "room",   "cost": 120, "rarity": "super",  "emoji": "🪞", "color": "#C9B7FF", "desc": "まほうが宿る鏡" },
  { "id": "sparkle_fx",    "name": "キラキラエフェクト", "category": "effect", "cost": 60,  "rarity": "rare",   "emoji": "✨", "color": "#FFE066", "desc": "正解のときキラキラ光る" },
  { "id": "heart_fx",      "name": "ハートエフェクト",   "category": "effect", "cost": 50,  "rarity": "normal", "emoji": "💖", "color": "#FFB7C5", "desc": "正解のときハートが舞う" },
  { "id": "rainbow_fx",    "name": "にじエフェクト",     "category": "effect", "cost": 100, "rarity": "super",  "emoji": "🌈", "color": "#B7E4FF", "desc": "正解のときにじが出る" },
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
    { id: 'coord',  label: '👗 コーデ' },
    { id: 'pet',    label: '🐾 ペット' },
    { id: 'room',   label: '🏠 へや' },
    { id: 'effect', label: '✨ エフェクト' },
    { id: 'badge',  label: '🏅 バッジ' }
  ];

  const rarityLabel = { normal: '', rare: '✦ レア', super: '★ スーパーレア' };
  const rarityClass = { normal: '', rare: 'rarity-rare', super: 'rarity-super' };

  let html = `<div class="shop-points">💰 もっているポイント: <b>${save.points}</b>pt</div>`;

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
                   💰 ${item.cost}pt で購入
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
