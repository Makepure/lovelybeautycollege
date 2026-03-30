// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    });
});

// Back to Top Button
const backToTop = document.createElement('a');
backToTop.href = '#';
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');
        
        if (name && email && message) {
            formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 3000);
        }
    });
}

// Course Filtering (for courses page)
const filterBtns = document.querySelectorAll('.filter-btn');
const coursesGrid = document.getElementById('courses-grid');

if (filterBtns.length && coursesGrid) {
    // Course data
    const courses = [
        { name: 'Professional Makeup Artistry', category: 'makeup', duration: '3 Months', price: '$1,999', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop' },
        { name: 'Advanced Hair Styling', category: 'hair', duration: '4 Months', price: '$2,499', image: 'https://images.unsplash.com/photo-1560869713-7d0a2943084e?w=600&h=400&fit=crop' },
        { name: 'Skincare Specialist', category: 'skincare', duration: '2 Months', price: '$1,499', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop' },
        { name: 'Nail Technology', category: 'nails', duration: '2 Months', price: '$1,299', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop' },
        { name: 'Bridal Makeup', category: 'makeup', duration: '1 Month', price: '$899', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop' },
        { name: 'Hair Coloring Expert', category: 'hair', duration: '2 Months', price: '$1,299', image: 'https://images.unsplash.com/photo-1560869713-7d0a2943084e?w=600&h=400&fit=crop' },
        { name: 'Advanced Skincare', category: 'skincare', duration: '3 Months', price: '$1,899', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop' },
        { name: 'Nail Art Design', category: 'nails', duration: '1.5 Months', price: '$999', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop' }
    ];
    
    function displayCourses(category) {
        const filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category);
        
        coursesGrid.innerHTML = filteredCourses.map(course => `
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.name}">
                </div>
                <div class="course-content">
                    <h3>${course.name}</h3>
                    <div class="course-info">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-tag"></i> ${course.price}</span>
                    </div>
                    <p>Comprehensive training with hands-on experience and certification.</p>
                    <a href="contact.html" class="btn-course">Enroll Now →</a>
                </div>
            </div>
        `).join('');
    }
    
    // Initial display
    displayCourses('all');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            displayCourses(category);
        });
    });
}

// Animated Counter
const statNumbers = document.querySelectorAll('.stat h3, .stat-item h3');

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetText = element.textContent;
            const target = parseInt(targetText);
            if (!isNaN(target) && element.textContent !== target.toString()) {
                animateCounter(element, target);
            }
            observer.unobserve(element);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

console.log('Lovely Beauty College Website Loaded Successfully!');
