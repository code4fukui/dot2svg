# dot2svg

create SVG from dots

## demo

- https://code4fukui.github.io/dot2svg/

## usage

```js
const svgichigo = dot2svg(s2dots(`
00000100
00111110
00101111
01010110
01101010
11010110
10101100
11110000
`), 10);

const svgbase = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="black">`;
const svg = svgbase + svgichigo + "</" + "svg>";
divsvg.innerHTML = svg;
```

## blog

- https://fukuno.jig.jp/4158
