class AudioLoader extends FileLoader {
  gotFile(err,data) {
    var buffer = this.toArrayBuffer(data);
    window.game.audio.context.decodeAudioData(buffer,this.doneDecoding.bind(this));
  }

  doneDecoding(data) {
    window.game.audio.add(this.name(),data);
    this.done();
  }


}
