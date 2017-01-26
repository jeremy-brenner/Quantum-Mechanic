class Sprite {
  constructor(sprite_defs) {
    this.sprite_defs = sprite_defs;
    this.group = new THREE.Group();
    this.group.visible = false;
    this.frames = {};
    this.frame_delay = false;
    this.current_frame = 0;
    this.current_frameset;
  }
  tick(timestamp) {
    if(!this.frame_delay){
      return;
    }
    if(!this.last_frame){
      this.last_frame = timestamp;
    }
    var diff = timestamp - this.last_frame;
    if( diff > this.frame_delay ){
      this.nextFrame();
      this.last_frame = timestamp;
    }
  }
  nextFrame() {
    this.current_frameset[this.current_frame].visible = false;
    this.current_frame = (this.current_frame+1)%this.current_frameset.length;
    this.current_frameset[this.current_frame].visible = true;
  }
  getFrameSet(q) {
    var frame_set = this.frames;
    q.forEach(function(key){
      frame_set = frame_set[key];
    }.bind(this));
    return Object.values(frame_set);
  }
  setFrameGroup(frame_set_q,frame_delay=null) {
    this.frame_delay = frame_delay;
    if(this.current_frameset){
      this.current_frameset.forEach(function(frame){frame.visible = false});
    }
    this.current_frame = 0;
    this.current_frameset = this.getFrameSet(frame_set_q);
    this.current_frameset[0].visible = true;
  }
  x(new_x) {
    if(new_x){
      this.group.position.x = new_x;
    }
    return this.group.position.x;
  }
  y(new_y) {
    if(new_y){
      this.group.position.y = new_y;
    }
    return this.group.position.y;
  }
  z(new_z) {
    if(new_z){
      this.group.position.z = new_z;
    }
    return this.group.position.z;
  }
  show() {
    this.group.visible = true;
  }
  hide() {
    this.group.visible = false;
  }

  init() {
    this.frames = this.buildFrames(this.sprite_defs);
  }

  buildFrames(def) {
    var frames = {}
    Object.keys(def).forEach(function(key){
      if( typeof(def[key]) == 'string' ) {
        frames[key] = this.buildFrame(def[key]);
      }else{
        frames[key] = this.buildFrames(def[key]);
      }
    }.bind(this));
    return frames;
  }

  buildFrame(texture) {
    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
    var texture = window.game.textures.get(texture);
    var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
    var frame = new THREE.Mesh( geometry, material );
    frame.visible = false;
    this.group.add(frame);
    return frame;
  }
  moveTo(x,y,time=0,cb=function(){}) {
    this.moving = true;

    var position = {x: this.x(), y: this.y()};
    var target = {x: x, y: y};

    var tween = new TWEEN.Tween(position).to(target, time);

    tween.onUpdate(function(){
      this.x(position.x);
      this.y(position.y);
    }.bind(this)).onComplete(function(){
      this.moving = false;
      cb();
    }.bind(this));
    tween.start();
  }
}
