class HumanBodyDiagram {
  constructor(container, proportions, strokeColor = "#FF10F0", strokeWidth = 1.618 * 2) {
    this.container = container;
    this.proportions = proportions;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.stage = new Konva.Stage({
      container: this.container,
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    });
    this.layer = new Konva.Layer();

    this.bodyParts = {
      head: {},
      neck: {},
      torso: {},
      middle: {},
      "upper-legs": {},
      "lower-legs": {},
      feet: {},
    };
    this.setSizes();

    this.createBodyPartNodes();
    this.stage.add(this.layer);
  }

  createBodyPartNodes() {
    for (let part in this.bodyParts) {
      // the width should be centered in the middle of the canvas
      let topStartX =
        (this.stage.width() - this.bodyParts[part]["topWidth"]) / 2;
      let topEndX = topStartX + this.bodyParts[part]["topWidth"];
      let bottomStartX =
        (this.stage.width() - this.bodyParts[part]["bottomwidth"]) / 2;
      let bottomEndX = bottomStartX + this.bodyParts[part]["bottomwidth"];

      var topLine = new Konva.Line({
        points: [
          topStartX,
          this.bodyParts[part]["startY"],
          topEndX,
          this.bodyParts[part]["startY"],
        ],
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: "round",
        lineJoin: "round",
      });
      this.layer.add(topLine);

      var bottomLine = new Konva.Line({
        points: [
          bottomStartX,
          this.bodyParts[part]["endY"],
          bottomEndX,
          this.bodyParts[part]["endY"],
        ],
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: "round",
        lineJoin: "round",
      });
      this.layer.add(bottomLine);

      var leftLine = new Konva.Line({
        points: [
          topStartX,
          this.bodyParts[part]["startY"],
          bottomStartX,
          this.bodyParts[part]["endY"],
        ],
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: "round",
        lineJoin: "round",
      });
      this.layer.add(leftLine);

      var rightLine = new Konva.Line({
        points: [
          topEndX,
          this.bodyParts[part]["startY"],
          bottomEndX,
          this.bodyParts[part]["endY"],
        ],
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: "round",
        lineJoin: "round",
      });
      this.layer.add(rightLine);

      this.bodyParts[part]["nodes"] = [
        topLine,
        bottomLine,
        leftLine,
        rightLine,
      ];
    }
  }

  setSizes() {
    // Each part is a trapezoid with height, top width, and bottom width calculated using the ratios/proportions
    const windowHeight = this.container.clientHeight;

    // Head
    const headHeight = windowHeight * this.proportions.headHeightToTotalHeight;
    const headWidth = headHeight * this.proportions.headWidthToHeadHeight;
    this.bodyParts.head["height"] = headHeight;
    this.bodyParts.head["startY"] = 0;
    this.bodyParts.head["endY"] = headHeight;
    this.bodyParts.head["topWidth"] = headWidth;
    this.bodyParts.head["bottomwidth"] = headWidth;

    // Neck
    const neckHeight = windowHeight * this.proportions.neckHeightToTotalHeight;
    const neckWidth = headHeight * this.proportions.neckWidthtoHeadHeight;
    this.bodyParts.neck["height"] = neckHeight;
    this.bodyParts.neck["startY"] = headHeight;
    this.bodyParts.neck["endY"] = headHeight + neckHeight;
    this.bodyParts.neck["topWidth"] = neckWidth;
    this.bodyParts.neck["bottomwidth"] = neckWidth;

    // Torso
    const torsoHeight =
      windowHeight * this.proportions.torsoHeightToTotalHeight;
    const torsoTopWidth =
      headWidth *
      this.proportions.shoulderWidthToBizygomaticWidth *
      this.proportions.biyzgomaticWidthToHeadWidth;
    const torsoBottomWidth =
      torsoTopWidth * (1 / this.proportions.shoulderWidthToWaistWidth);
    this.bodyParts.torso["height"] = torsoHeight;
    this.bodyParts.torso["startY"] = headHeight + neckHeight;
    this.bodyParts.torso["endY"] = headHeight + neckHeight + torsoHeight;
    this.bodyParts.torso["topWidth"] = torsoTopWidth;
    this.bodyParts.torso["bottomwidth"] = torsoBottomWidth;

    // Middle
    const middleHeight =
      windowHeight * this.proportions.middleHeightToTotalHeight;
    const middleTopWidth = torsoBottomWidth;
    const middleBottomWidth =
      (1.0 / this.proportions.waistWidthToHipWidth) * torsoBottomWidth;
    this.bodyParts.middle["height"] = middleHeight;
    this.bodyParts.middle["startY"] = headHeight + neckHeight + torsoHeight;
    this.bodyParts.middle["endY"] =
      headHeight + neckHeight + torsoHeight + middleHeight;
    this.bodyParts.middle["topWidth"] = middleTopWidth;
    this.bodyParts.middle["bottomwidth"] = middleBottomWidth;

    // Upper Legs
    const upperLegHeight =
      windowHeight *
      this.proportions.upperLegHeightToTotalLowerBodyHeight *
      this.proportions.lowerBodyHeightToTotalHeight;
    const upperLegTopWidth =
      this.proportions.topUpperWidthToMiddleBottomWidth * middleBottomWidth;
    const upperLegBottomWidth =
      this.proportions.kneeWidthToHeadHeight * headHeight;
    this.bodyParts["upper-legs"]["height"] = upperLegHeight;
    this.bodyParts["upper-legs"]["startY"] =
      headHeight + neckHeight + torsoHeight + middleHeight;
    this.bodyParts["upper-legs"]["endY"] =
      headHeight + neckHeight + torsoHeight + middleHeight + upperLegHeight;
    this.bodyParts["upper-legs"]["topWidth"] = upperLegTopWidth;
    this.bodyParts["upper-legs"]["bottomwidth"] = upperLegBottomWidth;

    // Lower Legs
    const lowerLegHeight =
      windowHeight *
      (1.0 - this.proportions.upperLegHeightToTotalLowerBodyHeight) *
      this.proportions.lowerBodyHeightToTotalHeight;
    const lowerLegTopWidth = upperLegBottomWidth;
    const lowerLegBottomWidth =
      this.proportions.ankleWidthToKneeWidth * upperLegBottomWidth;
    this.bodyParts["lower-legs"]["height"] = lowerLegHeight;
    this.bodyParts["lower-legs"]["startY"] =
      headHeight + neckHeight + torsoHeight + middleHeight + upperLegHeight;
    this.bodyParts["lower-legs"]["endY"] =
      headHeight +
      neckHeight +
      torsoHeight +
      middleHeight +
      upperLegHeight +
      lowerLegHeight;
    this.bodyParts["lower-legs"]["topWidth"] = lowerLegTopWidth;
    this.bodyParts["lower-legs"]["bottomwidth"] = lowerLegBottomWidth;

    // Feet
    const footHeight = windowHeight * this.proportions.footHeightToTotalHeight;
    const footTopWidth =
      this.proportions.topFootWidthToAnkleWidth * lowerLegBottomWidth;
    const footBottomWidth =
      this.proportions.soleWidthToAnkleWidth * footTopWidth;
    this.bodyParts.feet["height"] = footHeight;
    this.bodyParts.feet["startY"] =
      headHeight +
      neckHeight +
      torsoHeight +
      middleHeight +
      upperLegHeight +
      lowerLegHeight;
    this.bodyParts.feet["endY"] =
      headHeight +
      neckHeight +
      torsoHeight +
      middleHeight +
      upperLegHeight +
      lowerLegHeight +
      footHeight;
    this.bodyParts.feet["topWidth"] = footTopWidth;
    this.bodyParts.feet["bottomwidth"] = footBottomWidth;
  }
}


