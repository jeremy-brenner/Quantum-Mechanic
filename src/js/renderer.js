class Renderer {
  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0, 1000 );

    this.camera.updateProjectionMatrix()
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.ambient = new THREE.AmbientLight( 0xffffff )
    this.scene.add(this.ambient);

    document.body.appendChild( this.renderer.domElement );
    window.addEventListener( 'resize', this.windowResize.bind(this) );
    console.log('Renderer loaded');
  }

  windowResize() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.left = window.innerWidth / - 2;
    this.camera.right =  window.innerWidth / 2;
    this.camera.top = window.innerHeight / 2;
    this.camera.bottom = window.innerHeight / - 2;
    this.camera.position.x = window.innerWidth / 2;
    this.camera.position.y = window.innerHeight / - 2;
    this.camera.updateProjectionMatrix();
    console.log("window resized");
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}
