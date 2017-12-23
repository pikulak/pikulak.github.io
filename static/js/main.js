$(function() {
    if (isMobile()) {
        /*  Dynamically recalculate 100vh, due to mobile browser issues
            with URL bar (when URL bar hides then 100vh value changes)
         */
        app.recalculateViewportHeight();
        // Substract navbar's height from hero section
        app.recalculateHeroHeight();
    }
    app.initScrollSpy();
    app.initSmoothScroll();
    app.initAnimationWaypoints();
    app.home.init();
});
