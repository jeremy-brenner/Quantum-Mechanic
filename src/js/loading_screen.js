class LoadingScreen {
  constructor() {
    this.wrapper_el = document.getElementById('loading-bar-full-wrapper');
    this.img_el = document.getElementById('loading-bar-full');
    this.empty_el = document.getElementById('loading-bar-empty');
    this.current_image = '1';
  }

  assetLoaded(perc) {
    this.wrapper_el.style.width = `${25 + perc/2.0}%`
    console.log("width should now be " + (25 + perc/2.0).toString())
    // if (this.current_image == '1') {
    //   this.img_el.setAttribute('src', './assets/img/loading-bar-full-2.png');
    //   this.current_image = '2';
    // } else {
    //   this.img_el.setAttribute('src', './assets/img/loading-bar-full-1.png');
    //   this.current_image = '1';
    // }
  }

  allAssetsLoaded() {
    this.img_el.style.display = 'none';
    this.empty_el.style.display = 'none';
    this.wrapper_el.style.display = 'none';
  }
}
