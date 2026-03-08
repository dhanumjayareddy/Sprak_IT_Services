// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    console.log('Mobile menu script loaded');
    console.log('Toggle found:', !!mobileMenuToggle);
    console.log('Menu found:', !!navbarMenu);
    
    if (mobileMenuToggle && navbarMenu) {
        // Toggle menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked');
            mobileMenuToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navbarMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Menu link clicked');
                mobileMenuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                if (navbarMenu.classList.contains('active')) {
                    console.log('Clicked outside menu');
                    mobileMenuToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navbarMenu.classList.contains('active')) {
                console.log('Escape key pressed');
                mobileMenuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
        
        // Handle touch gestures for swipe to close
        let touchStartX = 0;
        let touchEndX = 0;
        
        navbarMenu.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        navbarMenu.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - close menu
                if (navbarMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        }
    } else {
        console.error('Mobile menu elements not found');
    }
});
