import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../framework/view';

const FONT_SIZE = {
  large: 0,
  middle: 0,
  small: 0,
}

const TRANSITION_TIME = 2.5;

export class TitleView extends View {
  private background: PIXI.Sprite;
  private title: PIXI.Text;
  private ticker: PIXI.Ticker;
  private timeline: gsap.core.Timeline;

  constructor(timeline: gsap.core.Timeline) {
    super();
    this.timeline = timeline;
  }

  init() {
    FONT_SIZE.large = this.size.height / 9;
    FONT_SIZE.middle = this.size.height / 14;
    FONT_SIZE.small = this.size.height / 19;

    console.log({
      FONT_SIZE
    })

    this.background = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.background.width = this.size.width;
    this.background.height = this.size.height;
    this.addChild(this.background);

    const style = new PIXI.TextStyle({
      align: "center",
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

    this.title = new PIXI.Text('', style);
    this.title.style.fontSize = FONT_SIZE.middle;
    this.title.position = new PIXI.Point(this.size.width / 2, this.size.height / 2);
    this.title.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this.title);

    this.ticker = new PIXI.Ticker();
    this.ticker.autoStart = true;
    this.ticker.add(() => {
      this.title.scale.x += 0.0001;
      this.title.scale.y += 0.0001;
    });
  }

  play(text: string, pos = 0, options = {} ) {

    let {
      // @ts-ignore
      fontSize,
    } = options;

    this.timeline
      .to(this.title, {
        duration: TRANSITION_TIME,
        pixi: {
          alpha: 0,
        },
        onStart: () => {
          this.title.alpha = 1;
        },
      }, pos)
      .to(this.title, {
        duration: TRANSITION_TIME,
        pixi: {
          alpha: 1,
        },
        onStart: () => {
          this.title.text = text;

          fontSize = FONT_SIZE[fontSize] ? FONT_SIZE[fontSize] : FONT_SIZE['middle'];
          this.title.style.fontSize = fontSize;

        }
      }, pos + TRANSITION_TIME);
  }
}
