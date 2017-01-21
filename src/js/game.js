class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.map_reader = new MapReader();
    this.map_reader.load(1);
    console.log('Game loaded');
  }
}
