import canvas from './canvas';

const FRICTION_FACTOR = 0.02;
const SPEED_FACTOR = 0.15;

export default class ImageInfo {
  constructor(initial = {}) {
    this.forward = [0, 0];
    this.thrust = false;
    this.size = [0, 0];
    this.pos = initial.pos || [0, 0];
    this.vel = initial.vel || [0, 0];
    this.angle = initial.angle || 0;
    this.angleVel = initial.angleVel || 0;
    this.friction = initial.friction || FRICTION_FACTOR;
    this.src = initial.src || '';
    this.speed = initial.speed || SPEED_FACTOR;
    this.age = initial.age || 0;
    this.lifespan = initial.lifespan || -1; // -1 === unlimited
  }

  update() {
    // Friction udpate
    this.vel[0] *= (1 - this.friction);
    this.vel[1] *= (1 - this.friction);

    this.angle += this.angleVel;
    this.forward = this.angleToVector(this.angle);

    if (this.thrust) {
      this.vel[0] += this.forward[0] * this.speed;
      this.vel[1] += this.forward[1] * this.speed;
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    // Check canvas borders
    if (this.pos[0] > canvas.width) {
      this.pos[0] = this.pos[0] % canvas.width;
    } else if (this.pos[0] < 0) {
      this.pos[0] = canvas.width + (this.pos[0] % canvas.width);
    }

    if (this.pos[1] > canvas.height) {
      this.pos[1] = this.pos[1] % canvas.height;
    } else if (this.pos[1] < 0) {
      this.pos[1] = canvas.height + (this.pos[1] % canvas.height);
    }
  }

  loadImage() {
    const that = this;
    let image = new Image();

    image.onload = function() {
      that.size = [image.width / 2, image.height];
    };

    image.src = this.src;

    return image;
  }

  draw() {
    const ctx = canvas.getContext('2d');
    const cx = this.pos[0] + (0.5 * this.size[0])
    const cy = this.pos[1] + (0.5 * this.size[1]);

    const imageObject = this.loadImage();

    // save state
    ctx.save();
    // set screen position
    ctx.translate(cx, cy);
    // set rotation
    ctx.rotate(this.angle);
    // draw image to screen drawImage(
    //  imageObject, sourceX, sourceY, sourceWidth, sourceHeight,
    // destinationX, destinationY, destinationWidth, destinationHeight)

    ctx.drawImage(
      imageObject,
      (this.thrust ? this.size[0] : 0),
      0,
      this.size[0],
      this.size[1],
      -this.size[0]/2,
      -this.size[1]/2,
      this.size[0],
      this.size[1]);

    // restore state
    ctx.restore();
  }

  angleToVector(angle) {
    return [Math.cos(angle), Math.sin(angle)];
  }
}
