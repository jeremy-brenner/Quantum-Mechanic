class EmptyTile {
  constructor() {
    this.data = {
      x: 0,
      y: 0
    };
  }
  at(x,y) {
    this.data.x = x;
    this.data.y = y;
    return this;
  }
  passes(type) {
    return false;
  }
  solid() {
    return true;
  }
  reflects() {
    return false;
  }
}
