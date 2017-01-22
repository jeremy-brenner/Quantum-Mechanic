class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.audio = new Audio();
    this.maps = new Maps();
    this.textures = new Textures();
    this.asset_loader = new AssetLoader();
    this.asset_loader.onLoad = this.allAssetsLoaded.bind(this);
    this.asset_loader.onChange = this.assetLoaded.bind(this);
    this.asset_loader.load();
    this.gameLoop();
  }

  assetLoaded(perc) {
    console.log(`asset loaded ${perc}% complete`);
  }

  allAssetsLoaded() {
    console.log("all assets loaded");
    this.renderer.start();
  }

  gameLoop() {
    requestAnimationFrame( this.gameLoop.bind(this) );
  //  var keys = this.input.getKeys();
  //  if(keys.length>0){
//      console.log(keys);
//    }
    this.renderer.render();
  }
}
