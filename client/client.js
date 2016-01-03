import Canvas from './canvas';
import Ship from './ship';
var raf = require('raf');

import './assets/css/client.scss';

export default class Client {
  constructor() {
    this.ctx = canvas.getContext('2d');

    const startX = (canvas.width / 2);
    const startY = (canvas.height / 2);
    const startPos = [startX, startY]

    const initialShip = {
      pos: startPos,
      src: '/assets/img/falcon_millenium.png',
      friction: 0.02
    };

    this.ship = new Ship(initialShip);
  }

  init() {
    const that = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    raf(function tick() {
      that.ship.update();
      that.ship.draw();

      raf(tick);
    });
  }
}
