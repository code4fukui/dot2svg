# dot2svg

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A lightweight JavaScript library to convert ASCII/binary dot matrix patterns into optimized SVG.

## Demo

-   [https://code4fukui.github.io/dot2svg/](https://code4fukui.github.io/dot2svg/)

## Features

-   **Efficient Shape Consolidation**: Automatically merges adjacent dots into larger `<rect>` and `<polygon>` elements for a clean, optimized SVG output.
-   **Hole Detection**: Intelligently identifies and creates holes within complex polygons.
-   **Rounded Corners**: Easily apply rounded corners to all shapes with a single parameter, generating a unified `<path>` element.
-   **Simple Input**: Accepts dot patterns as a multi-line string (using `0` and `1`) or a 2D array.
-   **Zero Dependencies**: A pure ES module that works in modern browsers and Deno.

## Usage

### Basic Conversion

The library converts a dot matrix into a string of SVG elements (`<rect>` and `<polygon>`). You can then embed this into a full `<svg>` tag.

```js
import { dot2svg } from "https://code4fukui.github.io/dot2svg/dot2svg.js";

const dotPattern = `
00000100
00111110
00101111
01010110
01101010
11010110
10101100
11110000
`;

// Generate the inner SVG elements
const svgContent = dot2svg(dotPattern, 10);

// Create a complete, viewable SVG image
const fullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <g fill="black">
    ${svgContent}
  </g>
</svg>
`;

// Display the SVG
document.body.innerHTML = fullSvg;
```

### Rounded Corners

By providing a `roundr` value, the library will generate a single `<path>` element with rounded corners. This example also demonstrates the automatic hole detection.

```js
import { dot2svg } from "https://code4fukui.github.io/dot2svg/dot2svg.js";

const hollowSquare = `
111
101
111
`;

// The '2' is the corner radius. This returns a complete <path> element.
const roundedSvgPathElement = dot2svg(hollowSquare, 10, 2);

const fullRoundedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
  ${roundedSvgPathElement}
</svg>
`;

document.body.innerHTML = fullRoundedSvg;
```

## API

### `dot2svg(dots, dotw, roundr = 0)`

-   `dots` **(string | number[][])**: A multi-line string of `1`s and `0`s, or a 2D array of numbers.
-   `dotw` **(number)**: The size (width and height) of a single dot.
-   `roundr` **(number)**: *Optional*. The radius for rounded corners. If `0` or omitted, the output will be `<rect>` and `<polygon>` elements. If greater than `0`, the output will be a single `<path>` element with rounded corners.

## License

MIT License — see [LICENSE](LICENSE).