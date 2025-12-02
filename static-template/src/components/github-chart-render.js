const CONFIG = {};

export default class GitChartRenderer {
  constructor(container, config) {
    this.container = container;
    this.config = { ...CONFIG, ...config };
    this.svgElement = null;
  }
  
  _createElem(type, attrs) {
    const svgNs = "http://www.w3.org/2000/svg";
    const elem = document.createElementNS(svgNs, type);
    Object.entries(attrs).forEach((key, value) => elem.setAttribute(key, value));
    return elem;
  }
}
