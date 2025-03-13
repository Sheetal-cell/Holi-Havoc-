const backgroundSelect = document.getElementById('backgroundSelect');
const uploadPhoto = document.getElementById('uploadPhoto');
const ecard = document.getElementById('ecard');
const addSplashBtn = document.getElementById('addSplash');
const downloadBtn = document.getElementById('downloadBtn');

// Background select handler
backgroundSelect.addEventListener('change', () => {
  const selected = backgroundSelect.value;
  ecard.className = `ecard ${selected}`;
  ecard.style.backgroundImage = ''; // Remove uploaded photo
});

// Photo upload handler
uploadPhoto.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    ecard.className = 'ecard';
    ecard.style.backgroundImage = `url(${event.target.result})`;
  };
  reader.readAsDataURL(file);
});

// Add splash click
addSplashBtn.addEventListener('click', () => {
  createSplash();
});

// Create a splash at random position
function createSplash() {
  const splash = document.createElement('div');
  splash.classList.add('splash');

  const x = Math.random() * (ecard.clientWidth - 50);
  const y = Math.random() * (ecard.clientHeight - 50);

  splash.style.left = `${x}px`;
  splash.style.top = `${y}px`;

  const colors = ['#ff4081', '#ff9800', '#4caf50', '#2196f3', '#e91e63'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  splash.style.background = `radial-gradient(circle, ${color} 30%, transparent 70%)`;

  ecard.appendChild(splash);
}

// Create falling splashes (continuous)
function createFallingSplash() {
  const splash = document.createElement('div');
  splash.classList.add('fallingSplash');

  const x = Math.random() * (ecard.clientWidth - 40);
  splash.style.left = `${x}px`;

  const colors = ['#ff4081', '#ff9800', '#4caf50', '#2196f3', '#e91e63'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  splash.style.background = `radial-gradient(circle, ${color} 30%, transparent 70%)`;

  // Randomize fall speed
  const duration = Math.random() * 3 + 2; // between 2s and 5s
  splash.style.animationDuration = `${duration}s`;

  ecard.appendChild(splash);

  // Remove after animation
  setTimeout(() => {
    ecard.removeChild(splash);
  }, duration * 1000);
}

// Start falling splashes interval
setInterval(() => {
  createFallingSplash();
}, 700); // Create splash every 700ms

// Download the ecard
downloadBtn.addEventListener('click', () => {
  html2canvas(ecard).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'holi-ecard.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
