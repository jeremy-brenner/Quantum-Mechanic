class Renderer {
  constructor() {
    this.running = false;
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
    this.camera.updateProjectionMatrix();
    console.log("window resized");
  }

  start() {
    var map = window.game.maps.get('hub');
    var map_group = map.buildThreeGroup();
    map_group.scale.x = 50;
    map_group.scale.y = 50;
    map_group.position.x = -200;
    map.group.position.y = 200;
    this.scene.add( map_group );
    this.running = true;
  }

  render() {
    if(!this.running) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
  }

}
