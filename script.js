// Farklı mor tonları
const purpleShades = [
    '#b478ff', // Açık mor
    '#8a2be2', // Orta mor
    '#5a0a8a', // Koyu mor
    '#d9b3ff', // Açık pembe-mor
    '#ff6ec7', // Pembe
    '#b03060'  // Bordo
];

// Kayan yıldız efekti oluştur
function createShootingStars() {
    const container = document.getElementById('shootingStarsContainer');
    const starCount = 75; // %25 daha az yıldız
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Rastgele uzunluk
        const length = Math.random() * 100 + 50;
        
        // Rastgele renk (mor tonlarından)
        const colorIndex = Math.floor(Math.random() * purpleShades.length);
        const color = purpleShades[colorIndex];
        
        // Rastgele hız ve gecikme
        const duration = Math.random() * 8 + 4; // 4-12 saniye
        const delay = Math.random() * 15;
        
        // Rastgele başlangıç pozisyonu (daha geniş alana yayılmış)
        const startX = Math.random() * 100;
        const startY = Math.random() * 30;
        
        star.style.width = `${length}px`;
        star.style.background = `linear-gradient(to right, ${color}, transparent)`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        
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
            
            // Müziği devam ettir
            if (currentAudio) {
                currentAudio.play();
            }
        } else {
            this.classList.remove('playing');
            this.classList.add('muted');
            this.querySelector('.bars').style.display = 'none';
            this.querySelector('.dots').style.display = 'flex';
            
            // Müziği duraklat
            if (currentAudio) {
                currentAudio.pause();
            }
        }
    });
}

// Müzik sistemi
const musicFiles = [
    { name: "Brown Dust 2 OST", file: "browndust2ost.opus" },
    { name: "Ender Lilies Harmony", file: "enderliliesharmony.opus" },
    { name: "Ender Lilies Lily", file: "enderliliesLily.opus" },
    { name: "Symphony of Destiny", file: "taktopsymphonybgmofdestiny.opus" }
];

let currentAudio = null;
const musicInfo = document.getElementById('musicInfo');
const currentTrackInfo = document.getElementById('currentTrackInfo');
const currentTrack = document.getElementById('currentTrack');
const modal = document.getElementById('musicModal');
let musicEnabled = false;

// Rastgele müzik seç ve oynat
function playRandomMusic() {
    if (!musicEnabled) return;
    
    // Önceki müziği durdur
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Rastgele bir müzik seç
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const selectedMusic = musicFiles[randomIndex];
    
    // Audio elementini oluştur
    currentAudio = new Audio(`audios/${selectedMusic.file}`);
    currentAudio.loop = true;
    
    // Müzik bilgisini güncelle
    currentTrackInfo.textContent = selectedMusic.name;
    currentTrack.textContent = selectedMusic.name;
    
    // Müzik bilgisini göster
    musicInfo.classList.add('show');
    
    // Müziği oynat
    currentAudio.play().catch(e => {
        console.log("Müzik oynatma hatası:", e);
    });
    
    // Müzik bilgisini 6 saniye sonra gizle
    setTimeout(() => {
        musicInfo.classList.remove('show');
    }, 6000);
}

// Modal olay yöneticileri
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
    
    // Müziği durdur
    if (currentAudio) {
        currentAudio.pause();
    }
    
    // Ses ikonunu muted yap
    const soundIcon = document.getElementById('soundIcon');
    soundIcon.classList.remove('playing');
    soundIcon.classList.add('muted');
    soundIcon.querySelector('.bars').style.display = 'none';
    soundIcon.querySelector('.dots').style.display = 'flex';
});

// Müzik bitince yeni müzik oynat
function setupMusicEndListener() {
    if (currentAudio) {
        currentAudio.onended = function() {
            playRandomMusic();
        };
    }
}

// M tuşuyla müzik bilgisini göster/gizle
document.addEventListener('keydown', function(e) {
    if (e.key === 'm' || e.key === 'M') {
        musicInfo.classList.toggle('show');
    }
});

// Sayfa yüklendiğinde efektleri oluştur ve müzik modalını göster
window.addEventListener('load', () => {
    createShootingStars();
    setupMouseLight();
    setupSoundControl();
    
    // GitHub profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
    
    // Yıldızları periyodik olarak yenile
    setInterval(createShootingStars, 10000);
    
    // Müzik modalını göster
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add('show'), 100);
});
