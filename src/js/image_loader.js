class ImageLoader extends FileLoader {
  gotFile(err,data) {
    window.game.images.add(this.name(),data);
    this.done();
  }
}
