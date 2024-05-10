import React, { useEffect, useState } from "react";
import ContentRow from "@/components/content-row/ContentRow";
import StyleCard from "@/components/cards/StyleCard";

function StylesRow({
  colClassName,
  initialVisibleNum,
  maxNum,
}) {
  const [stylesData, setStylesData] = useState([]);
  const [maxRequested, setMaxRequested] = useState(maxNum || 20);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        let reqURL = `/api/get/styles/all?count=${maxRequested}`;
        const response = await fetch(reqURL);
        const data = await response.json();
        setStylesData(data);
      } catch (error) {
        console.error("Error fetching featured styles:", error);
      }
    };

    fetchStyles();
  }, [maxNum, maxRequested]);

  return (
    stylesData?.length > 0 && (
      <ContentRow
        colComponent={StyleCard}
        initialVisibleNum={initialVisibleNum}
        maxRequested={maxRequested}
        setMaxRequested={setMaxRequested}
        colClassName={colClassName || "col-md-6 col-lg-4 col-sm-12 mb-4 mx-0"}
        dataRecords={stylesData}
      />
    )
  );
}
export default StylesRow;
