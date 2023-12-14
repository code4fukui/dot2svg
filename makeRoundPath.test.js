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
  t.assertEquals(makeRoundPath(p, 10), `<path d="M10,10 L90,10 Q100,10 100,20 L100,100"/>`);
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
  t.assertEquals(makeRoundPath(p, 10), `<path d="M20,10 L90,10 Q100,10 100,20 L100,90 Q100,100 90,100 L20,100 Q10,100 10,90 L10,20 Q10,10 20,10"/>`);
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
  t.assertEquals(path, `<path d="M51,0 L59,0 Q60,0 60,1 L60,9 Q60,10 61,10 L69,10 Q70,10 70,11 L70,19 Q70,20 71,20 L79,20 Q80,20 80,21 L80,29 Q80,30 79,30 L71,30 Q70,30 70,31 L70,59 Q70,60 69,60 L61,60 Q60,60 60,61 L60,69 Q60,70 59,70 L41,70 Q40,70 40,69 L40,61 Q40,60 41,60 L49,60 Q50,60 50,59 L50,51 Q50,50 51,50 L59,50 Q60,50 60,49 L60,41 Q60,40 59,40 L51,40 Q50,40 50,39 L50,31 Q50,30 49,30 L41,30 Q40,30 40,29 L40,21 Q40,20 39,20 L31,20 Q30,20 30,21 L30,29 Q30,30 29,30 L21,30 Q20,30 20,29 L20,11 Q20,10 21,10 L49,10 Q50,10 50,9 L50,1 Q50,0 51,0"/>
<path d="M11,30 L19,30 Q20,30 20,31 L20,39 Q20,40 21,40 L29,40 Q30,40 30,41 L30,49 Q30,50 29,50 L21,50 Q20,50 20,51 L20,59 Q20,60 19,60 L11,60 Q10,60 10,61 L10,69 Q10,70 11,70 L19,70 Q20,70 20,69 L20,61 Q20,60 21,60 L29,60 Q30,60 30,61 L30,69 Q30,70 31,70 L39,70 Q40,70 40,71 L40,79 Q40,80 39,80 L1,80 Q0,80 0,79 L0,51 Q0,50 1,50 L9,50 Q10,50 10,49 L10,31 Q10,30 11,30"/>
<path d="M31,30 L39,30 Q40,30 40,31 L40,39 Q40,40 39,40 L31,40 Q30,40 30,39 L30,31 Q30,30 31,30"/>
<path d="M41,40 L49,40 Q50,40 50,41 L50,49 Q50,50 49,50 L41,50 Q40,50 40,49 L40,41 Q40,40 41,40"/>
<path d="M31,50 L39,50 Q40,50 40,51 L40,59 Q40,60 39,60 L31,60 Q30,60 30,59 L30,51 Q30,50 31,50"/>`);
});
