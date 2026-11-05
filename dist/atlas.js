"use strict";

const bodies = [
  {id:"sun", name:"太陽", en:"Sun", type:"star", color:"#eac06a", dot:29, diameter:1392700, distance:0, period:null, gravity:274, title:"太陽系的能量來源",
    description:"太陽是一顆主要由氫和氦組成的恆星。核心的核融合將氫轉成氦，釋放的能量以光與熱等形式向外傳遞。",
    fact:"太陽約占太陽系總質量的 99.86%。它的重力主導行星和許多小天體的運行。"},
  {id:"mercury", name:"水星", en:"Mercury", type:"rock", color:"#999183", dot:8, diameter:4879, distance:57.9, period:88, gravity:3.7, phase:2.78, title:"離太陽最近的岩石世界",
    description:"水星表面遍布撞擊坑，外逸層極為稀薄。表面白天最高約 430 °C，夜間可降至約 −180 °C。",
    fact:"水星每公轉兩圈，自轉三圈。從一次日出到下一次日出，約相隔 176 個地球日，等於水星的兩年。"},
  {id:"venus", name:"金星", en:"Venus", type:"rock", color:"#cf9d58", dot:11, diameter:12104, distance:108.2, period:224.7, gravity:8.9, phase:4.78, title:"濃厚大氣包裹的高溫行星",
    description:"金星的直徑與地球相近，大氣卻主要由二氧化碳組成，並覆蓋硫酸雲。強烈的溫室效應讓金星成為太陽系表面最熱的行星。",
    fact:"金星逆向自轉，一次自轉約需 243 個地球日，比它繞太陽一圈還久。這裡的自轉週期以遙遠恆星為參照。"},
  {id:"earth", name:"地球", en:"Earth", type:"rock", color:"#5389b6", dot:13, diameter:12756, distance:149.6, period:365.2, gravity:9.8, phase:.19, title:"液態海洋覆蓋的家園",
    description:"地球的表面約有七成被水覆蓋，大氣主要由氮氣與氧氣組成。地球是目前已知唯一有生命的天體。",
    fact:"地球自轉軸約傾斜 23.4°。公轉過程中，南北半球接收陽光的角度和日照長度交替改變，形成相反的季節。"},
  {id:"mars", name:"火星", en:"Mars", type:"rock", color:"#c7785c", dot:10, diameter:6792, distance:228, period:687, gravity:3.7, phase:1.58, title:"氧化鐵染紅的岩石荒原",
    description:"火星的土壤富含氧化鐵，呈現典型的紅褐色。它的大氣稀薄，地表可見古河道、巨型火山與峽谷。",
    fact:"火星上的奧林帕斯山是太陽系最大的火山。今天火星仍有水冰，古老的河道與礦物也留下液態水曾經活動的線索。"},
  {id:"jupiter", name:"木星", en:"Jupiter", type:"gas", color:"#bf9376", dot:21, diameter:142984, distance:778.5, period:4331, gravity:23.1, phase:3.41, title:"太陽系最大的行星",
    description:"木星主要由氫和氦構成，外層雲帶呈現條紋。深入大氣後，壓力逐步上升，外層氣體過渡到更緻密的流體。",
    fact:"大紅斑是一場持續存在的巨大反氣旋風暴。木星自轉一圈約 10 小時，是八大行星中自轉最快的一顆。"},
  {id:"saturn", name:"土星", en:"Saturn", type:"gas", color:"#d1af7e", dot:19, diameter:120536, distance:1432, period:10747, gravity:9.0, phase:5.43, title:"擁有明亮環系的氣體巨行星",
    description:"土星主要由氫和氦組成。它的環系看起來像一整片薄盤，其實由大量各自繞土星運行的冰粒與岩質碎塊構成。",
    fact:"環內的粒子在不同軌道上以不同速度運動。土星整體的平均密度約為 0.69 g/cm³，低於液態水。"},
  {id:"uranus", name:"天王星", en:"Uranus", type:"ice", color:"#75b7bb", dot:16, diameter:51118, distance:2867, period:30589, gravity:8.7, phase:.89, title:"幾乎側躺著公轉的冰巨行星",
    description:"天王星的自轉軸傾斜約 98°，公轉時像是側躺著走。大氣中的甲烷吸收部分紅光，使它看起來偏藍綠。",
    fact:"冰巨行星的「冰」指水、氨和甲烷等成分的分類。天王星內部的高溫高壓會讓這些物質形成高密度流體。"},
  {id:"neptune", name:"海王星", en:"Neptune", type:"ice", color:"#5879b7", dot:15, diameter:49528, distance:4515, period:60190, gravity:11, phase:4.23, title:"最外側的八大行星成員",
    description:"海王星與太陽的平均距離約為日地距離的 30 倍。它是冰巨行星，外層有極快的風與會演變的風暴。",
    fact:"天文學家先從天王星軌道的偏差推算海王星可能的位置，再於 1846 年用望遠鏡觀測到它。"}
];

