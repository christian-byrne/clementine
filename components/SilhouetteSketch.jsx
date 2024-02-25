import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import SilhouetteBodyPart from "./SilhouetteBodyPart";

function SilhouetteSketch({
  containerSize,
  sketchProportions,
  strokeWidth = 1.618 * 2,
}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Each part is a trapezoid with height, top width, and bottom width
  // calculated using the ratios/proportions
  let bodyParts = {
    head: {},
    neck: {},
    torso: {},
    middle: {},
    "upper-legs": {},
    "lower-legs": {},
    feet: {},
  };
  //
  // https://looksmax.org/threads/ideal-facial-ratios-and-proportions.57266/
  // https://www.researchgate.net/publication/334748000_Facial_proportions_and_rat
  //
  // Head
  const headHeight =
    containerSize.height * sketchProportions.headHeightToTotalHeight;
  const headWidth = headHeight * sketchProportions.headWidthToHeadHeight;
  bodyParts.head["height"] = headHeight;
  bodyParts.head["startY"] = 0;
  bodyParts.head["endY"] = headHeight;
  bodyParts.head["topWidth"] = headWidth;
  bodyParts.head["bottomwidth"] = headWidth;

  // Neck
  const neckHeight =
    containerSize.height * sketchProportions.neckHeightToTotalHeight;
  const neckWidth = headHeight * sketchProportions.neckWidthtoHeadHeight;
  bodyParts.neck["height"] = neckHeight;
  bodyParts.neck["startY"] = headHeight;
  bodyParts.neck["endY"] = headHeight + neckHeight;
  bodyParts.neck["topWidth"] = neckWidth;
  bodyParts.neck["bottomwidth"] = neckWidth;

  // Torso
  const torsoHeight =
    containerSize.height * sketchProportions.torsoHeightToTotalHeight;
  const torsoTopWidth =
    headWidth *
    sketchProportions.shoulderWidthToBizygomaticWidth *
    sketchProportions.biyzgomaticWidthToHeadWidth;
  const torsoBottomWidth =
    torsoTopWidth * (1 / sketchProportions.shoulderWidthToWaistWidth);
  bodyParts.torso["height"] = torsoHeight;
  bodyParts.torso["startY"] = headHeight + neckHeight;
  bodyParts.torso["endY"] = headHeight + neckHeight + torsoHeight;
  bodyParts.torso["topWidth"] = torsoTopWidth;
  bodyParts.torso["bottomwidth"] = torsoBottomWidth;

  // Middle
  const middleHeight =
    containerSize.height * sketchProportions.middleHeightToTotalHeight;
  const middleTopWidth = torsoBottomWidth;
  const middleBottomWidth =
    (1.0 / sketchProportions.waistWidthToHipWidth) * torsoBottomWidth;
  bodyParts.middle["height"] = middleHeight;
  bodyParts.middle["startY"] = headHeight + neckHeight + torsoHeight;
  bodyParts.middle["endY"] =
    headHeight + neckHeight + torsoHeight + middleHeight;
  bodyParts.middle["topWidth"] = middleTopWidth;
  bodyParts.middle["bottomwidth"] = middleBottomWidth;

  // Upper Legs
  const upperLegHeight =
    containerSize.height *
    sketchProportions.upperLegHeightToTotalLowerBodyHeight *
    sketchProportions.lowerBodyHeightToTotalHeight;
  const upperLegTopWidth =
    sketchProportions.topUpperWidthToMiddleBottomWidth * middleBottomWidth;
  const upperLegBottomWidth =
    sketchProportions.kneeWidthToHeadHeight * headHeight;
  bodyParts["upper-legs"]["height"] = upperLegHeight;
  bodyParts["upper-legs"]["startY"] =
    headHeight + neckHeight + torsoHeight + middleHeight;
  bodyParts["upper-legs"]["endY"] =
    headHeight + neckHeight + torsoHeight + middleHeight + upperLegHeight;
  bodyParts["upper-legs"]["topWidth"] = upperLegTopWidth;
  bodyParts["upper-legs"]["bottomwidth"] = upperLegBottomWidth;

  // Lower Legs
  const lowerLegHeight =
    containerSize.height *
    (1.0 - sketchProportions.upperLegHeightToTotalLowerBodyHeight) *
    sketchProportions.lowerBodyHeightToTotalHeight;
  const lowerLegTopWidth = upperLegBottomWidth;
  const lowerLegBottomWidth =
    sketchProportions.ankleWidthToKneeWidth * upperLegBottomWidth;
  bodyParts["lower-legs"]["height"] = lowerLegHeight;
  bodyParts["lower-legs"]["startY"] =
    headHeight + neckHeight + torsoHeight + middleHeight + upperLegHeight;
  bodyParts["lower-legs"]["endY"] =
    headHeight +
    neckHeight +
    torsoHeight +
    middleHeight +
    upperLegHeight +
    lowerLegHeight;
  bodyParts["lower-legs"]["topWidth"] = lowerLegTopWidth;
  bodyParts["lower-legs"]["bottomwidth"] = lowerLegBottomWidth;

  // Feet
  const footHeight =
    containerSize.height * sketchProportions.footHeightToTotalHeight;
  const footTopWidth =
    sketchProportions.topFootWidthToAnkleWidth * lowerLegBottomWidth;
  const footBottomWidth =
    sketchProportions.soleWidthToAnkleWidth * footTopWidth;
  bodyParts.feet["height"] = footHeight;
  bodyParts.feet["startY"] =
    headHeight +
    neckHeight +
    torsoHeight +
    middleHeight +
    upperLegHeight +
    lowerLegHeight;
  bodyParts.feet["endY"] =
    headHeight +
    neckHeight +
    torsoHeight +
    middleHeight +
    upperLegHeight +
    lowerLegHeight +
    footHeight;
  bodyParts.feet["topWidth"] = footTopWidth;
  bodyParts.feet["bottomwidth"] = footBottomWidth;

  return (
    <Stage
      width={containerSize.width}
      height={containerSize.height}
      className="mb-4 silhouette-sketch-bg-pic d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url('/pictures/silhouette-examples/${sketchProportions.name}-1.jpg')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Layer>
        {Object.keys(bodyParts).map((part) => (
          <SilhouetteBodyPart
            key={part}
            stageWidth={containerSize.width}
            strokeColor={
              hovered ? "rgba(9, 188, 138, .832)" : "rgba(255, 16, 240, .9618)"
            }
            strokeWidth={hovered ? strokeWidth * 1.1618 : strokeWidth}
            topWidth={bodyParts[part].topWidth}
            bottomWidth={bodyParts[part].bottomwidth}
            startY={bodyParts[part].startY}
            endY={bodyParts[part].endY}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default SilhouetteSketch;
