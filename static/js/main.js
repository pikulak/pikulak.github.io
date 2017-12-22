$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

$(function() {

    function getNavbarHeight(){
        return $('#navbar').outerHeight();
    }

    var initScrollSpy = function(){
        $("body").scrollspy({
            target: '#navbar',
            offset: getNavbarHeight()
        })
    };
    initScrollSpy();
    $("#about h1").blast({
        delimiter: "character",
        tag: "span"
    });

    $("#about h2").blast({
        delimiter: "word",
        tag: "span"
    });

    var a = 0;
    $("#about .blast").each(function () {
        var el = $(this);
        setTimeout(function () {
            el.addClass("animated bounceIn")
        }, a);
        a = a + 100;
    });

    setTimeout(function () {

        $("#about p").each(function () {
            $(this).css('opacity', 1);
            $(this).animateCss('slideInUp');

        });

        $("#about .blast").each(function () {
            $(this).removeClass('animated bounceIn');
            $(this).css('opacity', 1);
            $(this).mouseenter(function () {
                $(this).animateCss('rubberBand')
            })
        });

    }, 1700);

    $("a[href^='#']").on('click', function (e) {
        // stop scrollspy when animation starts (it causes unexpected behaviours)
        $(".active").removeClass("active");
        $(this).addClass("active");
        $("body").scrollspy('dispose');

        var hash = this.hash;
        // we have to substract one pixel due to a little bug on mobile chrome browsers
        var scrollTopPosition = $(hash).offset().top - getNavbarHeight() + 1;

        $('html, body').animate({
            scrollTop: scrollTopPosition
        }, 250, function () {
            // start scrollspy again
            initScrollSpy();
        });
    });

    function onScrollInit(items, elemTrigger) {
        var offset = window.innerHeight;
        items.each(function () {
            var elem = $(this),
                animationClass = elem.attr('data-animation'),
                animationDelay = elem.attr('data-delay');

            elem.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            var trigger = (elemTrigger) ? trigger : elem;

            trigger.waypoint(function () {
                elem.addClass('animated').addClass(animationClass);
            }, {
                triggerOnce: true,
                offset: offset
            });
        });
    }

    setTimeout(function () {
        onScrollInit($('.waypoint'))
    }, 10);

    /*
        Dynamically recalculate 100vh, due to mobile browser issues
        with URL bar (when URL bar hides then 100vh value changes)
     */
    function recalculateViewportHeight() {
        $('.full-vh').each(function () {
            var h = window.innerHeight;
            $(this).height(h);
        })
    }
    /*
        Substract navbar's height from hero section
     */
    function recalculateHeroHeight(){
        var navbarHeight = getNavbarHeight();
        var sectionHero = $('.section__hero');
        sectionHero.each(function () {
            var oldHeight = $(this).height();
            $(this).height(oldHeight - navbarHeight);
        })
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
        recalculateViewportHeight();
        recalculateHeroHeight();
    }
});
