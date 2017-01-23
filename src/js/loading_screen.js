class LoadingScreen {
  constructor() {
    this.loading_screen = document.getElementById('loading-screen');
    this.wrapper_el = document.getElementById('loading-bar-full-wrapper');
    this.img_el = document.getElementById('loading-bar-full');
    this.empty_el = document.getElementById('loading-bar-empty');
    this.current_image = '1';
  }

  assetLoaded(perc) {
    this.wrapper_el.style.width = `${25 + perc/2.0}%`
  }

  allAssetsLoaded() {
    this.loading_screen.style.display = 'none';
  }
}
