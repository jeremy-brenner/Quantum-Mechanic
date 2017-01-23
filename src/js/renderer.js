class Renderer {
  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( 0, 16, 9, 0, 0, 1000 );

    this.camera.updateProjectionMatrix()
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.ambient = new THREE.AmbientLight( 0xffffff )
    this.scene.add(this.ambient);

    document.body.appendChild( this.renderer.domElement );
    window.addEventListener( 'resize', this.windowResize.bind(this) );
    this.windowResize();
  }

  windowResize() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}
