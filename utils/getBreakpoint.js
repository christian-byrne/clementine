function getBreakpoint(windowWidth){
  const breakpointMap = {
    576: "sm",
    768: "md",
    992: "lg",
    1200: "xl"
  }
  for (let breakpoint in breakpointMap){
    if (windowWidth <= breakpoint){
      return breakpointMap[breakpoint];
    }
  }
  return "xxl";
}

export default getBreakpoint;