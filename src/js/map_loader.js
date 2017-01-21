class MapLoader {
  constructor(filename) {
    this.filename = filename;
    this._ready = false;
    this.object = null;
    this.onload = null;
  }

  load() {
    const data = require('electron').remote.require(this.filename);
    this.object = new Map(data);
    this._ready = true;
    this.onload();
  }

  ready() {
    return this._ready;
  }
}
