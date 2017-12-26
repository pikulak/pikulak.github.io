function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function animateElements(selector, animationName, timeStep){
    var i = 0;
    $(selector).each(function(){
        var element = $(this);
        setTimeout(function(){
            element.addClass("animated " + animationName);
        }, i);
        i += timeStep;
    })
}

function chooseRandomElement(array){
    return array[Math.floor((Math.random() * array.length))];
}