const types = {star:"恆星", rock:"岩質行星", gas:"氣體巨行星", ice:"冰巨行星"};
const byId = Object.fromEntries(bodies.map(body => [body.id, body]));
const planets = bodies.slice(1);
const number = new Intl.NumberFormat("zh-TW", {maximumFractionDigits:1});
const decimal = new Intl.NumberFormat("zh-TW", {maximumFractionDigits:2});
const $ = selector => document.querySelector(selector);
const format = (value, unit) => `${number.format(value)} ${unit}`;
const years = days => decimal.format(days / 365.25);
const indexOf = body => String(bodies.indexOf(body)).padStart(2,"0");
const speeds = [1, 7, 30, 90, 365.25, 1826.25];
const elapsed = $("#elapsed");
const lines = $("#orbit-lines");
const dots = $("#orbit-objects");
const detail = $("#orbit-detail");
const strip = $("#orbit-strip");
const play = $("#play");
const speed = $("#speed");
const dialog = $("#planet-dialog");
const radii = [0, 78, 115, 154, 196, 251, 308, 366, 428];
const ellipseY = .61;
let selected = byId.saturn;
let time = 0;
let lastTime = 0;
let frame = 0;

function image(body, lazy = false) {
  const file = body.id === "saturn" ? "saturn-small" : body.id;
  return `<img class="${body.id}" src="media/${file}.webp" alt="" decoding="async"${lazy ? ' loading="lazy"' : ""}>`;
}

function stats(body) {
  const fields = [
    [body.type === "star" ? "直徑（約）" : "赤道直徑", format(body.diameter,"km")],
    ["平均距日", body.distance ? `${decimal.format(body.distance / 149.6)} AU` : "—"],
    ["公轉週期", body.period ? format(body.period,"地球日") : "—"],
    [body.type === "star" ? "表面重力" : "參考重力", `${body.gravity} m/s²`]
  ];
  return `<dl class="stats">${fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>`;
}

function select(body) {
  selected = body;
  [...dots.children, ...strip.children].forEach(button => button.setAttribute("aria-pressed",String(button.dataset.id === body.id)));
  detail.innerHTML = `<div class="detail-header"><p class="eyebrow">${indexOf(body)} / ${body.en.toUpperCase()}</p><h3>${body.name}</h3><p class="eyebrow">${types[body.type]}</p>${image(body)}</div><p class="detail-copy">${body.description}</p>${stats(body)}<button class="detail-more" type="button">深入了解${body.name} ↗</button>`;
  detail.querySelector("button").addEventListener("click", () => openBody(body));
  renderOrbit();
}

function renderOrbit() {
  for (const [i, body] of bodies.entries()) {
    const angle = body.period ? body.phase + time / body.period * Math.PI * 2 : 0;
    const x = 500 + radii[i] * Math.cos(angle);
    const y = 339 - radii[i] * ellipseY * Math.sin(angle);
    dots.children[i].style.left = `${x / 10}%`;
    dots.children[i].style.top = `${y / 6.8}%`;
  }
  const label = `+${(time / 365.25).toFixed(1)} 地球年`;
  if (elapsed.textContent !== label) elapsed.textContent = label;
}

function animate(now) {
  if (lastTime) time += Math.min((now - lastTime) / 1000, .05) * speeds[Number(speed.value)];
  lastTime = now;
  renderOrbit();
  frame = requestAnimationFrame(animate);
}

function stop() {
  cancelAnimationFrame(frame);
  frame = 0;
  lastTime = 0;
  play.setAttribute("aria-label", "播放軌道動畫");
  play.firstElementChild.textContent = "▶";
}

function openBody(body) {
  const factPaths = {venus:"venus/venus-facts", neptune:"neptune/neptune-facts"};
  const url = `https://science.nasa.gov/${factPaths[body.id] ?? `${body.id}/facts`}/`;
  $("#planet-dialog-content").innerHTML = `<div class="dialog-header"><p class="eyebrow">${indexOf(body)} / ${body.en.toUpperCase()} · ${types[body.type]}</p><h3 id="planet-dialog-title">${body.name}</h3>${image(body)}</div><p class="dialog-copy"><strong>${body.title}</strong><br>${body.description}</p>${stats(body)}<p class="dialog-fact"><strong>觀測筆記</strong><br>${body.fact}</p><a href="${url}" class="dialog-link" target="_blank" rel="noopener">閱讀 NASA 天體資料 ↗</a>`;
  dialog.showModal();
}

