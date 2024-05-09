class Breakpoints {
  constructor(customConfig) {
    this.breakpointsByName = {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1600,
      wi: 1800,
      "wi+": 1980,
      "2k": 2160,
      "2k+": 2400,
      "2k++": 2560,
      "3k": 2880,
      "3k+": 3200,
      "3k++": 3520,
      "4k": 3840,
      "4k+": 4320,
      "8k": 7680,
    };
    this.breakpointsBySize = Object.fromEntries(
      Object.entries(this.breakpointsByName).map(([key, value]) => [value, key])
    );

    let prev = customConfig[Object.keys(customConfig)[0]];
    for (let breakpointName in this.breakpointsByName) {
      if (customConfig[breakpointName]) {
        this[breakpointName] = customConfig[breakpointName];
        prev = customConfig[breakpointName];
      } else {
        this[breakpointName] = prev;
      }
    }
    
    // Get the final breakpoint value that is passed in the customConfig
    let largestCustomBreakpoint = Object.keys(customConfig).reduce(
      (prev, current) =>
        this.validateNumber(prev) > this.validateNumber(current) ? prev : current
    );
    // Use highest user-defined as fallback (otherwise fallback might not contain custom properties)
    this["8k"] = customConfig[largestCustomBreakpoint];

    this.standardSizeClass = `col-xs-${this.xs.cols} col-sm-${this.sm.cols} col-md-${this.md.cols} col-lg-${this.lg.cols} col-xl-${this.xl.cols}`;
  }

  validateNumber(breakpoint) {
    if (typeof breakpoint == "number") {
      return breakpoint; // 1920 -> 1920
    }
    if (typeof breakpoint == "string") {
      return /\D/.test(breakpoint)
        ? this.breakpointsByName[breakpoint] // "2k" -> 2160
        : parseInt(breakpoint); // "1920" -> 1920
    }
    return this.breakpointsByName[breakpoint.toString()]; // ["1920"] -> 1920
  }

  getBreakpointWidth(breakpointName) {
    return this.breakpointsByName[breakpointName];
  }

  getBreakpointName(breakpointWidth) {
    breakpointWidth = parseInt(breakpointWidth);
    for (let breakpoint in this.breakpointsByName) {
      if (breakpointWidth <= this.breakpointsByName[breakpoint]) {
        return breakpoint;
      }
    }
    return "8k";
  }

  isGreater(breakpoint1, breakpoint2) {
    return this.validateNumber(breakpoint1) > this.validateNumber(breakpoint2);
  }

  isLess(breakpoint1, breakpoint2) {
    return this.validateNumber(breakpoint1) < this.validateNumber(breakpoint2);
  }

  isStandard(breakpoint) {
    const standardBreakpoints = ["xs", "sm", "md", "lg", "xl"];
    return standardBreakpoints.includes(breakpoint);
  }
}

export default Breakpoints;
