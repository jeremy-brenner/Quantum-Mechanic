class Background {
  constructor(width,height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.group = new THREE.Group();
    this.buildTiles();
  }
  buildTiles() {
    for ( var y = 0; y < this.height; y++ ){
      for( var x = 0; x < this.width; x++ ){
        var tile = new Tile({x:x,y:y,z:-1,type:'background'});
        this.tiles.push( tile );
        this.group.add( tile.group );
      }
    }
  }
  init() {
    this.tiles.forEach( (tile) => { tile.init() } );
  }
}
