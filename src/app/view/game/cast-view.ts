import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import gsap from 'gsap';
import { Linear } from 'gsap';

const LINE_HEIGHT = 20;
const POOL_SIZE = 10;

export class CastView extends View {
  private background: PIXI.Sprite;
  private pool: PIXI.Text[];
  private ticker: PIXI.Ticker;
  private timeline: gsap.core.Timeline;

  constructor(timeline: gsap.core.Timeline) {
    super();

    this.timeline = timeline;
  }

  init() {
    this.background = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.background.width = this.size.width;
    this.background.height = this.size.height;
    this.addChild(this.background);

    const style = new PIXI.TextStyle({
      dropShadow: true,
      dropShadowBlur: 5,
      dropShadowDistance: 0,
      fill: "white",
      fillGradientStops: [
        0
      ],
      fontFamily: "corporate-mincho-ver2",
      lineJoin: "round",
      strokeThickness: 1
    });

    this.pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const line = new PIXI.Text('',style);
      line.position = new PIXI.Point(this.size.width / 2, this.size.height / 2);
      line.anchor = new PIXI.Point(0.5, 0.5);
      this.addChild(line);

      this.pool.push(line);
    }

    this.ticker = new PIXI.Ticker();
    this.ticker.autoStart = true;
  }


  playMessage(text: string, pos: number = 0) {
    const line = this.pool.shift();
    if (!line) {
      throw new Error('No available line');
    }

    line.text = text;
    line.position.y = this.size.height + LINE_HEIGHT;

    this.timeline
      .to(line, {
        duration: 10,
        pixi: {
          y: LINE_HEIGHT * -1,
        },
        ease: Linear.easeNone,
        onComplete: () => {
          this.pool.push(line);
        },
      }, pos);
  }
}
