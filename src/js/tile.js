class Tile {
  constructor(data,map) {
    this.data = data;
    this.map = map;
  }
  x() {
    return this.data.x;
  }
  y() {
    return this.data.y;
  }
  texture() {
    return window.game.textures.get(this.data.type);
  }
  buildThreeMesh() {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = this.texture();

    var material = new THREE.MeshLambertMaterial( { map: texture } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x = this.x()+0.5;
    this.mesh.position.y = -(this.y()+0.5);
    return this.mesh;
  }
}
