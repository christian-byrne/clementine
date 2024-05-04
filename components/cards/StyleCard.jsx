import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import StyleCardCategoryTable from "@/components/cards/StyleCardCategoryTable";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";
import { hyphenToTitle } from "@/utils/hyphenNameToTitle";
import CardImageCarousel from "@/components/cards/CardImageCarousel";

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
  const showNCategories = 2;
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

  let categoriesData = sortCategories(data);

  let mainImageIndex = 0;
  for (let i = 0; i < data.images; i++) {
    if (data.images[i].title === "main") {
      mainImageIndex = i;
      break;
    }
  }

  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
            <CardImageCarousel
              photos={data.images.map((image) => image.imageSrc)}
              starterIndex={mainImageIndex}
            />
            {/* <MDBCardImage
              src={pathFormat(
                data.images[curPhotoIndex].imageSrc
              )}
              alt={data.title || placeholderImg.alt}
              title={data.title || placeholderImg.title}
              position="top"
            /> */}
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
