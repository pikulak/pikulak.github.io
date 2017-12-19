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

setTimeout(function(){

    $("#about p").each(function () {
        $(this).css('opacity', 1);
        $(this).animateCss('slideInUp');

    });

    $("#about .blast").each(function () {
        $(this).removeClass('animated bounceIn');
        $(this).css('opacity', 1);
        $(this).mouseenter(function(){
            $(this).animateCss('rubberBand')
        })
    });

},1700);

$("a[href^='#']").on('click', function(e) {
    e.preventDefault();

    //stop scrollspy when animation starts (it causes unexpected behaviours)
    $(".active").removeClass("active");
    $(this).addClass("active");
    $("body").scrollspy('dispose');

    var hash = this.hash;
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 250, function () {
        window.location.hash = hash;
        //start scrollspy again
        $("body").scrollspy('refresh');
    });
});

function onScrollInit( items, elemTrigger ) {
    var offset = $(window).height() - 10;
    items.each( function() {
        var elem = $(this),
            animationClass = elem.attr('data-animation'),
            animationDelay = elem.attr('data-delay');

        elem.css({
            '-webkit-animation-delay':  animationDelay,
            '-moz-animation-delay':     animationDelay,
            'animation-delay':          animationDelay
        });

        var trigger = (elemTrigger) ? trigger : elem;

        trigger.waypoint(function() {
            elem.addClass('animated').addClass(animationClass);
        },{
            triggerOnce: true,
            offset: offset
        });
    });
}

setTimeout(function() { onScrollInit($('.waypoint')) }, 10);

function calcVH() {
    $('.section').innerHeight( $(this).innerHeight() );
}
(function($) {
    calcVH();
    $(window).on('orientationchange', function() {
        calcVH();
    });
})(jQuery);