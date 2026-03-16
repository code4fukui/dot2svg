# dot2svg

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Create SVG from dots.

## Demo
- https://code4fukui.github.io/dot2svg/

## Features
- Export function `dot2svg` to convert dot data to SVG
- Supports rectangles, polygons, and rounded polygons
- Automatically handles holes in polygons

## Usage

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
const svg = svgbase + svgichigo + "</svg>";
divsvg.innerHTML = svg;
```

## License
MIT License — see [LICENSE](LICENSE).