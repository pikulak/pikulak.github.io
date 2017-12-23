app.home = {};

app.home = {

    init: function() {
        splitHeadings();
        animateElements("#home .blast", "bounceIn", 100);

        afterHeadingsAnimation(function () {
            animateParagraph();
            initRubberBandOnHeadings();
        })
    }
};

function splitHeadings(){
    $("#home h1").blast({
        delimiter: "character",
        tag: "span"
    });

    $("#home h2").blast({
        delimiter: "word",
        tag: "span"
    });
}

function animateParagraph(){
    $("#home p").each(function () {
        $(this).css('opacity', 1);
        $(this).animateCss('slideInUp');

    });
}

function afterHeadingsAnimation(cb){
    setTimeout(cb, 1700);
}

function initRubberBandOnHeadings(){
    $("#home .blast").each(function () {
        $(this).removeClass('animated bounceIn');
        $(this).css('opacity', 1);
        $(this).mouseenter(function () {
            $(this).animateCss('rubberBand')
        })
    });
}