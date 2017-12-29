function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function animateElements(selector, animationName, timeOffset, timeStep) {
    $(selector).each(function () {
        $(this).css({"opacity": 0});
        setTimeout(function () {
            $(this).css({"opacity": 1})
                .animateCss(animationName);
        }.bind(this), timeOffset)
    });

    /*  Return animation duration time.
        We add 1000ms because last animation performs for 1s (defined in Animate.css).
    */

    return timeOffset + ($(selector).length * timeStep) + 1000;
}

function chooseRandomElement(array) {
    return array[Math.floor((Math.random() * array.length))];
}