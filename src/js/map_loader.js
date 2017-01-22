class MapLoader extends FileLoader {
  gotFile(err,data) {
    var datastring = data.toString('utf8');
    var json = JSON.parse(datastring);
    var map = new Map(json);
    window.game.maps.add(this.name(),map);
    this.done();
  }
}
