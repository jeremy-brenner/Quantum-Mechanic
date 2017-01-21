class AudioLoader {
  constructor() {
    console.log('AudioLoader loaded');
    this.fs = require('electron').remote.require('fs');
  }

  load(name) {
    var file = this.fs.readFileSync(`./app/audio/${name}.ogg`);
    var ab = this.toArrayBuffer(file);
    return ab;
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
