import ImageInfo from './imageInfo';

export default class Missle extends ImageInfo {
  update() {
    super.update();

    this.age += 1;

    if (this.age !== -1 && this.age > this.lifespan) {
      return false;
    } else {
      return true;
    }
  }
}
