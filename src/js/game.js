class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.audio = new Audio();
    this.maps = new Maps();
    this.images = new Images();
    this.asset_loader = new AssetLoader();
    this.start();
  }

  start() {
    this.renderer.start();
    this.asset_loader.load();
  }
}
