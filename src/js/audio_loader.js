class AudioLoader extends FileLoader {
  gotFile(err,data) {
    var buffer = this.toArrayBuffer(data);
    window.game.audio.context.decodeAudioData(buffer,this.doneDecoding.bind(this));
  }

  doneDecoding(data) {
    window.game.audio.addSource(this.name(),data);
    this.done();
  }

  toArrayBuffer(buf) {
      var ab = new ArrayBuffer(buf.length);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buf.length; ++i) {
          view[i] = buf[i];
      }
      return ab;
  }

}
