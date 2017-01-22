class Tile {
  constructor(data,map) {
    this.data = data;
    this.map = map;
  }
  updateData(data) {
    this.data = data;
  }
  x() {
    return this.data.x;
  }
  y() {
    return this.data.y;
  }
}
