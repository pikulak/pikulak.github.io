app.about = {};

app.about = {

    init: function() {
        splitHeadings();
        animateElements("#about .blast", "bounceIn", 100);

        afterHeadingsAnimation(function () {
            animateParagraph();
            initRubberBandOnHeadings();
        })
    }
};

function splitHeadings(){
    $("#about h1").blast({
        delimiter: "character",
        tag: "span"
    });

    $("#about h2").blast({
        delimiter: "word",
        tag: "span"
    });
}

function animateParagraph(){
    $("#about p").each(function () {
        $(this).css('opacity', 1);
        $(this).animateCss('slideInUp');

    });
}

function afterHeadingsAnimation(cb){
    setTimeout(cb, 1700);
}

function initRubberBandOnHeadings(){
    $("#about .blast").each(function () {
        $(this).removeClass('animated bounceIn');
        $(this).css('opacity', 1);
        $(this).mouseenter(function () {
            $(this).animateCss('rubberBand')
        })
    });
}