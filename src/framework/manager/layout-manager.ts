import {View} from '../view';
import {Size} from '../size';

export default class LayoutManager {
  private view: View
  private renderer: PIXI.Renderer;

  constructor(renderer: PIXI.Renderer, view: View) {
    this.renderer = renderer;
    this.view = view;
  }

  setPortrait() {
    const viewWidth = 480;

    let viewHeight;
    if (this.renderer.width > this.renderer.height) {
      viewHeight = 800;
    } else {
      viewHeight = Math.floor(viewWidth * this.renderer.height / this.renderer.width);
    }

    this.view.size = new Size(viewWidth, viewHeight);

    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(this.renderer.width / this.view.size.width, this.renderer.height / this.view.size.height) / this.renderer.resolution;

      this.view.scale.x = scale;
      this.view.scale.y = scale;

      this.view.x = (this.renderer.width - this.view.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.view.y = (this.renderer.height - this.view.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    } else {
      const scale = this.renderer.width / this.view.size.width / this.renderer.resolution;

      this.view.scale.x = scale;
      this.view.scale.y = scale;

      this.view.x = 0;
      this.view.y = (this.renderer.height - this.view.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    }
  }

  setLandscape() {
    const viewHeight = 480;

    let viewWidth;
    if (this.renderer.height > this.renderer.width) {
      viewWidth = 800;
    } else {
      viewWidth = Math.floor(viewHeight * this.renderer.width / this.renderer.height);
    }

    this.view.size = new Size(viewWidth, viewHeight);

    if (this.renderer.height > this.renderer.width) {
      const scale = Math.min(this.renderer.height / this.view.size.height, this.renderer.width / this.view.size.width) / this.renderer.resolution;

      this.view.scale.x = scale;
      this.view.scale.y = scale;

      this.view.x = (this.renderer.width - this.view.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.view.y = (this.renderer.height - this.view.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    } else {
      const scale = this.renderer.height / this.view.size.height / this.renderer.resolution;

      this.view.scale.x = scale;
      this.view.scale.y = scale;

      this.view.x = (this.renderer.width - this.view.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.view.y = 0;
    }
  }
};
