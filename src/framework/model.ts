import bottle from './bottle';

export class Model {
  constructor() {
    bottle.set(this.constructor.name, this);
  }
}
