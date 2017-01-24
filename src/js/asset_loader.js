class AssetLoader {
  constructor() {
    this.asset_dir = 'assets';
    this.loader_classes = {
      'ogg': AudioLoader,
      'png': TextureLoader,
      'json': MapLoader
    }
    this.loaders = [];
  }

  load() {
    this.readDir(path.join(__dirname, this.asset_dir)).forEach(this.loadDir.bind(this));
    this.loaders.forEach( (loader) => { loader.load() } );
  }
  loadDir(dir) {
    this.readDir(dir).forEach(this.loadFile.bind(this));
  }
  readDir(dir) {
    return fs.readdirSync(dir).filter( (node) => { return !node.match(/^\./) } ).map( (node) => { return dir + '/' + node });
  }
  loadFile(file) {
    var ext = file.split('.').pop();
    var loader = new (this.loader_classes[ext])(file);
    loader.onload = this.loaderLoaded.bind(this);
    this.loaders.push(loader);
  }
  loaderLoaded() {
    this.onChange( this.percentReady() );
    if( this.percentReady() == 100 ) {
      this.onLoad();
    }
  }
  percentReady() {
    return Math.floor(this.loaderReadyCount() / this.loaderCount() * 100);
  }
  loaderCount() {
    return this.loaders.length;
  }
  loaderReadyCount() {
    return this.loaders.filter( (loader) => { return loader.ready } ).length;
  }
  onLoad() {

  }
  onChange() {

  }
}
