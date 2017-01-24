class Map {
  constructor(data) {
    this.tiles = [];
    this.switches = {};
    this.doors = {};
    this.group = new THREE.Group();
    this.initialized = false;
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    this.spawn_point = data.spawn_point;
    data.tiles.forEach(this.makeTile.bind(this));
  }
  makeTile(tile) {
    let tile_obj = new Tile(tile);
    if (tile_obj.data.type == "switch") {
      this.switches[tile.switch_id] = tile_obj;
    } else if (tile_obj.data.type == "door") {
      this.doors[tile.door_id] = tile_obj;
    }
    this.tiles.push( tile_obj );
    this.group.add(tile_obj.group);
  }
  getTile(x,y) {
    var tile = this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
    return (tile)? tile: {boundary:true,x:x,y:y};
  }
  getAdjacentTile(x,y,direction) {
    var new_x = x;
    var new_y = y;

    switch(direction){
      case 'Left':
        new_x = x-1;
        break;
      case 'Right':
        new_x = x+1;
        break;
      case 'Up':
        new_y = y+1;
        break;
      case 'Down':
        new_y = y-1;
        break;
    }
    return this.getTile(new_x,new_y);
  }
  init() {
    if(!this.initialized){
      this.tiles.forEach( (tile) => { tile.init() } );
      this.initialized = true;
    }
  }
  canMove(x, y) {
    var dest = this.getTile(x, y);
    if (dest) {
      if (!dest.solid()) {
        return true;
      } else {
        return false;
      }
    }
  }
}
