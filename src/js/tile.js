class Tile {
  constructor(data,map) {
    this.data = data;
    this.map = map;
    this.triggers = {};
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
  trigger(switch_id) {
    this.open = true;
    this.data.type = "door-open";
    this.mesh.material.map = this.texture();
    this.mesh.material.needsUpdate = true;
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
  passes(type, dx, dy) {
    if (this.data.type) {
      if (this.data.type == "mirror") {
        if (this.data.accepts_from.dx == (-1)*dx) {
          return [true, 0, this.data.accepts_from.dy]
        } else if (this.data.accepts_from.dy == (-1)*dy) {
          return [true, this.data.accepts_from.dx, 0]
        }
      } else {
        return [false, 0, 0]
      }
    } else {
      return [true, dx, dy];
    }
  }
  hit() {
    if (this.data.type == "switch") {
      window.game.current_map.doors[this.data.connects_to].trigger(this.data.switch_id);
    }
  }
}
