import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

import {GameApplication} from './app/game-application';

declare global {
  interface Window {
    PIXI: any;
    YT: any;
    onYouTubeIframeAPIReady: any;
    Player: any;
  }
}

var font = new FontFaceObserver('corporate-mincho-ver2')
font.load(null, 50000)
  .then(() => {
    window.PIXI = PIXI;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);

    const app = new GameApplication({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      antialias: true,
      resolution: 2,
      autoResize: true,
    });
    document.body.appendChild(app.view);

    window.onresize = () => {
      // app.renderer.resize(window.innerWidth, window.innerHeight);
      // app.resizeView();
    };
  });
