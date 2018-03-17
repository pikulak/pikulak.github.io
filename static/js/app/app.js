var app = {};


app = {

    isMobile: false,

    init: function () {
        if (app.isMobile) {
            /* Dynamically recalculate 100vh, due to mobile browser issues
               with URL bar (when URL bar hides then 100vh value changes)
           */
            this.recalculateViewportHeight();
            window.addEventListener("orientationchange",
                function(){
                    setTimeout(this.recalculateViewportHeight, 0);
                }.bind(this));
            // Subtract navbar's height from hero section
            // this.recalculateHeroHeight();
        }
        this.initScrollSpy();
        this.initSmoothScroll();
        this.initAnimationWaypoints();
        this.home.init();
    },
    initScrollSpy: function () {
        $("body").scrollspy({
            target: '#navbar',
            offset: this.getNavbarHeight()
        })
    },
    initSmoothScroll: function () {
        $("a[href^='#']").on('click', function () {
            // stop scrollspy when animation starts (it causes unexpected behaviours)
            $(".active").removeClass("active");
            $(this).addClass("active");
            $("body").scrollspy('dispose');

            var hash = this.hash;
            // we have to substract one pixel due to a little bug on mobile chrome browsers
            var scrollTopPosition = $(hash).offset().top - app.getNavbarHeight() + 1;
            $('html, body').animate({
                scrollTop: scrollTopPosition
            }, 250, function () {
                // start scrollspy again
                app.initScrollSpy();
            });
        });
    },
    initAnimationWaypoints: function(){
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
    },
    recalculateViewportHeight: function () {
        $('.full-vh').each(function () {
            $(this).height(window.innerHeight);
        })
    },
    recalculateHeroHeight: function () {
        $('.section__hero').each(function () {
            var oldHeight = $(this).height();
            $(this).height(oldHeight - app.getNavbarHeight());
        })
    },
    getNavbarHeight: function(){
        return $('#navbar').outerHeight();
    }
};


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