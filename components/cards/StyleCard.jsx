import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import StyleCardCategoryTable from "@/components/cards/StyleCardCategoryTable";
import { hyphenToTitle } from "@/utils/hyphenNameToTitle";
import CardImageCarousel from "@/components/cards/CardImageCarousel";
import Breakpoints from "@/utils/breakpoints";

function sortCategories(categoryData) {
  const excludeCategories = [
    "subject",
    "lora",
    "loras",
    "medium",
    "mediums",
    "setting",
    "settings",
    "title",
    "description",
    "name",
    "rating",
  ];
  const priorityCategories = [
    "outerwear",
    "tops",
    "bottoms",
    "shoes",
    "materials/patterns",
  ];

  // Filter out the categories we want to exclude
  return Object.keys(categoryData)
    .filter((category) => !excludeCategories.includes(category.toLowerCase()))
    .sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (priorityCategories.includes(a) && !priorityCategories.includes(b)) {
        return -1;
      }
      if (!priorityCategories.includes(a) && priorityCategories.includes(b)) {
        return 1;
      }
      return (
        priorityCategories.indexOf(a.toString()) -
          priorityCategories.indexOf(b.toString()) ||
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
    });
}

function StyleCard({
  data,
  containerClass = "col-md-6 col-lg-6 col-sm-12 mb-4",
  detailsStartExpanded = false,
}) {
  let mainImageIndex = 0;
  for (let i = 0; i < data.images; i++) {
    if (data.images[i].title === "main") {
      mainImageIndex = i;
      break;
    }
  }

  let showNCategories = 1;
  let heightDiff =
    data.images[mainImageIndex].height - data.images[mainImageIndex].width;
  // Normalize the height difference to a range of 0 to 1
  heightDiff = (heightDiff + 1) / data.images[mainImageIndex].height;
  if (heightDiff >= 0.6) {
    showNCategories = 1;
  } else if (heightDiff >= 0.4) {
    showNCategories = 2;
  } else if (heightDiff >= 0.2) {
    showNCategories = 3;
  } else {
    showNCategories = 4;
  }
  const [categoriesExpanded, setCategoriesExpanded] = useState(
    detailsStartExpanded ? Infinity : showNCategories
  );
  const toggleExpansion = () => {
    if (categoriesExpanded === showNCategories) {
      setCategoriesExpanded(Infinity);
    } else {
      setCategoriesExpanded(showNCategories);
    }
  };

  const [breakpoint, setBreakpoint] = useState("lg");
  const [colCSSClass, setColCSSClass] = useState("col-12 ms-sm-auto pe-2");
  const breakpointsConfig = new Breakpoints({
    sm: {
      visibleRows: 5,
      cols: 12,
    },
    md: {
      visibleRows: 4,
      cols: 6,
    },
    xxxl: {
      visibleRows: 2,
      cols: 4,
    },
    wi: {
      visibleRows: 2,
      cols: 4,
    },
    "wi+": {
      visibleRows: 2,
      cols: 4,
    },
    "2k": {
      visibleRows: 2,
      cols: 4,
    },
    "2k+": {
      visibleRows: 2,
      cols: 3,
    },
    "3k": {
      visibleRows: 2,
      cols: 3,
    },
    "3k+": {
      visibleRows: 2,
      cols: 3,
    },
    "4k": {
      visibleRows: 2,
      cols: 2,
    },
    "8k": {
      visibleRows: 2,
      cols: 2,
    },
  });

  const updateColCSSClass = () => {
    if (!breakpointsConfig.isStandard(breakpoint)) {
      setColCSSClass(`col-${breakpointsConfig[breakpoint].cols} mb-4 px-xl-2`);
    } else {
      setColCSSClass(breakpointsConfig.standardSizeClass);
    }
  };

  useEffect(() => {
    setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
    updateColCSSClass();
    const handleResize = () => {
      setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
      updateColCSSClass();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);
  let categoriesData = sortCategories(data);

  return (
    data?.title && (
      <MDBContainer className={colCSSClass}>
        <MDBCard className="h-100 d-flex d-column">
          <CardImageCarousel
            photos={data.images.map((image) => image.imageSrc)}
            starterIndex={mainImageIndex}
          />
          <MDBCardBody>
            <a
              href={`/browse/styles/${data.title}`}
              // prevent blue hyperlink color
              style={{ color: "inherit" }}
            >
              <MDBTypography tag="h3" className="mt-2 mb-4 text-center">
                {hyphenToTitle(data.title)}
              </MDBTypography>
            </a>
            {categoriesData.slice(0, categoriesExpanded).map((key, index) => {
              return (
                <StyleCardCategoryTable
                  key={index}
                  categoryItems={data[key]}
                  title={key}
                />
              );
            })}
          </MDBCardBody>

          <MDBContainer className="d-flex justify-content-start mt-md-3 mt-lg-0 mb-4 ps-4">
            <MDBBtn onClick={toggleExpansion} size="sm" color="secondary">
              {categoriesExpanded !== showNCategories
                ? "Show Less"
                : "Show All"}
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default StyleCard;
