class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.map_reader = new MapReader();
    console.log('Game loaded');
  }
}
