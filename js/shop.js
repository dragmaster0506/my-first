let allItems = [];

async function loadItems() {
  const res = await fetch('data/items/items.json');
  allItems = await res.json();
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
