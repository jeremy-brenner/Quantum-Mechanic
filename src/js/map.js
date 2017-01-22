class Map {
  constructor(data) {
    this.tiles = [];
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    data.tiles.forEach(this.makeTile.bind(this));
    this.player = new Player(data.spawn_point.x,data.spawn_point.y);
  }
  makeTile(tile) {
    this.tiles.push( new Tile(tile) );
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
  canMove(direction) {
    let dest, x, y;
    x = this.player.mesh.position.x - 0.5;
    y = -1*(this.player.mesh.position.y + 0.5);

    switch (direction) {
      case "up":
        dest = this.getTile(x, y-1);
        if (dest) {
          if (!dest.solid()) {
            return true;
          }
        }
        break;
      case "down":
        dest = this.getTile(x, y+1);
        if (dest) {
          if (!dest.solid()) {
            return true;
          }
        }
        break;
      case "left":
        dest = this.getTile(x-1, y);
        if (dest) {
          if (!dest.solid()) {
            return true;
          }
        }
        break;
      case "right":
        dest = this.getTile(x+1, y);
        if (dest) {
          if (!dest.solid()) {
            return true;
          }
        }
        break;
    }

    return false;
  }
}
