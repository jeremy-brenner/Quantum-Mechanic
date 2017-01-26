class Map {
  constructor(data) {
    this.tiles = [];
    this.group = new THREE.Group();
    this.initialized = false;
    this.tile_factory = new TileFactory();
    this.empty_tile = new EmptyTile();
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    this.spawn_point = data.spawn_point;
    this.tiles = data.tiles.map(this.tile_factory.makeTile.bind(this.tile_factory));
    this.tiles.forEach(function(tile){ this.group.add(tile.group)}.bind(this));
  }
  getTile(x,y) {
    var tile = this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
    return (tile)? tile: this.empty_tile.at(x,y);
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
}
