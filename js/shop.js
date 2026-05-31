// ── SVG illustrations ────────────────────────────────────────────────────
const ITEM_SVGS = {
  magic_lamp: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="44" rx="18" ry="5" fill="#C8860A" opacity=".4"/>
    <rect x="27" y="38" width="6" height="8" rx="2" fill="#C8860A"/>
    <path d="M18 35 Q14 22 22 16 Q30 10 38 16 Q46 22 42 35Z" fill="#FFD700"/>
    <path d="M22 35 Q20 26 26 22 Q30 18 34 22 Q40 26 38 35Z" fill="#FFF176"/>
    <ellipse cx="30" cy="35" rx="12" ry="3" fill="#C8860A"/>
    <path d="M26 10 Q30 2 34 10" stroke="#FFD700" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="2" r="3" fill="#FFE66D"/>
    <path d="M14 38 Q8 40 10 45 Q30 48 50 45 Q52 40 46 38Z" fill="#C8860A"/>
    <line x1="46" y1="40" x2="52" y2="36" stroke="#C8860A" stroke-width="3" stroke-linecap="round"/>
    <circle cx="54" cy="35" r="3" fill="#C8860A"/>
  </svg>`,

  mystery_book: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="38" height="42" rx="4" fill="#6C4BC1"/>
    <rect x="8" y="12" width="8" height="42" rx="2" fill="#4A2E8C"/>
    <rect x="16" y="12" width="30" height="42" rx="2" fill="#8B5CF6"/>
    <rect x="20" y="20" width="22" height="2" rx="1" fill="white" opacity=".6"/>
    <rect x="20" y="25" width="18" height="2" rx="1" fill="white" opacity=".4"/>
    <rect x="20" y="30" width="20" height="2" rx="1" fill="white" opacity=".4"/>
    <circle cx="31" cy="40" r="7" fill="#1A0A3C"/>
    <polygon points="31,34 32.5,38.5 37,38.5 33.5,41.5 34.8,46 31,43.2 27.2,46 28.5,41.5 25,38.5 29.5,38.5" fill="#FFE066"/>
  </svg>`,

  crystal: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,5 42,20 38,50 22,50 18,20" fill="#A78BFA" opacity=".8"/>
    <polygon points="30,5 42,20 38,50 22,50 18,20" fill="url(#cg)" opacity=".6"/>
    <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="white" stop-opacity=".8"/><stop offset="100%" stop-color="#7C3AED" stop-opacity=".1"/></linearGradient></defs>
    <polygon points="30,5 42,20 30,28" fill="white" opacity=".4"/>
    <polygon points="18,20 30,28 22,50" fill="#6D28D9" opacity=".3"/>
    <ellipse cx="30" cy="52" rx="10" ry="3" fill="#7C3AED" opacity=".3"/>
    <circle cx="22" cy="15" r="2" fill="white" opacity=".8"/>
    <circle cx="38" cy="30" r="1.5" fill="white" opacity=".6"/>
    <circle cx="25" cy="40" r="1" fill="white" opacity=".5"/>
  </svg>`,

  magic_hat: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="46" rx="22" ry="6" fill="#1A1A2E"/>
    <ellipse cx="30" cy="46" rx="22" ry="6" fill="#2D2D5E" opacity=".5"/>
    <path d="M18 46 L22 14 Q30 6 38 14 L42 46Z" fill="#1A1A2E"/>
    <path d="M20 46 L24 18 Q30 12 36 18 L40 46Z" fill="#2D2D5E"/>
    <rect x="16" y="42" width="28" height="5" rx="2" fill="#C084FC"/>
    <circle cx="38" cy="20" r="3" fill="#FFE066"/>
    <circle cx="24" cy="30" r="2" fill="#FFE066" opacity=".7"/>
    <circle cx="36" cy="36" r="1.5" fill="#FFE066" opacity=".5"/>
    <path d="M26 10 L28 6 L30 10 L32 6 L34 10" stroke="#FFD700" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  dragon_egg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="34" rx="18" ry="22" fill="#34D399"/>
    <ellipse cx="30" cy="34" rx="18" ry="22" fill="url(#eg)"/>
    <defs><linearGradient id="eg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6EE7B7" stop-opacity=".8"/><stop offset="100%" stop-color="#059669" stop-opacity=".4"/></linearGradient></defs>
    <ellipse cx="22" cy="28" rx="4" ry="6" fill="#059669" opacity=".4"/>
    <ellipse cx="36" cy="22" rx="3" ry="5" fill="#059669" opacity=".4"/>
    <ellipse cx="38" cy="38" rx="4" ry="6" fill="#059669" opacity=".4"/>
    <path d="M28 20 L30 14 L32 20" stroke="#FFD700" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M22 16 L24 11 L26 16" stroke="#FFD700" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="30" cy="34" r="4" fill="#A7F3D0" opacity=".5"/>
  </svg>`,

  star_fragment: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,8 34,22 49,22 37,31 41,45 30,36 19,45 23,31 11,22 26,22" fill="#FCD34D"/>
    <polygon points="30,8 34,22 49,22 37,31 41,45 30,36 19,45 23,31 11,22 26,22" fill="url(#sg)" opacity=".6"/>
    <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="white" stop-opacity=".9"/><stop offset="100%" stop-color="#F59E0B" stop-opacity=".1"/></linearGradient></defs>
    <circle cx="26" cy="18" r="2" fill="white" opacity=".8"/>
    <circle cx="36" cy="28" r="1.5" fill="white" opacity=".6"/>
    <ellipse cx="30" cy="52" rx="8" ry="2" fill="#FCD34D" opacity=".3"/>
    <circle cx="18" cy="14" r="1.5" fill="#FCD34D" opacity=".5"/>
    <circle cx="44" cy="16" r="1" fill="#FCD34D" opacity=".5"/>
    <circle cx="12" cy="30" r="1" fill="#FCD34D" opacity=".4"/>
  </svg>`,

  magic_wand: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="52" x2="44" y2="14" stroke="#7C3AED" stroke-width="5" stroke-linecap="round"/>
    <line x1="10" y1="52" x2="44" y2="14" stroke="#C4B5FD" stroke-width="2" stroke-linecap="round"/>
    <polygon points="44,14 40,8 48,8 46,4 50,10 44,14" fill="#FFD700"/>
    <circle cx="44" cy="10" r="5" fill="#FCD34D"/>
    <circle cx="44" cy="10" r="3" fill="white" opacity=".6"/>
    <circle cx="20" cy="44" r="2" fill="#C4B5FD" opacity=".7"/>
    <circle cx="35" cy="26" r="1.5" fill="#FFD700" opacity=".7"/>
    <circle cx="14" cy="40" r="1.5" fill="#FFD700" opacity=".5"/>
    <text x="48" y="20" font-size="8">✦</text>
    <text x="6" y="48" font-size="7">✦</text>
  </svg>`,

  potion: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="8" width="12" height="8" rx="3" fill="#9CA3AF"/>
    <rect x="26" y="14" width="8" height="4" rx="1" fill="#6B7280"/>
    <path d="M18 22 Q10 32 12 44 Q14 54 30 54 Q46 54 48 44 Q50 32 42 22Z" fill="#F472B6"/>
    <path d="M20 24 Q14 32 16 42 Q18 50 30 50 Q42 50 44 42 Q46 32 40 24Z" fill="url(#pg)"/>
    <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FB7185"/><stop offset="100%" stop-color="#EC4899"/></linearGradient></defs>
    <ellipse cx="30" cy="40" rx="10" ry="6" fill="#FBCFE8" opacity=".5"/>
    <circle cx="22" cy="34" r="3" fill="white" opacity=".4"/>
    <circle cx="38" cy="32" r="2" fill="white" opacity=".3"/>
    <path d="M26 8 L26 6 L28 4 L30 6 L32 4 L34 6 L34 8" stroke="#C084FC" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  magic_ring: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="36" r="16" fill="none" stroke="#D97706" stroke-width="7"/>
    <circle cx="30" cy="36" r="16" fill="none" stroke="#FCD34D" stroke-width="4"/>
    <circle cx="30" cy="20" r="9" fill="#60A5FA"/>
    <circle cx="30" cy="20" r="9" fill="url(#rg)" opacity=".7"/>
    <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="white" stop-opacity=".9"/><stop offset="100%" stop-color="#2563EB" stop-opacity=".1"/></linearGradient></defs>
    <polygon points="30,14 31.5,18.5 36,18.5 32.5,21.5 33.8,26 30,23.2 26.2,26 27.5,21.5 24,18.5 28.5,18.5" fill="white" opacity=".8"/>
    <circle cx="30" cy="20" r="3" fill="white" opacity=".6"/>
  </svg>`,

  angel_feather: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 52 Q20 40 18 24 Q16 10 28 6 Q32 4 34 8 Q36 12 32 16 Q38 12 42 16 Q46 20 42 28 Q40 36 30 52Z" fill="#E0F2FE"/>
    <path d="M30 52 Q20 40 18 24 Q16 10 28 6" stroke="#BAE6FD" stroke-width="1.5" fill="none"/>
    <path d="M30 52 Q30 38 32 28" stroke="#7DD3FC" stroke-width="1" fill="none"/>
    <path d="M22 20 Q26 18 30 22" stroke="#BAE6FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M20 28 Q24 25 30 30" stroke="#BAE6FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M20 36 Q25 32 30 38" stroke="#BAE6FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M36 14 Q38 18 36 22" stroke="#BAE6FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M38 22 Q40 28 36 32" stroke="#BAE6FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="28" cy="8" r="3" fill="white" opacity=".8"/>
  </svg>`,

  magic_mirror: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="28" rx="18" ry="22" fill="#7C3AED"/>
    <ellipse cx="30" cy="28" rx="14" ry="18" fill="#A78BFA"/>
    <ellipse cx="30" cy="28" rx="12" ry="16" fill="#C4B5FD" opacity=".6"/>
    <ellipse cx="30" cy="28" rx="10" ry="14" fill="#EDE9FE"/>
    <path d="M24 20 Q30 16 36 20 Q34 28 30 34 Q26 28 24 20Z" fill="#C4B5FD" opacity=".5"/>
    <circle cx="24" cy="22" r="2" fill="white" opacity=".7"/>
    <rect x="26" y="48" width="8" height="8" rx="2" fill="#7C3AED"/>
    <rect x="20" y="54" width="20" height="4" rx="2" fill="#6D28D9"/>
    <text x="26" y="30" font-size="10" fill="#7C3AED" opacity=".4">✦</text>
  </svg>`,

  owl_amulet: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="34" rx="16" ry="18" fill="#92400E"/>
    <ellipse cx="30" cy="34" rx="16" ry="18" fill="#B45309" opacity=".6"/>
    <ellipse cx="30" cy="30" rx="12" ry="13" fill="#FEF3C7"/>
    <circle cx="23" cy="26" r="6" fill="white"/>
    <circle cx="37" cy="26" r="6" fill="white"/>
    <circle cx="23" cy="26" r="4" fill="#1C1917"/>
    <circle cx="37" cy="26" r="4" fill="#1C1917"/>
    <circle cx="24" cy="25" r="1.5" fill="white"/>
    <circle cx="38" cy="25" r="1.5" fill="white"/>
    <polygon points="30,32 27,36 33,36" fill="#F59E0B"/>
    <path d="M18 20 Q20 14 24 16" stroke="#92400E" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M42 20 Q40 14 36 16" stroke="#92400E" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M18 40 Q22 46 30 46 Q38 46 42 40" stroke="#92400E" stroke-width="2" fill="none"/>
    <line x1="30" y1="16" x2="30" y2="10" stroke="#92400E" stroke-width="2"/>
    <circle cx="30" cy="8" r="4" fill="#F59E0B"/>
  </svg>`,

  small_broom: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <line x1="14" y1="8" x2="46" y2="48" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
    <line x1="14" y1="8" x2="46" y2="48" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="46" cy="50" rx="12" ry="6" fill="#D97706" transform="rotate(-40 46 50)"/>
    <path d="M36 44 Q42 38 52 42" stroke="#92400E" stroke-width="1.5" fill="none"/>
    <path d="M38 48 Q44 43 53 47" stroke="#92400E" stroke-width="1.5" fill="none"/>
    <path d="M40 52 Q46 47 54 52" stroke="#92400E" stroke-width="1.5" fill="none"/>
    <circle cx="16" cy="9" r="4" fill="#C084FC"/>
    <circle cx="14" cy="6" r="2" fill="#E9D5FF"/>
    <text x="6" y="20" font-size="8">✦</text>
    <text x="20" y="36" font-size="7" fill="#C084FC">✦</text>
  </svg>`,

  magic_bag: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 22 Q18 16 22 14 Q26 12 28 16 L32 16 Q34 12 38 14 Q42 16 40 22Z" fill="#EC4899"/>
    <rect x="14" y="22" width="32" height="28" rx="10" fill="#F472B6"/>
    <rect x="14" y="22" width="32" height="28" rx="10" fill="url(#bg)" opacity=".4"/>
    <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="white" stop-opacity=".6"/><stop offset="100%" stop-color="#BE185D" stop-opacity=".2"/></linearGradient></defs>
    <polygon points="30,30 31.5,34.5 36,34.5 32.5,37.5 33.8,42 30,39.2 26.2,42 27.5,37.5 24,34.5 28.5,34.5" fill="white" opacity=".7"/>
    <circle cx="22" cy="28" r="2" fill="white" opacity=".5"/>
    <circle cx="40" cy="34" r="1.5" fill="white" opacity=".4"/>
  </svg>`,

  crystal_ball: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="28" r="20" fill="#1E3A5F"/>
    <circle cx="30" cy="28" r="20" fill="url(#cbg)"/>
    <defs><radialGradient id="cbg" cx="35%" cy="30%"><stop offset="0%" stop-color="#93C5FD" stop-opacity=".8"/><stop offset="60%" stop-color="#1E40AF" stop-opacity=".3"/><stop offset="100%" stop-color="#1E3A5F" stop-opacity=".8"/></radialGradient></defs>
    <circle cx="30" cy="28" r="20" fill="none" stroke="#60A5FA" stroke-width="1" opacity=".4"/>
    <ellipse cx="23" cy="20" rx="5" ry="7" fill="white" opacity=".15" transform="rotate(-20 23 20)"/>
    <circle cx="22" cy="18" r="3" fill="white" opacity=".2"/>
    <path d="M20 32 Q26 26 34 30 Q38 34 34 40 Q28 44 22 40Z" fill="#3B82F6" opacity=".3"/>
    <circle cx="34" cy="24" r="1.5" fill="white" opacity=".6"/>
    <rect x="22" y="46" width="16" height="6" rx="2" fill="#475569"/>
    <rect x="18" y="50" width="24" height="4" rx="2" fill="#334155"/>
  </svg>`,

  stardust_bottle: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect x="26" y="8" width="8" height="6" rx="2" fill="#9CA3AF"/>
    <circle cx="30" cy="6" r="4" fill="#6B7280"/>
    <path d="M22 18 Q16 24 18 38 Q20 50 30 50 Q40 50 42 38 Q44 24 38 18Z" fill="#1E1B4B"/>
    <path d="M24 20 Q20 26 22 38 Q24 46 30 46 Q36 46 38 38 Q40 26 36 20Z" fill="url(#sbg)"/>
    <defs><linearGradient id="sbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#312E81"/><stop offset="100%" stop-color="#1E1B4B"/></linearGradient></defs>
    <circle cx="25" cy="30" r="2" fill="#FCD34D" opacity=".9"/>
    <circle cx="34" cy="24" r="1.5" fill="#FCD34D" opacity=".8"/>
    <circle cx="28" cy="38" r="1" fill="#FCD34D" opacity=".7"/>
    <circle cx="36" cy="36" r="2" fill="#A78BFA" opacity=".9"/>
    <circle cx="24" cy="42" r="1.5" fill="#60A5FA" opacity=".8"/>
    <circle cx="32" cy="44" r="1" fill="#FCD34D" opacity=".6"/>
    <circle cx="22" cy="26" r="1" fill="#F472B6" opacity=".8"/>
    <path d="M26 8 L26 12" stroke="white" stroke-width="1" opacity=".4"/>
  </svg>`,

  magic_compass: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="22" fill="#B45309"/>
    <circle cx="30" cy="30" r="20" fill="#FEF3C7"/>
    <circle cx="30" cy="30" r="18" fill="#FFFBEB"/>
    <line x1="30" y1="12" x2="30" y2="48" stroke="#D1D5DB" stroke-width="1" opacity=".4"/>
    <line x1="12" y1="30" x2="48" y2="30" stroke="#D1D5DB" stroke-width="1" opacity=".4"/>
    <text x="28" y="16" font-size="6" fill="#6B7280">N</text>
    <text x="28" y="47" font-size="6" fill="#6B7280">S</text>
    <text x="11" y="33" font-size="6" fill="#6B7280">W</text>
    <text x="44" y="33" font-size="6" fill="#6B7280">E</text>
    <polygon points="30,18 32,30 30,28 28,30" fill="#EF4444"/>
    <polygon points="30,42 32,30 30,32 28,30" fill="#374151"/>
    <circle cx="30" cy="30" r="3" fill="#B45309"/>
    <circle cx="30" cy="30" r="2" fill="#FCD34D"/>
    <circle cx="30" cy="8" r="3" fill="#B45309"/>
    <line x1="30" y1="52" x2="30" y2="55" stroke="#B45309" stroke-width="2"/>
  </svg>`,

  badge_math1: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="28" r="22" fill="#D97706"/>
    <circle cx="30" cy="28" r="20" fill="#FCD34D"/>
    <text x="15" y="34" font-size="18" fill="#92400E" font-weight="bold">10!</text>
    <path d="M30 48 L28 58 L30 55 L32 58Z" fill="#D97706"/>
  </svg>`,

  badge_combo5: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,4 36,20 54,20 40,30 46,48 30,38 14,48 20,30 6,20 24,20" fill="#C084FC"/>
    <polygon points="30,10 34,22 46,22 37,29 41,43 30,35 19,43 23,29 14,22 26,22" fill="#E9D5FF"/>
    <text x="24" y="34" font-size="12" fill="#7C3AED" font-weight="bold">5x</text>
  </svg>`,

  badge_perfect: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="24" fill="url(#dpg)"/>
    <defs><radialGradient id="dpg"><stop offset="0%" stop-color="#A7F3D0"/><stop offset="100%" stop-color="#10B981"/></radialGradient></defs>
    <path d="M18 30 L26 38 L42 22" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="30" cy="30" r="24" fill="none" stroke="#6EE7B7" stroke-width="2"/>
  </svg>`
};

