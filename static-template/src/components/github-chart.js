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
      const apiData = await this._fetchData();
      const contributionsMap = this._processApiData(apiData);
      this.renderer.updateFooter(contributionsMap.total);
      this.renderer.updateGrid(contributionsMap.contributions);
    } catch (error) {
      console.error("Failed to populate chart: ", error);
    }
  }

  async _fetchData() {
    const url = `https://github-contributions-api.jogruber.de/v4/${this.username}`;
    let data = null;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      data = response.json();
    } catch (error) {
      console.error(error.message);
    }

    return data;
  }

  _processApiData(apiData) {
    const today = new Date();
    const year = today.getFullYear();

    const contributions = {};
    apiData.contributions.forEach((contribution) => {
      // console.log(contribution.date);
      contributions[contribution.date] = contribution.level;
    });

    const contributionsMap = { total: apiData.total[year], contributions };
    return contributionsMap;
  }
}
