class AssetLoader {
  constructor() {
    console.log('AssetLoader loaded');
    this.asset_dir = './app/assets';
    this.fs = require('electron').remote.require('fs');
  }
  load() {
    this.readDir(this.asset_dir).forEach(this.loadDir.bind(this));
  }
  loadDir(dir) {
    this.readDir(dir).forEach(this.loadFile.bind(this));
  }
  readDir(dir) {
    return this.fs.readdirSync(dir).filter( (node) => { return !node.match(/^\./) } ).map( (node) => { return dir + '/' + node });
  }
  loadFile(file) {
    console.log(file);
  }
}