// ── Shop staff SVG ───────────────────────────────────────────────────────
const SHOP_STAFF_SVG = `<svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" width="100" height="167">
  <!-- shadow -->
  <ellipse cx="60" cy="195" rx="30" ry="5" fill="#00000020"/>
  <!-- shoes -->
  <ellipse cx="48" cy="185" rx="10" ry="5" fill="#7C3AED"/>
  <ellipse cx="72" cy="185" rx="10" ry="5" fill="#7C3AED"/>
  <!-- legs -->
  <rect x="44" y="155" width="12" height="32" rx="6" fill="#FDDBB4"/>
  <rect x="64" y="155" width="12" height="32" rx="6" fill="#FDDBB4"/>
  <!-- apron skirt -->
  <path d="M30 110 Q28 155 44 160 L76 160 Q92 155 90 110Z" fill="#FFF"/>
  <path d="M35 110 Q33 150 48 155 L72 155 Q87 150 85 110Z" fill="#FDE8FF"/>
  <!-- body (uniform) -->
  <rect x="30" y="80" width="60" height="60" rx="14" fill="#7C3AED"/>
  <!-- apron bib -->
  <rect x="42" y="78" width="36" height="46" rx="8" fill="white" opacity=".9"/>
  <rect x="46" y="82" width="28" height="38" rx="6" fill="#F5D0FE" opacity=".6"/>
  <!-- collar -->
  <path d="M48 80 L60 92 L72 80" stroke="white" stroke-width="3" fill="none"/>
  <!-- arms -->
  <rect x="12" y="82" width="20" height="12" rx="6" fill="#7C3AED"/>
  <rect x="8" y="90" width="16" height="28" rx="8" fill="#FDDBB4"/>
  <rect x="88" y="82" width="20" height="12" rx="6" fill="#7C3AED"/>
  <rect x="96" y="90" width="16" height="28" rx="8" fill="#FDDBB4"/>
  <!-- hand holding item hint -->
  <ellipse cx="16" cy="118" rx="8" ry="6" fill="#FDDBB4"/>
  <ellipse cx="104" cy="118" rx="8" ry="6" fill="#FDDBB4"/>
  <!-- neck -->
  <rect x="52" y="68" width="16" height="16" rx="8" fill="#FDDBB4"/>
  <!-- head -->
  <circle cx="60" cy="52" r="28" fill="#FDDBB4"/>
  <!-- hair back -->
  <ellipse cx="60" cy="38" rx="30" ry="20" fill="#C0392B"/>
  <!-- hair sides -->
  <ellipse cx="32" cy="52" rx="8" ry="16" fill="#C0392B"/>
  <ellipse cx="88" cy="52" rx="8" ry="16" fill="#C0392B"/>
  <!-- hair front -->
  <ellipse cx="60" cy="36" rx="26" ry="14" fill="#C0392B"/>
  <!-- hair bangs -->
  <path d="M36 44 Q40 32 50 38 Q54 30 60 36 Q66 30 70 38 Q80 32 84 44" fill="#C0392B"/>
  <!-- hair twin tails -->
  <path d="M34 58 Q20 52 18 68 Q16 82 30 80 Q24 70 32 68Z" fill="#C0392B"/>
  <path d="M86 58 Q100 52 102 68 Q104 82 90 80 Q96 70 88 68Z" fill="#C0392B"/>
  <!-- hair ribbons -->
  <path d="M28 60 Q22 55 26 52 Q30 58 34 56 Q32 62 28 60Z" fill="#FFB7C5"/>
  <path d="M92 60 Q98 55 94 52 Q90 58 86 56 Q88 62 92 60Z" fill="#FFB7C5"/>
  <!-- face -->
  <!-- eyes -->
  <ellipse cx="48" cy="52" rx="6" ry="7" fill="white"/>
  <ellipse cx="72" cy="52" rx="6" ry="7" fill="white"/>
  <circle cx="48" cy="53" r="4" fill="#3D2B1F"/>
  <circle cx="72" cy="53" r="4" fill="#3D2B1F"/>
  <circle cx="50" cy="51" r="1.5" fill="white"/>
  <circle cx="74" cy="51" r="1.5" fill="white"/>
  <!-- eyelashes -->
  <path d="M42 47 Q44 44 48 46" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
  <path d="M66 47 Q68 44 72 46" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
  <!-- blush -->
  <ellipse cx="40" cy="58" rx="5" ry="3" fill="#FFB7C5" opacity=".6"/>
  <ellipse cx="80" cy="58" rx="5" ry="3" fill="#FFB7C5" opacity=".6"/>
  <!-- mouth -->
  <path d="M52 64 Q60 70 68 64" stroke="#C0837A" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- teeth hint -->
  <path d="M55 65 Q60 68 65 65" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- headband -->
  <rect x="34" y="34" width="52" height="6" rx="3" fill="#FFD700"/>
  <polygon points="60,26 63,34 57,34" fill="#FFD700"/>
  <!-- name tag -->
  <rect x="48" y="96" width="24" height="14" rx="3" fill="white"/>
  <rect x="49" y="97" width="22" height="12" rx="2" fill="#E9D5FF"/>
  <text x="53" y="107" font-size="6" fill="#7C3AED">店員</text>
  <!-- speech bubble area -->
</svg>`;

