class Maps {
  constructor() {
    this.maps = {};
  }
  add(name,map) {
    this.maps[name] = map;
  }
  get(name) {
    return this.maps[name];
  }
}
