document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PRELOADER FAILSAFE & AOS ANIMATION INITIALIZATION
       ========================================================================== */
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1500);

    /* ==========================================================================
       2. NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    /* ==========================================================================
       3. TYPEWRITER EFFECT (KKN PARSAORAN URAT & 21ST BIRTHDAY)
       ========================================================================== */
    const typewriter = document.getElementById('typewriterText');
    const quotes = [
        '"Happy 21st Birthday Imelina Priskila! 🎉"',
        '"Dari KKN Desa Parsaoran Urat hingga Selamanya 🏔️"',
        '"Sahabat Sejati: Imelina, Rivan, Cristine, & Daniel 💜"',
        '"Terima kasih atas setiap cerita indah yang kita ukir bersama..."'
    ];
    let qIdx = 0, cIdx = 0, isDeleting = false;

    function type() {
        if (!typewriter) return;
        const current = quotes[qIdx];
        typewriter.textContent = isDeleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
        cIdx += isDeleting ? -1 : 1;

        let speed = isDeleting ? 35 : 75;
        if (!isDeleting && cIdx === current.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && cIdx === 0) {
            isDeleting = false;
            qIdx = (qIdx + 1) % quotes.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    type();

    /* ==========================================================================
       4. MUSIC PLAYER ENGINE ("MONOKROM - TULUS")
       ========================================================================== */
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const bgMusic = document.getElementById('bgMusic');
    const equalizer = document.getElementById('equalizer');
    const discIcon = document.getElementById('discIcon');
    let isPlaying = false;

    if (bgMusic) {
        bgMusic.load();
    }

    const playMusicFirstTouch = () => {
        if (bgMusic && bgMusic.paused && !isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicIcon) musicIcon.className = 'fas fa-pause';
                if (equalizer) equalizer.classList.remove('paused');
                if (discIcon) discIcon.classList.add('spinning');
                showToast("🎵 Monokrom - Tulus (Soundtrack KKN)");
            }).catch((err) => {
                console.log("Autoplay blocked by browser. Click play manually:", err);
            });
        }
    };

    window.addEventListener('click', playMusicFirstTouch, { once: true });
    window.addEventListener('touchstart', playMusicFirstTouch, { once: true });

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (isPlaying) {
                bgMusic.pause();
                if (musicIcon) musicIcon.className = 'fas fa-play';
                if (equalizer) equalizer.classList.add('paused');
                if (discIcon) discIcon.classList.remove('spinning');
                showToast("Musik Dihentikan");
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    if (musicIcon) musicIcon.className = 'fas fa-pause';
                    if (equalizer) equalizer.classList.remove('paused');
                    if (discIcon) discIcon.classList.add('spinning');
                    showToast("🎵 Monokrom - Tulus");
                    isPlaying = true;
                }).catch(() => {
                    alert("Gagal memutar musik! Pastikan file 'monokrom.mp3' berada di folder utama proyek (sejajar dengan index.html).");
                });
            }
        });
    }

    /* ==========================================================================
       5. THEME TOGGLE
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            showToast(isLight ? "Mode Light Sunset ☀️" : "Mode Dark Luxury Glow ✨");
        });
    }

    /* ==========================================================================
       6. TAB SASTRA
       ========================================================================== */
    const sastraTabs = document.querySelectorAll('.sastra-tab-btn');
    const sastraContents = document.querySelectorAll('.sastra-content');

    sastraTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sastraTabs.forEach(t => t.classList.remove('active'));
            sastraContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = `content-${tab.getAttribute('data-sastra')}`;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       7. TOAST NOTIFICATION UTILITY
       ========================================================================== */
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2600);
        }
    }

    /* ==========================================================================
       8. HERO BUTTON ACTIONS
       ========================================================================== */
    const btnConfetti = document.getElementById('btnConfetti');
    if (btnConfetti) {
        btnConfetti.addEventListener('click', () => {
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
            showToast("Happy 21st Birthday Imelina Sitanggang! 🎉");
        });
    }

    const btnFireworks = document.getElementById('btnFireworks');
    if (btnFireworks) {
        btnFireworks.addEventListener('click', () => {
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 3, 'firework');
            showToast("Kembang Api Perayaan KKN Parsaoran Urat Menyala! 🎆");
        });
    }

    const btnRandomQuote = document.getElementById('btnRandomQuote');
    const kknQuotes = [
        "Rivan: 'Imel, dari posko Parsaoran Urat sampai kapan pun, kamu tetap sahabat terbaik!'",
        "Cristine: 'Ingat terus tawa kita di Samosir ya Imel, bahagia selalu di usia 21!'",
        "Daniel: '4 Sahabat Parsaoran Urat selamanya! Sukses terus studi & impianmu Imel!'"
    ];
    if (btnRandomQuote) {
        btnRandomQuote.addEventListener('click', () => {
            const random = kknQuotes[Math.floor(Math.random() * kknQuotes.length)];
            showToast(random);
        });
    }

    /* ==========================================================================
       9. INTERACTIVE SURPRISE CARD
       ========================================================================== */
    const surpriseCard = document.getElementById('surpriseCard');
    const surpriseText = document.getElementById('surpriseText');
    const surprises = [
        "🏔️ KKN Desa Parsaoran Urat pertemukan kita ber-4 jadi sahabat sejati!",
        "👑 Imel selalu jadi penengah dan pemeriah suasana di kelompok kita.",
        "✨ Rivan, Cristine, dan Daniel merasa bersyukur banget punya sahabat seperti Imelina.",
        "🌹 Semoga di usia 21 tahun ini, semua doa terbaik Imel dikabulkan Tuhan."
    ];

    if (surpriseCard && surpriseText) {
        surpriseCard.addEventListener('click', () => {
            const rand = surprises[Math.floor(Math.random() * surprises.length)];
            surpriseText.innerHTML = `<strong>${rand}</strong>`;
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
        });
    }

    /* ==========================================================================
       10. GALLERY FILTER SYSTEM
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       11. MODAL SURAT KKN PARSAORAN URAT
       ========================================================================== */
    const letterModal = document.getElementById('letterModal');
    const openModalBtn = document.getElementById('openLetterModal');
    const closeModalBtn = document.getElementById('closeLetterModal');

    if (openModalBtn && letterModal) {
        openModalBtn.addEventListener('click', () => letterModal.classList.add('active'));
    }
    if (closeModalBtn && letterModal) {
        closeModalBtn.addEventListener('click', () => letterModal.classList.remove('active'));
    }
    window.addEventListener('click', (e) => {
        if (e.target === letterModal) letterModal.classList.remove('active');
    });

    /* ==========================================================================
       12. CANVAS PARTICLES & CONFETTI ENGINE
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    let parts = [];

    function createTouchBurst(x, y, type = 'confetti') {
        for (let i = 0; i < 22; i++) {
            parts.push(new Part(x, y, type));
        }
    }

    if (canvas) {
        const ctx = canvas.getContext('2d');
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Part {
            constructor(x, y, type = 'confetti') {
                this.x = x || Math.random() * canvas.width;
                this.y = y || canvas.height + 10;
                this.size = Math.random() * 8 + 3;
                this.speedY = Math.random() * 2.5 + 1;
                this.speedX = (Math.random() - 0.5) * 2.5;
                const colors = ['#f72585', '#ffd700', '#4cc9f0', '#ff758f', '#ff9f1c'];
                this.color = type === 'firework'
                    ? `hsl(${Math.random() * 360}, 100%, 65%)`
                    : colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        setInterval(() => {
            if (parts.length < 35) {
                parts.push(new Part());
            }
        }, 280);

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            parts.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.y < -10) parts.splice(i, 1);
            });
            requestAnimationFrame(loop);
        }
        loop();
    }
});