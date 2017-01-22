class Maps {
  constructor() {
    this.maps = {};
  }
  add(name,map) {
    console.log('adding',name,map);
    this.maps[name] = map;
  }
  get(name) {
    return this.maps[name];
  }
}
