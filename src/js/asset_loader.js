class AssetLoader {
  constructor() {
    console.log('AssetLoader loaded');
    this.fs = require('electron').remote.require('fs');
  }
  load() {
    var files = this.fs.readdirSync('./app/audio');
    console.log(files);
  }

}
