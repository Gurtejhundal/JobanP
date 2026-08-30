import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealDefaults = {
  autoAlpha: 1,
  duration: 1,
  ease: "power4.out",
};

function setupPointerDepth() {
  const supportsDepth = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsDepth || reducedMotion) return () => {};

  const cleanups = Array.from(document.querySelectorAll(".spatial-depth")).map((element) => {
    let frame = 0;
    let latestEvent = null;

    const render = () => {
      frame = 0;
      if (!latestEvent) return;

      const rect = element.getBoundingClientRect();
      const x = (latestEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (latestEvent.clientY - rect.top) / rect.height - 0.5;

      element.style.setProperty("--depth-shift-x", `${x * 9}px`);
      element.style.setProperty("--depth-shift-y", `${y * 9}px`);
      element.style.setProperty("--depth-rotate-x", `${y * -2.2}deg`);
      element.style.setProperty("--depth-rotate-y", `${x * 2.8}deg`);
      element.style.setProperty("--depth-scale", "1.048");
    };

    const handlePointerMove = (event) => {
      latestEvent = event;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const reset = () => {
      latestEvent = null;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--depth-shift-x", "0px");
      element.style.setProperty("--depth-shift-y", "0px");
      element.style.setProperty("--depth-rotate-x", "0deg");
      element.style.setProperty("--depth-rotate-y", "0deg");
      element.style.setProperty("--depth-scale", "1.035");
    };

    element.addEventListener("pointermove", handlePointerMove, { passive: true });
    element.addEventListener("pointerleave", reset);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function animateSectionHeadings(isDesktop) {
  gsap.utils.toArray(".section-heading, .dark-heading").forEach((heading) => {
    const copy = heading.querySelectorAll(":scope > p, :scope > h2");

    gsap.fromTo(
      copy,
      {
        autoAlpha: 0,
        yPercent: isDesktop ? 105 : 45,
        rotateX: isDesktop ? -9 : 0,
      },
      {
        ...revealDefaults,
        yPercent: 0,
        rotateX: 0,
        stagger: 0.09,
        scrollTrigger: {
          trigger: heading,
          start: "top 84%",
          once: true,
        },
      },
    );
  });
}

function animateDesktop() {
  const identityTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
  identityTimeline
    .fromTo(
      ".identity-stage__portrait",
      {
        autoAlpha: 0,
        y: 76,
        rotateX: 9,
        scale: 0.92,
        clipPath: "inset(48% 12% 48% 12% round 22px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 22px)",
        duration: 1.25,
      },
    )
    .fromTo(
      ".identity-stage__portrait figcaption",
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: 0.72 },
      "-=0.5",
    );

  gsap.to(".identity-stage__portrait", {
    yPercent: -9,
    rotateX: -2.5,
    scale: 0.965,
    ease: "none",
    scrollTrigger: {
      trigger: ".identity-stage",
      start: "top top+=70",
      end: "bottom top",
      scrub: 0.85,
    },
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-panel",
      start: "top 78%",
      once: true,
    },
  })
    .fromTo(
      ".hero-copy",
      { autoAlpha: 0, x: -54, rotateY: -6, transformOrigin: "left center" },
      { ...revealDefaults, x: 0, rotateY: 0, duration: 1.1 },
      0,
    )
    .fromTo(
      ".portrait-card",
      { autoAlpha: 0, x: 70, rotateY: 7, scale: 1.035, transformOrigin: "right center" },
      { ...revealDefaults, x: 0, rotateY: 0, scale: 1, duration: 1.18 },
      0.08,
    )
    .fromTo(
      ".hero-copy > *",
      { autoAlpha: 0, y: 28 },
      { ...revealDefaults, y: 0, stagger: 0.08, duration: 0.78 },
      0.3,
    )
    .fromTo(
      ".hero-meta > span",
      { autoAlpha: 0, y: 15 },
      { ...revealDefaults, y: 0, stagger: 0.08, duration: 0.62 },
      0.72,
    );

  gsap.to(".portrait-card", {
    "--depth-parallax-y": "5%",
    "--depth-parallax-scale": 1.035,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-panel",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  animateSectionHeadings(true);

  gsap.fromTo(
    ".skill-orb",
    { autoAlpha: 0, y: 68, rotateX: -48, scale: 0.72 },
    {
      ...revealDefaults,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.86,
      stagger: 0.055,
      clearProps: "opacity,visibility,transform",
      scrollTrigger: { trigger: ".skill-cloud", start: "top 82%", once: true },
    },
  );

  gsap.utils.toArray(".open-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 72, x: index % 2 ? 36 : -36, rotateY: index % 2 ? -5 : 5 },
      {
        ...revealDefaults,
        y: 0,
        x: 0,
        rotateY: 0,
        duration: 1.08,
        scrollTrigger: { trigger: card, start: "top 86%", once: true },
      },
    );
  });

  gsap.fromTo(
    ".experience-card",
    { autoAlpha: 0, y: 82, rotateX: 7, scale: 0.97, transformOrigin: "center top" },
    {
      ...revealDefaults,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.15,
      scrollTrigger: { trigger: ".experience-card", start: "top 84%", once: true },
    },
  );

  gsap.utils.toArray(".project-card").forEach((card, index) => {
    const visual = card.querySelector(".project-visual");
    const copy = card.querySelector(".project-copy");
    const direction = index % 2 ? 1 : -1;
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 82%", once: true },
    });

    timeline
      .fromTo(
        visual,
        { autoAlpha: 0, x: direction * 76, rotateY: direction * -7, scale: 0.96 },
        { ...revealDefaults, x: 0, rotateY: 0, scale: 1, duration: 1.12 },
        0,
      )
      .fromTo(
        copy,
        { autoAlpha: 0, x: direction * -48, y: 24 },
        { ...revealDefaults, x: 0, y: 0, duration: 0.95 },
        0.17,
      );

    gsap.to(visual, {
      "--depth-parallax-y": "5%",
      "--depth-parallax-scale": 1.03,
      ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.75 },
    });
  });

  gsap.utils.toArray(".research-paper").forEach((paper, index) => {
    gsap.fromTo(
      paper,
      { autoAlpha: 0, y: 110, rotateY: index ? -8 : 8, scale: 0.94 },
      {
        ...revealDefaults,
        y: index ? 26 : 0,
        rotateY: 0,
        scale: 1,
        duration: 1.16,
        onComplete: () => gsap.set(paper, { clearProps: "opacity,visibility,transform" }),
        scrollTrigger: { trigger: paper, start: "top 88%", once: true },
      },
    );
  });

  gsap.fromTo(
    ".milestone-card",
    { autoAlpha: 0, y: 78, rotateX: 6, scale: 0.97 },
    {
      ...revealDefaults,
      y: 0,
      rotateX: 0,
      scale: 1,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: { trigger: ".milestone-rail", start: "top 84%", once: true },
    },
  );

  gsap.fromTo(
    ".background-card",
    { autoAlpha: 0, y: 74, rotateY: (index) => index % 2 ? -5 : 5, scale: 0.97 },
    {
      ...revealDefaults,
      y: 0,
      rotateY: 0,
      scale: 1,
      stagger: 0.12,
      duration: 1,
      scrollTrigger: { trigger: ".background-grid", start: "top 84%", once: true },
    },
  );

  gsap.timeline({
    scrollTrigger: { trigger: ".contact-inner", start: "top 82%", once: true },
  })
    .fromTo(
      ".contact-intro > *",
      { autoAlpha: 0, y: 50, rotateX: -6 },
      { ...revealDefaults, y: 0, rotateX: 0, stagger: 0.1, duration: 0.95 },
      0,
    )
    .fromTo(
      ".contact-list button",
      { autoAlpha: 0, x: 54 },
      { ...revealDefaults, x: 0, stagger: 0.09, duration: 0.78 },
      0.2,
    );
}

function animateMobile() {
  animateSectionHeadings(false);

  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 28 },
      {
        ...revealDefaults,
        y: 0,
        duration: 0.72,
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      },
    );
  });
}

export function SpatialMotion({ active }) {
  useLayoutEffect(() => {
    if (!active) return undefined;

    let alive = true;
    let context;
    let media;
    let cleanupPointerDepth = () => {};
    const root = document.documentElement;

    const setup = () => {
      if (!alive) return;

      root.classList.add("motion-ready");
      context = gsap.context(() => {
        media = gsap.matchMedia();

        media.add("(min-width: 921px) and (prefers-reduced-motion: no-preference)", animateDesktop);
        media.add("(max-width: 920px) and (prefers-reduced-motion: no-preference)", animateMobile);
        media.add("(prefers-reduced-motion: no-preference)", () => {
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => root.style.setProperty("--scroll-progress", self.progress.toFixed(4)),
          });
        });
      });

      cleanupPointerDepth = setupPointerDepth();
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(setup);

    return () => {
      alive = false;
      cleanupPointerDepth();
      media?.revert();
      context?.revert();
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
    };
  }, [active]);

  return null;
}
