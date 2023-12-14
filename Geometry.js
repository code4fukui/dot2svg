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
  toPolygon() {
    const p = [
      { x: this.x, y: this.y },
      { x: this.x + this.w, y: this.y },
      { x: this.x + this.w, y: this.y + this.h },
      { x: this.x, y: this.y + this.h },
      { x: this.x, y: this.y },
    ];
    return new Polygon(p);
  }
};



export class Polygon {
  constructor(points) {
    this.points = points.map(i => i);
  }
  toSVG() {
    return `<polygon points="${this.points.map(i => `${i.x},${i.y}`).join(" ")}"/>`;
  }
  contains(p) {
    // ray casting algorithm
    const pp = this.points;
    const x = p.x;
    const y = p.y;
    let wnum = 0;
    let i = pp.length - 1;
    for (let j = 0; i >= 0; j = i--) {
      const yi = pp[i].y - y;
      const yj = pp[j].y - y;
      if (yi > 0 == yj > 0) continue;
      const xi = pp[i].x - x;
      const xj = pp[j].x - x;
      const diry = yj > yi ? 1 : -1;
      const posx = diry * (xi * yj - xj * yi);
      if (posx > 0) wnum += diry;
    }
    return wnum % 2 == 1; 
  }
  getBoundsRect() {
    const p0 = this.points[0];
    let minx = p0.x;
    let miny = p0.y;
    let maxx = p0.x;
    let maxy = p0.y;
    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.x < minx) minx = p.x;
      if (p.x > maxx) maxx = p.x;
      if (p.y < miny) miny = p.y;
      if (p.y > maxy) maxy = p.y;
    }
    return new Rect(minx, miny, maxx - minx, maxy - miny);
  }
  toRectIfCan() {
    const p = this.points;
    if (p.length == 5 &&
      p[0].x == p[4].x && p[0].y == p[4].y &&
      p[1].x == p[2].x && p[1].y == p[0].y &&
      p[3].x == p[0].x && p[3].y == p[2].y
    ) {
      return new Rect(p[0].x, p[0].y, p[1].x - p[0].x, p[2].y - p[0].y);
    }
    return this;
  }
  addInvertPolygons(polygons) {
    for (const p of polygons) {
      p.points.reverse().forEach(i => this.points.push(i));
    }
  }
};
