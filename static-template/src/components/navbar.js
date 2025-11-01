export default class Navbar {
  constructor() {
    // dom elements
    this.navbarElem = document.getElementById("navbar");
    this.navbarMobileElem = document.getElementById("navbar-mobile");
    this.navbarToggleBtn = document.getElementById("navbar-toggle");
    this.navbarThemeBtns = document.querySelectorAll(".nav__theme_btn");

    this.init();
  }

  init() {
    // set initial theme
    const savedTheme = localStorage.getItem("theme") ?? "dark";
    this.updateTheme(savedTheme);

    // add event listeners
    this.navbarToggleBtn.addEventListener(
      "click",
      this.toggleNavState.bind(this)
    );
    this.navbarThemeBtns.forEach((btn) => {
      btn.addEventListener("click", this.toggleTheme.bind(this));
    });
  }

  toggleNavState() {
    this.navbarToggleBtn.classList.toggle("active");
    this.navbarMobileElem.classList.toggle("active");
  }

  toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
      this.updateTheme(newTheme);
      return;
    }

    // transation direction
    const direction = newTheme === "light" ? "forward" : "reverse";
    document.documentElement.setAttribute("data-direction", direction);

    // trigger the transation
    document.documentElement.classList.add("is-changing-theme");

    // start transation
    const transition = document.startViewTransition(() => {
      this.updateTheme(newTheme);
    });

    // remove class after transation
    transition.finished.then(() => {
      document.documentElement.classList.remove("is-changing-theme");
      document.documentElement.removeAttribute("data-direction");
    });
  }

  updateTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
}
