const DIR = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
};

export default class BlockCards {
  constructor() {
    this.cards = document.querySelectorAll(".block-card__thumbnail-title");
    this.init();
  }

  init() {
    this.cards.forEach(block => {
      // insert svgs
      this.insertSvg(block, DIR.TOP);
      this.insertSvg(block, DIR.BOTTOM);
      this.insertSvg(block, DIR.LEFT);
      this.insertSvg(block, DIR.RIGHT);
    });
  }

  insertSvg(block, type) {
    let viewBox = null;
    let rect = null;

    if (type == DIR.TOP || type == DIR.BOTTOM) {
      viewBox = "0 0 100 1";
      rect = {
        x1: "0",
        y1: "0.5",
        x2: "100",
        y2: "0.5",
        width: "100%",
        height: "1",
      }
    } else {
      viewBox = "0 0 1 100";
      rect = {
        x1: "0.5",
        y1: "0",
        x2: "0.5",
        y2: "100",
        width: "1",
        height: "100%",
      }
    }

    // create new svg element
    const svgNs = "http://www.w3.org/2000/svg";
    const svgElem = document.createElementNS(svgNs, "svg");
    svgElem.setAttribute("data-direction", type);
    svgElem.setAttribute("width", rect.width);
    svgElem.setAttribute("height", rect.height);
    svgElem.setAttribute("viewBox", viewBox);
    svgElem.setAttribute("preserveAspectRatio", "none");

    // create new line element
    const lineElem = document.createElementNS(svgNs, "line");
    lineElem.setAttribute("x1", rect.x1);
    lineElem.setAttribute("y1", rect.y1);
    lineElem.setAttribute("x2", rect.x2);
    lineElem.setAttribute("y2", rect.y2);
    lineElem.setAttribute("stroke", "currentColor");
    lineElem.setAttribute("stroke-width", "1");
    lineElem.setAttribute("stroke-dasharray", "6, 6");
    lineElem.setAttribute("vector-effect", "non-scaling-stroke");

    // append line to svg
    svgElem.appendChild(lineElem);
    block.prepend(svgElem);
  }
}