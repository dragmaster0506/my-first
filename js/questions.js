function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcm(a, b) { return (a * b) / gcd(a, b); }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateQuestion(grade) {
  const generators = {
    1: gen1, 2: gen2, 3: gen3, 4: gen4, 5: gen5, 6: gen6
  };
  return generators[grade]();
}

function gen1() {
  const type = Math.random() < 0.5 ? 'add' : 'sub';
  if (type === 'add') {
    const a = randInt(1, 9), b = randInt(1, 10 - a);
    return { q: `${a} + ${b} = ?`, answer: a + b, hint: `${a}に${b}をたすと？` };
  } else {
    const a = randInt(2, 10), b = randInt(1, a);
    return { q: `${a} - ${b} = ?`, answer: a - b, hint: `${a}から${b}をひくと？` };
  }
}

function gen2() {
  const r = Math.random();
  if (r < 0.33) {
    const a = randInt(10, 89), b = randInt(1, 99 - a);
    return { q: `${a} + ${b} = ?`, answer: a + b, hint: `くりあがりに気をつけて！` };
  } else if (r < 0.66) {
    const a = randInt(11, 99), b = randInt(1, a - 1);
    return { q: `${a} - ${b} = ?`, answer: a - b, hint: `くりさがりに気をつけて！` };
  } else {
    const tables = [2, 3, 4, 5];
    const t = tables[randInt(0, 3)], n = randInt(1, 9);
    return { q: `${t} × ${n} = ?`, answer: t * n, hint: `${t}のだんのかけざん` };
  }
}

function gen3() {
  const r = Math.random();
  if (r < 0.5) {
    const t = randInt(1, 9), n = randInt(1, 9);
    return { q: `${t} × ${n} = ?`, answer: t * n, hint: `九九をおもいだそう！` };
  } else {
    const t = randInt(2, 5), n = randInt(1, 9);
    return { q: `${t * n} ÷ ${t} = ?`, answer: n, hint: `${t}のだんでかんがえよう` };
  }
}

function gen4() {
  const r = Math.random();
  if (r < 0.33) {
    const t = randInt(2, 9), n = randInt(1, 9);
    return { q: `${t * n} ÷ ${t} = ?`, answer: n, hint: `九九をつかおう` };
  } else if (r < 0.66) {
    const a = (randInt(1, 9) / 10), b = (randInt(1, 9) / 10);
    const ans = Math.round((a + b) * 10) / 10;
    return { q: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`, answer: ans, hint: `しょうすうてんに気をつけて` };
  } else {
    const d = randInt(3, 9), n1 = randInt(1, d - 1), n2 = randInt(1, d - n1);
    return {
      q: `${n1}/${d} + ${n2}/${d} = ?`,
      answer: `${n1 + n2}/${d}`,
      display: `<sup>${n1}</sup>/<sub>${d}</sub> + <sup>${n2}</sup>/<sub>${d}</sub> = ?`,
      hint: `ぶんぼはそのまま、ぶんしをたすよ`,
      type: 'fraction'
    };
  }
}

function gen5() {
  const r = Math.random();
  if (r < 0.5) {
    const d1 = randInt(2, 6), d2 = randInt(2, 6);
    const l = lcm(d1, d2);
    const n1 = randInt(1, d1 - 1), n2 = randInt(1, d2 - 1);
    const num = n1 * (l / d1) + n2 * (l / d2);
    const g = gcd(num, l);
    const ansN = num / g, ansD = l / g;
    const ans = ansD === 1 ? `${ansN}` : `${ansN}/${ansD}`;
    return {
      q: `${n1}/${d1} + ${n2}/${d2} = ?`,
      answer: ans,
      display: `<sup>${n1}</sup>/<sub>${d1}</sub> + <sup>${n2}</sup>/<sub>${d2}</sub> = ?`,
      hint: `通分してからたそう（公倍数は${l}）`,
      type: 'fraction'
    };
  } else {
    const a = randInt(2, 9), b = randInt(2, 9);
    const pct = [10, 20, 25, 50];
    const p = pct[randInt(0, 3)];
    const ans = Math.round(a * 10 * p) / 100;
    return {
      q: `${a * 10}円の${p}%はいくら？`,
      answer: ans,
      hint: `${p}% = ${p}/100 でかんがえよう`
    };
  }
}

function gen6() {
  const r = Math.random();
  if (r < 0.33) {
    const d1 = randInt(2, 5), n1 = randInt(1, d1), d2 = randInt(2, 5), n2 = randInt(1, d2);
    const numR = n1 * n2, denR = d1 * d2;
    const g = gcd(numR, denR);
    const ans = denR / g === 1 ? `${numR / g}` : `${numR / g}/${denR / g}`;
    return {
      q: `${n1}/${d1} × ${n2}/${d2} = ?`,
      answer: ans,
      display: `<sup>${n1}</sup>/<sub>${d1}</sub> × <sup>${n2}</sup>/<sub>${d2}</sub> = ?`,
      hint: `ぶんしどうし・ぶんぼどうしをかける`,
      type: 'fraction'
    };
  } else if (r < 0.66) {
    const a = randInt(1, 5), b = randInt(1, 5);
    return {
      q: `${a} : ${b} = ? : ${b * 3}`,
      answer: a * 3,
      hint: `${b * 3} ÷ ${b} = ${3}倍になっている`
    };
  } else {
    const speeds = [40, 50, 60, 80, 100];
    const times = [1, 2, 3];
    const s = speeds[randInt(0, 4)], t = times[randInt(0, 2)];
    const choice = randInt(0, 1);
    if (choice === 0) {
      return { q: `時速${s}kmで${t}時間走ると何km？`, answer: s * t, hint: `きょり = はやさ × じかん` };
    } else {
      const d = s * t;
      return { q: `${d}kmを${t}時間で走ると時速何km？`, answer: s, hint: `はやさ = きょり ÷ じかん` };
    }
  }
}

function checkAnswer(question, userInput) {
  const userStr = userInput.trim().replace(/\s/g, '');
  if (question.type === 'fraction') {
    const correct = question.answer.replace(/\s/g, '');
    if (userStr === correct) return true;
    const [un, ud] = userStr.split('/').map(Number);
    const [cn, cd] = correct.split('/').map(Number);
    if (!isNaN(un) && !isNaN(ud) && !isNaN(cn) && !isNaN(cd)) {
      return un * cd === cn * ud;
    }
    return false;
  }
  const userNum = parseFloat(userStr);
  const correctNum = parseFloat(question.answer);
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    return Math.abs(userNum - correctNum) < 0.001;
  }
  return userStr === String(question.answer);
}
