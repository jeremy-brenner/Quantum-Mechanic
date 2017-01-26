class Tile {
  constructor(data,map) {
    this.data = data;
    this.map = map;
    this.triggers = {};
    this.inverse_directions = {
      'Up': 'Down',
      'Down': 'Up',
      'Left': 'Right',
      'Right': 'Left'
    }
    this.group = new THREE.Group();
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
    return window.game.textures.get(this.data.type);
  }
  init() {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = this.texture();
    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    var mesh = new THREE.Mesh( geometry, material );
    this.group.add(mesh);
    this.group.position.x = this.x();
    this.group.position.y = this.y();
    this.group.position.z = this.z();
  }
  solid() {
    return !!this.data.type;
  }
  passes(type) {
    return !this.data.type;
  }
  reflects(direction) {
    return false;
  }
  hit() {
    if (this.data.type == "switch") {
      window.game.current_map.doors[this.data.connects_to].trigger(this.data.switch_id);
    }
  }
}