function createRootContainer(id) {
  const bigContainer = document.createElement("div");
  bigContainer.classList.add("big-container");
  document.getElementById("main").appendChild(bigContainer);
  return bigContainer;
}

function appendExamples(container, examples) {
  let exampleContainer = document.createElement("div");
  exampleContainer.classList.add("example-container");
  examples.forEach((example) => {
    let img = document.createElement("img");
    img.src = `./${example}`;
    img.alt = example;
    exampleContainer.appendChild(img);
  });
  container.appendChild(exampleContainer);
}

// https://looksmax.org/threads/ideal-facial-ratios-and-proportions.57266/
// https://www.researchgate.net/publication/334748000_Facial_proportions_and_rat
const proportions = {
  standardGoldenRatioIdeals: {
    examples: ["img_0820.webp"],
    // Head
    // Height
    headHeightToTotalHeight: 0.125,
    // Top width
    headWidthToHeadHeight: 0.75,
    // Bottom width same as top width

    // Neck
    // Height
    neckHeightToTotalHeight: 0.0625,
    // Top width
    neckWidthtoHeadHeight: 0.35,
    // Bottom width same as top width

    // Torso (shoulder -> waist)
    // Top width
    shoulderWidthToBizygomaticWidth: 3.7,
    biyzgomaticWidthToHeadWidth: 0.875,
    // Bottom width
    shoulderWidthToWaistWidth: 1.72,
    // Height
    torsoHeightToTotalHeight: 0.1902,

    // Middle (waist -> hip)
    // Top width is same as bottom width of torso
    // Bottom width
    waistWidthToHipWidth: 0.735,
    // Height
    middleHeightToTotalHeight: 0.125,

    // Upper Legs (hip -> knee)
    topUpperWidthToMiddleBottomWidth: 1.0,
    // Bottom width
    kneeWidthToHeadHeight: 0.97,
    // Height
    upperLegHeightToTotalLowerBodyHeight: 0.5,
    lowerBodyHeightToTotalHeight: 0.4,
    // upperLegHeightToTotalHeight = upperLegHeightToTotalLowerBodyHeight * lowerBodyHeightToTotalHeight

    // Lower Legs (knee -> ankle)
    // Top width is same as bottom width of upper legs
    // Bottom width
    ankleWidthToKneeWidth: 0.87,
    // Height
    // lowerLegHeightToTotalHeight = (1.0 - upperLegHeightToTotalLowerBodyHeight) * lowerBodyHeightToTotalHeight

    // Feet (ankle -> sole)
    // Top width
    topFootWidthToAnkleWidth: 1.0,
    // Bottom width
    soleWidthToAnkleWidth: 1.2618,
    // Height
    footHeightToTotalHeight: 0.08618,
  },

  oversizedTopFittedBottom: {
    examples: ["oversized-top2.jpg"],
    headHeightToTotalHeight: 0.125,
    headWidthToHeadHeight: 0.75,

    neckHeightToTotalHeight: 0.0625,
    neckWidthtoHeadHeight: 0.35,

    shoulderWidthToBizygomaticWidth: 3.7,
    biyzgomaticWidthToHeadWidth: 0.875,
    shoulderWidthToWaistWidth: 0.92,
    torsoHeightToTotalHeight: 0.22,

    waistWidthToHipWidth: 0.97,
    middleHeightToTotalHeight: 0.22,

    topUpperWidthToMiddleBottomWidth: 0.587,
    kneeWidthToHeadHeight: 0.93,
    upperLegHeightToTotalLowerBodyHeight: 0.38,
    lowerBodyHeightToTotalHeight:
      1.0 - (0.125 + 0.22 + 0.22 + 0.0655 + 0.08618),

    ankleWidthToKneeWidth: 0.68,

    topFootWidthToAnkleWidth: 1.0,
    soleWidthToAnkleWidth: 1.2618,
    footHeightToTotalHeight: 0.08618,
  },

  fittedTopCroppedOversizedBottom: {
    examples: ["fitted-top.jpg"],
    headHeightToTotalHeight: 0.125,
    headWidthToHeadHeight: 0.75,

    neckHeightToTotalHeight: 0.0625,
    neckWidthtoHeadHeight: 0.35,

    shoulderWidthToBizygomaticWidth: 1.618 * 2,
    biyzgomaticWidthToHeadWidth: 0.875,
    shoulderWidthToWaistWidth: 1.618,
    torsoHeightToTotalHeight: 0.18,

    waistWidthToHipWidth: 1.618 / 2,
    middleHeightToTotalHeight: 0.1618 / 2,

    topUpperWidthToMiddleBottomWidth: 1.0 - 0.01618,
    kneeWidthToHeadHeight: 1.618,
    upperLegHeightToTotalLowerBodyHeight: 0.618,
    lowerBodyHeightToTotalHeight: 1.0 - (0.125 + 0.0625 + 0.25 + 0.1618 / 2),

    ankleWidthToKneeWidth: 1.2,

    topFootWidthToAnkleWidth: 0.618,
    soleWidthToAnkleWidth: 0.9,
    footHeightToTotalHeight: 0.0618,
  },

  doubleOversizedCinchedDepth: {
    examples: ["double-cinch.jpg"],
    headHeightToTotalHeight: 0.125,
    headWidthToHeadHeight: 0.75,

    neckHeightToTotalHeight: 0.0625,
    neckWidthtoHeadHeight: 0.35,

    shoulderWidthToBizygomaticWidth: 4.1618,
    biyzgomaticWidthToHeadWidth: 0.875,
    shoulderWidthToWaistWidth: 1.85,
    torsoHeightToTotalHeight: 0.1902,

    waistWidthToHipWidth: 0.618,
    middleHeightToTotalHeight: 0.21618,

    topUpperWidthToMiddleBottomWidth: 0.618,
    kneeWidthToHeadHeight: 1.1618,
    upperLegHeightToTotalLowerBodyHeight: 0.618,
    lowerBodyHeightToTotalHeight: 1.0 - (0.125 + 0.1902 + 0.285 + 0.0625),

    ankleWidthToKneeWidth: 1.31618,

    topFootWidthToAnkleWidth: 0.618,
    soleWidthToAnkleWidth: 0.618,
    footHeightToTotalHeight: 0.0618,
  },
};

