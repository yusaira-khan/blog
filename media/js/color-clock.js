var body = document.getElementById("body").style;
var color = document.getElementById("colorSection").style;
var clock = document.getElementById("clockDiv").style;
var modeOptions = ["rgb", "bgr", "gbr", "rbg", "brg", "grb"];
var modeIndex = 0;
var mode = modeOptions[modeIndex];

function changeMode() {
  modeIndex++;
  modeIndex = modeIndex % modeOptions.length;
  mode = modeOptions[modeIndex];
}
var timer;

function changeColor(colorString) {
  body["background-color"] = colorString;
  var texts = document.getElementsByClassName("stacked-icon-inner");
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.color = colorString;
  }
}

function addShadow() {
  body["text-shadow"] =
    "-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444";
}

function removeShadow() {
  body["text-shadow"] = "";
}

function convertToRGB(h, m, s, mode) {
  var colorDict = {};
  colorDict[mode[0]] = h;
  colorDict[mode[1]] = m;
  colorDict[mode[2]] = s;

  return (
    "rgb(" + colorDict["r"] + "," + colorDict["g"] + "," + colorDict["b"] + ")"
  );
}

function getColorFromTime(d, mode) {
  var hourCoeff = 256.0 / 24;
  var minuteCoeff = 256.0 / 60;
  var secondCoeff = minuteCoeff;
  var hourColor = d.getHours() * hourCoeff;
  hourColor = hourColor.toFixed();
  var minuteColor = d.getMinutes() * minuteCoeff;
  minuteColor = minuteColor.toFixed();
  var secondColor = d.getSeconds() * secondCoeff;
  secondColor = secondColor.toFixed();
  return convertToRGB(hourColor, minuteColor, secondColor, mode);
}

function getTime(d, mode) {
  var displayText =
    mode +
    "(" +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds() +
    ")";
  return displayText;
}

function displayClock() {
  var d = new Date();
  var color = getColorFromTime(d, mode);
  changeColor(color);
  var displayText = getTime(d, mode);
  document.getElementById("clock").textContent =
    "Current color is:" + displayText;
}

function removeClock() {
  clearInterval(timer);
  changeColor("rgb(17,119,70)");
  removeShadow();
  clock.display = "none";
  color.display = "inline-block";
}

function startClock() {
  timer = setInterval(displayClock);
  clock.display = "inline-block";
  color.display = "none";
  addShadow();
}
document.getElementById("colorSection").onclick = startClock;
document.getElementById("closeButton").onclick = removeClock;
document.getElementById("clock").onclick = changeMode;
