class Input {
  constructor() {
    this.keyboard_bindings = {
      'KeyW': 'Up',
      'KeyA': 'Left',
      'KeyS': 'Down',
      'KeyD': 'Right',
      'ArrowUp': 'Up',
      'ArrowDown': 'Down',
      'ArrowLeft': 'Left',
      'ArrowRight': 'Right',
      'KeyJ': 'Action1',
      'KeyK': 'Action2'
    };
    this.gamepad_bindings = {

    };
    this.inputs = {
      'Up': false,
      'Down': false,
      'Left': false,
      'Right': false,
      'Action1': false,
      'Action2': false
    };
    this.gamepads = [];
    this.bindEvents();
  }
  bindEvents() {
    window.addEventListener( 'keydown', this.keyDown.bind(this) );
    window.addEventListener( 'keyup', this.keyUp.bind(this) );
    window.addEventListener('gamepadconnected', this.addGamePad.bind(this) );
    window.addEventListener('gamepaddisconnected', this.removeGamePad.bind(this) );
  }

  keyDown(e) {
    var input = this.keyboard_bindings[e.code];
    if(input){
      this.inputs[input] = true;
    }
  }

  keyUp(e) {
    var input = this.keyboard_bindings[e.code];
    if(input){
      this.inputs[input] = false;
    }
  }

  getInputs() {
    return this.inputs;
  }

  addGamePad(e) {
    this.gamepads[e.gamepad.index] = e.gamepad;
  }
  removeGamePad(e) {
    delete this.gamepads[e.gamepad.index];
  }
}
