import React, { useEffect, useState } from "react";
import ContentRow from "@/components/content-row/ContentRow";
import PhotoCard from "@/components/cards/PhotoCard";

function PhotosRow({
  sortField,
  sortOrder,
  colClassName,
  expandedNum,
  maxNum = 50,
}) {
  const [photoData, setPhotoData] = useState([]);

  useEffect(() => {
    const fetchFeaturedPhotos = async () => {
      try {
        let reqURL = `/api/get/photos/n-photos?count=${maxNum}&sortOrder=${
          sortOrder.toUpperCase() || "DESC"
        }`;
        if (sortField) {
          reqURL += `&sortField=${sortField}`;
        }
        console.log("reqURL:", reqURL);

        const response = await fetch(reqURL);
        const data = await response.json();
        setPhotoData(data);
      } catch (error) {
        console.error("Error fetching featured photos:", error);
      }
    };

    fetchFeaturedPhotos();
  }, [sortField, sortOrder, maxNum]);

  return (
    photoData?.length > 0 && (
      <ContentRow
        colComponent={PhotoCard}
        colData={photoData}
        expandedNum={expandedNum || 9}
        maxNum={maxNum || 60}
        colClassName={colClassName || "col-md-6 col-lg-4 col-sm-12 mb-4 mx-0"}
        dataRecords={photoData}
      />
    )
  );
}
export default PhotosRow;
