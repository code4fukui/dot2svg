export class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  toSVG() {
    return `<rect x="${this.x}" y="${this.y}" width="${this.w}" height="${this.h}"/>`;
  }
};
