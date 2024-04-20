function getBreakpoint(breakpoint) {
  const breakpointMap = {
    576: "sm",
    768: "md",
    992: "lg",
    1200: "xl",
    1400: "xxl",
    1600: "xxxl",
    2560: "2k",
    3840: "4k",
  };
  if (typeof breakpoint == "number") {
    for (let breakpointWidth in breakpointMap) {
      if (breakpoint <= breakpointWidth) {
        return breakpointMap[breakpointWidth];
      }
    }
    return "8k";
  }
  return Object.keys(breakpointMap).find(
    (key) => breakpointMap[key] === breakpoint
  );
}

function breakpointIsGreater(breakpoint1, breakpoint2) {
  if (typeof breakpoint1 == "string") {
    breakpoint1 = getBreakpoint(breakpoint1);
  }
  if (typeof breakpoint2 == "string") {
    breakpoint2 = getBreakpoint(breakpoint2);
  }
  breakpoint1 = parseInt(breakpoint1);
  breakpoint2 = parseInt(breakpoint2);
  return breakpoint1 > breakpoint2;
}

function isStandardBreakpoint(breakpoint) {
  const standardBreakpoints = ["sm", "md", "lg", "xl", "xxl"];
  return standardBreakpoints.includes(breakpoint);
}

export { getBreakpoint, breakpointIsGreater, isStandardBreakpoint };
