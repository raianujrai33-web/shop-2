/* ==========================================================================
   DURGA INTERIORS - INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 15);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counters on viewport scroll
    let countTriggered = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-bar');
        if (statsSection && !countTriggered) {
            const position = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            if (position < screenPosition) {
                animateCounters();
                countTriggered = true;
            }
        }
    });

    // 2. Interactive Budget Estimator
    const estimateBtn = document.getElementById('calculateEstimate');
    if (estimateBtn) {
        estimateBtn.addEventListener('click', () => {
            const scope = document.getElementById('propScope').value;
            const style = document.getElementById('designStyle').value;
            const resultBox = document.getElementById('estimateResult');

            let baseCost = 0;
            if (scope === '3bhk') baseCost = 2500000;
            else if (scope === '4bhk') baseCost = 4000000;
            else if (scope === 'villa') baseCost = 7500000;

            let multiplier = 1;
            if (style === 'minimalist') multiplier = 1.1;
            if (style === 'neoclassical') multiplier = 1.35;
            if (style === 'italian') multiplier = 1.5;

            const total = Math.round(baseCost * multiplier);
            const formattedTotal = (total / 100000).toFixed(2);

            resultBox.innerHTML = `
                <div style="background: rgba(212,175,55,0.1); border: 1px solid var(--accent-gold); padding: 1.5rem; margin-top: 1.5rem; text-align: center;">
                    <h4 style="color: var(--accent-gold); font-size: 1.4rem;">Estimated Investment Range</h4>
                    <p style="font-size: 2rem; font-family: var(--font-heading); margin: 0.5rem 0;">₹${formattedTotal} Lakhs - ₹${(parseFloat(formattedTotal) * 1.2).toFixed(2)} Lakhs</p>
                    <small style="color: var(--text-muted);">Includes architectural design, custom joinery, imported hardware, and project management.</small>
                </div>
            `;
        });
    }

    // 3. Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
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
});