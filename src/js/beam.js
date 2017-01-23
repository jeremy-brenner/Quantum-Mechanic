class Beam {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.z = 5;
    this.ttl = 500;
    this.started = 0;
    this.firing = false;
    this.lasers = [];
  }
  tick(timestamp) {
    if(this.firing&&timestamp-this.started>this.ttl){
      this.stop();
    }
  }
  stop() {
    while (this.group.children.length>0)
    {
      this.group.remove(this.group.children[0]);
    }
    this.firing = false;
  }
  fire(origin_x,origin_y,original_direction,type,timestamp){
    if(this.firing) {
      return;
    }
    this.started = timestamp;
    this.type = type;
    this.firing = true;
    this.blocked = false;
    this.map = window.game.current_map;
    this.x = origin_x;
    this.y = origin_y;
    this.direction = original_direction;
    while(!this.blocked){
      this.shoopDaWoop();
    }
    this.addLaser(`end-${this.direction.toLowerCase()}`,this.x,this.y);
  }
  shoopDaWoop() {
    var tile = this.map.getAdjacentTile(this.x,this.y,this.direction);
    if(tile.boundary) {
      this.x = tile.x;
      this.y = tile.y;
      this.blocked = true;
      return;
    }
    this.x = tile.x();
    this.y = tile.y();
    if(tile.passes(this.type)){
      this.addLaser(this.direction.toLowerCase(),this.x,this.y);
      return;
    }
    var reflection = tile.reflects(this.direction);
    if(reflection) {
      this.direction = reflection;
      var id = 'turn-' + tile.data.facing.map( (val) => { return val.toLowerCase() } ).join('-');
      this.addLaser(id,this.x,this.y);
    }else{
      this.blocked = true;
    }
  }

  addLaser(id,x,y) {
    var tile = new Tile({x:x,y:y,z:5,type:`laser-${id}`});
    this.lasers.push(tile);
    this.group.add(tile.buildThreeMesh());
  }

}
