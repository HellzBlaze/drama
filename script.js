document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode
    const dm = document.getElementById('darkMode');
    if (localStorage.getItem('darkMode') === 'enabled') { 
        document.body.classList.add('dark'); 
        if(dm) dm.checked = true; 
    }
    if(dm) {
        dm.addEventListener('change', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('darkMode', dm.checked ? 'enabled' : 'disabled');
        });
    }

    // 2. Countdown
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const countdownDate = new Date('2025-11-30T17:00:00+05:30').getTime();
        const updateCountdown = () => {
            const distance = countdownDate - new Date().getTime();
            if (distance < 0) {
                countdownEl.innerHTML = '<p style="grid-column:1/-1;font-size:2.5em;color:#D4A574;">The Show Has Begun!</p>';
                return;
            }
            const days = Math.floor(distance / (1000*60*60*24));
            const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
            const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((distance % (1000*60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2,'0');
            document.getElementById('hours').textContent = hours.toString().padStart(2,'0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2,'0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2,'0');
        };
        setInterval(updateCountdown, 1000); 
        updateCountdown();
    }

    // 3. Image Zoom
    const imagesToZoom = document.querySelectorAll('.cast-item img, .zoomable');
    imagesToZoom.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.title = "Click to View Full Size";
        img.onclick = (e) => {
            e.preventDefault();
            const overlay = document.createElement('div');
            overlay.style.cssText = `position:fixed; inset:0; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:center; z-index:99999; cursor:zoom-out; opacity:0; transition:opacity 0.3s;`;
            const big = new Image(); big.src = img.src;
            big.style.cssText = `max-width:95%; max-height:95%; border:10px solid #D4AF37; border-radius:20px; box-shadow:0 0 50px rgba(212,175,55,0.5); transform:scale(0.9); transition:transform 0.3s;`;
            overlay.appendChild(big); document.body.appendChild(overlay);
            requestAnimationFrame(() => { overlay.style.opacity = '1'; big.style.transform = 'scale(1)'; });
            overlay.onclick = () => { overlay.style.opacity = '0'; big.style.transform = 'scale(0.9)'; setTimeout(() => overlay.remove(), 300); };
        };
    });
});

// 4. UPDATED FULLSCREEN LOGIC (Works for YouTube Wrappers)
function toggleFullScreen(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { /* Safari */
        el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE11 */
        el.msRequestFullscreen();
    }
}
