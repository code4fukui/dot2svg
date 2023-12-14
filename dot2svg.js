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
}

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
}

export const dot2rects = (dots, dotw) => {
  const res = [];
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) {
        res.push(new Rect(x * dotw, y * dotw, dotw, dotw));
      }
    }
  }
  return res;
};

const ArrayUtil_remove = (ar, o) => {
  const n = ar.indexOf(o);
  if (n >= 0) {
    ar.splice(n, 1);
  }
};

const [UP, RIGHT, BOTTOM, LEFT] = [0, 1, 2, 3];

const rects2polygons1 = (rects, dotw, makeinvert = true) => {
  if (rects.length == 0) return [];
  const res = [];
  for (;;) {
    let cur = rects[0];
    let dir = UP;
    const p = [{ x: cur.x, y: cur.y}];
    const use = [];
    A: for (;;) {
      use.push(cur);
      switch (dir) {
        case UP:
          const right = rects.find(i => cur.y == i.y && cur.x + cur.w == i.x);
          if (right) {
            const rightup = rects.find(i => cur.y - cur.h == i.y && cur.x + cur.w == i.x);
            if (rightup) {
              p.push({ x: cur.x + cur.w, y: cur.y });
              dir = LEFT;
              cur = rightup;
            } else {
              cur = right;
            }
          } else {
            dir = RIGHT;
            p.push({ x: cur.x + cur.w, y: cur.y });
          }
          break;
        case RIGHT:
          const bottom = rects.find(i => cur.y + cur.h == i.y && cur.x == i.x);
          if (bottom) {
            const bottomright = rects.find(i => cur.y + cur.h == i.y && cur.x + cur.w == i.x);
            if (bottomright) {
              p.push({ x: cur.x + cur.w, y: cur.y + cur.h });
              dir = UP;
              cur = bottomright;
            } else {
              cur = bottom;
            }
          } else {
            dir = BOTTOM;
            p.push({ x: cur.x + cur.w, y: cur.y + cur.h });
          }
          break;
        case BOTTOM:
          const left = rects.find(i => cur.y == i.y && cur.x - cur.w == i.x);
          if (left) {
            const bottomleft = rects.find(i => cur.y + cur.h == i.y && cur.x - cur.w == i.x);
            if (bottomleft) {
              p.push({ x: cur.x, y: cur.y + cur.h });
              dir = RIGHT;
              cur = bottomleft;
            } else {
              cur = left;
            }
          } else {
            dir = LEFT;
            p.push({ x: cur.x, y: cur.y + cur.h });
          }
          break;
        case LEFT:
          const up = rects.find(i => cur.y - cur.h == i.y && cur.x == i.x);
          if (up) {
            const upleft = rects.find(i => cur.y - cur.h == i.y && cur.x - cur.w == i.x);
            if (upleft) {
              p.push({ x: cur.x, y: cur.y });
              dir = BOTTOM;
              cur = upleft;
            } else {
              cur = up;
            }
          } else {
            dir = UP;
            const pp = { x: cur.x, y: cur.y };
            p.push(pp);
            if (pp.x == p[0].x && pp.y == p[0].y) {
              break A;
            }
          }
          break;
      }
    }

    const polygon = new Polygon(p);
    if (makeinvert) {
      const irects = [];
      const r = polygon.getBoundsRect();
      for (let y = r.y; y < r.y + r.h; y += dotw) {
        for (let x = r.x; x < r.x + r.w; x += dotw) {
          if (polygon.contains({ x: x + dotw / 2, y: y + dotw / 2 })) {
            const ir = rects.find(i => i.x == x && i.y == y);
            if (!ir) {
              const r = new Rect(x, y, dotw, dotw);
              irects.push(r);
            }
          }
        }
      }
      const ipolygons = rects2polygons1(irects, dotw, true);
      polygon.addInvertPolygons(ipolygons);

      use.forEach(i => ArrayUtil_remove(rects, i));
      use.length = 0;
      for (const r of rects) {
        if (polygon.contains({ x: r.x + dotw / 2, y: r.y + dotw / 2 })) {
          use.push(r);
        }
      }
      use.forEach(i => ArrayUtil_remove(rects, i));
    }
    res.push(polygon);

    use.forEach(i => ArrayUtil_remove(rects, i));
    if (rects.length == 0) break;
  }
  return res;
};

const rects2polygons = (rects, dotw) => {
  rects = rects.map(i => i);
  rects.sort((a, b) => a.x + a.y * 1000 < b.x + b.y * 1000);
  const res = rects2polygons1(rects, dotw);
  return res.map(i => i.toRectIfCan());
};

export const dot2svg = (dots, dotw) => {
  const rects = dot2rects(dots, dotw);
  const res = rects2polygons(rects, dotw);
  return res.map(i => i.toSVG()).join("");
};
