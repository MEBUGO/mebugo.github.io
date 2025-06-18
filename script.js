// Yağmur efekti oluştur (optimize edilmiş)
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const raindropCount = 40; // Performans için azaltılmış
    
    // Önceki yağmur damlalarını temizle
    while (rainContainer.firstChild) {
        rainContainer.removeChild(rainContainer.firstChild);
    }
    
    for (let i = 0; i < raindropCount; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Rastgele pozisyon
        const posX = Math.random() * 100;
        
        // Boyut ve animasyon ayarları
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

// Yıldız efekti oluştur (optimize edilmiş)
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 70; // Performans için azaltılmış
    
    // Önceki yıldızları temizle
    while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Rastgele pozisyon
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Rastgele boyut
        const size = Math.random() * 1.5 + 0.5;
        
        // Rastgele parıltı süresi
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

// Rastgele müzik çal
function playRandomMusic() {
    // Önceki müziği durdur
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Müzik dosyaları listesi (sizin listeye göre güncellendi)
    const opusFiles = [
        "Aimer - After Rain.opus",
        "Aimyon - Her Blue Sky.opus",
        "Akano - Ghost In A Flower (From 'A Whisker Away').opus",
        "Akano - Harumodoki (From 'OreGairu- My Youth Romantic Comedy Is Wrong, As I Expected').opus",
        "Akano, Broken - Grand Escape (From 'Weathering With You').opus",
        "Celeina Ann - Love & Sweet.opus",
        "Hoshimachi Suisei - NEXT COLOR PLANET.opus",
        "Leo Ieiri - Hello.opus",
        "Maaya Sakamoto - プラチナ.opus",
        "kobasolo, Harutya - Natsurenbo.opus",
        "yanaginagi - here and there.opus",
        "yanaginagi - ユキトキ.opus",
        "yanaginagi - 春擬き.opus",
        "yanaginagi - 芽ぐみの雨.opus",
        "ヨルシカ - 花に亡霊.opus",
        "ヨルシカ - 雲と幽霊.opus"
    ];
    
    // Rastgele bir müzik seç
    const randomIndex = Math.floor(Math.random() * opusFiles.length);
    const selectedFile = opusFiles[randomIndex];
    
    // Dosya adını uzantısız olarak al
    const fileName = selectedFile.replace('.opus', '');
    
    // Audio elementini oluştur
    currentAudio = new Audio(`audios/${selectedFile}`);
    currentAudio.loop = true;
    
    // Müzik bilgisini güncelle (sadece dosya adı)
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
window.addEventListener('load', () => {
    createRain();
    createStars();
    
    // Her 20 saniyede bir yağmuru yenile
    setInterval(createRain, 20000);
    
    // GitHub profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
    
    // Müzik çalmayı başlat
    playRandomMusic();
    setupSoundControl();
});

// Pencere boyutu değiştiğinde efektleri yeniden oluştur
window.addEventListener('resize', () => {
    createRain();
    createStars();
});
