class Audio {
  constructor() {
    this.context = new AudioContext();
    this.sources = {};
  }
  add(name,data) {
    var source = this.context.createBufferSource();
    source.buffer = data;
    source.connect(this.context.destination);
    this.sources[name] = source;
  }
  playBGM(name) {
    this.sources[name].loop = true;
    this.sources[name].start(0);
  }

}