lines.innerHTML = radii.slice(1).map(r => `<ellipse cx="500" cy="339" rx="${r}" ry="${r * ellipseY}" fill="none" stroke="#89917d" stroke-opacity=".4" vector-effect="non-scaling-stroke"/>`).join("");
dots.innerHTML = bodies.map(body => `<button class="orbit-object" type="button" aria-label="${body.name}" data-id="${body.id}" style="--planet:${body.color};--dot-size:${body.dot}px"><span class="dot" aria-hidden="true"></span><span class="orbit-label" aria-hidden="true">${body.name}</span></button>`).join("");
strip.innerHTML = bodies.map(body => `<button type="button" data-id="${body.id}" style="--planet:${body.color}"><i aria-hidden="true"></i>${body.name}</button>`).join("");
for (const list of [dots, strip]) {
  list.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (button) select(byId[button.dataset.id]);
  });
}
play.addEventListener("click", () => {
  if (frame) {
    stop();
  } else {
    play.setAttribute("aria-label", "暫停軌道動畫");
    play.firstElementChild.textContent = "Ⅱ";
    frame = requestAnimationFrame(animate);
  }
});
speed.addEventListener("input", () => {
  const value = speeds[Number(speed.value)];
  const label = value < 365.25 ? `${value} 天／秒` : `${value / 365.25} 地球年／秒`;
  $("#speed-out").value = label;
  speed.setAttribute("aria-valuetext",label);
});
$("#lines").addEventListener("change", event => { lines.style.opacity = event.target.checked ? "1" : "0"; });
$("#reset").addEventListener("click", () => {
  stop();
  time = 0;
  renderOrbit();
});
document.addEventListener("visibilitychange", () => { if (document.hidden) lastTime = 0; });
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
speed.dispatchEvent(new Event("input"));
select(selected);

function mark(group, active) {
  for (const button of group.querySelectorAll("button")) button.setAttribute("aria-pressed", String(button === active));
}

const grid = $("#planet-grid");
function renderAtlas(filter) {
  grid.innerHTML = planets.filter(body => filter === "all" || body.type === filter).map(body => `<button class="planet-card" data-id="${body.id}" type="button" aria-label="閱讀${body.name}資料"><span class="card-image"><span class="card-index">${indexOf(body)} / ${body.en.toUpperCase()}</span>${image(body,true)}</span><span class="card-copy"><span class="card-heading"><span><strong>${body.name}</strong><small>${types[body.type]}</small></span><span class="card-arrow" aria-hidden="true">↗</span></span><span class="caption">${body.title}</span></span></button>`).join("");
}
$("#filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  mark(event.currentTarget, button);
  renderAtlas(button.dataset.filter);
});
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (button) openBody(byId[button.dataset.id]);
});
renderAtlas("all");

const metrics = {
  diameter:{title:"赤道直徑", value:body => format(body.diameter,"km"), note:"以公里呈現行星赤道直徑。"},
  distance:{title:"距太陽的平均距離", value:body => `${decimal.format(body.distance / 149.6)} AU`, note:"1 天文單位（AU）約為 1.496 億公里，相當於平均日地距離。這裡以軌道半長軸表示平均距離。"},
  period:{title:"公轉週期", value:body => `約 ${years(body.period)} 年`, note:"以地球年呈現，按 365.25 天換算。公轉週期代表相對遠方恆星繞太陽一圈的時間。"}
};
function compare(key) {
  const metric = metrics[key];
  const max = Math.max(...planets.map(body => body[key]));
  $("#compare-metric").textContent = metric.title;
  $("#bars").innerHTML = planets.map(body => `<div class="bar-row"><span>${body.name}</span><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${100 * body[key] / max}%;--planet:${body.color}"></span></span><span class="bar-value">${metric.value(body)}</span></div>`).join("");
  $("#metric-note").textContent = metric.note;
}
$("#metrics").addEventListener("click", event => {
  const button = event.target.closest("[data-metric]");
  if (!button) return;
  mark(event.currentTarget, button);
  compare(button.dataset.metric);
});
compare("diameter");

$("#quiz").addEventListener("click", event => {
  const button = event.target.closest("[data-answer]");
  if (!button) return;
  mark(button.parentElement, button);
  const answer = byId[button.dataset.answer];
  $("#quiz-result").textContent = answer.id === "mercury"
    ? "答對了！水星繞太陽一圈只要約 88 個地球日。"
    : `${answer.name}的一年約有 ${number.format(answer.period)} 個地球日。試試更靠近太陽的一顆。`;
});
