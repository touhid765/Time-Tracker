let timerDiv = document.createElement('div');
timerDiv.style.position = 'fixed';
timerDiv.style.bottom = '10px';
timerDiv.style.right = '10px';
timerDiv.style.backgroundColor = '#333';
timerDiv.style.color = '#fff';
timerDiv.style.padding = '8px 12px';
timerDiv.style.borderRadius = '5px';
timerDiv.style.fontFamily = 'Arial, sans-serif';
timerDiv.style.zIndex = 10000;
timerDiv.textContent = 'Time: 0s';
document.body.appendChild(timerDiv);

let timeSpent = 0;
let interval = setInterval(() => {
  timeSpent++;
  let hours = Math.floor(timeSpent / 3600);
  let minutes = Math.floor((timeSpent % 3600) / 60);
  let seconds = timeSpent % 60;
  timerDiv.textContent = `Time: ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

window.addEventListener('beforeunload', () => {
  clearInterval(interval);
});