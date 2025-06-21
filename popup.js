function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return \`\${hrs}h \${mins}m \${secs}s\`;
}

chrome.storage.local.get(null, (data) => {
  const report = document.getElementById('report');
  for (let site in data) {
    const li = document.createElement('li');
    li.textContent = \`\${site}: \${formatTime(data[site])}\`;
    report.appendChild(li);
  }
});