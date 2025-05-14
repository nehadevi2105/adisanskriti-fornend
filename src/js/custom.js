AOS.init();
(function($) {

    /*================= Global Variable Start =================*/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var IEbellow9 = !$.support.leadingWhitespace;
    var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
    var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;

    function isIEver() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
    //if (isIEver () == 8) {}
    var report_url = $(location).attr('pathname');
    var base_url = $("input[id=base_url]").val();
    var jsFolder = base_url + "/themes/contrib/aristotle/js/";
    var cssFolder = base_url + "/themes/contrib/aristotle/css/";
    var ww = document.body.clientWidth,
        wh = document.body.clientHeight;
    var mobilePort = 1024,
        ipadView = 1024,
        wideScreen = 1600;

    $(document).ready(function() {

          var videoElement = $("#main-video");

            // Function to extract language from the URL
            function getLanguageFromURL() {
                var urlPath = window.location.pathname;
                var pathSegments = urlPath.split('/').filter(Boolean);
                var availableLanguages = ['en', 'hi'];

                for (var i = 0; i < pathSegments.length; i++) {
                    if (availableLanguages.includes(pathSegments[i])) {
                        return pathSegments[i];
                    }
                }
                return 'en'; // Default to English
            }

            // Language-to-video mapping
            var videoMapping = {
                'en': "/themes/contrib/aristotle/dist/images/intro_video_en.mp4",
                'hi': "/themes/contrib/aristotle/dist/images/intro_video_hi.mp4"
            };

            // Get current language
            var currentLanguage = getLanguageFromURL();
            var newVideoSrc = videoMapping[currentLanguage] || videoMapping['en'];

            // Force update video source (remove old <source> and add new)
            videoElement.find("source").remove(); // Remove old source
            videoElement.append('<source src="' + newVideoSrc + '?v=' + new Date().getTime() + '" type="video/mp4">'); // Append new source with timestamp

            videoElement[0].load(); // Reload video
        

        $('.apply-catalog-filters').addClass('js-hide');
        $('a').filter(function() {
            return this.hostname && this.hostname == location.hostname;
        }).each(function() {
            // Add target="_blank" and rel="noopener noreferrer" to external links
            $(this).attr("target", "_self");
        })

        $('.dropdown-menu li').on('click', function() {
    $(this).toggleClass('selected');
  });

        var images = [];
  var titles = [];
  var currentIndex = 0;

  // Initialize Owl Carousel
  var owl = $("#carousel-gallery").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: { items: 1 },  // 1 item for mobile screens
        600: { items: 2 }, // 2 items for tablets
        1000: { items: 3 } // 3 items for desktops
    }
  });

  // Store all images and titles in arrays
  $(".item").each(function () {
      images.push($(this).find("img").attr("src"));
      titles.push($(this).find(".image-title").text());
  });

  // Open modal on image click
  $(".item img").on("click", function () {
      currentIndex = $(".item img").index(this);
      showModal();
  });

  function showModal() {
      $("#modalImage").attr("src", images[currentIndex]);
      $("#imageModal").fadeIn();
  }

  // Close modal
  $(".close").click(function () {
      $("#imageModal").fadeOut();
  });

  // Navigate to previous image
  $(".prev").click(function (event) {
      event.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showModal();
  });

  // Navigate to next image
  $(".next").click(function (event) {
      event.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      showModal();
  });

  // Close modal when clicking outside image
  $("#imageModal").click(function (event) {
      if (event.target.id === "imageModal") {
          $(this).fadeOut();
      }
  });
  
        //new window open for external link
        $('a').not(".litebox, .singleVideoPopup, .colorbox, .noextpopup").filter(function() {
            return this.hostname && this.hostname !== location.hostname;
        }).each(function() {
            // Add target="_blank" and rel="noopener noreferrer" to external links
            $(this).attr("target", "_blank").attr("rel", "noopener noreferrer");
        }).click(function(e) {
            e.preventDefault();
            var url = $(this).attr("href");

            // Check if body has class 'lang-en'
            var confirmText = $('body').hasClass('lang-hi') ?
                "à¤†à¤ª à¤à¤• à¤¬à¤¾à¤¹à¤°à¥€ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤ªà¤° à¤œà¤¾ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¤¾à¤ à¤ªà¤° à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚à¥¤" :
                "You are about to proceed to an external website. Click Yes to proceed.";

            var okButtonText = $('body').hasClass('lang-hi') ? "à¤¹à¤¾à¤" : "Yes";
            var cancelButtonText = $('body').hasClass('lang-hi') ? "à¤¨à¤¹à¥€à¤‚" : "No";

            smoke.confirm(confirmText, function(e) {
                if (e) {
                    window.open(url, "_blank");
                } else {
                    return false;
                }
            }, {
                ok: okButtonText,
                cancel: cancelButtonText,
                classname: "custom-class",
                reverseButtons: true
            });
        });

        function handleMailtoLink(link) {
            var url = link.attr("href");

            // Check if the link is a mailto link
            if (url.indexOf('mailto:') === 0) {
                // Check if body has class 'lang-en'
                var confirmText = $('body').hasClass('lang-hi') ?
                    "à¤†à¤ª à¤à¤• à¤ˆà¤®à¥‡à¤² à¤­à¥‡à¤œà¤¨à¥‡ à¤œà¤¾ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¤¾à¤ à¤ªà¤° à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚à¥¤" :
                    "You are about to send an email. Click Yes to proceed.";

                var okButtonText = $('body').hasClass('lang-hi') ? "à¤¹à¤¾à¤" : "Yes";
            var cancelButtonText = $('body').hasClass('lang-hi') ? "à¤¨à¤¹à¥€à¤‚" : "No";

                smoke.confirm(confirmText, function(e) {
                    if (e) {
                        // Proceed with the mailto link
                        window.location.href = url;
                    } else {
                        return false;
                    }
                }, {
                    ok: okButtonText,
                    cancel: cancelButtonText,
                    classname: "custom-class",
                    reverseButtons: true
                });
            }
        }

        // Usage: for each mailto link, call the function
        $('a[href^="mailto:"]').click(function(e) {
            e.preventDefault();
            handleMailtoLink($(this));
        });

    });
})(window.jQuery);
$(document).ready(function() {
    $('[data-toggle="dropdown"]').attr('data-bs-toggle', 'dropdown')
        .removeAttr('data-toggle');

var topl = [
'/themes/contrib/aristotle/dist/images/adi/vidyalaya-1.jpg',
    '/themes/contrib/aristotle/dist/images/adi/vidyalaya-2.jpg',
    '/themes/contrib/aristotle/dist/images/adi/vidyalaya-3.jpg'
];
var toplc = 0;
setInterval(function() {
    $('.aadiTopLeft').attr('src', topl[toplc]);

    toplc = (toplc + 1) % topl.length;
}, 5000);
var top = [
    '/themes/contrib/aristotle/dist/images/adi/aadi-sampada-1.jpg',
    '/themes/contrib/aristotle/dist/images/adi/aadi-sampada-2.jpg',
    '/themes/contrib/aristotle/dist/images/adi/aadi-sampada-3.jpg'
];
var topc = 0;
setInterval(function() {
    $('.aadiTopRight').attr('src', top[topc]);

    topc = (topc + 1) % top.length;
}, 5000);

var left = [
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-1.jpg',
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-2.jpg',
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-3.jpg'
];
var leftc = 0;
setInterval(function() {
    $('.aadiBottomLeft').attr('src', left[leftc]);

    leftc = (leftc + 1) % left.length;
}, 5000);

var right = [
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-1.jpg',
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-2.jpg',
    '/themes/contrib/aristotle/dist/images/adi/adi-haat-3.jpg'
];
var rightc = 0;
setInterval(function() {
    $('.aadiBottomRight').attr('src', right[rightc]);

    rightc = (rightc + 1) % right.length;
}, 5000);
 
 var small = [
    '/themes/contrib/aristotle/dist/images/KPIS/A1.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/A2.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/A3.jpg',
];

// Counter to track the current image index
var smallcounter = 0;

// Change the image source every 5 seconds
setInterval(function() {
    // Set the image source to the current image
    $('.smallSampadaImg').attr('src', small[smallcounter]);
    
    // Increment the counter and reset to 0 if it exceeds the length of the array
    smallcounter = (smallcounter + 1) % small.length;
}, 5000);

var main = [
'/themes/contrib/aristotle/dist/images/KPIS/M4.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/M5.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/M1.jpg'
];

// Counter to track the current image index
var maincounter = 0;

// Change the image source every 5 seconds
setInterval(function() {
    // Set the image source to the current image
    $('.mainSampadaImg').attr('src', main[maincounter]);
    
    // Increment the counter and reset to 0 if it exceeds the length of the array
    maincounter = (maincounter + 1) % main.length;
}, 6000);

var port = [
'/themes/contrib/aristotle/dist/images/KPIS/C1.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/C2.jpg',
'/themes/contrib/aristotle/dist/images/KPIS/C3.jpg'
];

// Counter to track the current image index
var portcounter = 0;

// Change the image source every 5 seconds
setInterval(function() {
    // Set the image source to the current image
    $('.portSampadaImg').attr('src', port[portcounter]);
    
    // Increment the counter and reset to 0 if it exceeds the length of the array
    portcounter = (portcounter + 1) % port.length;
}, 5000);
    $('.my-slick-slider').slick({
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        centerMode: true,
        variableWidth: false,
        centerPadding: '30px',
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [{
                breakpoint: 1024, // For screens smaller than 1024px
                settings: {
                    slidesToShow: 2,
                    centerPadding: '20px', // Adjust padding as needed
                }
            },
            {
                breakpoint: 768, // For screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    centerPadding: '15px',
                    dots: true // Enable dots for smaller screens if needed
                }
            },
            {
                breakpoint: 480, // For screens smaller than 480px
                settings: {
                    slidesToShow: 1,
                    centerPadding: '10px',
                    dots: true
                }
            }
        ]
    });
    $('.slide-vids').first().addClass('s--active');
    $('.slide-vids').last().addClass('s--prev');
    $(".option").click(function() {
        $(".option").removeClass("active");
        $(this).addClass("active");
    });
    $('.clothSlider').owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    });
    $('.image-display').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                nav: true,
                loop: true
            }
        }
    });
    
    $('.carousel__slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: true
            }
        }
    });
    $('#slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoWidth:true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: true
            }
        }
    });
    const $video = $('#main-video');
    const $videoSection = $('#video-section');
    const $otherSections = $('.mainContent');
    const $skipButton = $('#skip-button');

    // Hide other sections when the video starts playing
    $video.on('playing', function() {
        $otherSections.hide();
    });

    // Hide video section and show other sections when the video ends
    $video.on('ended', function() {
        $videoSection.hide(); // Hide the video section
        $otherSections.show(); // Show the other sections
    });

    // Skip button functionality
    $skipButton.on('click', function() {
        $video[0].pause(); // Pause the video
        $video[0].currentTime = 0; // Reset video to start
        $videoSection.hide(); // Hide the video section
        $otherSections.show(); // Show other sections
        $(this).hide(); // Hide the skip button
    });
    $(".selectpicker").selectpicker();

    // $('.filter-option-inner-inner').each(function() {
    //     if ($(this).text() === 'Nothing selected') {
    //         $(this).text('- Any -'); // Set to "Any"
    //     }
    // });

    $('[data-toggle="dropdown"]').attr('data-bs-toggle', 'dropdown')
        .removeAttr('data-toggle');


    $("#owl-demo").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navigation: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true, // Enables automatic sliding
        autoplayTimeout: 3000, // Slide interval (e.g., 3000ms = 3 seconds)
        autoplayHoverPause: true // Pauses autoplay when mouse hovers over
    });

    $('.carousel').owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    });

    $('#post-slider-blog').owlCarousel({
        // items: 2,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideBy: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 2,
                nav: true,
                loop: false
            }
        }
    });

    $('.banner').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        mouseDrag: false,
        autoplay: true,
        animateOut: 'slideOutUp',
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }

    });
    $(document).on('click', '.mute path', function() {
        // console.log('Mute clicked');
        // Hide mute and show unmute
        $('.mute').addClass('d-none');
        $('.unmute').removeClass('d-none');
        // Unmute the video
        $('.slide__inner video').prop('muted', false);
    });
    
    $(document).on('click', '.unmute path', function() {
        // console.log('Unmute clicked');
        // Hide unmute and show mute
        $('.unmute').addClass('d-none');
        $('.mute').removeClass('d-none');
        // Mute the video
        $('.slide__inner video').prop('muted', true);
    });
    $(document).on('click', '.play path', function() {
    // console.log('Play clicked');
    // Hide play button and show pause button
    $('.play').addClass('d-none');
    $('.pause').removeClass('d-none');
    // Play the video
    $('.slide__inner video').trigger('play');
});

    if($(".search").length) {
        $('.search > a').click(function(e){
            e.preventDefault();
            if(!$(this).hasClass('active')){
                $(this).addClass('active');
                $(this).next().slideDown(300);
            } else {
                $(this).removeClass('active');
                $(this).next().slideUp(300);
            }
            return false;
        });
    }
    $('.search').click(function(e){
        e.stopPropagation();
    });
    
    $(document).click(function(){
        $('.search .region-search-section').slideUp();
        $('.search > a').removeClass('active');
    });

