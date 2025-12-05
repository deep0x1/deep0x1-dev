const createConfig = () => {
  // main svg frame
  const frame = {
    x: 0,
    y: 0,
    width: 738,
    height: 156,
  };
  frame.viewbox = `0 0 ${frame.width} ${frame.height}`;

  // graph header
  const header = {
    x: 0,
    y: 0,
    width: frame.width,
    height: 24,
  };
  header.viewbox = `0 0 ${header.width} ${header.height}`;

  // graph grid
  const grid = {
    x: 0,
    y: 28,
    width: frame.width,
    height: 94,
    cellSize: 10,
    cellGap: 4,
    cellRx: 2,
    totalCols: 53,
  };
  grid.viewbox = `0 0 ${grid.width} ${grid.height}`;

  // graph foot
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
  footer.viewbox = `0 0 ${footer.width} ${footer.height}`;
  footer.meta.viewbox = `0 0 ${footer.meta.width} ${footer.meta.height}`;

  return { frame, header, grid, footer };
};
const CONFIG = createConfig();

export default class GitChartRenderer {
  constructor(container, config) {
    this.container = container;
    this.config = { ...CONFIG, ...config };
    this.svgElem = null;
  }

  renderSkeleton() {
    // create components
    this.svgElem = this._createFrame();
    this.gridElem = this._createGrid();

    // append components
    this.svgElem.appendChild(this.gridElem);

    // append svg
    this.container.appendChild(this.svgElem);
  }

  _createElem(type, attrs, preserveAspectRatio = "none") {
    const svgNs = "http://www.w3.org/2000/svg";
    const elem = document.createElementNS(svgNs, type);
    Object.entries(attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });
    elem.setAttribute("preserveAspectRatio", preserveAspectRatio);
    return elem;
  }

  _createFrame() {
    const config = this.config.frame;
    const elem = this._createElem("svg", {
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      viewbox: config.viewbox,
    });
    return elem;
  }

  _createGrid() {
    const config = this.config.grid;
    const elem = this._createElem("svg", {
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      viewbox: config.viewbox,
    });

    // calculate dates
    const today = new Date();
    const daysToSat = 6 - today.getDay();
    const nextSat = new Date(today.getTime() + daysToSat);
    const firstDate = new Date(nextSat.getTime() - 371);
    const currDate = new Date(firstDate.getTime());
    
    // create boxes
    for (let col = 0; col < config.totalCols; col++) {
      for (let row = 0; row < 7; row++) {
        // convert current date to str
        const currDateStr = currDate.toISOString().split('T')[0]
        // increment current date by 1
        currDate.setDate(currDate.getDate() + 1);

        // create cell element
        const cellElem = this._createElem("rect", {
          x: col * (config.cellSize + config.cellGap),
          y: row * (config.cellSize + config.cellGap),
          width: config.cellSize,
          height: config.cellSize,
          rx: config.cellRx,
          "data-level": 0,
          "data-date": currDateStr,
        });
        
        // append cell to grid
        elem.appendChild(cellElem);
      }
    }

    return elem;
  }
}
