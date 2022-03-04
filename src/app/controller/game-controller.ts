import {Controller} from '../../framework/controller';
import {GameModel} from '../model/game-model';

export class GameController extends Controller {
  private gameModel: GameModel;

  constructor() {
    super();
  }

  load() {

  }
}
