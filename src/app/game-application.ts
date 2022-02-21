import * as PIXI from 'pixi.js';

import {GameView} from './view/game-view';
import {GameModel} from './model/game-model';
import {GameController} from './controller/game-controller';
import {Application} from '../framework/application';
import Bottle from '../framework/bottle';
import LayoutManager from '../framework/manager/layout-manager';
import {Storage} from './storage/storage';
import boy from '../../src/assets/images/boy.png';
import soup from '../../src/assets/images/soup.png';

export class GameApplication extends Application {
  private gameModel: GameModel;
  private gameController: GameController;
  private gameView: GameView;
  private storage: Storage;
  private layoutManager: LayoutManager;
  private sprite: PIXI.Sprite;

  constructor(options?) {
    super(options);
    this.preload();
  }

  public preload(): void {
    this.loader
      .add('boy', boy)
      .add('soup', soup)
      .load((loader, resources) => {
        this.onAssetsLoaded();
      });
  }

  public onAssetsLoaded(): void {
    this.initScene();
  }

  public initScene(): void {
    Bottle.set('renderer', this.renderer);

    this.gameModel = new GameModel();
    Bottle.set('gameModel', this.gameModel);

    this.gameController = new GameController()
    Bottle.set('gameController', this.gameController);

    this.storage = new Storage();
    Bottle.set('storage', this.storage);

    this.gameView = new GameView();
    Bottle.set('gameView', this.gameView);

    this.layoutManager = new LayoutManager(this.renderer, this.gameView);
    this.layoutManager.setLandscape();

    this.gameView.init();
    this.stage.addChild(this.gameView);

    // this.sprite = new PIXI.Sprite(PIXI.Texture.from('boy'));
    // this.gameView.addChild(this.sprite);

    console.log('hello game');
  }
}
