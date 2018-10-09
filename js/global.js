(function ($) {
    // USE STRICT
    "use strict";

    // Global variables
    var body = $('body');
    var html = $('html');
    var html_body = $('html, body');


    //-------------------------------------------------------
    // Config Library
    //-------------------------------------------------------

    // Config Slick
    var slickClass = $('.js-slick');
    slickClass.each(function () {
        var option = {
            accessibility: true,
            adaptiveheight: false,
            autoplay: false,
            autoplayspeed: 5000,
            arrows: false,
            asnavfor: null,
            appendarrows: $(this),
            appenddots: $(this),
            prevarrow: '<button type="button" class="slick-prev">Previous</button>',
            nextarrow: '<button type="button" class="slick-next">Next</button>',
            centermode: false,
            centerpadding: '50px',
            cssease: 'ease',
            dots: false,
            dotsclass: 'slick-dots',
            draggable: true,
            fade: false,
            speed: 500,
            pauseonhover: false,
            lg: 1, md: this.lg, sm: this.md, xs: this.sm,
            vertical: false,
            loop: true,
            thumb: false

        };

        for (var k in option) {
            if (option.hasOwnProperty(k)) {
                if ($(this).attr('data-slick-' + k) != null) {
                    option[k] = $(this).data('slick-' + k);
                }
            }
        }

        if (option.thumb)
            $(this).slick({
                accessibility: option.accessibility,
                adaptiveHeight: option.adaptiveheight,
                autoplay: option.autoplay,
                autoplaySpeed: option.autoplayspeed,
                arrows: option.arrows,
                asNavFor: option.asnavfor,
                appendArrows: option.appendarrows,
                appendDots: option.appenddots,
                prevArrow: option.prevarrow,
                nextArrow: option.nextarrow,
                centerMode: option.centermode,
                centerPadding: option.centerpadding,
                cssease: option.cssease,
                dots: option.dots,
                dotsClass: option.dotsclass,
                draggable: option.draggable,
                pauseOnHover: option.pauseonhover,
                fade: option.fade,
                vertical: option.vertical,
                slidesToShow: option.lg,
                infinite: option.loop,
                swipeToSlide: true,
                customPaging: function(slick, index) {
                    var portrait = $(slick.$slides[index]).data('thumb');
                    return '<img src=" ' + portrait + ' "/><div class="bg-overlay"></div>';
                },

                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: option.lg
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: option.md
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: option.sm
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: option.xs,
                            fade: false
                        }
                    }
                ]
            });
        else
            $(this).slick({
                accessibility: option.accessibility,
                adaptiveHeight: option.adaptiveheight,
                autoplay: option.autoplay,
                autoplaySpeed: option.autoplayspeed,
                arrows: option.arrows,
                asNavFor: option.asnavfor,
                appendArrows: option.appendarrows,
                appendDots: option.appenddots,
                prevArrow: option.prevarrow,
                nextArrow: option.nextarrow,
                centerMode: option.centermode,
                centerPadding: option.centerpadding,
                cssease: option.cssease,
                dots: option.dots,
                dotsClass: option.dotsclass,
                draggable: option.draggable,
                pauseOnHover: option.pauseonhover,
                fade: option.fade,
                vertical: option.vertical,
                slidesToShow: option.lg,
                infinite: option.loop,
                swipeToSlide: true,

                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: option.lg
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: option.md
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: option.sm
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: option.xs,
                            fade: false
                        }
                    }
                ]
            });

        $(this).on('init', function() {
            var $firstAnimatingElements = $('div.hero-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        $(this).on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $(this).find('[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });


        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('animation-delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    });

    // Config Animsition
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 800,
        outDuration: 800,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'loader-wrapper',
        loadingInner: '<div class="loader"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });

    // Config Couter up
    var counterUp = $(".counterUp");
    if (counterUp) {
        counterUp.counterUp({
            delay: 10,
            time: 1000
        });
    }

    // WOW JS
    if ($(window).width() >= 992)
        new WOW().init();

    //-------------------------------------------------------
    // Theme JS
    //-------------------------------------------------------


    // Navbar Toggle
    body.append('<div class="body-overlay" style="display: none;"></div>');
    var btnHeaderToggle = $('#js-header-toggle');
    var headerWrapper = $('#js-header');
    var bodyOverlay = $('.body-overlay');

    function openMenu() {
        body.css('overflow', 'hidden');
        headerWrapper.addClass('open');
        bodyOverlay.fadeIn();
    }
    function closeMenu() {
        body.css('overflow', 'visible');
        headerWrapper.removeClass('open');
        bodyOverlay.fadeOut();
    }

    btnHeaderToggle.on('click', function (event) {
        if (headerWrapper.hasClass('open')) {
            closeMenu();
        } else {
            openMenu();
        }
        event.preventDefault();
        return false;
    });

    var swipe_area = $('.body-overlay, .header-push');
    var header_bar = $('.header-bar');
    bodyOverlay.css('top', header_bar.height());

    if ($(window).width() < 992) {
        swipe_area.swipe( {
            swipeLeft:function(event) {
                if (headerWrapper.hasClass('open'))
                    closeMenu();
                event.preventDefault();
                return false;
            },
            threshold:100
        });
    }

    $(window).on('click', function () {
        if (!$(event.target).closest(headerWrapper).length && !$(event.target).closest(btnHeaderToggle).length && headerWrapper.hasClass('open')) {
            headerWrapper.removeClass('open');
            bodyOverlay.fadeOut();
        }
    });


    var Nva_Li = $('.navbar-nav li a').not('a[href*=".html"]');

    if ($(window).width() < 992)
        Nva_Li.on("click", function (e) {
            html_body.animate({scrollTop: $($(this).attr("href")).offset().top}, 800);
            closeMenu();
            e.preventDefault();
            return false;
        });
    else
        Nva_Li.on("click", function (e) {
            html_body.animate({scrollTop: $($(this).attr("href")).offset().top}, 800);
            e.preventDefault();
        });

    var topMenu = headerWrapper,
        topMenuHeight = topMenu.outerHeight() - 300,
        menuItems = topMenu.find(".nav-item a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind to scroll
    $(window).on("scroll", function(){
        var fromTop = $(this).scrollTop()+topMenuHeight;
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");
    });


    // Back To Top
    var offset = 450;
    var duration = 500;
    var upToTop = $("#up-to-top");
    upToTop.hide();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            upToTop.fadeIn(duration);
        } else {
            upToTop.fadeOut(duration);
        }
    });

    upToTop.on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });

    // Config Intro
    var introSelector = $('.js-intro');


    $.fn.introSlider = function(options) {

        options = $.extend({
            layout: 'fullscreen'
        }, options);

        this.each(function(index, value){
            var $item = $(this);
            if(options.layout == 'fullscreen') {
                var wHeight = $(window).height();
                $item.height(wHeight);
                if ($(window).width() >= 992)
                    $(window).on('resize', function (){
                        wHeight = $(window).height();
                        $item.height(wHeight);
                    });
            }
            window.onload = function () {
                $item.find('[data-intro-animate]').css('visibility', 'hidden');
                $item.find('[data-intro-animate]').each(function () {
                    var aniamteClass = $(this).data('intro-animate');
                    var aniamteDelay = $(this).data('intro-delay');
                    $(this).delay(aniamteDelay).queue(function (next) {
                        $(this).addClass(aniamteClass);
                        $(this).css('visibility', 'visible');
                        next();
                    });
                });
            };
        });

        return this;
    };

    introSelector.each(function () {
        var option = {
            layout: 'fullscreen'
        };

        for (var k in option) {
            if (option.hasOwnProperty(k)) {
                if ($(this).attr('data-intro-' + k) != null) {
                    option[k] = $(this).data('intro-' + k);
                }
            }
        }
        $(this).introSlider({
           layout: option.layout
        });
    });

    // Input number controller
    $('.js-input-quantity').each(function() {
        var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.increase'),
            btnDown = spinner.find('.decrease'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.on('click', function() {
            var oldValue = parseFloat(input.val());
            var newVal = undefined;
            if (oldValue >= max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.on('click', function() {
            var oldValue = parseFloat(input.val());
            var newVal = undefined;
            if (oldValue <= min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    // Config Modal
    var modal = $('.js-modal');

    Nva_Li.on('click', function () {
        modal.modal('hide');
    });

    modal.on('show.bs.modal', function () {
        $(this).find('.modal-dialog').attr('class', 'modal-dialog  ' + 'fadeIn' + '  animated');
        $(this).find('.au-alert').attr('class', 'au-alert fadeIn animated');
    });

    modal.on('shown.bs.modal', function () {
        slickClass.slick('setPosition');
    });

    modal.on('hide.bs.modal', function () {
        $(this).find('.modal-dialog').attr('class', 'modal-dialog  ' + 'fadeOut' + '  animated');
        $(this).find('.au-alert').attr('class', 'au-alert fadeOut animated');
    });

})(jQuery);
