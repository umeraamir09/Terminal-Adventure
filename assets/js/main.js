/**
 * Enjin-Inspired Ghost Theme - Main JavaScript
 * =============================================
 * Features:
 * - Mobile menu toggle
 * - Theme toggle (dark/light mode)
 * - Reading progress indicator
 * - Table of contents generation
 * - Smooth scroll
 * - Back to top button
 * - Hero slider
 * - Copy link to clipboard
 * - Sticky header on scroll
 * - Image lightbox
 * - FitVids for responsive videos
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initThemeToggle();
        initStickyHeader();
        initReadingProgress();
        initTableOfContents();
        initBackToTop();
        initHeroSlider();
        initCopyLink();
        initFitVids();
        initLightbox();
        initSmoothScroll();
    });

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const burger = document.querySelector('.gh-burger');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burger || !mobileMenu) return;

        burger.addEventListener('click', function() {
            const isOpen = document.body.classList.toggle('menu-open');
            burger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking on links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Theme Toggle (Dark/Light Mode)
     */
    function initThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Check for saved preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('auto-color');
        }

        toggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            document.documentElement.classList.remove('auto-color');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            }
        });
    }

    /**
     * Sticky Header on Scroll
     */
    function initStickyHeader() {
        const header = document.getElementById('gh-head');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        function updateHeader() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Reading Progress Indicator
     */
    function initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        if (!progressBar) return;

        const article = document.querySelector('.article');
        if (!article) return;

        function updateProgress() {
            const articleRect = article.getBoundingClientRect();
            const articleTop = articleRect.top + window.pageYOffset;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.pageYOffset;
            
            const progress = Math.max(0, Math.min(100, 
                ((scrolled - articleTop + windowHeight) / (articleHeight + windowHeight)) * 100
            ));
            
            progressBar.style.width = progress + '%';
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        updateProgress();
    }

    /**
     * Table of Contents Generation
     */
    function initTableOfContents() {
        const tocNav = document.getElementById('toc-nav');
        const content = document.querySelector('.post-content');
        
        if (!tocNav || !content) return;

        const headings = content.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            const tocContainer = document.getElementById('post-toc');
            if (tocContainer) {
                tocContainer.style.display = 'none';
            }
            return;
        }

        const tocHTML = [];
        
        headings.forEach(function(heading, index) {
            // Add ID to heading if not present
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }

            const level = heading.tagName.toLowerCase();
            const text = heading.textContent;
            
            tocHTML.push(
                '<a href="#' + heading.id + '" data-level="' + level.charAt(1) + '">' + 
                text + 
                '</a>'
            );
        });

        tocNav.innerHTML = tocHTML.join('');

        // Highlight active heading on scroll
        const tocLinks = tocNav.querySelectorAll('a');
        
        function highlightActiveToc() {
            let current = '';
            
            headings.forEach(function(heading) {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 150) {
                    current = heading.id;
                }
            });

            tocLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    highlightActiveToc();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Back to Top Button
     */
    function initBackToTop() {
        const button = document.getElementById('back-to-top');
        if (!button) return;

        function toggleButton() {
            if (window.pageYOffset > 500) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleButton();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Hero Slider
     */
    function initHeroSlider() {
        const slider = document.getElementById('hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-slider-dot');
        const prevBtn = document.querySelector('.hero-slider-prev');
        const nextBtn = document.querySelector('.hero-slider-next');
        
        if (slides.length < 2) return;

        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 5000;

        function showSlide(index) {
            // Wrap around
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(function(slide, i) {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startAutoplay();
            });
        }

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                showSlide(index);
                startAutoplay();
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (diff > swipeThreshold) {
                nextSlide();
                startAutoplay();
            } else if (diff < -swipeThreshold) {
                prevSlide();
                startAutoplay();
            }
        }

        // Start autoplay
        startAutoplay();
    }

    /**
     * Copy Link to Clipboard
     */
    function initCopyLink() {
        const copyButtons = document.querySelectorAll('.share-copy');
        
        copyButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-url') || window.location.href;
                
                navigator.clipboard.writeText(url).then(function() {
                    // Show feedback
                    const originalContent = button.innerHTML;
                    const originalText = button.querySelector('span');
                    
                    if (originalText) {
                        originalText.textContent = 'Copied!';
                    }
                    
                    button.classList.add('copied');
                    
                    setTimeout(function() {
                        if (originalText) {
                            originalText.textContent = 'Copy Link';
                        }
                        button.classList.remove('copied');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                });
            });
        });
    }

    /**
     * FitVids - Responsive Videos
     * Uses built-in FitVids implementation below
     */
    function initFitVids() {
        const content = document.querySelector('.post-content, .gh-content');
        if (!content || typeof $ === 'undefined') return;
        
        // Use our built-in FitVids implementation
        $(content).fitVids();
    }

    /**
     * Image Lightbox
     * Note: Requires PhotoSwipe library to be loaded.
     * PhotoSwipe is included in Ghost's card assets when enabled in package.json
     */
    function initLightbox() {
        // Check if PhotoSwipe is available (loaded by Ghost for image galleries)
        if (typeof PhotoSwipe === 'undefined' || typeof PhotoSwipeUI_Default === 'undefined') {
            return;
        }

        const images = document.querySelectorAll('.post-content img, .gh-content img');
        if (images.length === 0) return;

        images.forEach(function(img) {
            if (img.closest('a')) return; // Skip if already wrapped in link
            
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                
                const items = [{
                    src: img.src,
                    w: img.naturalWidth || parseInt(img.getAttribute('width')) || 1200,
                    h: img.naturalHeight || parseInt(img.getAttribute('height')) || 800
                }];

                const pswpElement = document.querySelector('.pswp');
                if (!pswpElement) return;

                const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
                    index: 0,
                    bgOpacity: 0.9,
                    showHideOpacity: true,
                    history: false
                });

                gallery.init();
            });
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#/portal' || href.includes('portal')) {
                    return; // Skip portal links
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

})();

/**
 * jQuery FitVids Plugin
 * Lightweight, easy-to-use jQuery plugin for fluid width video embeds.
 */
(function($){
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };
        if(!document.getElementById('fit-vids-style')) {
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }
        if(options) {
            $.extend(settings, options);
        }
        return this.each(function(){
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];
            if(settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var ignoreList = '.fitvidsignore';
            if(settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }
            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object');
            $allVideos = $allVideos.not(ignoreList);
            $allVideos.each(function(){
                var $this = $(this);
                if($this.parents(ignoreList).length > 0) {
                    return;
                }
                if(this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                if((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if(!$this.attr('name')) {
                    var videoName = 'fitvid' + $.fn.fitVids._count;
                    $this.attr('name', videoName);
                    $.fn.fitVids._count++;
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
    $.fn.fitVids._count = 0;
})(window.jQuery || window.Zepto);
