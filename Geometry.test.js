import * as t from "https://deno.land/std/testing/asserts.ts";
import { Polygon, Rect } from "./Geometry.js";

Deno.test("polygon contains", () => {
  const p = new Polygon([
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    //{ x: 100, y: 100 },
    { x: 0, y: 100 },
  ]);
  t.assertEquals(p.contains({ x: 40, y: 50 }), true);
  t.assertEquals(p.contains({ x: 51, y: 50 }), false);
  t.assertEquals(p.contains({ x: 150, y: 50 }), false);
});