$(document).on('click', '.pause path', function() {
    // console.log('Pause clicked');
    // Hide pause button and show play button
    $('.pause').addClass('d-none');
    $('.play').removeClass('d-none');
    // Pause the video
    $('.slide__inner video').trigger('pause');
});
    $('#myModal').modal('show');

    $('#myModal').on('shown.bs.modal', function() {
        const video = $('#modalVideo')[0];
        if (video) {
            video.play().catch(function(error) {
                console.error('Error trying to play the video:', error);
            });
        }
    });

    $('.pre-order-btn').on('click', function() {
        const video = $('#modalVideo')[0];
        if (video) {
            video.pause();
        }
        $('#myModal').modal('hide');
    });
});

const swiper2 = new Swiper('.Painting-container', {
    loop: true,
    speed: 800,
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
    effect: window.innerWidth <= 480 ? 'slide' : 'coverflow', // Dynamically set initial effect
    grabCursor: false,
    parallax: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    breakpoints: {
        1440: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1180: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: false,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 5,
            centeredSlides: true,
        },
    },
    on: {
        init: function () {
            if (this.slides.length > 0) {
                this.el.classList.remove('loading');
            }
        },
    },
});
// Listen for window resize to update effect dynamically
window.addEventListener('resize', function () {
    if (window.innerWidth <= 480 && swiper2.params.effect !== 'slide') {
        swiper2.params.effect = 'slide';
        swiper2.update();
    } else if (window.innerWidth > 480 && swiper2.params.effect !== 'coverflow') {
        swiper2.params.effect = 'coverflow';
        swiper2.update();
    }
});
if (document.querySelector('.splide')) {
var splide = new Splide('.splide', {
    type: 'fade',
    autoplay: true,
    interval: 4000,
    speed: 1500,
    rewind: true,
    arrows: true, // Enable navigation arrows
    pagination: true, // Enable pagination dots
    perPage: 1, // Show 3 slides
    // gap         : '1rem',     // Space between slides
    breakpoints: {
        768: { perPage: 1 }, // Show 1 slide on smaller screens
    },
});

splide.mount();
}

