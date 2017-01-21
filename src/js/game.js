class Game {
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
    this.render();
  }

  render() {
    requestAnimationFrame( this.render.bind(this) );
    this.renderer.render(this.scene, this.camera);
  };

}
