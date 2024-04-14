import React from "react";
import ModelCard from "@/components/cards/ModelCard";
import ContentRow from "@/components/content-row/ContentRow";
import allModelsData from "@/data/models/all.json";

function FeaturedModelsRow() {
  return (
    <ContentRow
      colComponent={ModelCard}
      colData={allModelsData}
      sortKey="rating"
      showFirstNCols={6}
    />
  );
}

export default FeaturedModelsRow;
