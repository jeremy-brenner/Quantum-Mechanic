class FileLoader {
  constructor(filename) {
    this.filename = filename;
    this.ready = false;
    this.object = null;
  }

  name() {
    var pieces = this.filename.split('.');
    return pieces[0].split('/').pop();
  }

  load() {
    fs.readFile(this.filename,this.gotFile.bind(this));
  }

  onload() {
    // callback
  }

  gotFile(err,data) {
    // override this and call done
    this.object = data;
    this.done();
  }

  done() {
    this.ready = true;
    this.onload();
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
