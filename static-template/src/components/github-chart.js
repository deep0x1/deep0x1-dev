import GitChartRenderer from "./github-chart-render";

export default class GitChart {
  constructor(id, username) {
    this.container = document.getElementById(id);
    this.username = username;
    this.renderer = new GitChartRenderer(this.container, {});

    // render the skeleton
    this.renderer.renderSkeleton();
  }

  static async create(id, username) {
    const chart = new GitChart(id, username);
    await chart._fetchAndPopulate();
    return chart;
  }

  async _fetchAndPopulate() {
    try {
      // populate chart
      const apiData = null;

    } catch (error) {
      console.error("Failed to populate chart: ", error);
    }
  }
}
