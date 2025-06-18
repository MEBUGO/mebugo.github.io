// Yağmur efekti oluştur
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const raindropCount = 120;
    
    for (let i = 0; i < raindropCount; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Rastgele pozisyon
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Boyut ve animasyon ayarları
        const size = Math.random() * 2 + 2;
        const speed = Math.random() * 3 + 4;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.4 + 0.4;
        
        raindrop.style.left = `${posX}%`;
        raindrop.style.top = `${-posY}%`;
        raindrop.style.width = `${size}px`;
        raindrop.style.height = `${size * 15}px`;
        raindrop.style.opacity = opacity;
        raindrop.style.animationDuration = `${speed}s`;
        raindrop.style.animationDelay = `${delay}s`;
        
        // Mor tonlarda yağmur damlaları
        raindrop.style.background = `linear-gradient(to bottom, rgba(180, 120, 255, 0.8), rgba(140, 80, 220, 0.4))`;
        
        rainContainer.appendChild(raindrop);
        
        // Sıçrama efekti oluştur
        setTimeout(() => {
            if (document.body.contains(raindrop)) {
                const splash = document.createElement('div');
                splash.classList.add('splash');
                splash.style.left = raindrop.style.left;
                splash.style.top = `calc(100vh - 10px)`;
                splash.style.width = `${size * 3}px`;
                splash.style.height = `${size}px`;
                splash.style.background = `rgba(180, 120, 255, 0.6)`;
                rainContainer.appendChild(splash);
                
                // Sıçrama efektini kaldır
                setTimeout(() => {
                    if (document.body.contains(splash)) {
                        splash.remove();
                    }
                }, 500);
            }
        }, (speed - delay) * 1000);
    }
}

// Yıldız efekti oluştur
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Rastgele pozisyon
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Rastgele boyut
        const size = Math.random() * 2 + 1;
        
        // Rastgele parıltı süresi
        const duration = Math.random() * 5 + 3;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Sayfa yüklendiğinde efektleri oluştur
window.addEventListener('load', () => {
    createRain();
    createStars();
    
    // Her 10 saniyede bir yağmuru yenile
    setInterval(createRain, 10000);
    
    // GitHub profil resmini güncelle
    document.getElementById('profileImage').src = `https://github.com/MEBUGO.png?t=${new Date().getTime()}`;
});
