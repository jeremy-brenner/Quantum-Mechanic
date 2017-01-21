class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.asset_loader = new AssetLoader();
    this.audio = new Audio();

    this.asset_loader.load();

    console.log(level);
    console.log('Game loaded');
  }
}
