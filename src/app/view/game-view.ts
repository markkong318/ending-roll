import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../framework/view';
import {PhotoView} from './game/photo-view';
import {Size} from '../../framework/size';
import Event from '../../framework/event';
import {TitleView} from './game/title-view';
import {GradientView} from './game/gradient-view';
import {CastView} from './game/cast-view';
import {Youtube} from '../util/youtube';
import {EVENT_PLAY_START} from '../env/event';

export class GameView extends View {
  private background: PIXI.Sprite;
  private photoView: PhotoView;
  private gradientView: GradientView;
  private titleView: TitleView;
  private castView: CastView;

  private timeline_queue: gsap.core.Timeline;
  private timeline_anime: gsap.core.Timeline;

  private youtube: Youtube;

  constructor() {
    super();
  }

  public init() {
    this.timeline_queue = gsap.timeline();
    this.timeline_queue.pause(0);

    this.timeline_anime = gsap.timeline();
    this.timeline_anime.pause(0);

    this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.background.width = this.size.width;
    this.background.height = this.size.height;
    this.background.tint = 0x333333;
    this.addChild(this.background);

    this.photoView = new PhotoView(this.timeline_anime);
    this.photoView.size = new Size(this.size.width, this.size.height);
    this.photoView.init();
    this.addChild(this.photoView);

    this.gradientView = new GradientView(this.timeline_anime);
    this.gradientView.size = new Size(this.size.width, this.size.height);
    this.gradientView.init();
    this.addChild(this.gradientView);

    this.titleView = new TitleView(this.timeline_anime);
    this.titleView.size = new Size(this.size.width, this.size.height);
    this.titleView.init();
    this.addChild(this.titleView);

    this.castView = new CastView(this.timeline_anime);
    this.castView.size = new Size(this.size.width, this.size.height);
    this.castView.init();
    this.addChild(this.castView);

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

    Event.emit(EVENT_PLAY_START);


    const playAni = () => {
      // this.titleView.playMessage('Thank you', 5);
      // this.photoView.playMessage(PIXI.Texture.from('boy'), 2);
      // this.photoView.playMessage(PIXI.Texture.from('soup'), 10);
      //
      // this.titleView.playMessage('' +
      //   '本日は私達のために\n' +
      //   'お集まりいただきまして\n' +
      //   '誠にありがとうございました', 10);

      // setTimeout(() => {
      //   this.photoView.playMessage(PIXI.Texture.from('soup'), 5);
      //   this.titleView.playMessage('ああああああ', 5);
      //   this.castView.playMessage('様', 5);
      // },5000)
      //
      // setTimeout(() => {
      //   console.log(y.getCurrentTime());
      // }, 10000);

      /////////////

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.titleView.play('Thank you', 10);
          },
        });

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.photoView.play(PIXI.Texture.from('boy'), 1);
          },
        }, 1);

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.photoView.play(PIXI.Texture.from('soup'), 10);
          },
        }, 10);

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.titleView.play('' +
              '本日は私達のために\n' +
              'お集まりいただきまして\n' +
              '誠にありがとうございました', 20);
          },
        }, 20);

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.titleView.play('', 30);
          },
        }, 30);

      for (let i = 20; i < 200; i += 10) {
        this.timeline_queue
          .to({}, {
            onStart: () => {
              if (i / 10 % 2 === 1) {
                this.photoView.play(PIXI.Texture.from('boy'), i);
              } else {
                this.photoView.play(PIXI.Texture.from('soup'), i);
              }
            },
          }, i);
      }

      this.timeline_queue
        .to({}, {
          onStart: () => {
            this.castView.playMessage('xx xx 様', 20)
          },
        }, 20);

      this.timeline_queue.play();
      this.timeline_anime.play();
    }
  }
}
