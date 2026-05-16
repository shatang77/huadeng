
document.addEventListener('DOMContentLoaded', () => {
    // Carousel
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(c => {
        const inner = c.querySelector('.carousel-inner');
        const items = c.querySelectorAll('.carousel-item');
        const dots = c.querySelectorAll('.dot');
        const prev = c.querySelector('.prev');
        const next = c.querySelector('.next');
        let idx = 0;
        let timer;
        
        const update = () => {
            inner.style.transform = `translateX(-${idx * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[idx].classList.add('active');
        };
        const nextSlide = () => { idx = (idx + 1) % items.length; update(); };
        const prevSlide = () => { idx = (idx - 1 + items.length) % items.length; update(); };
        const play = () => { timer = setInterval(nextSlide, 4000); };
        const pause = () => { clearInterval(timer); };
        
        next.addEventListener('click', nextSlide);
        prev.addEventListener('click', prevSlide);
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { idx = i; update(); });
        });
        c.addEventListener('mouseenter', pause);
        c.addEventListener('mouseleave', play);
        play();
    });

    // Nav Active
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if(link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    // Gallery Filter
    const fBtns = document.querySelectorAll('.f-btn');
    const galItems = document.querySelectorAll('.gal-item');
    fBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat');
            galItems.forEach(item => {
                if(cat === 'all' || item.getAttribute('data-cat') === cat) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Back to top
    const bt = document.getElementById('backTop');
    if(bt) {
        window.addEventListener('scroll', () => {
            bt.style.display = window.scrollY > 400 ? 'block' : 'none';
        });
        bt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