const swiper = new Swiper('.swiper-new', {
    grabCursor: false,
    centeredSlides: false,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        560: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const swiper1 = new Swiper('.swiperDance', {
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 5,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    keyboard: {
        enabled: true,
    },
    spaceBetween: 30,
    loop: true, // Set loop to true
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000, // Adjust the delay as needed (3000 ms = 3 seconds)
        disableOnInteraction: false, // Ensure autoplay continues after interaction
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper3 = new Swiper(".swipertree", {
  effect: "cube",
  grabCursor: false,
  loop: true,
  speed: 1000,
  cubeEffect: {
    shadow: false,
    slideShadows: true,
    shadowOffset: 10,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 2600,
    pauseOnMouseEnter: true,
  },
});

var swiper4 = new Swiper(".swipertree1", {
  effect: "cube",
  grabCursor: false,
  loop: true,
  speed: 1000,
  cubeEffect: {
    shadow: false,
    slideShadows: true,
    shadowOffset: 10,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 2600,
    pauseOnMouseEnter: true,
  },
});

var swiper5 = new Swiper(".swipertree2", {
  effect: "cube",
  grabCursor: false,
  loop: true,
  speed: 1000,
  cubeEffect: {
    shadow: false,
    slideShadows: true,
    shadowOffset: 10,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 2600,
    pauseOnMouseEnter: true,
  },
});


var eduJs = {
    i: function(e) {
        eduJs.d();
        eduJs.methods();
    },

    d: function(e) {
        this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html'),
            this.sideNav = $('.rbt-search-dropdown')
    },
    methods: function(e) {
        eduJs.salActive();
        eduJs.menuCurrentLink();
        eduJs.eduSwiperActive();
        eduJs.eduBgCardHover();
        eduJs.magnigyPopup();
        eduJs.counterUp();
        eduJs.pricingPlan();
        eduJs.courseView();
        eduJs.stickyHeader();
        eduJs.masonryActivation();
        eduJs._clickDoc();
        eduJs.wowActivation();
        eduJs.radialProgress();
        eduJs.marqueImage();
        eduJs.popupMobileMenu();
        eduJs.headerSticky();
        eduJs.qtyBtn();
        eduJs.checkoutPage();
        eduJs.offCanvas();
        eduJs.onePageNav();
        eduJs.transparentHeader();
        eduJs.categoryMenuHover();
        eduJs.cartSidenav();
        eduJs.filterClickButton();
        eduJs.selectPicker();
        eduJs.headerTopActivation();
        eduJs.magnificPopupActivation();
        eduJs.showMoreBtn();
        eduJs.sidebarVideoHidden();
        eduJs.courseActionBottom();
        eduJs.topbarExpend();
        eduJs.categoryOffcanvas();
        eduJs.autoslidertab();
        eduJs.moveAnimation();
        eduJs.contactForm();
        eduJs.player();
        eduJs.quizAns();
        eduJs.lessonAccor();
        eduJs.unloadImage();
        eduJs.searchValue();
        eduJs.lessonToggle();
        eduJs.categoryMenuHover2();
    },

    autoslidertab: function(params) {
        function tabChange() {
            var tabs = $('.nav-tabs.splash-nav-tabs > li');
            var active = tabs.find('a.active');
            var next = active.parent('li').next('li').find('a');
            if (next.length === 0) {
                next = tabs.first().find('a').on('click');
            }
            next.tab('show');
        }
        var tabCycle = setInterval(tabChange, 5000);
    },

    offCanvas: function(params) {
        if ($('#rbt-offcanvas-activation').length) {
            $('#rbt-offcanvas-activation').on('click', function() {
                    $('.side-menu').addClass('side-menu-active'),
                        $('body').addClass('offcanvas-menu-active')
                }),

                $('.close_side_menu').on('click', function() {
                    $('.side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('offcanvas-menu-active')
                }),

                $('.side-menu .side-nav .navbar-nav li a').on('click', function() {
                    $('.side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('offcanvas-menu-active')
                }),

                $('#btn_sideNavClose').on('click', function() {
                    $('.side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('offcanvas-menu-active')
                });
        }




    },

    cartSidenav: function(params) {
        if ($('.rbt-cart-sidenav-activation').length) {
            $('.rbt-cart-sidenav-activation').on('click', function() {
                    $('.rbt-cart-side-menu').addClass('side-menu-active'),
                        $('body').addClass('cart-sidenav-menu-active')
                }),

                $('.minicart-close-button').on('click', function() {
                    $('.rbt-cart-side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('cart-sidenav-menu-active')
                }),

                $('.side-menu .side-nav .navbar-nav li a').on('click', function() {
                    $('.rbt-cart-side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('cart-sidenav-menu-active')
                }),

                $('#btn_sideNavClose, .close_side_menu').on('click', function() {
                    $('.rbt-cart-side-menu').removeClass('side-menu-active'),
                        $('body').removeClass('cart-sidenav-menu-active')
                });
        }
    },


    menuCurrentLink: function() {
        var currentPage = location.pathname.split("/"),
            current = currentPage[currentPage.length - 1];
        $('.mainmenu li a, .dashboard-mainmenu li a, .for-right-content .rbt-course-main-content li a').each(function() {
            var $this = $(this);
            if ($this.attr('href') === current) {
                $this.addClass('active');
                $this.parents('.has-menu-child-item').addClass('menu-item-open')
            }
        });
    },


    salActive: function() {
        sal({
            threshold: 0.01,
            once: true,
        });
    },

    eduParalax: function() {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
    },

    eduSwiperActive: function() {
        var swiper = new Swiper('.banner-swiper-active', {
            effect: 'cards',
            grabCursor: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
        });

        var swiper = new Swiper('.team-slide-activation', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });

        var swiper = new Swiper('.team-slide-activation-4', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },

                1200: {
                    slidesPerView: 4,
                },
            },
        });

        var swiper = new Swiper('.blog-post-gallery-activation', {
            slidesPerView: 1,
            autoHeight: true,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            }
        });

        var swiper = new Swiper('.team-slide-activation-2', {
            slidesPerView: 3,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });

        var swiper = new Swiper('.service-item-3-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                481: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });

        var swiper = new Swiper('.viral-banner-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
        });

        var swiper = new Swiper('.udemy-affilite-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
        });



        var swiperThumb = new Swiper('.rbtmySwiperThumb', {
            spaceBetween: 10,
            slidesPerView: 2,
            freeMode: true,
            watchSlidesProgress: true,
        });

        var swiper = new Swiper('.rbt-banner-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            autoHeight: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            thumbs: {
                swiper: swiperThumb,
            },
        });

        var swiper = new Swiper('.rbt-gif-banner-area', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
        });

        var swiper = new Swiper('.testimonial-item-3-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },

                768: {
                    slidesPerView: 2,
                },

                992: {
                    slidesPerView: 3,
                },
            },
        });

        var swiper = new Swiper('.testimonial-activation-1', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
        });

        var swiper = new Swiper('.modern-course-carousel-activation', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
        });

        var swiper = new Swiper('.category-activation-one', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            breakpoints: {
                481: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });

        var swiper = new Swiper('.category-activation-two', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
                snapOnRelease: true
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                481: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },

                1200: {
                    slidesPerView: 6,
                },
            },
        });

        var swiper = new Swiper('.category-activation-three', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
                snapOnRelease: true
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                481: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });

        var swiper = new Swiper('.event-activation-1', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
                snapOnRelease: true
            },
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },

                768: {
                    slidesPerView: 2,
                },

                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
            },
        });

        var swiper = new Swiper('.banner-splash-inner-layout-active', {
            effect: 'cards',
            grabCursor: true,
            clickable: true,
            loop: true,
            pagination: {
                el: '.rbt-swiper-pagination',
                clickable: true,
                type: "fraction",
            },
            navigation: {
                nextEl: '.rbt-arrow-left',
                prevEl: '.rbt-arrow-right',
                clickable: true,
            },
        });
    },

    eduBgCardHover: function() {
        $('.rbt-hover-active').mouseenter(function() {
            var self = this;
            setTimeout(function() {
                $('.rbt-hover-active.active').removeClass('active');
                $(self).addClass('active');
            }, 0);
        });
    },


    magnigyPopup: function() {
        $(document).ready(function() {
            $('.popup-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: true,
                fixedContentPos: false,

            });
        });
    },

    counterUp: function() {
        var odo = $('.odometer');
        odo.each(function() {
            $('.odometer').appear(function(e) {
                var countNumber = $(this).attr('data-count');
                $(this).html(countNumber);
            });
        });
    },


    pricingPlan: function() {
        var mainPlan = $('.rbt-pricing-area');
        mainPlan.each(function() {
            var yearlySelectBtn = $('.yearly-plan-btn'),
                monthlySelectBtn = $('.monthly-plan-btn'),
                monthlyPrice = $('.monthly-pricing'),
                yearlyPrice = $('.yearly-pricing'),
                buttonSlide = $('.pricing-checkbox');

            $(monthlySelectBtn).on('click', function() {
                buttonSlide.prop('checked', true);
                $(this).addClass('active').parent('.nav-item').siblings().children().removeClass('active');
                monthlyPrice.css('display', 'block');
                yearlyPrice.css('display', 'none');
            });

            $(yearlySelectBtn).on('click', function() {
                buttonSlide.prop('checked', false);
                $(this).addClass('active').parent('.nav-item').siblings().children().removeClass('active');
                monthlyPrice.css('display', 'none');
                yearlyPrice.css('display', 'block');
            });

            $(buttonSlide).change(function() {
                if ($('input[class="pricing-checkbox"]:checked').length > 0) {
                    monthlySelectBtn.addClass('active');
                    yearlySelectBtn.removeClass('active');
                    monthlyPrice.css('display', 'block');
                    yearlyPrice.css('display', 'none');
                } else {
                    yearlySelectBtn.addClass('active');
                    monthlySelectBtn.removeClass('active');
                    monthlyPrice.css('display', 'none');
                    yearlyPrice.css('display', 'block');
                }
            });
        });
    },

    courseView: function() {
        var gridViewBtn = $('.rbt-grid-view'),
            listViewBTn = $('.rbt-list-view');

        $(gridViewBtn).on('click', function() {
            $(this).addClass('active').parent('.course-switch-item').siblings().children().removeClass('active');
            $('.rbt-course-grid-column').addClass('active-grid-view');
            $('.rbt-course-grid-column').removeClass('active-list-view');
            $('.rbt-card').removeClass('card-list-2');
        })

        $(listViewBTn).on('click', function() {
            $(this).addClass('active').parent('.course-switch-item').siblings().children().removeClass('active');
            $('.rbt-course-grid-column').removeClass('active-grid-view');
            $('.rbt-course-grid-column').addClass('active-list-view');
            $('.rbt-card').addClass('card-list-2');
        })
    },


    stickyHeader: function() {
        // Header Transparent
        if ($('header').hasClass('header-transparent')) {
            $('body').addClass('active-header-transparent')
        } else {
            $('body').removeClass('active-header-transparent')
        }
    },

    masonryActivation: function name(params) {
        $(window).on("load", function() {
            $('.masonary-wrapper-activation').imagesLoaded(function() {
                // filter items on button click
                $('.messonry-button').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $(this).siblings('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                // init Isotope
                var $grid = $('.mesonry-list').isotope({
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.resizer',
                    }
                });
            });
        })

        $(window).on("load", function() {
            $('.splash-masonary-wrapper-activation').imagesLoaded(function() {
                // filter items on button click
                $('.messonry-button').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $(this).siblings('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                // init Isotope
                var $grid = $('.splash-mesonry-list').isotope({
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.resizer',
                    }
                });
            });
        })
    },


    _clickDoc: function() {
        var inputblur, inputFocus, openSideNav, closeSideNav;
        inputblur = function(e) {
            if (!$(this).val()) {
                $(this).parent('.form-group').removeClass('focused');
            }
        };
        inputFocus = function(e) {
            $(this).parents('.form-group').addClass('focused');
        };
        openSideNav = function(e) {
            e.preventDefault();
            eduJs.sideNav.addClass('active');
            $('.search-trigger-active').addClass('open');
            eduJs._html.addClass('side-nav-opened');
        };

        closeSideNav = function(e) {
            if (!$('.rbt-search-dropdown, .rbt-search-dropdown *:not(".search-trigger-active, .search-trigger-active *")').is(e.target)) {
                eduJs.sideNav.removeClass('active');
                $('.search-trigger-active').removeClass('open');
                eduJs._html.removeClass('side-nav-opened');
            }
        };
        eduJs._document
            .on('blur', 'input,textarea,select', inputblur)
            .on('focus', 'input:not([type="radio"]),input:not([type="checkbox"]),textarea,select', inputFocus)
            .on('click', '.search-trigger-active', openSideNav)
            .on('click', '.side-nav-opened', closeSideNav)
    },

    wowActivation: function() {
        new WOW().init();
    },

    radialProgress: function() {
        $(window).scroll(function() {
            /* Check the location of each desired element */
            $('.radial-progress').each(function(i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                /* If the object is completely visible in the window, fade it in */
                if (bottom_of_window > bottom_of_object) {
                    $('.radial-progress').easyPieChart({
                        lineWidth: 10,
                        scaleLength: 0,
                        rotate: 0,
                        trackColor: false,
                        lineCap: 'round',
                        size: 180,
                        onStep: function(from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                }
            });
        });
    },


    marqueImage: function() {
        $('.edumarque').each(function() {
            var t = 0;
            var i = 1;
            var $this = $(this);
            setInterval(function() {
                t += i;
                $this.css('background-position-x', -t + 'px');
            }, 10);
        });
    },


    popupMobileMenu: function(e) {
        $('.hamberger-button').on('click', function(e) {
            $('.popup-mobile-menu').addClass('active');
        });

        $('.close-button').on('click', function(e) {
            $('.popup-mobile-menu').removeClass('active');
            $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a').siblings('.submenu, .rbt-megamenu').removeClass('active').slideUp('400');
            $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a').removeClass('open')
        });

        $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a').on('click', function(e) {
            e.preventDefault();
            $(this).siblings('.submenu, .rbt-megamenu').toggleClass('active').slideToggle('400');
            $(this).toggleClass('open')
        })

        $('.popup-mobile-menu, .popup-mobile-menu .mainmenu.onepagenav li a').on('click', function(e) {
            e.target === this && $('.popup-mobile-menu').removeClass('active') && $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a').siblings('.submenu, .rbt-megamenu').removeClass('active').slideUp('400') && $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a').removeClass('open');
        });
    },

    headerSticky: function() {
        $(window).on('scroll', function() {
            if ($('body').hasClass('rbt-header-sticky')) {
                var stickyPlaceHolder = $('.rbt-sticky-placeholder'),
                    headerConainer = $('.rbt-header-wrapper'),
                    headerConainerH = headerConainer.outerHeight(),
                    topHeaderH = $('.rbt-header-top').outerHeight() || 0,
                    targrtScroll = topHeaderH + 200;
                if ($(window).scrollTop() > targrtScroll) {
                    headerConainer.addClass('rbt-sticky');
                    stickyPlaceHolder.height(headerConainerH);
                } else {
                    headerConainer.removeClass('rbt-sticky');
                    stickyPlaceHolder.height(0);
                }
            }
        });
    },

    qtyBtn: function() {
        $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
        $('.pro-qty').append('<span class="inc qtybtn">+</span>');
        $('.qtybtn').on('click', function() {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });
    },

    checkoutPage: function() {
        $('[data-shipping]').on('click', function() {
            if ($('[data-shipping]:checked').length > 0) {
                $('#shipping-form').slideDown();
            } else {
                $('#shipping-form').slideUp();
            }
        })
        $('[name="payment-method"]').on('click', function() {
            var $value = $(this).attr('value');
            $('.single-method p').slideUp();
            $('[data-method="' + $value + '"]').slideDown();
        })
    },

    onePageNav: function() {
        $('.onepagenav').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 500,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
        });
    },

    transparentHeader: function() {
        if ($('.rbt-header').hasClass('rbt-transparent-header')) {
            var mainHeader = $('.rbt-header').outerHeight();
            $('body').addClass('rbt-header-transpernt-active');
            $('.header-transperent-spacer').css('padding-top', mainHeader + 'px');
        }
    },

    categoryMenuHover: function() {
        $('.vertical-nav-menu li.vertical-nav-item').mouseover(function() {
            $('.rbt-vertical-inner').hide();
            $('.vertical-nav-menu li.vertical-nav-item').removeClass('active');
            $(this).addClass('active');
            var selected_tab = $(this).find('a').attr("href");
            $(selected_tab).stop().fadeIn();
            return false;
        });
    },

    selectPicker: function() {
        $('select').selectpicker();
    },

    filterClickButton: function() {
        // $('.discover-filter-activation').on('click', function() {
        //     $(this).toggleClass('open');
        //     $('.default-exp-expand').slideToggle('400');
        // })
        // $('#slider-range').slider({
        //     range: true,
        //     min: 10,
        //     max: 500,
        //     values: [100, 300],
        //     slide: function(event, ui) {
        //         $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
        //     }
        // });
        // $('#amount').val('$' + $('#slider-range').slider('values', 0) +
        //     " - $" + $('#slider-range').slider('values', 1));
    },


    headerTopActivation: function() {
        $('.bgsection-activation').on('click', function() {
            $(this).parents('.rbt-header-campaign').addClass('deactive')
        })
    },

    magnificPopupActivation: function() {
        $('.parent-gallery-container').magnificPopup({
            delegate: '.child-gallery-single', // child items selector, by clicking on it popup will open
            type: 'image',
            mainClass: 'mfp-with-zoom',
            // other options
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it
                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function
                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    },

    showMoreBtn: function() {
        $.fn.hasShowMore = function() {
            return this.each(function() {
                $(this).toggleClass('active');
                $(this).text('Show Less');
                $(this).parent('.has-show-more').toggleClass('active');
                if ($(this).parent('.has-show-more').hasClass('active')) {
                    $(this).text('Show Less');
                } else {
                    $(this).text('Show More');
                }
            });
        };
        $(document).on('click','.rbt-show-more-btn', function() {
            $(this).hasShowMore();
        });
    },

    sidebarVideoHidden: function() {
        var scrollTop = $('.sidebar-video-hidden');
        $(window).scroll(function() {
            // declare variable
            var topPos = $(this).scrollTop();
            // if user scrolls down - show scroll to top button
            if (topPos > 250) {
                $(scrollTop).css('display', 'none');
            } else {
                $(scrollTop).css('display', 'block');
            }
        });
    },

    courseActionBottom: function() {
        var scrollBottom = $('.rbt-course-action-bottom');
        $(window).scroll(function() {
            var topPos = $(this).scrollTop();
            var targetPossition = $(document).height() * 0.66;
            var filled = (($(document).scrollTop() + window.innerHeight) / $(document).height());
            if (topPos > targetPossition && filled != 1) {
                $(scrollBottom).addClass('rbt-course-action-active');
            } else {
                $(scrollBottom).removeClass('rbt-course-action-active')
            }
        });
    },

    topbarExpend: function() {
        var windowWidth = $(window).width(); {
            if (windowWidth < 1199) {
                $('.top-bar-expended').on('click', function() {
                    $('.top-expended-activation').hasClass('active') ? ($('.top-expended-activation').removeClass('active'), $('.top-expended-activation').find('.top-expended-wrapper').css({ height: '32px' })) : ($('.top-expended-activation').addClass('active'), $('.top-expended-activation').find('.top-expended-wrapper').css({ height: ($('.top-expended-inner')).outerHeight() + 'px' }))
                })
                $(window).on('hresize', function() {
                    $('.top-expended-activation').hasClass('active') && $('.top-expended-activation').find('.top-expended-inner').css({
                        height: ($('.top-expended-inner')).outerHeight() + 'px'
                    })
                })
            }
        }
    },

    categoryOffcanvas: function() {
        var windowWidth = $(window).width();
        if (windowWidth < 1200) {
            $('.rbt-side-offcanvas-activation').on('click', function() {
                $('.rbt-offcanvas-side-menu').addClass('active-offcanvas')
            })
            $('.rbt-close-offcanvas').on('click', function() {
                $('.rbt-offcanvas-side-menu').removeClass('active-offcanvas')
            })
            $('.rbt-offcanvas-side-menu').on('click', function(e) {
                e.target === this && $('.rbt-offcanvas-side-menu').removeClass('active-offcanvas');
            });
            $('.rbt-vertical-nav-list-wrapper .vertical-nav-item a').on('click', function(e) {
                e.preventDefault();
                $(this).siblings('.vartical-nav-content-menu-wrapper').toggleClass('active').slideToggle('400');
                $(this).toggleClass('active')
            })
        }
    },

    moveAnimation: function() {
        $('.scene').each(function() {
            new Parallax($(this)[0]);
        });
    },

    contactForm: function() {
        $('.rainbow-dynamic-form').on('submit', function(e) {
            e.preventDefault();
            var _self = $(this);
            var __selector = _self.closest('input,textarea');
            _self.closest('div').find('input,textarea').removeAttr('style');
            _self.find('.error-msg').remove();
            _self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
            var data = $(this).serialize();
            $.ajax({
                url: 'mail.php',
                type: "post",
                dataType: 'json',
                data: data,
                success: function(data) {
                    _self.closest('div').find('button[type="submit"]').removeAttr('disabled');
                    if (data.code == false) {
                        _self.closest('div').find('[name="' + data.field + '"]');
                        _self.find('.rainbow-btn').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
                    } else {
                        $('.error-msg').hide();
                        $('.form-group').removeClass('focused');
                        _self.find('.rainbow-btn').after('<div class="success-msg"><p>' + data.success + '</p></div>');
                        _self.closest('div').find('input,textarea').val('');

                        setTimeout(function() {
                            $('.success-msg').fadeOut('slow');
                        }, 5000);
                    }
                }
            });
        });
    },

    player: function() {
        var player = new Plyr('.rbtplayer', {
            muted: false,
            volume: 1,
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        });
    },


    quizAns: function() {
        var currentQuestion = 1;
        showQuestion(currentQuestion);

        $('#next-btn').click(function() {
            if (currentQuestion < $('.question').length) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });

        $('#prev-btn').click(function() {
            if (currentQuestion > 1) {
                currentQuestion--;
                showQuestion(currentQuestion);
            }
        });

        function showQuestion(questionNumber) {
            $('.question').hide();
            $('#question-' + questionNumber).show();

            if (questionNumber == 1) {
                $('#prev-btn').prop('disabled', true);
            } else {
                $('#prev-btn').prop('disabled', false);
            }

            if (questionNumber == $('.question').length) {
                $('#next-btn').hide();
                $("#submit-btn").show();
            } else {
                $('#next-btn').show();
                $('#submit-btn').hide();
            }
        }
        $('#quiz-form').submit(function(event) {
            event.preventDefault();

            // Here, you can add your logic to grade the quiz and show the results to the user
            //   alert("Quiz submitted!");
        });
    },

    lessonAccor: function() {
        // Get saved data from sessionStorage
        let selectedCollapse = sessionStorage.getItem('selectedCollapse');
        if (selectedCollapse != null) {
            $('.accordion .collapse').removeClass('show');
            $('.accordion-button').addClass('collapsed').attr('aria-expanded', false);
            $(selectedCollapse).addClass('show');
            $(selectedCollapse).siblings().find('button').removeClass('collapsed').attr('aria-expanded', true);
        }
        // To set, which one will be opened
        $('.accordion .accordion-button').on("click", function() {
            let target = $(this).data('bs-target');
            // Save data to sessionStorage
            sessionStorage.setItem('selectedCollapse', target);
        });
    },


    unloadImage: function name() {
        $('#createfileImage').click(function(e) {
            $('#createinputfile').click();
        });

        function rbtPreview() {
            const [file2] = createinputfile.files
            if (file2) {
                createfileImage.src = URL.createObjectURL(file2)
            }
        }
        $('#createinputfile').change(function() {
            rbtPreview(this);
        });
    },

    searchValue: function() {
        $(document).on('keyup', '.rbt-search-active', function() {
            var value = $(this).val().toLowerCase();
            $('.rbt-search-activation .accordion .accordion-item').filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    },

    lessonToggle: function() {
        $('.lesson-toggle-active').on('click', function() {
            $(this).toggleClass('sidebar-hide')
            $('.rbt-lesson-leftsidebar').toggleClass('sibebar-none');
        })
    },


    categoryMenuHover2: function() {
        $('.dropdown-parent-wrapper li.dropdown-parent-list').mouseover(function() {
            $('.dropdown-child-wrapper').hide();
            $('.dropdown-parent-wrapper li.dropdown-parent-list').removeClass('active');
            $(this).addClass('active');
            var selected_tab = $(this).find('a').attr("href");
            $(selected_tab).stop().fadeIn();
            return false;
        });
    },

}
eduJs.i();


(function() {
  var $slides = document.querySelectorAll('.slide-vids');
  var $controls = document.querySelectorAll('.slider__control');
  var numOfSlides = $slides.length;
  var slidingAT = 1300; // sync this with scss variable
  var slidingBlocked = false;

  [].slice.call($slides).forEach(function($el, index) {
    var i = index + 1;
    $el.classList.add('slide-vids-' + i);
    $el.dataset.slide = i;
  });

  [].slice.call($controls).forEach(function($el) {
    $el.addEventListener('click', controlClickHandler);
  });

  function controlClickHandler() {
    if (slidingBlocked) return;
    slidingBlocked = true;

    var $control = this;
    var isRight = $control.classList.contains('m--right');
    var $curActive = document.querySelector('.slide-vids.s--active');
    var index = +$curActive.dataset.slide;
    (isRight) ? index++ : index--;
    if (index < 1) index = numOfSlides;
    if (index > numOfSlides) index = 1;
    var $newActive = document.querySelector('.slide-vids-' + index);

    $control.classList.add('a--rotation');
    $curActive.classList.remove('s--active', 's--active-prev');
    document.querySelector('.slide-vids.s--prev').classList.remove('s--prev');
    
    $newActive.classList.add('s--active');
    if (!isRight) $newActive.classList.add('s--active-prev');
    

    var prevIndex = index - 1;
    if (prevIndex < 1) prevIndex = numOfSlides;

    document.querySelector('.slide-vids-' + prevIndex).classList.add('s--prev');

    setTimeout(function() {
      $control.classList.remove('a--rotation');
      slidingBlocked = false;
    }, slidingAT*0.75);
  };
}());
if (document.querySelector('.adis-haats')) {
const slides = [{
            image: "/themes/contrib/aristotle/dist/images/haat.jpg",
            title: "Empowering Tribal Artisans Digitally",
            description: "Aadi Haat is revolutionizing the way tribal artisans interact with the modern market by providing a digital platform for them to sell their art and handicrafts. In the digital age, this marketplace helps connect these artisans to a global audience, allowing their unique craftsmanship to be appreciated far and wide. It also provides them with the opportunity to set fair prices for their creations, ensuring they receive equitable compensation for their hard work. This digital shift is a crucial step in empowering tribal communities, fostering a sense of independence and pride in their craft."
        },
        {
            image: "/themes/contrib/aristotle/dist/images/haat3.jpg",
            title: "Bridging Cultural Heritage and Modern Commerce",
            description: "Aadi Haat serves as a powerful bridge between traditional tribal art and the commercial world. By offering a space for indigenous artists to showcase their work online, this initiative helps preserve ancient art forms while allowing them to thrive in the global marketplace. The platform not only highlights the beauty and skill of tribal handicrafts but also educates consumers about the cultural significance behind these works. This fusion of cultural heritage and commerce ensures that tribal artists can maintain their traditional techniques while adapting to the demands of modern markets."
        },
        {
            image: "/themes/contrib/aristotle/dist/images/haat1.jpeg",
            title: "Promoting Financial Independence and Sustainability",
            description: "Aadi Haat is more than just a digital marketplace; it is an essential tool for promoting financial independence and sustainability within tribal communities. By giving tribal artisans direct access to customers and fair-market opportunities, the platform helps eliminate middlemen, ensuring that artists earn a higher income from their creations. Additionally, the financial stability offered by Aadi Haat allows artisans to invest in improving their craft, supporting local economies, and creating sustainable livelihoods for future generations. Through this initiative, tribal communities are empowered to thrive economically without losing their cultural identity."
        }
    ];

    let currentSlide = 0;

    function showSlide(index) {
        const slide = slides[index];
        document.getElementById("sliderImage").src = slide.image;
        document.getElementById("sliderTitle").textContent = slide.title;
        document.getElementById("sliderDescription").textContent = slide.description;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize the first slide
    showSlide(currentSlide);

    // haat end here

const Carousel = (() => {
  let autoSlideInterval;
  let lastActiveSlide = null; // Variable to track the last active slide
  let secondLastActiveSlide = null; // Variable to track the second-to-last active slide

  const getActiveSlide = () =>
    document.querySelector(".carousel__slide.active");
  const getFirstSlide = () =>
    document.querySelector(".carousel__slider").firstElementChild;
  const getLastSlide = () =>
    document.querySelector(".carousel__slider").lastElementChild;

  const getSiblingSlide = (slide, direction) => {
    if (direction === "prev") {
      // If at the first slide, loop to the last
      return slide.previousElementSibling || getLastSlide();
    } else {
      // If at the last slide, loop to the first
      return slide.nextElementSibling || getFirstSlide();
    }
  };

  const getNewActiveSlide = (key, activeSlide) => {
    const actions = {
      Home: getFirstSlide,
      End: getLastSlide,
      ArrowLeft: () => getSiblingSlide(activeSlide, "prev"),
      ArrowRight: () => getSiblingSlide(activeSlide, "next")
    };
    return actions[key]?.() || null;
  };

  const updateScreen = () => {
    const carouselScreen = document.querySelector(".image-display .screen");
    const img = (secondLastActiveSlide || lastActiveSlide || getActiveSlide()).querySelector("img").cloneNode(true);
    carouselScreen.innerHTML = "";
    carouselScreen.appendChild(img);
  };

  const scrollToActiveSlide = (activeSlide) => {
    const carouselSlider = document.querySelector(".carousel__slider");
    const { offsetLeft, offsetWidth } = activeSlide;
    const { clientWidth } = carouselSlider;

    carouselSlider.scrollTo({
      left: offsetLeft - clientWidth / 2 + offsetWidth / 2,
      behavior: "smooth"
    });
  };

  const updateActiveSlideClass = (activeSlide) => {
    document
      .querySelectorAll(".carousel__slide.active")
      .forEach((slide) => slide.classList.remove("active"));
    activeSlide.classList.add("active");
  };

  const updateCarousel = (activeSlide) => {
    secondLastActiveSlide = lastActiveSlide; // Store the last active slide before updating
    lastActiveSlide = getActiveSlide(); // Update the last active slide
    updateActiveSlideClass(activeSlide);
    updateScreen(); // Show the second-to-last active slide
    scrollToActiveSlide(activeSlide);
    updateButtonStates(activeSlide);
  };

  const updateButtonStates = (activeSlide) => {
    const prevButton = document.querySelector(".carousel__btn.prev");
    const nextButton = document.querySelector(".carousel__btn.next");

    prevButton.disabled = !getSiblingSlide(activeSlide, "prev");
    nextButton.disabled = !getSiblingSlide(activeSlide, "next");
  };

  const handleKeydown = (e) => {
    if (!e.target.closest(".carousel__slider")) return;
    const activeSlide = getActiveSlide();
    const newActiveSlide = getNewActiveSlide(e.key, activeSlide);

    if (newActiveSlide) {
      e.preventDefault();
      updateCarousel(newActiveSlide);
      resetAutoSlide(); // Reset the timer when a key is pressed
    }
  };

  const handleButtonClick = (e) => {
    const activeSlide = getActiveSlide();
    const newActiveSlide = getSiblingSlide(
      activeSlide,
      e.currentTarget.classList.contains("prev") ? "prev" : "next"
    );

    if (newActiveSlide) {
      updateCarousel(newActiveSlide);
      resetAutoSlide(); // Reset the timer when a button is clicked
    }
  };

  const handleCarouselClick = (e) => {
    const clickedSlide = e.target.closest(".carousel__slide");
    if (clickedSlide) {
      updateCarousel(clickedSlide);
      resetAutoSlide(); // Reset the timer when a slide is clicked
    }
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      const activeSlide = getActiveSlide();
      const nextSlide = getSiblingSlide(activeSlide, "next");
      updateCarousel(nextSlide);
    }, 3000); // Slide interval (3 seconds)
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  const initCarousel = () => {
    const carouselSlider = document.querySelector(".carousel__slider");
    const prevButton = document.querySelector(".carousel__btn.prev");
    const nextButton = document.querySelector(".carousel__btn.next");

    updateCarousel(getFirstSlide());
    startAutoSlide(); // Start the automatic sliding

    document.addEventListener("keydown", handleKeydown);
    prevButton.addEventListener("click", handleButtonClick);
    nextButton.addEventListener("click", handleButtonClick);
    carouselSlider.addEventListener("click", handleCarouselClick);
  };

  //initCarousel();
})();
}
// // Get the necessary DOM elements
// var containercourse = document.getElementById('containercourse');
// var slider = document.getElementById('slider');
// var slides = document.getElementsByClassName('slide').length;
// var buttons = document.getElementsByClassName('btncourses');

// // Initialize variables for the slider
// var currentPosition = 0;
// var currentMargin = 0;
// var slidesPerPage = 0;
// var slidesCount = slides - slidesPerPage;
// var containercourseWidth = containercourse.offsetWidth;

// // Add an event listener to adjust the slider based on the window width
// window.addEventListener("resize", checkWidth);

// function checkWidth() {
//     containercourseWidth = containercourse.offsetWidth;
//     setParams(containercourseWidth);
// }

// // Set the number of slides per page based on the container width
// function setParams(w) {
//     if (w < 551) {
//         slidesPerPage = 1;
//     } else if (w < 901) {
//         slidesPerPage = 2;
//     } else if (w < 1101) {
//         slidesPerPage = 3;
//     } else {
//         slidesPerPage = 4;
//     }

//     slidesCount = slides - slidesPerPage;
//     if (currentPosition > slidesCount) {
//         currentPosition = slidesCount;
//     }

//     currentMargin = -currentPosition * (100 / slidesPerPage);
//     slider.style.marginLeft = currentMargin + '%';

//     updateButtons();
// }

// // Update button visibility based on the current position
// function updateButtons() {
//     if (currentPosition > 0) {
//         buttons[0].classList.remove('inactive');
//     } else {
//         buttons[0].classList.add('inactive');
//     }

//     if (currentPosition < slidesCount) {
//         buttons[1].classList.remove('inactive');
//     } else {
//         buttons[1].classList.add('inactive');
//     }
// }

// // Initialize the slider parameters
// setParams(containercourseWidth);

// // Function to move the slider to the right (backwards)
// function slideRight() {
//     if (currentPosition > 0) {
//         currentPosition--;
//         currentMargin += (100 / slidesPerPage);
//         slider.style.marginLeft = currentMargin + '%';
//     }

//     updateButtons();
// }

// // Function to move the slider to the left (forwards)
// function slideLeft() {
//     if (currentPosition < slidesCount) {
//         currentPosition++;
//         currentMargin -= (100 / slidesPerPage);
//         slider.style.marginLeft = currentMargin + '%';
//     } else {
//         // Loop back to the first slide if the end is reached
//         currentPosition = 0;
//         currentMargin = 0;
//         slider.style.marginLeft = currentMargin + '%';
//     }

//     updateButtons();
// }

// // Automatic sliding functionality
// var autoSlideInterval = setInterval(slideLeft, 3000); // Automatically slide left every 3 seconds

// // Optional: Stop the automatic sliding when the user interacts with buttons
// Array.from(buttons).forEach(button => {
//     button.addEventListener('click', () => {
//         clearInterval(autoSlideInterval);  // Stop the automatic sliding on button click
//     });
// });