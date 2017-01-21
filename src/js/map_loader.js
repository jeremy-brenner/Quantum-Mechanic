class MapLoader {
  constructor() {
    console.log('MapLoader loaded');
  }

  load(lvl) {
    const data = require('electron').remote.require(`./app/maps/${lvl}.json`);
    return new Map(data);
  }
}
