class Map {
  constructor(data) {
    this.tiles = [];
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    data.tiles.forEach(this.makeTile.bind(this));
    data.data.forEach(this.updateTileData.bind(this));
  }
  makeTile(tile) {
    this.tiles.push( new Tile(tile) );
  }
  updateTileData(data) {
    var tile = this.getTile(data.x,data.y);
    tile.updateData(data);
  }
  getTile(x,y) {
    return this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
  }

}
