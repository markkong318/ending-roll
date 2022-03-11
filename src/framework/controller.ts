import bottle from './bottle';

export class Controller {
  constructor() {
    bottle.set(this.constructor.name, this);
  }
}
