class Textures {
  constructor() {
    this.textures = {};
  }
  add(name,texture) {
    this.textures[name] = texture;
  }
  get(name) {
    return (this.textures[name]) ? this.textures[name]: this.textures['default'];
  }
}
