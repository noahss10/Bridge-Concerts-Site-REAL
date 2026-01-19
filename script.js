document.addEventListener('DOMContentLoaded', function() {
    const testimonials = [
        {
            text: 'The entertainment industry differs across countries — from security regulations to production norms. With years of hands–on international experience, our team provides seamless communication between the artist team and local production. We are your link to ensuring smooth collaboration and the highest production standards.',
            author: 'WHY US',
            image: '背景物料/微信图片_20260118000628_175_402.jpg'
        },
        {
            text: 'Combining technical expertise, tour management, production coordination, and creative insight, our team — from both China and the United States — works closely together to serve with professionalism, empathy, and flexibility, bridging regional differences with efficiency and understanding.',
            author: 'OUR TEAM',
            image: '背景物料/微信图片_20260117195852_142_402.jpg'
        }
    ];

    let currentTestimonial = 0;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonialText = document.getElementById('testimonialText');
    const testimonialImage = document.querySelector('.testimonial-image');
    const testimonialTitle = document.getElementById('testimonialTitle');

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        const metaLines = [];
        if (testimonial.position) {
            metaLines.push(`<p class="author-position">${testimonial.position}</p>`);
        }
        if (testimonial.company) {
            metaLines.push(`<p class="author-company">${testimonial.company}</p>`);
        }
        testimonialText.innerHTML = `
            <div class="testimonial-author">
                ${metaLines.join('')}
            </div>
            <p class="testimonial-quote">${testimonial.text}</p>
        `;

        if (testimonialTitle) {
            testimonialTitle.textContent = testimonial.author || '';
        }
        
        if (testimonial.image) {
            testimonialImage.style.backgroundImage = `url('${testimonial.image}')`;
            testimonialImage.classList.add('has-image');
        } else {
            testimonialImage.style.backgroundImage = '';
            testimonialImage.classList.remove('has-image');
        }
    }

    prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });

    nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    });

    const clientsToggle = document.getElementById('clientsToggle');
    const clientsGrid = document.querySelector('.clients-grid');

    if (clientsToggle && clientsGrid) {
        clientsToggle.addEventListener('click', function() {
            const isExpanded = clientsGrid.classList.toggle('show-all');
            clientsToggle.textContent = isExpanded ? 'close' : 'More';
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    const revealCards = (containerSelector, itemSelector, baseDelay) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const items = Array.from(container.querySelectorAll(itemSelector));

        const columns = Math.max(
            1,
            parseInt(getComputedStyle(container).gridTemplateColumns.split(' ').length, 10)
        );

        items.forEach((item, index) => {
            const columnIndex = index % columns;
            item.style.setProperty('--reveal-delay', `${columnIndex * baseDelay}s`);
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25, rootMargin: '0px 0px 10% 0px' }
        );

        items.forEach(item => observer.observe(item));
    };

    revealCards('.services-grid', '.service-card', 0.08);
    revealCards('.clients-grid', '.client-card', 0.04);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    updateTestimonial();
});
