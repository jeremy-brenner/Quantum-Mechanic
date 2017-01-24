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
    let texture_name = this.data.type;

    if (this.data.facing) {
      texture_name += '-' + this.data.facing[0].toLowerCase() + '-' + this.data.facing[1].toLowerCase();
    }

    return window.game.textures.get(texture_name);
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
    if (this.data.type) {
      return true;
    }
    return false
  }
  passes(type) {
    return !this.data.type;
  }
  reflects(direction) {
    if(this.data.type=='mirror'){
      var i = this.data.facing.indexOf( this.inverse_directions[direction] );
      if(i>-1){
        return this.data.facing[(i==0)?1:0];
      }
    }
    return false;
  }
  hit() {
    if (this.data.type == "switch") {
      window.game.current_map.doors[this.data.connects_to].trigger(this.data.switch_id);
    }
  }
}
