document.addEventListener('DOMContentLoaded', () => {
    // DARK MODE
    const dm = document.getElementById('darkMode');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        dm.checked = true;
    }
    dm.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', dm.checked ? 'enabled' : 'disabled');
    });

    // VIDEO SOUND
    document.querySelectorAll('video').forEach(video => {
        let unlocked = false;
        const unlock = () => { if (!unlocked) { unlocked = true; video.muted = false; video.play().catch(() => {}); }};
        document.body.addEventListener('touchstart', unlock, { once: true });
        document.body.addEventListener('click', unlock, { once: true });
    });

    // IMAGE ZOOM
    document.querySelectorAll('.cast-item img, .video-card video').forEach(el => {
        el.style.cursor = 'zoom-in';
        el.onclick = () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out;';
            const big = el.tagName === 'IMG' ? new Image() : document.createElement('video');
            if (el.tagName === 'VIDEO') { big.src = el.querySelector('source').src; big.controls = true; big.autoplay = true; }
            else { big.src = el.src; }
            big.style.cssText = 'max-width:90%;max-height:90%;border:15px solid #D4AF37;border-radius:50px;box-shadow:0 0 100px rgba(212,175,55,0.7);';
            overlay.appendChild(big); document.body.appendChild(overlay);
            overlay.onclick = () => overlay.remove();
        };
    });
});
// LIVE COUNTDOWN TO 30 NOV 2025 5:30 PM IST
const countdownDate = new Date('2025-11-30T17:30:00+05:30').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="grid-column:1/-1;font-size:2em;color:#D4A574;">The Show Has Begun!</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
};

setInterval(updateCountdown, 1000);
updateCountdown();
