function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function isWebglAvailable() {
    // https://threejs.org/docs/#examples/renderers/CanvasRenderer
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}


function animateElements(selector, animationName, timeOffset, classProp) {
    $(selector).each(function () {
        requestTimeout(function () {
            if (classProp) $(this).prop("class", classProp);
            $(this).animateCss(animationName);
        }.bind(this), timeOffset)
    });
}