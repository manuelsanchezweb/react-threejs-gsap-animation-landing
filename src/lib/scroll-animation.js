import gsap from "gsap";

// Get camera position and target, and method to update
export const scrollAnimation = (position, target, onUpdate) => {
  const tl = gsap.timeline();

  tl.to(position, {
    x: -3.38,
    y: -10.74,
    z: -5.93,
    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2, // This way the model will change position as we scroll
      immediateRender: false, // helps performance, not trigger until we scroll
    },
    onUpdate,
  })
    .to(target, {
      x: 1.52,
      y: 0.77,
      z: -1.08,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
    })
    .to(".jumbotron-section", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
    })
    .to(".sound-section-content", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
    })
    .to(position, {
      x: 1.56,
      y: 5,
      z: 0.011,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
      onUpdate,
    })
    .to(target, {
      x: -0.55,
      y: 0.32,
      z: 0.0,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
    })
    .to(".display-section", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2, // This way the model will change position as we scroll
        immediateRender: false, // helps performance, not trigger until we scroll
      },
    });
};
