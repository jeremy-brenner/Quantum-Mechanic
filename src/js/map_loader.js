class MapLoader extends FileLoader {
  gotFile(err,data) {
    var datastring = data.toString('utf8');
    this.object = JSON.parse(datastring);
    this.done();
  }
}
