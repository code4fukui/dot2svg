import * as t from "https://deno.land/std/testing/asserts.ts";
import { dot2svg } from "./dot2svg.js";
import { s2dots } from "./s2dots.js";

Deno.test("simple", () => {
  t.assertEquals(dot2svg([[1]], 10), `<rect x="0" y="0" width="10" height="10"/>`)
  t.assertEquals(dot2svg([[1, 0], [0, 1]], 10), `<rect x="0" y="0" width="10" height="10"/><rect x="10" y="10" width="10" height="10"/>`)
});
Deno.test("rect", () => {
  t.assertEquals(dot2svg([[1, 1], [0, 0]], 10), `<rect x="0" y="0" width="20" height="10"/>`)
  t.assertEquals(dot2svg([[1, 0], [1, 0]], 10), `<rect x="0" y="0" width="10" height="20"/>`)
  t.assertEquals(dot2svg([[1, 1], [1, 1]], 10), `<rect x="0" y="0" width="20" height="20"/>`)
});
Deno.test("polygon", () => {
  t.assertEquals(dot2svg([[1, 1], [1, 0]], 10), `<polygon points="0,0 20,0 20,10 10,10 10,20 0,20 0,0"/>`)
  t.assertEquals(dot2svg([[1, 1, 1], [1, 0, 1]], 10), `<polygon points="0,0 30,0 30,20 20,20 20,10 10,10 10,20 0,20 0,0"/>`)
  t.assertEquals(dot2svg([[1, 1, 1], [1, 0, 1], [0, 1, 0]], 10), `<polygon points="0,0 30,0 30,20 20,20 20,10 10,10 10,20 0,20 0,0"/><rect x="10" y="20" width="10" height="10"/>`)
});
Deno.test("polygon hole", () => {
  const dots = s2dots(`111\n101\n111`);
  t.assertEquals(dot2svg(dots, 10), `<polygon points="0,0 30,0 30,30 0,30 0,0 10,10 10,20 20,20 20,10 10,10"/>`)
  t.assertEquals(dot2svg(s2dots(`
111111
100001
101101
100001
111111
  `), 10), `<polygon points="0,0 60,0 60,50 0,50 0,0 20,20 40,20 40,30 20,30 20,20 10,10 10,40 50,40 50,10 10,10"/>`)
});

Deno.test("polygon hole2", () => {
  
  t.assertEquals(dot2svg(s2dots(`
111111
100001
111101
100101
111111
  `), 10), `<polygon points="0,0 60,0 60,50 0,50 0,0 10,10 10,20 40,20 40,40 50,40 50,10 10,10 10,30 10,40 30,40 30,30 10,30"/>`)
});



Deno.test("polygon hole3", () => {
  t.assertEquals(dot2svg(s2dots(`
1111111
1000001
1011101
1010101
1011101
1000001
1111111
  `), 10), `<polygon points="0,0 70,0 70,70 0,70 0,0 20,20 50,20 50,50 20,50 20,20 30,30 30,40 40,40 40,30 30,30 10,10 10,60 60,60 60,10 10,10"/>`)
});

Deno.test("polygon hole3_1", () => {
  t.assertEquals(dot2svg(s2dots(`
0000000
0000000
0011100
0010100
0011100
0000000
0000000
  `), 10), `<polygon points="20,20 50,20 50,50 20,50 20,20 30,30 30,40 40,40 40,30 30,30"/>`)
});

Deno.test("polygon hole g", () => {
  t.assertEquals(dot2svg(s2dots(`
0111100
0101000
0111000
0001000
0111000
0000000
0000000
  `), 10), `<polygon points="10,0 50,0 50,10 40,10 40,50 10,50 10,40 30,40 30,30 10,30 10,0 20,10 20,20 30,20 30,10 20,10"/>`)
});
Deno.test("polygon hole ichigo", () => {
  t.assertEquals(dot2svg(s2dots(`
00000100
00111110
00101111
01010110
01101010
11010110
10101100
11110000
  `), 10), `<polygon points="50,0 60,0 60,10 70,10 70,20 80,20 80,30 70,30 70,60 60,60 60,70 40,70 40,60 50,60 50,50 60,50 60,40 50,40 50,30 40,30 40,20 30,20 30,30 20,30 20,10 50,10 50,0"/><polygon points="10,30 20,30 20,40 30,40 30,50 20,50 20,60 10,60 10,70 20,70 20,60 30,60 30,70 40,70 40,80 0,80 0,50 10,50 10,30"/><rect x="30" y="30" width="10" height="10"/><rect x="40" y="40" width="10" height="10"/><rect x="30" y="50" width="10" height="10"/>`)
});
