class Map {
  constructor(data) {
    this.tiles = [];
    this.switches = {};
    this.doors = {};
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    data.tiles.forEach(this.makeTile.bind(this));
    this.player = new Player(data.spawn_point.x,data.spawn_point.y);
  }
  makeTile(tile) {
    let tile_obj = new Tile(tile);
    if (tile_obj.data.type == "switch") {
      this.switches[tile.switch_id] = tile_obj;
    } else if (tile_obj.data.type == "door") {
      this.doors[tile.door_id] = tile_obj;
    }
    this.tiles.push( tile_obj );
  }
  getTile(x,y) {
    return this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
  }
  buildThreeGroup() {
    this.group = new THREE.Group();
    this.group.add(this.player.buildThreeMesh())
    this.tiles.forEach( (tile) => { this.group.add(tile.buildThreeMesh()) } );
    return this.group;
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
