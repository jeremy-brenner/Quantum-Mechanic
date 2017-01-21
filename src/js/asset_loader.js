class AssetLoader {
  constructor() {
    console.log('AssetLoader loaded');
    this.asset_dir = './app/assets';
    this.fs = require('electron').remote.require('fs');
    this.loader_classes = {
      'ogg': AudioLoader,
      'png': ImageLoader,
      'json': MapLoader
    }
    this.loaders = [];
  }
  load() {
    this.readDir(this.asset_dir).forEach(this.loadDir.bind(this));
    this.loaders.forEach( (loader) => { loader.load() } );
  }
  loadDir(dir) {
    this.readDir(dir).forEach(this.loadFile.bind(this));
  }
  readDir(dir) {
    return this.fs.readdirSync(dir).filter( (node) => { return !node.match(/^\./) } ).map( (node) => { return dir + '/' + node });
  }
  loadFile(file) {
    var ext = file.split('.').pop();
    var loader = new (this.loader_classes[ext])(file);
    loader.onload = this.loaderLoaded.bind(this);
    this.loaders.push(loader);
  }
  loaderLoaded() {
    console.log('loader loaded');
    console.log('ready',this.percentReady() );
  }
  percentReady() {
    return Math.floor(this.loaderReadyCount() / this.loaderCount() * 100);
  }
  loaderCount() {
    return this.loaders.length;
  }
  loaderReadyCount() {
    return this.loaders.filter( (loader) => { return loader.ready() } ).length;
  }
}
