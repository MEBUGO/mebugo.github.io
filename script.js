// Yağmur efekti oluştur
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const raindropCount = 40;
    
    while (rainContainer.firstChild) {
        rainContainer.removeChild(rainContainer.firstChild);
    }
    
    for (let i = 0; i < raindropCount; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        const posX = Math.random() * 100;
        const size = Math.random() * 1.5 + 1.5;
        const speed = Math.random() * 2 + 5;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.3 + 0.3;
        
        raindrop.style.left = `${posX}%`;
        raindrop.style.top = `${-10}%`;
        raindrop.style.width = `${size}px`;
        raindrop.style.height = `${size * 12}px`;
        raindrop.style.opacity = opacity;
        raindrop.style.animationDuration = `${speed}s`;
        raindrop.style.animationDelay = `${delay}s`;
        
        rainContainer.appendChild(raindrop);
    }
}

// Yıldız efekti oluştur
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 70;
    
    while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 4 + 2;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Müzik sistemi
let currentAudio = null;
let isPlaying = false;
const soundIcon = document.querySelector('.sound-icon');
const bars = document.querySelector('.bars');
const dots = document.querySelector('.dots');
const currentTrack = document.getElementById('currentTrack');
let musicFiles = [];

// Müzik listesini JSON'dan yükle
async function loadMusicList() {
    try {
        const response = await fetch('music-list.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        musicFiles = await response.json();
        console.log('Müzik listesi yüklendi:', musicFiles);
    } catch (error) {
        console.error('Müzik listesi yüklenemedi:', error);
        // Hata durumunda sabit bir liste kullan
        musicFiles = [
            "Aimer - After Rain.opus",
            "Aimyon - Her Blue Sky.opus",
            "Akano - Ghost In A Flower (From 'A Whisker Away').opus"
        ];
    }
}

// Rastgele müzik çal
async function playRandomMusic() {
    // Müzik listesi boşsa yükle
    if (musicFiles.length === 0) {
        await loadMusicList();
    }
    
    // Hala müzik dosyası yoksa
    if (musicFiles.length === 0) {
        currentTrack.textContent = "Müzik dosyası bulunamadı";
        return;
    }
    
    // Önceki müziği durdur
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Rastgele bir müzik seç
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const selectedFile = musicFiles[randomIndex];
    
    // Dosya adını uzantısız olarak al
    const fileName = selectedFile.replace('.opus', '');
    
    // Audio elementini oluştur
    currentAudio = new Audio(`audios/${selectedFile}`);
    currentAudio.loop = true;
    
    // Müzik bilgisini güncelle
    currentTrack.textContent = fileName;
    
    // Müziği oynat
    currentAudio.play()
        .then(() => {
            isPlaying = true;
            updateSoundIcon();
        })
        .catch(e => {
            console.log("Müzik oynatma hatası:", e);
            isPlaying = false;
            updateSoundIcon();
            currentTrack.textContent = "Ses çalınamıyor";
        });
    
    // Müzik bitince yeni müzik çal
    currentAudio.onended = () => playRandomMusic();
}

// Ses ikonunu güncelle
function updateSoundIcon() {
    if (isPlaying) {
        bars.style.display = 'flex';
        dots.style.display = 'none';
    } else {
        bars.style.display = 'none';
        dots.style.display = 'flex';
    }
}

// Ses kontrolüne tıklama
function setupSoundControl() {
    soundIcon.addEventListener('click', () => {
        if (currentAudio) {
            if (isPlaying) {
                currentAudio.pause();
            } else {
                currentAudio.play().catch(e => {
                    console.log("Müzik başlatma hatası:", e);
                });
            }
            isPlaying = !isPlaying;
            updateSoundIcon();
        }
    });
}

// Sayfa yüklendiğinde efektleri ve müziği başlat
window.addEventListener('load', async () => {
    // Önce müzik listesini yükle
    await loadMusicList();
    
    createRain();
    createStars();
    
    // Her 20 saniyede bir yağmuru yenile
    setInterval(createRain, 20000);
    
    // GitHub profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
    
    // Müzik çalmayı başlat
    await playRandomMusic();
    setupSoundControl();
});

// Pencere boyutu değiştiğinde efektleri yeniden oluştur
window.addEventListener('resize', () => {
    createRain();
    createStars();
});
