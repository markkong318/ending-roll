import {Model} from '../../framework/model';
import {CastModel} from './cast-model';

export class GameModel extends Model {
  private groomName: string;
  private brideName: string;
  private casts: CastModel[];

  constructor() {
    super();
  }
}
