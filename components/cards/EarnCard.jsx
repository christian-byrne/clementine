import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBBadge,
} from "mdb-react-ui-kit";
import IconGenerator from "@/utils/getIcon";

const icons = new IconGenerator();

function identifyRubyCount(text) {
  // First instance of a number in the string
  const rubyCount = text.match(/\d+/);
  return rubyCount ? rubyCount[0] : 0;
}

// Ruby Color = rgb(221,24,63)
function EarnCard({
  data,
  containerClass = "col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4",
}) {
  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100">
          <MDBIcon icon={data.icon} size="3x" className="m-3 text-center pt-2" />
          <MDBCardBody>
            <MDBCardTitle>
              {data.title}
              {identifyRubyCount(data.description) > 0 && (
                <MDBBadge pill color="danger" className="ms-2" light>
                  {identifyRubyCount(data.description)} Rubies
                </MDBBadge>
              )}
            </MDBCardTitle>
            <MDBCardText>
              {data.description.split(/rubies|ruby/g).map((text, index) => {
                return (
                  <span key={index}>
                    {text}
                    {index <
                      data.description.split(/rubies|ruby/g).length - 1 &&
                      icons.createIcon("mainCurrency")}
                  </span>
                );
              })}
            </MDBCardText>
          </MDBCardBody>
          <MDBContainer className="my-3">
            <MDBBtn color="primary" href={data.href} className="mx-2 mb-3">
              {data.linkText}
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default EarnCard;
