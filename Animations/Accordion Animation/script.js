var div = document.querySelector("div");
var buttons = {};
const newDim = "1.2vmin";
const numBlackKeys = 14;
const numWhiteKeys = 20;
var intervals = [];
var running = true;
var isKeyframesSupported;

setTimeout(function () {
  isKeyframesSupported =
    getComputedStyle(document.body)
      .getPropertyValue("--test-value")
      .indexOf("1") > -1;
  if (isKeyframesSupported) {
    document.documentElement.classList.add("supports-variables-in-keyframes");
  } else {
    startIntervals();
    pressKeys();
  }

  document.getElementById("pauser").addEventListener("click", function (e) {
    if (e.currentTarget.checked) {
      div.style.setProperty("--squeeze-state", "running");
      running = true;
      if (!isKeyframesSupported) {
        requestAnimationFrame(pressKeys);
        startIntervals();
      }
    } else {
      div.style.setProperty("--squeeze-state", "paused");
      running = false;
      intervals.forEach(function (interval) {
        clearInterval(interval);
      });
    }
  });
}, 500);

function startIntervals() {
  intervals[0] = setInterval(() => {
    pressButton(1);
  }, 900);
  intervals[1] = setInterval(() => {
    pressButton(4);
  }, 1200);
  intervals[2] = setInterval(() => {
    pressButton(7);
  }, 1600);
  intervals[3] = setInterval(() => {
    pressButton(8);
  }, 1700);
}

function pressButton(index) {
  requestAnimationFrame(function () {
    var enabled = !!buttons[index];
    div.style.setProperty(
      "--button" + index + "-dim",
      enabled ? newDim : "var(--button-dim)"
    );
    div.style.setProperty(
      "--button" + index + "-color",
      enabled ? "var(--color1alt)" : "var(--color1)"
    );
    buttons[index] = !enabled;
  });
}

function pressKeys() {
  var now = Date.now();
  var blackKey = Math.ceil((now % 2800) / 200);
  var whiteKey = Math.ceil(((now + 200) % 3000) / 150);
  div.style.setProperty("--black" + blackKey, "var(--color2alt)");
  div.style.setProperty(
    "--black" + (blackKey - 1 || numBlackKeys),
    "var(--black)"
  );
  div.style.setProperty("--white" + whiteKey, "var(--color1alta)");
  div.style.setProperty(
    "--white" + (whiteKey - 1 || numWhiteKeys),
    "var(--white)"
  );

  if (running) {
    requestAnimationFrame(pressKeys);
  }
}