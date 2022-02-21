import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../framework/view';

export class PhotoView extends View {
  private background: PIXI.Sprite;
  private sprite: PIXI.Sprite;
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

    this.sprite = new PIXI.Sprite();
    this.sprite.position = new PIXI.Point(this.size.width / 2, this.size.height / 2);
    this.sprite.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this.sprite);

    this.ticker = new PIXI.Ticker();
    this.ticker.autoStart = true;
    this.ticker.add(() => {
      this.sprite.scale.x += 0.0005;
      this.sprite.scale.y += 0.0005;
    });
  }

  play(texture: PIXI.Texture, pos = 0) {
    this.timeline
      .to(this.sprite, {
        duration: 0.5,
        pixi: {
          alpha: 0,
        },
        onStart: () => {
          this.sprite.alpha = 1;
        },
      }, pos)
      .to(this.sprite, {
        duration: 3,
        pixi: {
          alpha: 1,
        },
        onStart: () => {
          this.sprite.texture = texture;
          this.sprite.scale.x = 1;
          this.sprite.scale.y = 1;

          const scale = Math.max(this.size.width / this.sprite.width, this.size.height / this.sprite.height);
          this.sprite.scale.x = scale;
          this.sprite.scale.y = scale;

          this.sprite.alpha = 0;
        }
      }, pos + 0.5);
  }
}
