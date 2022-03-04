import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../framework/view';

const POOL_SIZE = 2;
const TRANSITION_TIME = 2;

export class PhotoView extends View {
  private background: PIXI.Sprite;
  private pool: PIXI.Sprite[];
  private ticker: PIXI.Ticker;
  private timeline: gsap.core.Timeline;

  private idx: number = 0;

  constructor(timeline: gsap.core.Timeline) {
    super();
    this.timeline = timeline;
  }

  init() {
    this.background = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.background.width = this.size.width;
    this.background.height = this.size.height;
    this.addChild(this.background);

    this.pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      this.pool[i] = new PIXI.Sprite();
      this.pool[i].position = new PIXI.Point(this.size.width / 2, this.size.height / 2);
      this.pool[i].anchor = new PIXI.Point(0.5, 0.5);
      this.addChild(this.pool[i]);
    }

    this.idx = 0;

    this.ticker = new PIXI.Ticker();
    this.ticker.autoStart = true;
    this.ticker.add(() => {
      this.pool[this.idx].scale.x += 0.0001;
      this.pool[this.idx].scale.y += 0.0001;
    });
  }

  play(texture: PIXI.Texture, pos = 0) {
    const currentIdx = this.idx;
    const nextIdx = (this.idx + 1) % POOL_SIZE;

    this.pool[nextIdx].texture = texture;
    this.pool[nextIdx].scale.x = 1;
    this.pool[nextIdx].scale.y = 1;

    const scale = Math.max(this.size.width / this.pool[nextIdx].width, this.size.height / this.pool[nextIdx].height);
    this.pool[nextIdx].scale.x = scale;
    this.pool[nextIdx].scale.y = scale;

    this.pool[nextIdx].alpha = 0;

    this.timeline
      .to(this.pool[currentIdx], {
        duration: TRANSITION_TIME,
        pixi: {
          alpha: 0,
        },
      }, pos)
      .to(this.pool[nextIdx], {
        duration: TRANSITION_TIME,
        pixi: {
          alpha: 1,
        },
      }, pos);

    this.idx = nextIdx;
  }
}
