class MapReader {
  constructor() {
    console.log('MapReader loaded');
  }

  load(lvl) {
    const JSON = require('electron').remote.require('./app/maps/1.json');
    console.log(JSON);
  }

  build(e) {
    console.log('building', e);
  }
}