const diagrams = [];
// do this once everything is loaded
window.addEventListener("load", () => {
  for (let props in proportions) {
    let container = createRootContainer(props);
    let diagram = new HumanBodyDiagram(container, proportions[props]);
    appendExamples(container, proportions[props].examples);
    diagrams.push(container);
  }
});

// When page resizes, remove the old diagram objects and create new ones
window.addEventListener("resize", () => {
  diagrams.forEach((diagram) => {
    diagram.remove();
  });
  diagrams.length = 0;
  for (let props in proportions) {
    let container = createRootContainer(props);
    container.classList.add("container");
    let diagram = new HumanBodyDiagram(container, proportions[props]);
    appendExamples(container, proportions[props].examples);
    diagrams.push(container);
  }
});


// For each set of proportions, add a div mapping the proportions (in title case) to their values
const proportionDivs = [];
for (let props in proportions) {
  let div = document.createElement("div");
  div.classList.add("proportions");
  for (let prop in proportions[props]) {
    if (prop === "examples") {
      continue;
    }
    div.innerHTML += `<p>${prop}: ${proportions[props][prop]}</p>`;
  }
  proportionDivs.push(div);
}

// Add the divs to the main container
proportionDivs.forEach((div) => {
  document.getElementById("data").appendChild(div);
});