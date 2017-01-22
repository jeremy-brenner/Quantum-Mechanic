class TextureLoader extends FileLoader {
  gotFile(err,data) {
    var buffer = this.toArrayBuffer(data);
    var blob = new Blob([buffer], {type: 'image/png'});
    this.url = URL.createObjectURL(blob);
    this.image = new Image();
    this.image.onload = this.imageLoaded.bind(this);
    this.image.src = this.url;
  }

  imageLoaded() {
    URL.revokeObjectURL(this.url);
    var texture = new THREE.Texture(this.image);
    texture.needsUpdate = true;
    window.game.textures.add(this.name(),texture);
    this.done();
  }


}
