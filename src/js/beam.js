class Beam {
  constructor() {
    this.group = new THREE.Group();
  }
  buildThreeGroup() {
    this.group.add(this.player.buildThreeMesh())
    this.tiles.forEach( (tile) => { this.group.add(tile.buildThreeMesh()) } );
    return this.group;
  }
}
