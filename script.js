// Farklı mor tonları
const purpleShades = [
    '#b478ff',
    '#8a2be2',
    '#5a0a8a',
    '#d9b3ff',
    '#ff6ec7',
    '#b03060'
];

// Kayan yıldız efekti
function createShootingStars() {
    const container = document.getElementById('shootingStarsContainer');
    const starCount = 75;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        const length = Math.random() * 200 + 150;
        const colorIndex = Math.floor(Math.random() * purpleShades.length);
        const color = purpleShades[colorIndex];
        const duration = Math.random() * 8 + 4;
        const delay = Math.random() * 15;
        const startX = Math.random() * 100;
        const startY = Math.random() * 30;
        
        star.style.width = `${length}px`;
        star.style.background = `linear-gradient(to right, ${color} 0%, ${color} 30%, transparent 100%)`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        
        star.addEventListener('animationend', function() {
            star.remove();
        });
        
        container.appendChild(star);
    }
}

// Mouse ışık efekti
function setupMouseLight() {
    const mouseLight = document.getElementById('mouseLight');
    
    document.addEventListener('mousemove', (e) => {
        mouseLight.style.display = 'block';
        mouseLight.style.left = `${e.clientX}px`;
        mouseLight.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mouseout', () => {
        mouseLight.style.display = 'none';
    });
}

// Ses ikonu kontrolü
function setupSoundControl() {
    const soundIcon = document.getElementById('soundIcon');
    let isPlaying = true;
    
    soundIcon.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            this.classList.remove('muted');
            this.classList.add('playing');
            this.querySelector('.bars').style.display = 'flex';
            this.querySelector('.dots').style.display = 'none';
            
            if (currentAudio) {
                currentAudio.play();
            }
        } else {
            this.classList.remove('playing');
            this.classList.add('muted');
            this.querySelector('.bars').style.display = 'none';
            this.querySelector('.dots').style.display = 'flex';
            
            if (currentAudio) {
                currentAudio.pause();
            }
        }
    });
}

// Müzik sistemi
const musicFiles = [
    { name: "Brown Dust 2 - Main Theme OST", file: "browndust2ost.opus" },
    { name: "Ender Lilies - Harmony", file: "enderliliesharmony.opus" },
    { name: "Ender Lilies - Lily", file: "enderliliesLily.opus" },
    { name: "Symphony No.5 in c minor Op.67 'Destiny(Unmei) Cosette...'", file: "taktopsymphonybgmofdestiny.opus" }
];

let currentAudio = null;
const musicInfo = document.getElementById('musicInfo');
const currentTrackInfo = document.getElementById('currentTrackInfo');
const currentTrack = document.getElementById('currentTrack');
const modal = document.getElementById('musicModal');
let musicEnabled = false;

// Rastgele müzik çal
function playRandomMusic() {
    if (!musicEnabled) return;
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const selectedMusic = musicFiles[randomIndex];
    
    currentAudio = new Audio(`audios/${selectedMusic.file}`);
    currentAudio.loop = true;
    
    currentTrackInfo.textContent = selectedMusic.name;
    currentTrack.textContent = selectedMusic.name;
    
    musicInfo.classList.add('show');
    
    currentAudio.play().catch(e => {
        console.log("Müzik oynatma hatası:", e);
    });
    
    setTimeout(() => {
        musicInfo.classList.remove('show');
    }, 6000);
}

// Modal olayları
document.getElementById('musicOn').addEventListener('click', function() {
    musicEnabled = true;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = "none", 400);
    playRandomMusic();
});

document.getElementById('musicOff').addEventListener('click', function() {
    musicEnabled = false;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = "none", 400);
    
    if (currentAudio) {
        currentAudio.pause();
    }
    
    const soundIcon = document.getElementById('soundIcon');
    soundIcon.classList.remove('playing');
    soundIcon.classList.add('muted');
    soundIcon.querySelector('.bars').style.display = 'none';
    soundIcon.querySelector('.dots').style.display = 'flex';
});

// Müzik bitiş dinleyicisi
function setupMusicEndListener() {
    if (currentAudio) {
        currentAudio.onended = function() {
            playRandomMusic();
        };
    }
}

// M tuşu ile müzik bilgisi
document.addEventListener('keydown', function(e) {
    if (e.key === 'm' || e.key === 'M') {
        musicInfo.classList.toggle('show');
    }
});

// Sayfa yükleme
window.addEventListener('load', () => {
    createShootingStars();
    setupMouseLight();
    setupSoundControl();
    
    // Profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
    
    // Yıldızları yenile
    setInterval(createShootingStars, 10000);
    
    // Modalı göster
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add('show'), 100);
});
