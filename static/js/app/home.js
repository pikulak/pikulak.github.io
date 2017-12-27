app.home = {};

app.home = {
    backgroundAnimation: new ThreeJSBackgroundAnimation(),

    init: function() {
        this.backgroundAnimation.init();
        this.splitHeader();
        var blastAnimationDurationTime = animateElements(
            "#home .blast", "bounceIn", 500, 50
        );
        setTimeout(function () {
            animateElements("#home h1:nth-of-type(2)", "slideInUp", 0, 10);
        }, blastAnimationDurationTime)
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
    this.numberOfCubes = app.isMobile ? 20: 40;
    this.camera = new THREE.PerspectiveCamera(
        70, window.innerWidth / window.innerHeight, 1, 10000
    );
    this.geometry = new THREE.BoxGeometry(100, 100, 100);
    this.material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.15,
        wireframe: true

    });
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.renderer = new THREE.WebGLRenderer({antialias: true});


    this.init = function () {
        this._configure();
        this._generateGroupOfShapes();
        this.animate();
        // resize only on desktops, because it causes unnecessary jumps on mobiles
        if (!app.isMobile){
            window.addEventListener('resize', this.onWindowResize.bind(this));
        }
        window.addEventListener('orientationchange',
            function(){
                setTimeout(this.onWindowResize.bind(this), 0);
            }.bind(this));
    };


    this.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.scene.remove(this.group);
        this.scene.add(this.group);
        this.renderer.setSize(document.body.clientWidth, window.innerHeight);
        this.render();
    };


    this.render = function () {
        var time = Date.now() * 0.001;
        this.group.rotation.x = 0.25 * time;
        this.group.rotation.y = 0.25 * time;
        this.renderer.render(this.scene, this.camera);
    };


    this.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    };


    this._configure = function () {
        this.scene.background = new THREE.Color(0x343a40);
        this.camera.position.z = 1000;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(document.body.clientWidth, window.innerHeight);
        this.container.append(this.renderer.domElement);

    };


    this._generateGroupOfShapes = function () {
        for (var i = 0; i < this.numberOfCubes; i++) {
            var mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 1500 - 1000;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            this.group.add(mesh);
        }
        this.scene.add(this.group);
    };
}