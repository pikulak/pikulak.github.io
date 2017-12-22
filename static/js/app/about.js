app.about = {};

app.about = {

    init: function() {
        splitHeadings();
        blastHeadings();

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

function blastHeadings(){
    var a = 0;
    $("#about .blast").each(function () {
        var el = $(this);
        setTimeout(function () {
            el.addClass("animated bounceIn")
        }, a);
        a = a + 100;
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