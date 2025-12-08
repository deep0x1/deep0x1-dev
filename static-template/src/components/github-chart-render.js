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
    text: {
      y: 7.5,
      maxWidth: 22,
      dominantBaseline: "hanging",
    },
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
    class: "github__grid",
  };
  grid.viewbox = `0 0 ${grid.width} ${grid.height}`;

  // graph foot
  const footer = {
    x: 0,
    y: 132,
    width: frame.width,
    height: 24,
    text: {
      x: 0,
      y: 7.5,
      dominantBaseline: "hanging",
      class: "github__total-text",
    },
    meta: {
      x: 598,
      y: 0,
      width: 140,
      height: 24,
      left: { x: 0, y: 7.5 },
      range: {
        x: 37,
        y: 7,
        width: 66,
        height: 10,
        cellSize: grid.cellSize,
        cellGap: grid.cellGap,
        cellRx: grid.cellRx,
      },
      right: { x: 111, y: 7.5 },
    },
  };
  footer.viewbox = `0 0 ${footer.width} ${footer.height}`;
  footer.meta.viewbox = `0 0 ${footer.meta.width} ${footer.meta.height}`;
  footer.meta.range.viewbox = `0 0 ${footer.meta.range.width} ${footer.meta.range.height}`;

  return { frame, header, grid, footer };
};
const CONFIG = createConfig();

export default class GitChartRenderer {
  constructor(container, config) {
    this.container = container;
    this.config = { ...CONFIG, ...config };
    this.svgElem = null;
    this.monthPos = {};
  }

  renderSkeleton() {
    // create components
    this.svgElem = this._createFrame();
    const gridElem = this._createGrid();
    const headerElem = this._createHeader();
    const footerElem = this._createFooter();

    // append components
    this.svgElem.appendChild(gridElem);
    this.svgElem.appendChild(headerElem);
    this.svgElem.appendChild(footerElem);

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
      class: "github-block__svg",
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
      class: config.class,
    });

    // calculate dates
    const today = new Date();
    const daysToSat = 6 - today.getDay();

    // calculate next saturaday
    const nextSat = new Date(today);
    nextSat.setDate(today.getDate() + daysToSat);
    
    // subtract 370 (including current date)
    const firstDate = new Date(nextSat);
    firstDate.setDate(nextSat.getDate() - 370);
    const currDate = new Date(firstDate.getTime());

    // create boxes
    for (let col = 0; col < config.totalCols; col++) {
      for (let row = 0; row < 7; row++) {
        // convert current date to str
        const currDateStr = currDate.toISOString().split("T")[0];

        // if first of month push to monthPos
        if (currDate.getDate() == 1) {
          this.monthPos[currDate.getMonth()] =
            col * (config.cellSize + config.cellGap);
        }

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

  _createHeader() {
    const config = this.config.header;
    const elem = this._createElem("svg", {
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      viewbox: config.viewbox,
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    Object.entries(this.monthPos).forEach((entry) => {
      const x = entry[1];
      const frameWidth = config.width;
      if (frameWidth - x <= config.text.maxWidth) return;

      const textElem = this._createElem("text", {
        x: entry[1],
        y: config.text.y,
        "dominant-baseline": config.text.dominantBaseline,
      });
      textElem.textContent = months[entry[0]];
      elem.appendChild(textElem);
    });

    return elem;
  }

  _createFooter() {
    const config = this.config.footer;
    const elem = this._createElem("svg", {
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      viewbox: config.viewbox,
    });

    const textElem = this._createElem("text", {
      x: config.text.x,
      y: config.text.y,
      class: config.text.class,
      "dominant-baseline": config.text.dominantBaseline,
    });
    textElem.textContent = "Loading...";

    const metaElem = this._createElem("svg", {
      x: config.meta.x,
      y: config.meta.y,
      width: config.meta.width,
      height: config.meta.height,
      viewbox: config.meta.viewbox,
    });

    const leftMetaTextElem = this._createElem("text", {
      x: config.meta.left.x,
      y: config.meta.left.y,
      "dominant-baseline": config.text.dominantBaseline,
    });
    leftMetaTextElem.textContent = "Less";

    const rightMetaTextElem = this._createElem("text", {
      x: config.meta.right.x,
      y: config.meta.right.y,
      "dominant-baseline": config.text.dominantBaseline,
    });
    rightMetaTextElem.textContent = "More";

    const rangeConfig = config.meta.range;
    const rangeMetaElem = this._createElem("svg", {
      x: rangeConfig.x,
      y: rangeConfig.y,
      width: rangeConfig.width,
      height: rangeConfig.height,
      viewbox: rangeConfig.viewbox,
    });

    // adding cells
    for (let i = 0; i < 5; i++) {
      let elem = this._createElem("rect", {
        x: i * (rangeConfig.cellSize + rangeConfig.cellGap),
        y: 0,
        width: rangeConfig.cellSize,
        height: rangeConfig.cellSize,
        rx: rangeConfig.cellRx,
        "data-level": i,
      });
      rangeMetaElem.appendChild(elem);
    }

    // append meta elements
    metaElem.appendChild(leftMetaTextElem);
    metaElem.appendChild(rangeMetaElem);
    metaElem.appendChild(rightMetaTextElem);

    // append text to elem
    elem.appendChild(textElem);
    elem.appendChild(metaElem);
    return elem;
  }

  updateFooter(total) {
    const config = this.config.footer;
    const elem = this.svgElem.querySelector(`.${config.text.class}`);
    const today = new Date();
    const year = today.getFullYear();
    elem.textContent = `${total} contributions in ${year}`;
  }

  updateGrid(contributions) {
    const config = this.config.grid;
    const rects = this.svgElem.querySelectorAll(`.${config.class} rect`);
    rects.forEach((rect) => {
      const date = rect.getAttribute("data-date");
      rect.setAttribute("data-level", contributions[date]);
    });
  }
}
