import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../framework/view';
import {PhotoView} from './game/photo-view';
import {Size} from '../../framework/size';
import {TitleView} from './game/title-view';
import {GradientView} from './game/gradient-view';

export class GameView extends View {
  private background: PIXI.Sprite;
  private photoView: PhotoView;
  private gradientView: GradientView;
  private titleView: TitleView;

  private timeline: gsap.core.Timeline;


  constructor() {
    super();
  }

  public init() {
    this.timeline = gsap.timeline();

    this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.background.width = this.size.width;
    this.background.height = this.size.height;
    this.background.tint = 0x333333;
    this.addChild(this.background);

    this.photoView = new PhotoView(this.timeline);
    this.photoView.size = new Size(this.size.width, this.size.height);
    this.photoView.init();
    this.addChild(this.photoView);

    this.gradientView = new GradientView(this.timeline);
    this.gradientView.size = new Size(this.size.width, this.size.height);
    this.gradientView.init();
    this.addChild(this.gradientView);

    this.titleView = new TitleView(this.timeline);
    this.titleView.size = new Size(this.size.width, this.size.height);
    this.titleView.init();
    this.addChild(this.titleView);


    ///
    this.photoView.play(PIXI.Texture.from('boy'));

    setTimeout(() => {
      this.photoView.play(PIXI.Texture.from('soup'), 5);
      this.titleView.play('ああああああ', 5)
    },5000)
  }
}
