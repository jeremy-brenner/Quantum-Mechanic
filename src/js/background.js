class Background {
  constructor(width,height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.buildTiles();
  }
  buildTiles() {
    console.log('building tiles', this.height, this.width);
    for ( var y = 0; y < this.height; y++ ){
      console.log('y',y);
      for( var x = 0; x < this.width; x++ ){
        console.log('x',x);
        this.tiles.push( new Tile({x:x,y:y,z:-1,type:'background'}) );
      }
    }
  }
  buildThreeGroup() {
    this.group = new THREE.Group();
    console.log(this.tiles);
    this.tiles.forEach( (tile) => { this.group.add(tile.buildThreeMesh()) } );
    return this.group;
  }
}
