/* ===== 実験値（g / 1回のブレーキ）===== */
const TRWP_PER_BRAKE = {
  hard: { front: 0.014, rear: 0.018 },
  soft: { front: 0.001, rear: 0.003 }
};

/* ===== 例えの単位（1個あたりの重さ）===== */
const UNIT = {
  sesame: { name: "ごま", weight: 0.003, unit: "粒" },
  rice:   { name: "お米", weight: 0.02, unit: "粒" },
  yen:    { name: "1円玉", weight: 1.0, unit: "枚" }
};

/* ===== 信号密度（個 / km）===== */
const signalDensity = {
  urban: 6,
  residential: 3,
  suburban: 1
};

const redRatio = 0.5;

function calculate(){
  const brakeType = document.getElementById("brakeType").value;
  const stopInput = document.getElementById("stopCount").value;
  const distanceInput = document.getElementById("distance").value;
  const roadType = document.getElementById("roadType").value;
  const unitType = document.getElementById("unitType").value;

  let N;
  let note = "";

  // --- 停止回数 ---
  if(stopInput){
    N = Number(stopInput);
    note = "（入力値）";
  } else if(distanceInput){
    N = Number(distanceInput) * signalDensity[roadType] * redRatio;
    note = "（走行距離から推定）";
  } else {
    document.getElementById("resultStops").innerHTML =
      "停止回数または走行距離を入力してください。";
    return;
  }

  // --- TRWP計算 ---
  const front = TRWP_PER_BRAKE[brakeType].front;
  const rear  = TRWP_PER_BRAKE[brakeType].rear;

  const totalTRWP = N * (front + rear); // g
  const waterMin = totalTRWP * 0.02;
  const waterMax = totalTRWP * 0.05;

  // --- 例え換算 ---
  const unit = UNIT[unitType];
  const countGen = totalTRWP / unit.weight;
  const countWaterMin = waterMin / unit.weight;
  const countWaterMax = waterMax / unit.weight;

  // --- 表示 ---
  document.getElementById("resultStops").innerHTML =
    `<b>${N.toFixed(1)} 回</b> ${note}`;

  document.getElementById("resultGen").innerHTML =
    `<b>${totalTRWP.toFixed(3)} g</b>（前輪＋後輪）`;

  document.getElementById("resultWater").innerHTML =
    `<b>${waterMin.toFixed(3)} ～ ${waterMax.toFixed(3)} g</b>`;

  document.getElementById("resultUnitGen").innerHTML =
    `<b>${countGen.toFixed(1)} ${unit.unit}</b>（${unit.name}換算）`;

  document.getElementById("resultUnitWater").innerHTML =
    `<b>${countWaterMin.toFixed(1)} ～ ${countWaterMax.toFixed(1)} ${unit.unit}</b>（${unit.name}換算）`;
}




