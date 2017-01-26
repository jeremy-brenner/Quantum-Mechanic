class TileFactory {
  constructor() {

  }
  makeTile(data) {
    var tile;
    switch(data.type) {
      case('mirror'):
        tile = new MirrorTile(data);
        break;
      case('door'):
        tile = new DoorTile(data);
        break;
      default:
        tile = new Tile(data);
    }
    return tile;
  }
}
