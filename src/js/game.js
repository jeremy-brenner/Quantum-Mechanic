class Game {
  constructor() {
    this.loading_screen = new LoadingScreen();
    this.renderer = new Renderer();
    this.input = new Input();
    this.audio = new Audio();
    this.maps = new Maps();
    this.textures = new Textures();
    this.background = new Background(16,9);
    this.asset_loader = new AssetLoader();
    this.title_screen = new TitleScreen();
    this.player = new Player();
    this.beam = new Beam();
    this.asset_loader.onLoad = this.allAssetsLoaded.bind(this);
    this.asset_loader.onChange = this.assetLoaded.bind(this);
    this.asset_loader.load();
    this.current_map = null;
    this.ready = false;
    this.group = new THREE.Group();
    this.group.position.x = 0.5;
    this.group.position.y = 0.5;
    this.group.add(this.background.group);
    this.group.add(this.beam.group);
    this.group.add(this.title_screen.group);
    this.group.add(this.player.group);

    this.renderer.scene.add(this.group);
    this.gameLoop();
  }

  assetLoaded(perc) {
    this.loading_screen.assetLoaded(perc);
  }

  allAssetsLoaded() {
    this.loading_screen.allAssetsLoaded();
    this.background.init();
    this.player.init();
    this.title_screen.load();
    this.ready = true;
  }

  gameLoop(timestamp) {
    requestAnimationFrame( this.gameLoop.bind(this) );
    if( this.ready ){
      var inputs = this.input.getInputs();

      if(this.current_map){

        this.beam.tick(timestamp);
        this.player.tick(timestamp);
        this.input.tick(timestamp);
        
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
          this.beam.fire(this.player);
        }

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
    this.current_map.init();
    this.group.add( this.current_map.group );
    this.player.spawn(this.current_map.spawn_point);
  }
}
