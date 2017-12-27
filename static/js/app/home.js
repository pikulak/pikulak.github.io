app.home = {};

app.home = {
    backgroundAnimation: new ThreeJSBackgroundAnimation(),

    init: function() {
        this.backgroundAnimation.init();
        this.splitHeader();
        // we add 1000ms because
        var headerAnimationDurationTime = animateElements(
            "#home .blast", "bounceIn", 50
        );
        setTimeout(function () {
            animateElements("#home h1:nth-of-type(2)", "slideInUp", 10);
        }, headerAnimationDurationTime)
    },
    splitHeader: function () {
        $("#home h1:nth-of-type(1)").blast({
            delimiter: "character",
            tag: "span"
        });
    }
};

function ThreeJSBackgroundAnimation() {
    this.container = $("#heroAnimation");
    this.camera = new THREE.PerspectiveCamera(
        70, window.innerWidth / window.innerHeight, 1, 10000
    );
    this.geometry = new THREE.BoxGeometry(100, 100, 100);
    this.material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.3,
        wireframe: true

    });
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.renderer = new THREE.WebGLRenderer({antialias: true});


    this.init = function () {
        this._configure();
        this._generateGroupOfShapes();
        this.render();
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    };


    this.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(document.body.clientWidth, window.innerHeight + 5);
        this.scene.remove(this.group);
        this.scene.add(this.group);
        this.render();
    };


    this.render = function () {
        this.renderer.render(this.scene, this.camera);
    };


    this._configure = function () {
        this.scene.background = new THREE.Color(0x343a40);
        this.camera.position.z = 1000;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(document.body.clientWidth, window.innerHeight + 5);
        this.container.append(this.renderer.domElement);

    };


    this._generateGroupOfShapes = function () {
        for (var i = 0; i < 1000; i++) {
            var mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.x = Math.random() * 4000 - 2000;
            mesh.position.y = this._getRandomY();
            mesh.position.z = Math.random() * 1500 - 1000;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            this.group.add(mesh);
        }
        this.scene.add(this.group);
    };

    this._getRandomY = function () {
        var choices = [
            Math.random() * 2000 + 500,
            Math.random() * 2000 - 2700
        ];
        return chooseRandomElement(choices);
    };
}