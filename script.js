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

    // Form submission handling (prevent default for demo purposes)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Trải nghiệm thành công';
            btn.style.backgroundColor = '#00b090'; // success color
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    });

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
});
