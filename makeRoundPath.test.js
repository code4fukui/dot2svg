import * as t from "https://deno.land/std/testing/asserts.ts";
import { makeRoundPath } from "./makeRoundPath.js";
import { Polygon } from "./Polygon.js";
import { dot2polygons } from "./dot2svg.js";

Deno.test("simple", () => {
  const p = new Polygon([
    { x: 10, y: 10 },
    { x: 100, y: 10 },
    { x: 100, y: 100 },
  ]);
  t.assertEquals(p.toSVG(), `<polygon points="10,10 100,10 100,100"/>`);
  t.assertEquals(makeRoundPath(p, 10), `<path d="M10,10L90,10Q100,10 100,20L100,100"/>`);
});

Deno.test("simple closepath", () => {
  const p = new Polygon([
    { x: 10, y: 10 },
    { x: 100, y: 10 },
    { x: 100, y: 100 },
    { x: 10, y: 100 },
    { x: 10, y: 10 },
  ]);
  t.assertEquals(p.toSVG(), `<polygon points="10,10 100,10 100,100 10,100 10,10"/>`);
  t.assertEquals(makeRoundPath(p, 10), `<path d="M20,10L90,10Q100,10 100,20L100,90Q100,100 90,100L20,100Q10,100 10,90L10,20Q10,10 20,10"/>`);
});

Deno.test("complex closepath", () => {
  const p = dot2polygons(`
00000100
00111110
00101111
01010110
01101010
11010110
10101100
11110000
  `, 10);
  const path = makeRoundPath(p, 1);
  //console.log(path);
  t.assertEquals(path, `<path d="M51,0L59,0Q60,0 60,1L60,9Q60,10 61,10L69,10Q70,10 70,11L70,19Q70,20 71,20L79,20Q80,20 80,21L80,29Q80,30 79,30L71,30Q70,30 70,31L70,59Q70,60 69,60L61,60Q60,60 60,61L60,69Q60,70 59,70L41,70Q40,70 40,69L40,61Q40,60 41,60L49,60Q50,60 50,59L50,51Q50,50 51,50L59,50Q60,50 60,49L60,41Q60,40 59,40L51,40Q50,40 50,39L50,31Q50,30 49,30L41,30Q40,30 40,29L40,21Q40,20 39,20L31,20Q30,20 30,21L30,29Q30,30 29,30L21,30Q20,30 20,29L20,11Q20,10 21,10L49,10Q50,10 50,9L50,1Q50,0 51,0M11,30L19,30Q20,30 20,31L20,39Q20,40 21,40L29,40Q30,40 30,41L30,49Q30,50 29,50L21,50Q20,50 20,51L20,59Q20,60 19,60L11,60Q10,60 10,61L10,69Q10,70 11,70L19,70Q20,70 20,69L20,61Q20,60 21,60L29,60Q30,60 30,61L30,69Q30,70 31,70L39,70Q40,70 40,71L40,79Q40,80 39,80L1,80Q0,80 0,79L0,51Q0,50 1,50L9,50Q10,50 10,49L10,31Q10,30 11,30M31,30L39,30Q40,30 40,31L40,39Q40,40 39,40L31,40Q30,40 30,39L30,31Q30,30 31,30M41,40L49,40Q50,40 50,41L50,49Q50,50 49,50L41,50Q40,50 40,49L40,41Q40,40 41,40M31,50L39,50Q40,50 40,51L40,59Q40,60 39,60L31,60Q30,60 30,59L30,51Q30,50 31,50"/>`);
});
