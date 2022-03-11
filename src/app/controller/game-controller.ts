import {Controller} from '../../framework/controller';
import Event from '../../framework/event';
import {GameModel} from '../model/game-model';
import {EVENT_PLAY_START} from '../env/event';

export class GameController extends Controller {
  private gameModel: GameModel;

  constructor() {
    super();
    this.init();
  }

  init() {
    Event.on(EVENT_PLAY_START, this.start)
  }

  load() {

  }

  start() {
    // start YT
    // hook callback to YT
    // callback :: playMessage gasp
  }
}
