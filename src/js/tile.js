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
  z() {
    return (this.data.z)? this.data.z: 0;
  }
  texture() {
    let texture_name = this.data.type;

    if (this.data.facing) {
      texture_name += '-' + this.data.facing;
    }

    return window.game.textures.get(texture_name);
  }
  buildThreeMesh() {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = this.texture();

    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x = this.x()+0.5;
    this.mesh.position.y = -(this.y()+0.5);
    this.mesh.position.z = this.z();
    return this.mesh;
  }
  solid() {
    if (this.data.type) {
      return true;
    }
    return false
  }
}
