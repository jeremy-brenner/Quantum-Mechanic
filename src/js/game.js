class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.asset_loader = new AssetLoader();
    this.start();
  }

  start() {
    this.renderer.start();
    this.asset_loader.load();
    console.log('Game loaded');
  }
}
