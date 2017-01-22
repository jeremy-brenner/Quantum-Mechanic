class Input {
  constructor() {
    this.keys = [];
    this.fire_rate = 500;
    this.bindEvents();
  }
  bindEvents() {
    window.addEventListener( 'keydown', this.keyDown.bind(this) );
    window.addEventListener( 'keyup', this.keyUp.bind(this) );
  }
  keyInfo(key) {
    var info = this.keys.find( (key_info) => { return key_info.key == key } );
    if(!info){
      info = { key: key };
      this.keys.push(info);
    }
    return info;
  }
  keyDown(e) {
    var info = this.keyInfo(e.key);
    if(!info.pressed) {
      info.pressed = true;
      info.pressed_at = Date.now();
      info.released_at = null;
      info.last_fired = 0;
    }
  }
  keyUp(e) {
    var info = this.keyInfo(e.key);
    info.pressed = false;
    info.released_at = Date.now();
  }

  getKeys() {
    var fire_time = Date.now() - this.fire_rate;
    var pressed_keys = this.keys.filter( (key) => { return key.pressed &&  key.last_fired < fire_time } );
    pressed_keys.forEach( (key) => { key.last_fired = Date.now() } );
    return pressed_keys;
  }
}
