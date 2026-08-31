import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioMotion({ rootRef }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
          .from("[data-hero='label']", { autoAlpha: 0, y: 18, duration: 0.45 })
          .from("[data-hero='line']", { autoAlpha: 0, yPercent: 105, duration: 0.72, stagger: 0.09 }, "-=0.2")
          .from("[data-hero='portrait']", { autoAlpha: 0, y: 40, scale: 0.97, duration: 0.9 }, "-=0.62")
          .from("[data-hero='proof']", { autoAlpha: 0, x: 28, duration: 0.65 }, "-=0.58")
          .from("[data-hero='copy']", { autoAlpha: 0, y: 16, duration: 0.48, stagger: 0.08 }, "-=0.55")
          .from("[data-hero='capabilities'] article", { autoAlpha: 0, y: 20, duration: 0.45, stagger: 0.07 }, "-=0.34");

        gsap.utils.toArray("[data-motion='heading']").forEach((element) => {
          gsap.from(element.children, {
            opacity: 0,
            y: 32,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 84%", once: true },
          });
        });

        gsap.utils.toArray("[data-motion='row'], [data-motion='card'], [data-motion='block']").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray("[data-parallax] img").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -3, scale: 1.04 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });

        return () => heroTimeline.kill();
      });

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = root.querySelector(".milestone-pin");
        const track = root.querySelector(".milestone-track");
        if (!pin || !track) return undefined;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const horizontalTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${Math.max(distance() + window.innerWidth * 0.35, window.innerWidth)}`,
            pin: true,
            scrub: 0.72,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => pin.style.setProperty("--milestone-progress", self.progress),
          },
        });

        return () => {
          pin.style.removeProperty("--milestone-progress");
          horizontalTween.scrollTrigger?.kill();
          horizontalTween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      });

      const refresh = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) document.fonts.ready.then(refresh);
      root.querySelectorAll("img").forEach((image) => {
        if (!image.complete) image.addEventListener("load", refresh, { once: true });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [rootRef]);

  return null;
}
