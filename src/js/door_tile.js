class DoorTile extends Tile {
  texture() {
    let texture_name = this.data.type + '-' + this.data.facing.toLowerCase();
    return window.game.textures.get(texture_name);
  }

}
