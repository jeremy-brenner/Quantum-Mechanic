class Audio {
  constructor() {
    this.context = new AudioContext();
    this.sources = {};
  }
  add(name,buffer) {
    var name = name;
    this.context.decodeAudioData(buffer,function(decoded){
      var source = this.context.createBufferSource();
      source.buffer = decoded;
      source.connect(this.context.destination);
      this.sources[name] = source;
      source.loop = true;
      source.start(0);
    }.bind(this));
  }
  playBGM(name) {
    this.sources[name].loop = true;
    this.sources[name].start(0);
  }

}
