import bottle from './bottle';

export class Storage {
  constructor() {
    bottle.set(this.constructor.name, this);
  }
}
