// Müzik sistemi
const musicFiles = [
    {
        file: "Cigarettes After Sex - Cry.mp3",
        name: "Cigarettes After Sex - Cry"
    },
{
    file: "Izzamuzzic, Julien Marchal - Shootout.mp3",
    name: "Izzamuzzic, Julien Marchal - Shootout"
},
{
    file: "aekasora - one day in japan.mp3",
    name: "aekasora - one day in japan"
},
{
    file: "aekasora - rainy day.mp3",
    name: "aekasora - rainy day"
},
{
    file: "bôa - Duvet.mp3",
    name: "bôa - Duvet"
}
];

let currentAudio = null;
let isPlaying = false;
const soundIcon = document.querySelector('.sound-icon');
const bars = document.querySelector('.bars');
const dots = document.querySelector('.dots');
const currentTrack = document.getElementById('currentTrack');
const modal = document.getElementById('musicModal');

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

// Rastgele müzik seç
function selectRandomTrack() {
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    return musicFiles[randomIndex];
}

// Rastgele müzik çal
function playRandomMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    const selectedTrack = selectRandomTrack();
    
    // Audio elementini oluştur
    currentAudio = new Audio(`audios/${selectedTrack.file}`);
    currentAudio.loop = true;
    
    // Müzik bilgisini güncelle
    currentTrack.textContent = selectedTrack.name;

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

// Sayfa yüklendiğinde
window.addEventListener('load', async () => {
    createStars();
    
    // GitHub profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
    
    // Modalı göster
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Ses kontrolünü ayarla
    setupSoundControl();
});

// Modal olayları
document.getElementById('musicOn').addEventListener('click', function() {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = "none", 400);
    playRandomMusic();
});

document.getElementById('musicOff').addEventListener('click', function() {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = "none", 400);
    
    // Müziği durdur
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Ses ikonunu muted yap
    isPlaying = false;
    updateSoundIcon();
});

// Pencere boyutu değiştiğinde efektleri yeniden oluştur
window.addEventListener('resize', () => {
    createStars();
});
