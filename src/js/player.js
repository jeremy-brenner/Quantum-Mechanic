class Player {
  constructor(x,y) {
    this.move_time = 500;
    this.last_move = 0;
    this.data = {
      x: x,
      y: y
    };
  }
  x() {
    return this.data.x;
  }
  y() {
    return this.data.y;
  }
  texture() {
    return window.game.textures.get('shiny_front');
  }
  buildThreeMesh() {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = this.texture();

    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x = this.x()+0.5;
    this.mesh.position.y = -(this.y()+0.5);
    this.mesh.position.z = 1;
    return this.mesh;
  }
  move(direction) {
    if (window.game.current_map.canMove(direction)) {
      var position = {x: this.mesh.position.x, y: this.mesh.position.y};
      switch (direction) {
        case "up":
          var target = {x: this.mesh.position.x, y: this.mesh.position.y + 1}
          break;
        case "down":
          var target = {x: this.mesh.position.x, y: this.mesh.position.y - 1}
          break;
        case "left":
          var target = {x: this.mesh.position.x - 1, y: this.mesh.position.y}
          break;
        case "right":
          var target = {x: this.mesh.position.x + 1, y: this.mesh.position.y}
          break;
      }

      var tween = new TWEEN.Tween(position).to(target, 75);
      tween.onUpdate(function(){
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
      }.bind(this));
      tween.start();
    } else {
      console.log("Your path is blocked")
    }
  }
}
