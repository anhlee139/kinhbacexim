document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // EmailJS Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Cache DOM elements
        const submitBtn = contactForm.querySelector('.submit-btn');
        const successMsg = document.getElementById('successMessage');
        const errorMsg = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        let isSubmitting = false;
        let emailjsInitialized = false;
        
        // Initialize EmailJS with retry logic
        function initEmailJS() {
            if (typeof emailjs !== 'undefined') {
                emailjs.init('jpl3ZPf6WnzbkuDy8');
                emailjsInitialized = true;
                console.log('EmailJS initialized successfully');
                return true;
            }
            return false;
        }
        
        // Try to initialize immediately
        if (!initEmailJS()) {
            // If failed, retry after a short delay
            setTimeout(initEmailJS, 500);
        }
        
        // Helper function to show error
        function showError(message) {
            if (errorMsg && errorText) {
                errorText.textContent = message;
                errorMsg.classList.add('show');
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide error after 8 seconds
                setTimeout(() => {
                    errorMsg.classList.remove('show');
                }, 8000);
            }
        }
        
        // Helper function to reset button
        function resetButton(originalText) {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
            isSubmitting = false;
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Prevent duplicate submission
            if (isSubmitting) {
                return;
            }
            
            // Hide previous messages
            if (successMsg) successMsg.classList.remove('show');
            if (errorMsg) errorMsg.classList.remove('show');
            
            // Check if EmailJS is available
            if (!emailjsInitialized || typeof emailjs === 'undefined') {
                showError('Email service is not available. Please try again later or contact us directly at thomas@kinhbacexim.com');
                return;
            }
            
            // Set submitting flag
            isSubmitting = true;
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_email: 'thomas@kinhbacexim.com'
            };
            
            // Send email via EmailJS
            emailjs.send('service_ldz061i', 'template_m1q4dwj', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    if (successMsg) {
                        successMsg.classList.add('show');
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMsg.classList.remove('show');
                        }, 5000);
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    resetButton(originalText);
                    
                }, function(error) {
                    console.error('EmailJS Error:', error);
                    
                    // Show error message in UI
                    showError('Sorry, there was an error sending your message. Please try again or contact us directly at thomas@kinhbacexim.com');
                    
                    // Reset button
                    resetButton(originalText);
                });
        });
    }

    // Gallery Modal functionality - Dynamic system
    const galleryModal = document.getElementById('gallery-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const productCards = document.querySelectorAll('.product-card');

    // Product image data
    const productImages = {
        'PLYWOOD': [
            { src: 'PLYWOOD/10.jpg', alt: 'Plywood 10' },
            { src: 'PLYWOOD/11.jpg', alt: 'Plywood 11' },
            { src: 'PLYWOOD/12.jpg', alt: 'Plywood 12' },
            { src: 'PLYWOOD/13.jpg', alt: 'Plywood 13' },
            { src: 'PLYWOOD/6.jpg', alt: 'Plywood 6' },
            { src: 'PLYWOOD/7.jpg', alt: 'Plywood 7' },
            { src: 'PLYWOOD/Ảnh Hình 2.jpg', alt: 'Plywood Hình 2' }
        ],
        'PALLET': [
            { src: 'PALLET/2.jpg', alt: 'Pallet 2' },
            { src: 'PALLET/3.jpg', alt: 'Pallet 3' },
            { src: 'PALLET/4.jpg', alt: 'Pallet 4' },
            { src: 'PALLET/8.jpg', alt: 'Pallet 8' }
        ],
        'HOUSEHOLD': [
            { src: 'HOUSEHOLD/1.jpg', alt: 'Household 1' },
            { src: 'HOUSEHOLD/2.jpg', alt: 'Household 2' },
            { src: 'HOUSEHOLD/3.jpg', alt: 'Household 3' },
            { src: 'HOUSEHOLD/4.jpg', alt: 'Household 4' },
            { src: 'HOUSEHOLD/5.jpg', alt: 'Household 5' }
        ],
        'GALLERY': [
            { src: 'Gallery/1.jpg', alt: 'Gallery 1' },
            { src: 'Gallery/2.jpg', alt: 'Gallery 2' },
            { src: 'Gallery/3.jpg', alt: 'Gallery 3' },
            { src: 'Gallery/4.jpg', alt: 'Gallery 4' },
            { src: 'Gallery/5.jpg', alt: 'Gallery 5' },
            { src: 'Gallery/6.jpg', alt: 'Gallery 6' },
            { src: 'Gallery/7.jpg', alt: 'Gallery 7' },
            { src: 'Gallery/8.jpg', alt: 'Gallery 8' },
            { src: 'Gallery/9.jpg', alt: 'Gallery 9' },
            { src: 'Gallery/10.jpg', alt: 'Gallery 10' }
        ]
    };

    let currentProduct = null;

    // Open modal when clicking any product card
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.getAttribute('data-product');
            const folderName = card.getAttribute('data-folder');
            
            if (productImages[folderName]) {
                currentProduct = folderName;
                loadGalleryImages(folderName, productName);
                galleryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Load images into gallery grid
    function loadGalleryImages(folderName, productName) {
        // Update title
        galleryModalTitle.textContent = `${productName} Gallery`;
        
        // Clear existing images
        galleryGrid.innerHTML = '';
        
        // Add new images
        const images = productImages[folderName];
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-modal-item';
            item.setAttribute('data-index', index);
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.loading = 'lazy';
            
            item.appendChild(imgElement);
            galleryGrid.appendChild(item);
        });

        // Re-attach lightbox listeners to new images
        attachLightboxListeners();
    }

    // Close modal when clicking close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside the modal content
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Centralized ESC key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close lightbox first (higher priority)
            if (lightbox && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
            // Then close gallery modal if no lightbox is open
            else if (galleryModal && galleryModal.classList.contains('active')) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    let currentImageIndex = 0;

    // Attach lightbox listeners to gallery images
    function attachLightboxListeners() {
        const galleryItems = document.querySelectorAll('.gallery-modal-item');
        
        galleryItems.forEach((item, index) => {
            // Remove old listeners by cloning
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
        });

        // Re-select items and add new listeners
        const newGalleryItems = document.querySelectorAll('.gallery-modal-item');
        newGalleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImageIndex = index;
                showLightboxImage();
                lightbox.classList.add('active');
            });
        });
    }

    function showLightboxImage() {
        if (!currentProduct || !productImages[currentProduct]) return;
        
        const images = productImages[currentProduct];
        const currentImage = images[currentImageIndex];
        
        // Add loading state
        lightboxImg.style.opacity = '0.5';
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        
        // Handle image load
        lightboxImg.onload = () => {
            lightboxImg.style.opacity = '1';
        };
        
        // Handle image error
        lightboxImg.onerror = () => {
            lightboxImg.style.opacity = '1';
            console.error('Failed to load image:', currentImage.src);
        };
    }

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    // Prevent button clicks from closing lightbox
    [lightboxPrev, lightboxNext, lightboxClose].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (!currentProduct || !productImages[currentProduct]) return;
            const images = productImages[currentProduct];
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showLightboxImage();
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (!currentProduct || !productImages[currentProduct]) return;
            const images = productImages[currentProduct];
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showLightboxImage();
        });
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Additional keyboard navigation for lightbox (arrows only)
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (!currentProduct || !productImages[currentProduct]) return;
            const images = productImages[currentProduct];
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showLightboxImage();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showLightboxImage();
            }
        }
    });

    // Load Insights Gallery Images
    const insightsGalleryGrid = document.getElementById('insights-gallery-grid');
    if (insightsGalleryGrid && productImages['GALLERY']) {
        const galleryImages = productImages['GALLERY'];
        galleryImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'insights-gallery-item animate-on-scroll';
            if (index % 3 === 1) item.classList.add('delay-1');
            if (index % 3 === 2) item.classList.add('delay-2');
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.className = 'insights-gallery-img';
            imgElement.loading = 'lazy';
            
            item.appendChild(imgElement);
            insightsGalleryGrid.appendChild(item);
            
            // Add click event to open lightbox
            item.addEventListener('click', () => {
                currentProduct = 'GALLERY';
                currentImageIndex = index;
                showLightboxImage();
                lightbox.classList.add('active');
            });
        });

        // Re-observe animated elements for insights gallery
        const newAnimatedElements = document.querySelectorAll('.insights-gallery-item.animate-on-scroll');
        newAnimatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Hero Slider logic
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const sliderContainer = document.querySelector('.hero-slider-container');
    
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        let slideInterval = null;
        const slideDuration = 3000; // 3 seconds per slide

        // Inject progress bar into slider container
        const progressBar = document.createElement('div');
        progressBar.className = 'slider-progress';
        if (sliderContainer) sliderContainer.appendChild(progressBar);
        
        function goToSlide(index) {
            slides[currentSlideIndex].classList.remove('active');
            if (dots.length > 0) dots[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (index + slides.length) % slides.length;
            slides[currentSlideIndex].classList.add('active');
            if (dots.length > 0) dots[currentSlideIndex].classList.add('active');
            // Reset progress bar animation
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    progressBar.style.transition = `width ${slideDuration}ms linear`;
                    progressBar.style.width = '100%';
                });
            });
        }
        
        function nextSlide() { goToSlide(currentSlideIndex + 1); }
        function prevSlide() { goToSlide(currentSlideIndex - 1); }
        
        function startAutoPlay() {
            if (!slideInterval) {
                slideInterval = setInterval(nextSlide, slideDuration);
                // Restart progress bar
                progressBar.style.transition = `width ${slideDuration}ms linear`;
                progressBar.style.width = '100%';
            }
        }
        
        function stopAutoPlay() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
                // Freeze progress bar
                const computed = getComputedStyle(progressBar).width;
                progressBar.style.transition = 'none';
                progressBar.style.width = computed;
            }
        }
        
        // Arrow buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });
        }
        
        // Dot buttons
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => { goToSlide(idx); stopAutoPlay(); startAutoPlay(); });
        });
        
        // Hover pause/resume
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);

            // Touch swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            }, { passive: true });
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    diff > 0 ? nextSlide() : prevSlide();
                }
                startAutoPlay();
            }, { passive: true });
        }
        
        // Start with progress bar immediately
        goToSlide(0);
        startAutoPlay();
    }
});
