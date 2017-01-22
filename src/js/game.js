class Game {
  constructor() {
    this.loading_screen = new LoadingScreen();
    this.renderer = new Renderer();
    this.input = new Input();
    this.audio = new Audio();
    this.maps = new Maps();
    this.textures = new Textures();
    this.background = new Background(100,100);
    this.asset_loader = new AssetLoader();
    this.asset_loader.onLoad = this.allAssetsLoaded.bind(this);
    this.asset_loader.onChange = this.assetLoaded.bind(this);
    this.asset_loader.load();
    this.current_map = null;
    this.ready = false;
    this.gameLoop();
  }

  assetLoaded(perc) {
    this.loading_screen.assetLoaded(perc);
    console.log(`asset loaded ${perc}% complete`);
  }

  allAssetsLoaded() {
    this.loading_screen.allAssetsLoaded();
    console.log("all assets loaded");
    var background_group = this.background.buildThreeGroup();
    background_group.scale.x = 100;
    background_group.scale.y = 100;
    this.renderer.scene.add( background_group );
    this.ready = true;
  }

  gameLoop() {
    requestAnimationFrame( this.gameLoop.bind(this) );
    if( this.ready ){
      var inputs = this.input.getInputs();
      if(!this.current_map&&inputs.Action1){
        this.loadMap('hub');
      }
      if(this.current_map){
        if(inputs.Left) {
          this.current_map.player.move(-1,0);
        }
        if(inputs.Right) {
          this.current_map.player.move(1,0);
        }
        if(inputs.Up) {
          this.current_map.player.move(0,1);
        }
        if(inputs.Down) {
          this.current_map.player.move(0,-1);
        }
      }
      TWEEN.update();
      this.renderer.render();
    }
  }
  loadMap(map_name) {
    this.current_map = window.game.maps.get(map_name);
    var map_group = this.current_map.buildThreeGroup();
    map_group.scale.x = 100;
    map_group.scale.y = 100;
    this.renderer.scene.add( map_group );
  }
}
