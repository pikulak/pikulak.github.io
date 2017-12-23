app.home = {};

app.home = {

    init: function() {
        splitHeadings();
        animateElements("#home .blast", "bounceIn", 50);

        afterHeadingsAnimation(function () {
            animateElements("#home p", "slideInUp", 10);
        })
    }
};

var container;
var group;
var camera, scene, renderer;
init();
render();

function chooseRandomElement(array){
    return array[Math.floor((Math.random() * array.length))];
}

function getRandomY(){
    var choices = [
        Math.random() * 2000 + 500,
        Math.random() * 2000 - 2700
    ];
    var choice = chooseRandomElement(choices);
    console.log("choice y: " + choice);
    return choice;
}
function init() {
    container = $("#heroAnimation");

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x343a40 );

    var geometry = new THREE.BoxGeometry( 100, 100, 100 );

    group = new THREE.Group();

    for ( var i = 0; i < 1000; i ++ ) {
        var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.3,
            wireframe: true

        }));
        mesh.position.x = Math.random() * 4000 - 2000;
        mesh.position.y = getRandomY();
        mesh.position.z = Math.random() * 1500 - 1000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add( mesh );
    }

    scene.add(group);
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( document.body.clientWidth, window.innerHeight + 5);
    container.append( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );

}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight + 5);
    scene.remove(group);
    scene.add(group);
    render();
}

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


function afterHeadingsAnimation(cb){
    setTimeout(cb, 1500);
}

