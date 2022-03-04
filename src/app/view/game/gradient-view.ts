import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import gsap from 'gsap';

export class GradientView extends View {
  private background: PIXI.Sprite;
  private sprite: PIXI.Sprite;
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

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, this.size.width, 0)

    canvas.setAttribute('width', `${this.size.width}`);
    canvas.setAttribute('height', `${this.size.height}`);

    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(1, 'transparent')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.size.width, this.size.height);

    this.sprite = PIXI.Sprite.from(canvas)
    this.addChild(this.sprite);
  }

  show() {
    this.sprite.visible = true;
  }

  hide() {
    this.sprite.visible = false;
  }
}
