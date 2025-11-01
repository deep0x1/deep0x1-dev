export default class Blocks {
  constructor() {
    this.blocks = document.querySelectorAll(".block");
    this.init();
  }

  init() {
    let wasPrevFs = null;
    this.blocks.forEach((block, idx) => {
      // check block varient
      let isBlockFs = block.classList.contains("block-fs");

      // add svg line to block
      this.insertSvg(block, wasPrevFs || isBlockFs);
      wasPrevFs = isBlockFs;

      // add bottom line to last element
      if (idx == this.blocks.length - 1) {
        this.insertSvg(block, isBlockFs, false);
      }
    });
  }

  insertSvg(block, isFullScreen = false, isTop = true) {
    // define attributes
    const dataDirection = isTop ? "top" : "bottom";
    const dataVarient = isFullScreen ? "full-screen" : "auto-screen";

    // create new svg element
    const svgNs = "http://www.w3.org/2000/svg";
    const svgElem = document.createElementNS(svgNs, "svg");
    svgElem.setAttribute("data-direction", dataDirection);
    svgElem.setAttribute("data-variant", dataVarient);
    svgElem.setAttribute("class", "block__svg");
    svgElem.setAttribute("width", "100%");
    svgElem.setAttribute("height", "1");
    svgElem.setAttribute("viewBox", "0 0 100 1");
    svgElem.setAttribute("preserveAspectRatio", "none");

    // create new line element
    const lineElem = document.createElementNS(svgNs, "line");
    lineElem.setAttribute("x1", "0");
    lineElem.setAttribute("y1", "0.5");
    lineElem.setAttribute("x2", "100");
    lineElem.setAttribute("y2", "0.5");
    lineElem.setAttribute("stroke", "currentColor");
    lineElem.setAttribute("stroke-width", "1");
    lineElem.setAttribute("stroke-dasharray", "8, 8");
    lineElem.setAttribute("vector-effect", "non-scaling-stroke");

    // append line to svg
    svgElem.appendChild(lineElem);

    // append svg to block
    if (isTop) block.prepend(svgElem);
    else block.appendChild(svgElem);
  }
}
