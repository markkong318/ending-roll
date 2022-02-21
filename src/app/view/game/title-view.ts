import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../framework/view';

export class TitleView extends View {
  private background: PIXI.Sprite;
  private title: PIXI.Text;
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

    this.title = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    this.title.position = new PIXI.Point(this.size.width / 2, this.size.height / 2);
    this.title.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this.title);
  }

  play(text: string, pos = 0) {
    this.timeline
      .to(this.title, {
        duration: 0.5,
        pixi: {
          alpha: 0,
        },
        onStart: () => {
          this.title.alpha = 1;
        },
      }, pos)
      .to(this.title, {
        duration: 3,
        pixi: {
          alpha: 1,
        },
        onStart: () => {
          this.title.text = text;
        }
      }, pos + 0.5);
  }
}
