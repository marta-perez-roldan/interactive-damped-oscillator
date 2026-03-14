const canvas = document.getElementById("oscillatorCanvas");
const ctx = canvas.getContext("2d");

const amplitudeInput = document.getElementById("amplitude");
const dampingInput = document.getElementById("damping");
const frequencyInput = document.getElementById("frequency");
const resetBtn = document.getElementById("resetBtn");

let time = 0;

function drawAxes() {
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(40, canvas.height / 2);
  ctx.lineTo(canvas.width - 20, canvas.height / 2);
  ctx.stroke();
}

function drawOscillation() {
  const amplitude = Number(amplitudeInput.value);
  const damping = Number(dampingInput.value);
  const frequency = Number(frequencyInput.value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#2563eb";

  for (let x = 0; x < canvas.width - 60; x++) {
    const t = x / 80;
    const y =
      amplitude *
      Math.exp(-damping * t) *
      Math.cos(frequency * t + time);

    const drawX = x + 40;
    const drawY = canvas.height / 2 - y;

    if (x === 0) {
      ctx.moveTo(drawX, drawY);
    } else {
      ctx.lineTo(drawX, drawY);
    }
  }

  ctx.stroke();
}

function animate() {
  time += 0.03;
  drawOscillation();
  requestAnimationFrame(animate);
}

function resetSimulation() {
  amplitudeInput.value = 120;
  dampingInput.value = 0.02;
  frequencyInput.value = 2;
  time = 0;
}

amplitudeInput.addEventListener("input", drawOscillation);
dampingInput.addEventListener("input", drawOscillation);
frequencyInput.addEventListener("input", drawOscillation);
resetBtn.addEventListener("click", resetSimulation);

drawOscillation();
animate();
