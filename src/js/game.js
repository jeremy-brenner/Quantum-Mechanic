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
    this.title_screen = new TitleScreen();
    this.beam = new Beam();
    this.asset_loader.onLoad = this.allAssetsLoaded.bind(this);
    this.asset_loader.onChange = this.assetLoaded.bind(this);
    this.asset_loader.load();
    this.current_map = null;
    this.player = null;
    this.ready = false;
    this.group = new THREE.Group();
    this.group.scale.x = this.scale();
    this.group.scale.y = this.scale();
    this.renderer.scene.add(this.group);
    this.gameLoop();
  }

  assetLoaded(perc) {
    this.loading_screen.assetLoaded(perc);
    console.log(`asset loaded ${perc}% complete`);
  }

  scale() {
    return 75;
  }

  allAssetsLoaded() {
    this.loading_screen.allAssetsLoaded();
    console.log("all assets loaded");
    var background_group = this.background.buildThreeGroup();
    this.group.add(background_group);
    this.group.add( this.beam.group );
    this.group.add(this.title_screen.group);
    this.title_screen.load();
    this.ready = true;
  }

  fireBeam(timestamp) {
    var x = this.player.x();
    var y = this.player.y();
    this.beam.fire(this.player.x(),this.player.y(),this.player.direction(),'type',timestamp);
  }

  gameLoop(timestamp) {
    requestAnimationFrame( this.gameLoop.bind(this) );
    if( this.ready ){
      var inputs = this.input.getInputs();

      if(this.current_map){
        if(inputs.Left) {
          this.player.move('Left');
        }
        if(inputs.Right) {
          this.player.move('Right');
        }
        if(inputs.Up) {
          this.player.move('Up');
        }
        if(inputs.Down) {
          this.player.move('Down');
        }
        if(inputs.Action1) {
          this.fireBeam(timestamp);
        }
        this.beam.tick(timestamp);
        this.player.tick(timestamp);
      }
      if(!this.current_map&&inputs.Action1){
        this.title_screen.hide();
        this.loadMap('hub');
      }
      TWEEN.update();
      this.renderer.render();
    }
  }
  loadMap(map_name) {
    this.current_map = window.game.maps.get(map_name);
    var map_group = this.current_map.buildThreeGroup();
    this.group.add( map_group );
    this.player = this.current_map.player;
  }
}
