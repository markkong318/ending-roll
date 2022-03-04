import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../framework/view';
import {PhotoView} from './game/photo-view';
import {Size} from '../../framework/size';
import {TitleView} from './game/title-view';
import {GradientView} from './game/gradient-view';
import {CastView} from './game/cast-view';
import {Youtube} from '../util/youtube';

export class GameView extends View {
  private background: PIXI.Sprite;
  private photoView: PhotoView;
  private gradientView: GradientView;
  private titleView: TitleView;
  private castView: CastView;

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

    this.castView = new CastView(this.timeline);
    this.castView.size = new Size(this.size.width, this.size.height);
    this.castView.init();
    this.addChild(this.castView);

    ///
    // this.photoView.play(PIXI.Texture.from('boy'));
    // this.castView.play('aaaaa');

    const y = new Youtube();
    y.init();

    console.log('install yt')
    this.interactive = true;
    this.on('click', () => {
      y.play()
      playAni();
    });

    this.on('touchstart', () => {
      console.log('ts')
      const y = new Youtube();
      y.play()
      playAni();
    });



    const playAni = () => {
      this.titleView.play('Thank you', 5);
      this.photoView.play(PIXI.Texture.from('boy'), 2);
      this.photoView.play(PIXI.Texture.from('soup'), 10);

      this.titleView.play('' +
        '本日は私達のために\n' +
        'お集まりいただきまして\n' +
        '誠にありがとうございました', 10);

      // setTimeout(() => {
      //   this.photoView.play(PIXI.Texture.from('soup'), 5);
      //   this.titleView.play('ああああああ', 5);
      //   this.castView.play('様', 5);
      // },5000)

      setTimeout(() => {
        console.log(y.getCurrentTime());
      }, 10000);
    }
  }
}