// ── Items data ───────────────────────────────────────────────────────────
const ITEMS_DATA = [
  // まほうグッズ
  { id:"magic_lamp",      name:"まほうのランプ",      category:"magic",   cost:150, rarity:"normal", desc:"ねがいをかなえる？",          detail:"むかしのまほうつかいが使っていたランプ。みがくとふしぎなことがおきるかも！まほうのあかりがお部屋をやさしく照らすよ。" },
  { id:"mystery_book",    name:"ふしぎなほん",         category:"magic",   cost:120, rarity:"normal", desc:"読むとまほうがわかる！",       detail:"まほうのことばがびっしり書かれた、ふしぎな本。読むたびにちがう内容が現れるといわれているよ。" },
  { id:"crystal",         name:"きらきらクリスタル",  category:"magic",   cost:180, rarity:"rare",   desc:"七色に光るクリスタル",         detail:"まほうのエネルギーが結晶になったもの。光に当てるとにじいろにきらきら輝くよ。お店の目玉商品！" },
  { id:"magic_hat",       name:"まほうのぼうし",       category:"magic",   cost:200, rarity:"rare",   desc:"かぶるとまほうが使える！",     detail:"まほうつかいの証、とんがりぼうし。星の模様が入っていて、かぶると少しだけまほうが使えるようになるよ。" },
  { id:"dragon_egg",      name:"ドラゴンのたまご",     category:"magic",   cost:350, rarity:"super",  desc:"温めると…？",                 detail:"どこかの洞窟で見つかった、みどり色のたまご。しっかり温め続けると、中から何かが生まれてくるかも！？" },
  { id:"star_fragment",   name:"ほしのかけら",         category:"magic",   cost:90,  rarity:"normal", desc:"夜空から落ちてきた☆",         detail:"流れ星が地面に落ちたときのかけら。もっていると良いことが起きるといわれているラッキーアイテム！" },
  { id:"magic_wand",      name:"まほうのつえ",         category:"magic",   cost:270, rarity:"rare",   desc:"ふるとまほうが出る！",         detail:"先端にかがやく星がついた、まほうのつえ。ふり方次第でちがうまほうが出てくる、とても便利な道具だよ。" },
  { id:"potion",          name:"にじいろポーション",  category:"magic",   cost:150, rarity:"normal", desc:"のむと元気になる！",           detail:"にじの色をすべて集めて作った、きれいなポーション。のむとからだが軽くなってとっても元気になるよ！" },
  // おまもりコーナー
  { id:"magic_ring",      name:"まほうのゆびわ",       category:"charm",   cost:270, rarity:"rare",   desc:"はめると力がみなぎる",         detail:"青い宝石がはまった、まほうのゆびわ。はめると不思議な力が体中にみなぎってくるよ。お守りにも最適！" },
  { id:"angel_feather",   name:"てんしのはね",         category:"charm",   cost:360, rarity:"super",  desc:"ふわふわ軽い本物のはね",       detail:"天使が落としていった、純白のはね。さわるととても軽くてふわふわ。かざっておくと幸せが来るといわれているよ。" },
  { id:"owl_amulet",      name:"ふくろうのおまもり",  category:"charm",   cost:180, rarity:"rare",   desc:"知恵をさずける守り神",         detail:"知恵の神様ふくろうをかたどったお守り。もっているとテストや計算が得意になるといわれている、まほどうぐ屋の人気商品！" },
  { id:"small_broom",     name:"ちいさなほうき",       category:"charm",   cost:90,  rarity:"normal", desc:"空を飛べるかも？",             detail:"まほうつかいが乗るほうきのミニチュア版。ちゃんと空を飛べるようになるかどうかは…乗ってみてのお楽しみ！" },
  { id:"magic_bag",       name:"まほうのふくろ",       category:"charm",   cost:120, rarity:"normal", desc:"中が無限に広がる袋",           detail:"外からは小さく見えるのに、中はなぜか広くなっているふしぎな袋。どんなものでも入るといわれているよ。" },
  // レアグッズ
  { id:"magic_mirror",    name:"まほうのかがみ",       category:"rare",    cost:450, rarity:"super",  desc:"本当のすがたを映す鏡",         detail:"うつすと本当のすがたが見えるというまほうのかがみ。むかしのお姫様が使っていたものとそっくりのデザインだよ。" },
  { id:"crystal_ball",    name:"クリスタルボール",     category:"rare",    cost:500, rarity:"super",  desc:"未来が見える！？",             detail:"水晶の玉。じっと見つめていると、もやがかかって未来のすがたが見えてくるといわれている、神秘のアイテム。" },
  { id:"stardust_bottle", name:"ほしふりのびん",       category:"rare",    cost:300, rarity:"rare",   desc:"星のかけらが入ったびん",       detail:"夜空の星くずをつめこんだ、小さなびん。ふたをあけると星のきらきらが舞い出すよ。とてもきれいで人気の商品。" },
  { id:"magic_compass",   name:"まほうのコンパス",     category:"rare",    cost:240, rarity:"rare",   desc:"行きたい場所を教えてくれる",   detail:"ふつうの方角じゃなく、自分が一番行きたい場所を指し示すふしぎなコンパス。迷子になっても大丈夫！" },
  // バッジ
  { id:"badge_math1",     name:"さんすうしょしんしゃ", category:"badge",  cost:0,   rarity:"normal", desc:"10問正解した証",               detail:"計算チャレンジで10問正解して手に入れたバッジ。さんすうのたびを始めた証だよ！" },
  { id:"badge_combo5",    name:"コンボマスター",        category:"badge",  cost:0,   rarity:"rare",   desc:"5コンボ達成した証",            detail:"一度に5問連続で正解して手に入れたバッジ。すごい集中力の持ち主だ！" },
  { id:"badge_perfect",   name:"パーフェクト",          category:"badge",  cost:0,   rarity:"super",  desc:"全問正解した証",               detail:"チャレンジで全問正解して手に入れたバッジ。まほうのような計算力を持つ証！" }
];

