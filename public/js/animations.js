function initializeAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  function createScrollAnimation(
    element,
    triggerSelector,
    getScrollAmount,
    startPosition = "top 0%"
  ) {
    const target = document.querySelector(element);
    if (!target) return;

    const tween = gsap.to(target, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: triggerSelector,
      start: startPosition,
      end: () => `+=${getScrollAmount() * -1.5}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  }

  createScrollAnimation(
    ".imagesWrapper",
    ".singleProjectWrapper",
    () => {
      let imageWidth = document.querySelector(".imagesWrapper").scrollWidth;
      let multiplier = window.innerWidth >= 768 ? 0.6 : 0.3;
      return -(imageWidth - window.innerWidth * multiplier);
    },
    "top 0%" // Cambia aquí el valor de inicio según tu preferencia
  );

  // Animación para el título h1 overlayed
  animateText(".name-title-overlayed");

  // Animación para el título h2 nonoverlayed
  animateText(".name-title-nonoverlayed");

  // Animación para el header si existe
  if (document.querySelector(".xlHeader--left")) {
    gsap.to(".xlHeader--left .xlHeader__header", {
      xPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: ".xlHeader--left .xlHeader__header",
        start: "top-=500 center",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Configuración para el overlay
  setupOverlay();
}

$(document).on("astro:page-load", initializeAnimations);

function animateText(selector) {
  var hElement = $(selector);
  if (!hElement.length) return;

  var text = hElement.text().trim();
  var letters = text.split("");
  var delayMultiplier = 150;

  hElement.empty();

  $.each(letters, function (index, letter) {
    var span = $("<span>").text(letter);
    span.attr("data-aos", "fade-up");
    span.attr("data-aos-duration", "500");
    span.attr("data-aos-delay", (index * delayMultiplier).toString());
    hElement.append(span);
  });
}

function setupOverlay() {
  const overlay = document.querySelector(".overlay");
  if (!overlay) return;

  const customOverlay = document.querySelector("#custom-overlay");
  const circlePath = document.querySelector("#circle-path");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function updateOverlayPosition() {
    const rect = overlay.getBoundingClientRect();
    const x = ((mouseX - rect.left) / rect.width) * 100;
    const y = ((mouseY - rect.top) / rect.height) * 100;

    gsap.to(overlay, {
      "--x": `${x}%`,
      "--y": `${y}%`,
    });

    requestAnimationFrame(updateOverlayPosition);
  }

  overlay.style.opacity = "0";

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    overlay.style.opacity = "1";
  });

  customOverlay.addEventListener("mouseleave", () => {
    circlePath.style.clipPath = "circle(0px at var(--x, 50%) var(--y, 50%))";
  });

  customOverlay.addEventListener("mouseenter", () => {
    circlePath.style.clipPath = "circle(100px at var(--x, 50%) var(--y, 50%))";
  });

  updateOverlayPosition();
}

document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const navbarCollapse = document.getElementById("navbar-default");
    if (navbarCollapse.classList.contains("hidden")) {
      navbarCollapse.classList.remove("hidden");
      navbarCollapse.classList.add("block");
    } else {
      navbarCollapse.classList.remove("block");
      navbarCollapse.classList.add("hidden");
    }
  });

$(document).ready(function () {
  // Capturar clic en cualquier enlace dentro del navbar
  $('#navbar a[href^="#"]').on("click", function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado (ir directamente a la sección)

    // Obtener el destino (el valor del href)
    const target = $(this.getAttribute("href"));

    // Si existe el destino, animar el scroll
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        800
      ); // La duración de la animación (en milisegundos)
    }
  });
});

AOS.init();
