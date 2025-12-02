const createConfig = () => {
  const frame = {
    x: 0,
    y: 0,
    width: 738,
    height: 156,
  };
  frame.viewport = `0 0 ${frame.width} ${frame.height}`;

  const header = {
    x: 0,
    y: 0,
    width: frame.width,
    height: 24,
  };
  header.viewport = `0 0 ${header.width} ${header.height}`;

  const grid = {
    x: 0,
    y: 28,
    width: frame.width,
    height: 94,
    cellSize: 10,
    cellGap: 4,
    totalCols: 53,
  };
  grid.viewport = `0 0 ${grid.width} ${grid.height}`;

  const footer = {
    x: 0,
    y: 132,
    width: frame.width,
    height: 24,
    meta: {
      x: 598,
      y: 0,
      width: 140,
      height: 24,
      left: { x: 0, y: 7.5 },
      range: { x: 37, y: 7 },
      right: { x: 111, y: 7.5 },
    },
  };
  footer.viewport = `0 0 ${footer.width} ${footer.height}`;
  footer.meta.viewport = `0 0 ${footer.meta.width} ${footer.meta.height}`;

  return { frame, header, grid, footer };
};
const CONFIG = createConfig();

export default class GitChartRenderer {
  constructor(container, config) {
    this.container = container;
    this.config = { ...CONFIG, ...config };
    this.svgElement = null;
  }

  renderSkeleton() {
    this._createFrame();
  }

  _createElem(type, attrs) {
    const svgNs = "http://www.w3.org/2000/svg";
    const elem = document.createElementNS(svgNs, type);
    Object.entries(attrs).forEach((key, value) =>
      elem.setAttribute(key, value)
    );
    return elem;
  }

  _createFrame() {}
}
