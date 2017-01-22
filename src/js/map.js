class Map {
  constructor(data) {
    this.tiles = [];
    this.loadData(data);
  }
  loadData(data) {
    this.title = data.title;
    data.tiles.forEach(this.makeTile.bind(this));
    this.player = new Player(data.spawn_point.x,data.spawn_point.y);
  }
  makeTile(tile) {
    this.tiles.push( new Tile(tile) );
  }
  getTile(x,y) {
    return this.tiles.find( (tile) => { return tile.x() == x && tile.y() == y } );
  }
  buildThreeGroup() {
    this.group = new THREE.Group();
    this.group.add(this.player.buildThreeMesh())
    this.tiles.forEach( (tile) => { this.group.add(tile.buildThreeMesh()) } );
    return this.group;
  }
  canMove(dx, dy) {
    let dest, x, y;
    x = this.player.mesh.position.x - 0.5 + dx;
    y = -1*(this.player.mesh.position.y + 0.5 + dy);

    dest = this.getTile(x, y);
    if (dest) {
      if (!dest.solid()) {
        return true;
      } else {
        return false;
      }
    }
  }
  beam(type, dx, dy) {
    let result, blocked, tile, x, y;
    blocked = false;
    x = this.player.mesh.position.x - 0.5 + dx;
    y = -1*(this.player.mesh.position.y + 0.5) + dy;

    while (!blocked) {
      tile = this.getTile(x, y);
      if (tile) {
        result = tile.passes(null, dx, dy);
      } else {
        result = [false, 0, 0];
      }

      if (result[0]) {
        console.log("Passes through: (" + x + ", " + y + ")")
        if (dx == 1) {
          if (result[1] == 1) {
            this.makeTile({x: x, y: y, z: 2, type: "laser", facing: "right"})
          } else {
            if (result[2] == -1) {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "up"})
            } else {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "left"})
            }
          }
        } else if (dx == -1) {
          if (result[1] == -1) {
            this.makeTile({x: x, y: y, z: 2, type: "laser", facing: "left"})
          } else {
            if (result[2] == -1) {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "right"})
            } else {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "down"})
            }
          }
        } else if (dy == 1) {
          if (result[2] == 1) {
            this.makeTile({x: x, y: y, z: 2, type: "laser", facing: "down"})
          } else {
            if (result[1] == -1) {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "up"})
            } else {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "left"})
            }
          }
        } else if (dy == -1) {
          if (result[2] == -1) {
            this.makeTile({x: x, y: y, z: 2, type: "laser", facing: "up"})
          } else {
            if (result[1] == -1) {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "right"})
            } else {
              this.makeTile({x: x, y: y, z: 2, type: "laser-turn", facing: "down"})
            }
          }
        }
        dx = result[1];
        dy = result[2];
        x += dx;
        y += dy;
      } else {
        console.log("Blocked by: (" + x + ", " + y + ")")
        if (dx == 1) {
          this.makeTile({x: x, y: y, z: 2, type: "laser-end", facing: "right"})
        } else if (dx == -1) {
          this.makeTile({x: x, y: y, z: 2, type: "laser-end", facing: "left"})
        } else if (dy == 1) {
          this.makeTile({x: x, y: y, z: 2, type: "laser-end", facing: "down"})
        } else {
          this.makeTile({x: x, y: y, z: 2, type: "laser-end", facing: "up"})
        }
        blocked = true;
      }
    }
  }
}
