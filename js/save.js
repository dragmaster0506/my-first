const SAVE_KEY = 'mahouCalcGame_saves';
const SETTINGS_KEY = 'mahouCalcGame_settings';

function loadAllSaves() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || [null, null, null];
  } catch { return [null, null, null]; }
}

function saveAllSaves(saves) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
}

function createNewSave(slot, name, grade) {
  const saves = loadAllSaves();
  saves[slot] = {
    slot,
    name,
    grade,
    points: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    inventory: [],
    equipped: { coord: null, pet: null, room: null, effect: 'heart_fx' },
    stamps: 0,
    dailyDate: null,
    dailyDone: false,
    combo: 0,
    maxCombo: 0,
    createdAt: Date.now(),
    lastPlayedAt: Date.now()
  };
  saveAllSaves(saves);
  return saves[slot];
}

function getSave(slot) {
  return loadAllSaves()[slot];
}

function updateSave(slot, data) {
  const saves = loadAllSaves();
  saves[slot] = { ...saves[slot], ...data, lastPlayedAt: Date.now() };
  saveAllSaves(saves);
  return saves[slot];
}

function deleteSave(slot) {
  const saves = loadAllSaves();
  saves[slot] = null;
  saveAllSaves(saves);
}

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { bgm: true, sfx: true };
  } catch { return { bgm: true, sfx: true }; }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
