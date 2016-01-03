import ImageInfo from './imageInfo';
import Missle from './missle';

export default class Ship extends ImageInfo {
  constructor(initial = {}) {
    super(initial);
    this.missileGroup = [];
  }

  shoot() {
    const initialMissle = {
      pos: [this.pos[0] + this.size[0] / 2, this.pos[1] + this.size[1] / 2],
      vel: [this.vel[0] + this.forward[0], this.vel[1] + this.forward[1]],
      angle: this.angle
    };

    let missile = new Missile(initialMissle);
    this.missileGroup.push(missile);
  };
}
