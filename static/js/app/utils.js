function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function animateElements(selector, animationName, timeStep) {
    var i = 0;
    $(selector).each(function () {
        var element = $(this);
        setTimeout(function () {
            element.animateCss(animationName, function () {
                $(element).css({"visibility": "visible"})
            });
        }, i);
        i += timeStep;
    });
    /*  Return animation duration time.
        We add 1000ms because last animation performs for 1s (defined in Animate.css).
    */

    return i + 1000;
}

function chooseRandomElement(array) {
    return array[Math.floor((Math.random() * array.length))];
}