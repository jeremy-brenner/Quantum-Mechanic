class Map {
  constructor(data) {
    this.tiles = [];
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    data.tiles.forEach(this.makeTile.bind(this));
  }
  makeTile(tile) {
    this.tiles.push( new Tile(tile) );
  }
  getTile(x,y) {
    return this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
  }
  buildThreeGroup() {
    this.group = new THREE.Group();
    this.tiles.forEach( (tile) => { this.group.add(tile.buildThreeMesh()) } );
    return this.group;
  }
}
