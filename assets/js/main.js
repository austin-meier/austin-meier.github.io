(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on("click", ".mobile-nav-toggle", function (e) {
    const navActive = select("body").classList.toggle("mobile-nav-active");
    this.textContent = navActive ? "close" : "menu";
    this.setAttribute("aria-expanded", navActive);
  });

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.textContent = "menu";
          navbarToggle.setAttribute("aria-expanded", false);
        }
        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",").map((s) => s.trim());
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 75,
      backDelay: 1000,
    });
  }

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  const revealContact = () => {
    const decode = (value) => atob(value);
    const email =
      decode("YXVzdGluLm1laWVy") + String.fromCharCode(64) + decode("aG90bWFpbC5jb20=");
    const phoneDisplay = decode("KDgwMykgOTIwLTI4MTE=");
    const phoneDial = decode("KzE4MDM5MjAyODEx");

    const fillers = {
      email: (el) => (el.textContent = email),
      phone: (el) => (el.textContent = phoneDisplay),
      maillink: (el) => (el.href = "mailto:" + email),
      tellink: (el) => (el.href = "tel:" + phoneDial),
    };

    select("[data-cloak]", true).forEach((el) => {
      const fill = fillers[el.getAttribute("data-cloak")];
      if (fill) fill(el);
    });
  };
  window.addEventListener("DOMContentLoaded", revealContact);
})();
