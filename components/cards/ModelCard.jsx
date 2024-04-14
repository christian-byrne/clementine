import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import ModelCardText from "@/components/cards/ModelCardText";
import placeholderImg from "@/data/placeholder-image.json";
import IconGenerator from "@/utils/getIcon";
import pathFormat from "@/utils/pathFormat";

const getIcon = new IconGenerator();

function ModelCard({ data, containerClass="col-md-6 col-lg-4 col-sm-12 mb-4"}) {
  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <a href={`/browse/models/${data.titleSystemName}`}
          >
          <MDBCardImage
            src={
              data.imageSrc
                ?  pathFormat(data.imageSrc)
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={data.title || placeholderImg.alt}
            title={data.title || placeholderImg.title}
            position="top"
          />
          </a>
          <MDBCardBody>
            <ModelCardText modelData={data} />
          </MDBCardBody>
          <MDBContainer className="my-3">
            <a href={`/browse/models/${data.titleSystemName}`}>
            <MDBBtn color="primary" className="m-1">
              Details
            </MDBBtn>
            </a>
            <MDBBtn color="success" className="m-1">
              Use with my Wardrobe
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default ModelCard;