// ── Functions ────────────────────────────────────────────────────────────
let allItems = [];

async function loadItems() {
  allItems = ITEMS_DATA;
  return allItems;
}

function getItemById(id) {
  return allItems.find(i => i.id === id);
}

function getItemSVG(id) {
  return ITEM_SVGS[id] || `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="#E9D5FF"/><text x="20" y="38" font-size="20">🎁</text></svg>`;
}

// ── Shop floor render ────────────────────────────────────────────────────
function renderShopFloor(save) {
  const categories = [
    { id: 'magic', label: '✨ まほうグッズコーナー', color: '#EDE7FF' },
    { id: 'charm', label: '🔮 おまもりコーナー',     color: '#FDF2FF' },
    { id: 'rare',  label: '💎 レアグッズコーナー',   color: '#FFF7ED' }
  ];

  let html = `
    <div class="shopfloor-interior">
      <div class="shopfloor-banner">🏪 まほうのお店屋さん へ ようこそ！</div>
      <div class="shopfloor-staff-row">
        <div class="shopfloor-staff">${SHOP_STAFF_SVG}</div>
        <div class="shopfloor-speech">
          <div class="speech-bubble">
            いらっしゃいませ！🌟<br>
            コインで商品を仕入れて<br>
            お店に飾ってね！
          </div>
        </div>
      </div>
    </div>`;

  categories.forEach(cat => {
    const items = allItems.filter(i => i.category === cat.id);
    html += `
      <div class="shopfloor-shelf" style="background:${cat.color}">
        <div class="shelf-label">${cat.label}</div>
        <div class="shelf-rail"></div>
        <div class="shelf-items">`;

    items.forEach(item => {
      const owned = save.inventory.includes(item.id);
      const canAfford = save.points >= item.cost;
      const rarityBorder = { normal: '#D1D5DB', rare: '#C084FC', super: '#FCD34D' };
      html += `
        <div class="shelf-item ${owned ? 'shelf-item-owned' : ''}"
             style="border-color:${rarityBorder[item.rarity]}"
             onclick="showItemDetail('${item.id}')">
          <div class="shelf-item-svg">${getItemSVG(item.id)}</div>
          <div class="shelf-item-name">${item.name}</div>
          <div class="shelf-item-price ${owned ? 'owned-price' : canAfford ? 'can-afford' : 'cant-afford'}">
            ${owned ? '✓ 仕入れ済' : `🪙 ${item.cost}`}
          </div>
          ${item.rarity !== 'normal' ? `<div class="shelf-rarity-tag rarity-${item.rarity}">${item.rarity === 'rare' ? 'RARE' : 'SUPER'}</div>` : ''}
        </div>`;
    });

    html += `</div></div>`;
  });

  return html;
}

// ── Procurement shop (buying) render ─────────────────────────────────────
function renderShop(save) {
  const rarityLabel = { normal: '', rare: '✦ レア', super: '★ スーパーレア' };
  const rarityClass = { normal: '', rare: 'rarity-rare', super: 'rarity-super' };
  const categories = [
    { id: 'magic', label: '✨ まほうグッズ' },
    { id: 'charm', label: '🔮 おまもり' },
    { id: 'rare',  label: '💎 レアグッズ' },
    { id: 'badge', label: '🏅 バッジ' }
  ];

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
          <div class="item-svg-wrap">${getItemSVG(item.id)}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-rarity">${rarityLabel[item.rarity]}</div>
          <div class="item-desc">${item.desc}</div>
          ${isFree
            ? `<div class="item-cost free">チャレンジでゲット！</div>`
            : owned
              ? `<div class="item-cost owned-label">✓ 仕入れ済み</div>`
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
