class Player {
  constructor() {
    this.move_time = 300;
    this.frame_delay = 50;
    this.moving = false;
    this.data = {
      x: -1,
      y: -1,
      d: 'Down'
    };
    this.current_frame = 'standing';
    this.tiles = {};
    this.group = new THREE.Group();
    this.group.visible = false;
  }
  tick(timestamp) {
    if(!this.last_frame){
      this.last_frame = timestamp;
    }
    var diff = timestamp - this.last_frame;
    if( diff > this.frame_delay ){
      this.nextFrame();
      this.last_frame = timestamp;
    }
  }
  spawn(spawn_point) {
    this.data.x = spawn_point.x;
    this.data.y = spawn_point.y;
    this.group.position.x = this.x();
    this.group.position.y = this.y();
    this.direction('Down');
    this.group.visible = true;
  }
  despawn(){
    this.group.visible = false;
  }

  x() {
    return this.data.x;
  }
  y() {
    return this.data.y;
  }
  currentTile() {
    return this.getTile(this.data.d,this.current_frame);
  }
  getTile(direction,frame){
    return ( this.tiles[`shiny_${direction.toLowerCase()}_${frame}`] ) ? this.tiles[`shiny_${direction.toLowerCase()}_${frame}`] : this.tiles[`shiny_${direction.toLowerCase()}_a`];
  }
  direction(new_direction=null) {
    if(new_direction){
      this.currentTile().position.z = -1;
      this.data.d = new_direction;
      this.currentTile().position.z = 1;
    }
    return this.data.d;
  }
  nextX() {
    switch( this.direction() ){
      case 'Left':
        return this.x()-1;
        break;
      case 'Right':
        return this.x()+1;
        break;
      default:
        return this.x();
    }
  }
  nextY() {
    switch( this.direction() ){
      case 'Up':
        return this.y()+1;
        break;
      case 'Down':
        return this.y()-1;
        break;
      default:
        return this.y();
    }
  }

  makeTile(name) {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = window.game.textures.get(name);
    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    var tile = new THREE.Mesh( geometry, material );
    tile.position.z = -1;
    this.tiles[name] = tile;
    this.group.add(tile);
  }
  init() {
    ['shiny_down_a','shiny_down_b','shiny_down_standing','shiny_left_a','shiny_right_a','shiny_up_a','shiny_up_b','shiny_up_standing'].forEach( (name) => { this.makeTile(name) });
  }
  nextFrame() {
    this.currentTile().position.z = -1;
    if(this.moving==false){
      this.current_frame = 'standing';
    }else{
      this.current_frame = (this.current_frame == 'a') ? 'b' : 'a';
    }
    this.currentTile().position.z = 1;
  }

  canMove() {
    return window.game.current_map.canMove(this.nextX(),this.nextY());
  }
  move(d) {
    if( this.moving ){
      return;
    }
    this.direction(d);
    if (this.canMove()){
      this.moving = true;
      this.data.x = this.nextX();
      this.data.y = this.nextY();

      var position = {x: this.group.position.x, y: this.group.position.y};
      var target = {x: this.x(), y:this.y()};

      var tween = new TWEEN.Tween(position).to(target, this.move_time);
      tween.onUpdate(function(){
        this.group.position.x = position.x;
        this.group.position.y = position.y;
      }.bind(this)).onComplete(function(){
        this.moving = false;
      }.bind(this));
      tween.start();
    } else {
      console.log("Your path is blocked")
    }
  }
}
