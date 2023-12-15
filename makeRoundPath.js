import { Rect } from "./Rect.js";
import { Polygon } from "./Polygon.js";
import { round } from "./round.js";

export const makeRoundPathD = (polygon, r) => {
  if (Array.isArray(polygon)) {
    const res = [];
    for (const p of polygon) {
      res.push(makeRoundPathD(p, r));
    }
    return res.join("");
  }
  if (polygon instanceof Rect) {
    polygon = new Polygon(polygon);
  }
  const res = [];
  const push = (cmd, x, y) => {
    const n = 5;
    res.push(`${cmd}${round(x, n)},${round(y, n)}`);
  };
  const p = polygon.points;
  for (let i = 0; i < p.length;) {
    const p0 = p[i];
    let last = -1;
    for (let j = i + 1; j < p.length; j++) {
      const pj = p[j];
      if (p0.x == pj.x && p0.y == pj.y) {
        last = j;
        break;
      }
    }
    const closepath = last != -1;
    const p1 = p[i + 1];
    const th = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    let x0 = 0;
    let y0 = 0;
    if (closepath) {
      x0 = p0.x + Math.cos(th) * r;
      y0 = p0.y + Math.sin(th) * r;
      push("M", x0, y0);
    } else {
      push("M", p0.x , p0.y);
      last = p.length - 1;
    }
    let pp = p1;
    let thp = th;
    for (let j = i + 2; j <= last; j++) {
      const p2 = p[j];
      const x2 = pp.x - Math.cos(thp) * r;
      const y2 = pp.y - Math.sin(thp) * r;
      push("L", x2, y2);
      const th2 = Math.atan2(p2.y - pp.y, p2.x - pp.x);
      const x3 = pp.x + Math.cos(th2) * r;
      const y3 = pp.y + Math.sin(th2) * r;
      push("Q", pp.x, pp.y);
      push("_", x3, y3);
      pp = p2;
      thp = th2;
    }
    if (closepath) {
      const x = pp.x - Math.cos(thp) * r;
      const y = pp.y - Math.sin(thp) * r;
      push("L", x, y);
      push("Q", p0.x, p0.y);
      push("_", x0, y0);
    } else {
      push("L", pp.x, pp.y);
    }
    i = last + 1;
  }
  return res.join("").replace(/_/g, " ");
};

export const makeRoundPath = (polygon, r) => {
  const d = makeRoundPathD(polygon, r);
  return `<path d="${d}"/>`;
};
