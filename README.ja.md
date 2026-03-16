# dot2svg

点の集合からSVGを生成するツール

## デモ
- https://code4fukui.github.io/dot2svg/

## 機能
- 点の集合からSVGを生成できる
- 丸角のSVGを生成できる

## 使い方
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

## オプション
- `dot2svg(dots, dotw, roundr = 0)`
- `roundr`を指定すると丸角のSVGを生成できます。

```js
const svg = dot2svg(`
111
101
111
`, 10, 1);
```

## ライセンス
MIT