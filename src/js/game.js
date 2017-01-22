class Game {
  constructor() {
    this.loading_screen = new LoadingScreen();
    this.input = new Input();
    this.audio = new Audio();
    this.maps = new Maps();
    this.images = new Images();
    this.asset_loader = new AssetLoader();
    this.asset_loader.onLoad = this.allAssetsLoaded.bind(this);
    this.asset_loader.onChange = this.assetLoaded.bind(this);
    this.asset_loader.load();
  }

  assetLoaded(perc) {
    this.loading_screen.assetLoaded(perc);
    console.log(`asset loaded ${perc}% complete`);
  }

  allAssetsLoaded() {
    this.loading_screen.allAssetsLoaded();
    console.log("all assets loaded");
    this.renderer = new Renderer();
    this.renderer.start();
  }
}
