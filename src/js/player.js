class Player {
  constructor() {
    this.move_time = 300;
    this.frame_delay = 50;
    this.moving = false;
    this.data = {
      d: 'Down'
    };
    this.current_frame = 'standing';
    this.tiles = {};
    this.sprite = new Sprite({
          walking: {
            down: ['shiny_down_a','shiny_down_b'],
            up: ['shiny_up_a','shiny_up_b'],
            left: ['shiny_left_a'],
            right: ['shiny_right_a']
          },
          standing: {
            up: ['shiny_up_standing'],
            down: ['shiny_down_standing'],
            left: ['shiny_left_a'],
            right: ['shiny_right_a']
          }
        });
    this.sprite.z(5);
    this.group = this.sprite.group;

  }
  init() {
    this.sprite.init();
  }
  tick(timestamp) {
    this.sprite.tick(timestamp);
  }
  spawn(spawn_point) {
    this.sprite.x(spawn_point.x);
    this.sprite.y(spawn_point.y);
    this.sprite.setFrameGroup(['standing','down']);
    this.sprite.show();
  }
  despawn(){
    this.sprite.hide();
  }
  x() {
    return this.sprite.x();
  }
  y() {
    return this.sprite.y();
  }

  direction(new_direction=null) {
    if(new_direction){
      this.data.d = new_direction;
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

  canMove() {
    return !window.game.current_map.getTile(this.nextX(),this.nextY()).solid();
  }
  startWalkingAnimation() {
    this.sprite.setFrameGroup(['walking',this.direction().toLowerCase()],this.frame_delay);
  }
  stopWalkingAnimation() {
      this.sprite.setFrameGroup(['standing',this.direction().toLowerCase()],0);
  }
  move(d) {
    if( this.sprite.moving ){
      return;
    }
    this.direction(d);
    if (this.canMove()){
      this.startWalkingAnimation();
      this.sprite.moveTo(this.nextX(),this.nextY(),this.move_time,this.stopWalkingAnimation.bind(this));
    }
  }

}
