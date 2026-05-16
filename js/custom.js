(function ($) {

  "use strict";

    // PRE LOADER
    $(window).on('load', function(){
      // Add a minimum display time for better UX
      setTimeout(function() {
        $('.preloader').addClass('fade-out');
        // Remove from DOM after animation completes
        setTimeout(function() {
          $('.preloader').remove();
        }, 800);
      }, 1500); // Minimum 1.5 seconds display
    });

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    function updateNavbar() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    }


    // PARALLAX EFFECT
    $.stellar({
      horizontalScrolling: false,
    }); 


    // ABOUT SLIDER
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      items: 1,
      loop: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
    });


    // SMOOTHSCROLL
    $(function() {
      var navLinks = $('.custom-navbar a[href^="#"]');

      navLinks.on('click', function(event) {
        var $anchor = $(this);
        if ($($anchor.attr('href')).length) {
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
          event.preventDefault();
        }
      });

      function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 70;
        navLinks.each(function() {
          var section = $($(this).attr('href'));
          if (section.length) {
            var top = section.offset().top;
            var bottom = top + section.outerHeight();
            if (scrollPos >= top && scrollPos < bottom) {
              navLinks.parent().removeClass('active');
              $(this).parent().addClass('active');
            }
          }
        });
      }

      updateActiveNav();
      $(window).on('scroll', updateActiveNav);
    });

    // SCROLL-BASED ANIMATIONS
    $(document).ready(function() {
      // Function to check if element is in viewport
      function isInViewport(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      }

      // Function to animate elements on scroll
      function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
          if (isInViewport(this) && !$(this).hasClass('animate')) {
            $(this).addClass('animate');
          }
        });
      }

      function validateEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      function showFieldError($field, message) {
        $field.addClass('invalid');
        $field.siblings('.field-error').text(message);
      }

      function clearFieldError($field) {
        $field.removeClass('invalid');
        $field.siblings('.field-error').text('');
      }

      function handleContactSubmit() {
        var $form = $('#contact-form');
        var $status = $form.find('.form-status');
        var $name = $form.find('[name="name"]');
        var $email = $form.find('[name="email"]');
        var $message = $form.find('[name="message"]');
        var valid = true;

        $form.find('.form-control').removeClass('invalid');
        $form.find('.field-error').text('');
        $status.removeClass('success error').hide();

        if (!$name.val().trim()) {
          showFieldError($name, 'Please enter your name.');
          valid = false;
        }

        if (!$email.val().trim() || !validateEmail($email.val().trim())) {
          showFieldError($email, 'Please enter a valid email address.');
          valid = false;
        }

        if (!$message.val().trim()) {
          showFieldError($message, 'Please share your message.');
          valid = false;
        }

        if (!valid) {
          $status.addClass('error').text('Please fix the errors above and try again.').show();
          return false;
        }

        $status.removeClass('error').addClass('success').text('Sending your message...').show();
        $form.find('button[type="submit"]').prop('disabled', true).text('Sending...');

        $.ajax({
          url: $form.attr('action'),
          method: 'POST',
          data: $form.serialize(),
          dataType: 'json'
        }).done(function() {
          $status.removeClass('error').addClass('success').text('Thanks! Your message was sent successfully.');
          $form[0].reset();
        }).fail(function() {
          $status.removeClass('success').addClass('error').text('Sorry, something went wrong. Please try again later or email us directly.');
        }).always(function() {
          $form.find('button[type="submit"]').prop('disabled', false).text('Send Message');
        });
      }

      $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        handleContactSubmit();
      });

      $('#contact-form .form-control').on('input', function() {
        clearFieldError($(this));
      });

      function animateCounters() {
        $('.counter-info h2').each(function() {
          var $this = $(this);
          var countTo = parseInt($this.attr('data-count'), 10) || 0;

          if (isInViewport($this) && !$this.hasClass('counted')) {
            $this.addClass('counted');
            $({ countNum: 0 }).animate({
              countNum: countTo
            }, {
              duration: 2000,
              easing: 'swing',
              step: function() {
                $this.text(Math.floor(this.countNum) + '+');
              },
              complete: function() {
                $this.text(countTo + '+');
              }
            });
          }
        });
      }

      function animateProgressBars() {
        $('.progress-bar').each(function() {
          var $bar = $(this);
          var target = parseInt($bar.attr('data-progress'), 10) || 0;

          if (isInViewport(this) && !$bar.hasClass('animated')) {
            $bar.addClass('animated');
            $bar.find('.progress-fill').animate({
              width: target + '%'
            }, {
              duration: 1800,
              easing: 'swing'
            });
          }
        });
      }

      var navLinks = $('.custom-navbar a[href^="#"]');
      var whatsappBtn = $('.whatsapp-button');
      var scrollToTopBtn = $('#scroll-to-top');
      var scrollThreshold = 300;
      var lastKnownScrollY = $(window).scrollTop();
      var ticking = false;

      function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 70;
        navLinks.each(function() {
          var section = $($(this).attr('href'));
          if (section.length) {
            var top = section.offset().top;
            var bottom = top + section.outerHeight();
            if (scrollPos >= top && scrollPos < bottom) {
              navLinks.parent().removeClass('active');
              $(this).parent().addClass('active');
            }
          }
        });
      }

      function handleScroll() {
        lastKnownScrollY = $(window).scrollTop();
        updateNavbar();
        animateOnScroll();
        animateCounters();
        animateProgressBars();
        updateActiveNav();

        if (lastKnownScrollY < 100) {
          whatsappBtn.css('animation', 'whatsapp-pulse 2s infinite');
        } else {
          whatsappBtn.css('animation', 'none');
        }

        if (lastKnownScrollY > scrollThreshold) {
          scrollToTopBtn.addClass('show');
        } else {
          scrollToTopBtn.removeClass('show');
        }

        ticking = false;
      }

      // Initial check for elements in viewport on page load
      animateOnScroll();
      animateCounters();
      animateProgressBars();
      updateNavbar();
      updateActiveNav();

      $(window).on('scroll', function() {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(handleScroll);
        }
      });

      // Enhanced hover effects for interactive elements
      $('.team-thumb, .counter-thumb, .pricing-thumb').hover(
        function() {
          $(this).addClass('hover-active');
        },
        function() {
          $(this).removeClass('hover-active');
        }
      );

      // Smooth reveal for tab content
      $('.nav-tabs a').on('shown.bs.tab', function() {
        $('.tab-pane.active .tab-pane-item').each(function(index) {
          var $item = $(this);
          setTimeout(function() {
            $item.addClass('animate-on-scroll animate');
          }, index * 200);
        });
      });

      // Trigger initial tab animation
      $('.tab-pane.active .tab-pane-item').each(function(index) {
        var $item = $(this);
        setTimeout(function() {
          $item.addClass('animate-on-scroll animate');
        }, index * 200);
      });

      // Smooth scroll to top on button click
      scrollToTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 1000, 'swing');
      });

      // DARK MODE TOGGLE
      function setTheme(theme) {
        if (theme === 'dark') {
          $('body').addClass('dark-mode');
          $('.dark-mode-toggle i').removeClass('fa-moon-o').addClass('fa-sun-o');
        } else {
          $('body').removeClass('dark-mode');
          $('.dark-mode-toggle i').removeClass('fa-sun-o').addClass('fa-moon-o');
        }
      }

      var savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      setTheme(savedTheme);

      $('.dark-mode-toggle').on('click', function() {
        var nextTheme = $('body').hasClass('dark-mode') ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
      });
    });  

})(jQuery);
