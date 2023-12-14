import * as t from "https://deno.land/std/testing/asserts.ts";
import { round } from "./round.js";

Deno.test("simple", () => {
  t.assertEquals(round(0.1, 2), 0.1);
  t.assertEquals(round(0.001, 2), 0.0);
  t.assertEquals(round(0.00001), 0.00001);
  t.assertEquals(round(0.000001), 0.0);
  t.assertEquals(round(123.56789, 3), 123.568);
  t.assertEquals(round(-123.56789, 3), -123.568);
  t.assertEquals(round(6.123233995736766e-17, 3), 0);
});
