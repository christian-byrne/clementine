Front end of stylist app. For gamification class.

# [👉 VIEW THE APP LIVE](https://christian-byrne.github.io/clementine/)

#### TODO

- Model/Post Page (like civ post)
- automatically go to top of page when changing views (because had to switch to HashRouter)
- Number of items on navbar depends on screen size (and word/texts replaced with icons)
- https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Search,-Use%20search%20proprty
- https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Action%20buttons,-With%20the%20Datatable
- 
---


[Deploying to GH Pages with Next.js](https://github.com/gregrickaby/nextjs-github-pages?tab=readme-ov-file)


-------


```js
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
```