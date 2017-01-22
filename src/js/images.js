class Images {
  constructor() {
    this.images = {};
  }
  add(name,image) {
    this.images[name] = image;
  }
  get(name) {
    return this.image[name];
  }
}
