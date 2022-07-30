/** @format */

scrollReveal({
  elem: [
    "section#services",
    "section#my-works .portfolio-board",
    "section#blogs .blogs-board",
  ],
  distance: 0,
  duration: 1.1,

  newStyle: {
    transform: "translateY(0)",
    opacity: 1,
  },
});

// opacity only
scrollReveal({
  elem: [
    "section#work-expertise .left",
    "section#my-works .section-heading",
    "section#blogs .section-heading",
    "section#contact-me",
  ],
  duration: 1.1,

  newStyle: {
    opacity: "1",
  },
});

// translateX:0 and opacity:1
scrollReveal({
  elem: ["section#experience .f-left"],
  duration: 1,

  newStyle: {
    transform: "translateX(0)",
    opacity: "1",
  },
});

// translateX:0 and opacity:1
scrollReveal({
  elem: ["section#experience .f-right", "section#work-expertise .right"],
  duration: 1.1,
  delay: 500,

  newStyle: {
    transform: "translateX(0)",
    opacity: "1",
  },
});
