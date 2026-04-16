/**
 * Quantronix Nexus Blog Scripts
 * Unified search and enhanced interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Unified Search Filtering
    const searchInput = document.getElementById('topicSearch');
    
    // Select all searchable items
    const blogCards = document.querySelectorAll('.blog-card');
    const testCards = document.querySelectorAll('.test-card');
    const subjectCards = document.querySelectorAll('.glass-card');
    const featuredCard = document.querySelector('.featured-card');

    const allSearchable = [...blogCards, ...testCards, ...subjectCards, featuredCard];

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            allSearchable.forEach(item => {
                if (!item) return;

                // Priority 1: Check data-searchable attribute
                const searchableText = item.getAttribute('data-searchable')?.toLowerCase() || "";
                
                // Priority 2: Check standard content
                const contentText = item.textContent.toLowerCase();
                
                // Priority 3: Check data-title (if any)
                const titleAttr = item.getAttribute('data-title')?.toLowerCase() || "";

                const combinedText = `${searchableText} ${contentText} ${titleAttr}`;

                if (combinedText.includes(searchTerm)) {
                    item.style.display = item.classList.contains('featured-card') ? 'grid' : 
                                      item.classList.contains('test-card') ? 'block' : 'flex';
                    
                    // Re-trigger animation
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = null;
                } else {
                    item.style.display = 'none';
                }
            });

            // Handle Section headers display
            document.querySelectorAll('section').forEach(section => {
                const visibleItems = section.querySelectorAll('article[style*="display: flex"], div[style*="display: block"], a[style*="display: flex"]');
                const hasVisibleFeatured = section.querySelector('.featured-card[style*="display: grid"]');
                
                if (visibleItems.length === 0 && !hasVisibleFeatured && searchTerm !== "") {
                    section.classList.add('hidden-section');
                    section.style.opacity = '0.3';
                } else {
                    section.classList.remove('hidden-section');
                    section.style.opacity = '1';
                }
            });
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // If it has children with delay, they will animate based on CSS
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to all primary sections and cards
    document.querySelectorAll('section, .blog-card, .glass-card, .featured-card').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(4, 8, 16, 0.95)';
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(4, 8, 16, 0.8)';
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
