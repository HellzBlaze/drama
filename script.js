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

    // COUNTDOWN TARGET: 30 NOV 2025 5:30 PM IST
    const countdownDate = new Date('2025-11-30T17:30:00+05:30').getTime();

    // MAIN COUNTDOWN
    const updateMainCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p style="grid-column:1/-1;font-size:2em;color:#D4A574;">The Show Has Begun!</p>';
            document.getElementById('navTimer').textContent = 'Showtime!';
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

    // NAV COUNTDOWN
    const updateNavTimer = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            document.getElementById('navTimer').textContent = 'Showtime!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('navTimer').textContent = 
            `${days}d ${hours.toString().padStart(2,'0')}h ${minutes.toString().padStart(2,'0')}m ${seconds.toString().padStart(2,'0')}s`;
    };

    // UPDATE BOTH EVERY SECOND
    setInterval(() => {
        updateMainCountdown();
        updateNavTimer();
    }, 1000);
    updateMainCountdown();
    updateNavTimer();

    // IMAGE ZOOM ON CLICK
    document.querySelectorAll('.cast-item img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.onclick = () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out;';
            const big = new Image(); big.src = img.src;
            big.style.cssText = 'max-width:90%;max-height:90%;border:15px solid #D4AF37;border-radius:50px;box-shadow:0 0 100px rgba(212,175,55,0.7);';
            overlay.appendChild(big); document.body.appendChild(overlay);
            overlay.onclick = () => overlay.remove();
        };
    });
});
