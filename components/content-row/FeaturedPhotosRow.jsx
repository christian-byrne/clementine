import React from "react";
import PhotoCard from "@/components/cards/PhotoCard";
import ContentRow from "@/components/content-row/ContentRow";
import allPhotosData from "@/data/photos/all.json";

function FeaturedModelsRow() {
  return (
    <ContentRow
      colComponent={PhotoCard}
      colData={allPhotosData}
      sortKey="likes"
      showFirstNCols={6}
    />
  );
}

export default FeaturedModelsRow;
