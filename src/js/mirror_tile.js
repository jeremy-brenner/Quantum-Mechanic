class MirrorTile extends Tile {
  reflects(direction) {
    if(this.data.type=='mirror'){
      var i = this.data.facing.indexOf( this.inverse_directions[direction] );
      if(i>-1){
        return this.data.facing[(i==0)?1:0];
      }
    }
    return false;
  }
  texture() {
    let texture_name = this.data.type + '-' + this.data.facing[0].toLowerCase() + '-' + this.data.facing[1].toLowerCase();
    return window.game.textures.get(texture_name);
  }

}
