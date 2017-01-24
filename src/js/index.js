window.fs = require('electron').remote.require('fs');
window.path = require('electron').remote.require('path');

window.onload = function() {
  window.game = new Game();
}
