import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import StyleCardCategoryTable from "@/components/cards/StyleCardCategoryTable";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";
import { hyphenToTitle } from "@/utils/hyphenNameToTitle";

function sortCategories(categoryData) {
  const excludeCategories = [
    "subject",
    "lora",
    "medium",
    "setting",
    "title",
    "name",
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
    .filter((category) => !excludeCategories.includes(category))
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
  detailsStartExpanded,
}) {
  const [colsExpanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!colsExpanded);
  const [textExpanded, setTextExpanded] = useState(detailsStartExpanded);
  const toggleText = () => setTextExpanded(!textExpanded);

  const showNCategoryRows = 3;
  const showNCategories = 5;

  console.log(sortCategories(data));

  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <div style={{ position: "relative" }}>
            <MDBCardImage
              src={pathFormat(`pictures/styles/${data.title}/1.png`)}
              alt={data.title || placeholderImg.alt}
              title={data.title || placeholderImg.title}
              position="top"
            />
          </div>

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
            {/* <div className="mb-3">
        {stylistData.badges &&
          stylistData.badges.length > 0 &&
          stylistData.badges.map((badge, index) => (
            <span key={index} className="badge badge-secondary me-2 mb-2">
              {badge}
            </span>
          ))}
      </div> */}
            {sortCategories(data)
              .slice(0, showNCategories)
              .map((key, index) => {
                return (
                  <StyleCardCategoryTable
                    key={index}
                    categoryItems={data[key]}
                    title={key}
                  />
                );
               
              })}
          </MDBCardBody>

          <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
            <MDBBtn onClick={toggleExpansion} size="sm" color="secondary">
              {colsExpanded ? "Show Less" : "Show More"}
            </MDBBtn>
          </MDBContainer>

          <MDBContainer className="my-3">
            <MDBBtn
              color="primary"
              className="mt-1 mx-1"
              tag="a"
              onClick={toggleText}
            >
              Details
            </MDBBtn>
            <a href={`/browse/styles/${data.title}`}>
              <MDBBtn color="success" className="mt-1 mx-1">
                Use
              </MDBBtn>
            </a>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default StyleCard;
