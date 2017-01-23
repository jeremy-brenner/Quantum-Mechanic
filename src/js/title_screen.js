class TitleScreen {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.z = 5;
    this.group.position.x = 5;
    this.group.position.y = -5;
  }
  load() {
    var geometry = new THREE.PlaneBufferGeometry( 6, 5, 1, 1 );
    var texture = window.game.textures.get('title');
    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    var mesh = new THREE.Mesh( geometry, material );
    this.group.add(mesh);
  }
}
