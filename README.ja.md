# dot2svg

ASCII/バイナリドットマトリクスパターンを最適化されたSVGに変換する軽量なJavaScriptライブラリです。

## デモ

-   [https://code4fukui.github.io/dot2svg/](https://code4fukui.github.io/dot2svg/)

## 特徴

-   **効率的な形状統合**: 隣接するドットを自動的に`<rect>`や`<polygon>`要素に統合し、クリーンで最適化されたSVGを出力します。
-   **穴検出**: 複雑なポリゴン内の穴をスマートに検出し、生成します。
-   **角丸**: 単一のパラメータですべての形状に角丸を簡単に適用し、統一された`<path>`要素を生成します。
-   **シンプルな入力**: `0`と`1`を使用した複数行の文字列、または2D配列としてドットパターンを入力可能です。
-   **依存関係なし**: モダンブラウザとDenoで動作する純粋なESモジュールです。

## 使い方

### 基本的な変換

このライブラリはドットマトリクスをSVG要素（`<rect>`と`<polygon>`）の文字列に変換します。その後、これを完全な`<svg>`タグに埋め込むことができます。

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

### 角丸

`roundr`値を指定することで、ライブラリは角丸付きの単一の`<path>`要素を生成します。この例では自動的な穴検出も示しています。

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

-   `dots` **(string | number[][])**: `1`と`0`の複数行文字列、または数値の2D配列。
-   `dotw` **(number)**: 単一ドットのサイズ（幅と高さ）。
-   `roundr` **(number)**: *オプション*。角丸の半径。`0`または省略された場合、出力は`<rect>`と`<polygon>`要素になります。`0`より大きい場合、角丸付きの単一の`<path>`要素が出力されます。

## ライセンス

MIT License — [LICENSE](LICENSE)を参照してください。
