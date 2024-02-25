import React from "react";
import { Line as KonvaLine } from "react-konva";

export default function SilhouetteBodyPart({
  stageWidth,
  topWidth,
  bottomWidth,
  startY,
  endY,
  strokeColor,
  strokeWidth,
}) {
  let topStartX = (stageWidth - topWidth) / 2;
  let topEndX = topStartX + topWidth;
  let bottomStartX = (stageWidth - bottomWidth) / 2;
  let bottomEndX = bottomStartX + bottomWidth;

  const lines = [
    // Top Line
    [topStartX, startY, topEndX, startY],
    // Bottom Line
    [bottomStartX, endY, bottomEndX, endY],
    // Left Line
    [topStartX, startY, bottomStartX, endY],
    // Right Line
    [topEndX, startY, bottomEndX, endY],
  ];

  return (
    <>
      {lines?.length >= 3 &&
        lines.map((line, index) => (
          <KonvaLine
            key={index}
            points={line}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        ))}
    </>
  );
}
