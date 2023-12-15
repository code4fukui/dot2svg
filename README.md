# dot2svg

create SVG from dots

## demo

- https://code4fukui.github.io/dot2svg/

## usage

```js
import { dot2svg } from "https://code4fukui.github.io/dot2svg/dot2svg.js";

const svgichigo = dot2svg(`
00000100
00111110
00101111
01010110
01101010
11010110
10101100
11110000
`, 10);

const svgbase = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="black">`;
const svg = svgbase + svgichigo + "</" + "svg>";
divsvg.innerHTML = svg;
```

## option

```js
import { dot2svg } from "https://code4fukui.github.io/dot2svg/dot2svg.js";

const svg = dot2svg(`
111
101
111
`, 10, 1);
```
→
```html
<path d="M1,0L29,0Q30,0 30,1L30,29Q30,30 29,30L1,30Q0,30 0,29L0,1Q0,0 1,0M10,11L10,19Q10,20 11,20L19,20Q20,20 20,19L20,11Q20,10 19,10L11,10Q10,10 10,11"/>
```

## blog

- https://fukuno.jig.jp/4158
