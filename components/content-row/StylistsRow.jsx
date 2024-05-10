import React, { useEffect, useState } from "react";
import ContentRow from "@/components/content-row/ContentRow";
import StylistCard from "@/components/cards/StylistCard";

function StylistsRow({
  sortField,
  sortOrder,
  colClassName,
  initialVisibleNum,
  maxNum,
  detailsStartExpanded,
}) {
  const [stylistsData, setStylistData] = useState([]);
  const [maxRequested, setMaxRequested] = useState(maxNum || 20);

  useEffect(() => {
    const fetchFeaturedStylists = async () => {
      try {
        let reqURL = `/api/get/stylists/sorted-n?count=${maxRequested}&sortOrder=${
          sortOrder.toUpperCase() || "DESC"
        }`;
        if (sortField) {
          reqURL += `&sortField=${sortField}`;
        }

        console.log("reqURL:", reqURL)
        const response = await fetch(reqURL);
        const data = await response.json();
        setStylistData(data);
      } catch (error) {
        console.error("Error fetching featured stylists:", error);
      }
    };

    fetchFeaturedStylists();
  }, [sortField, sortOrder, maxNum, maxRequested]);

  return (
    stylistsData?.length > 0 && (
      <ContentRow
        colComponent={StylistCard}
        colData={stylistsData}
        initialVisibleNum={initialVisibleNum || 9}
        maxRequested={maxRequested}
        setMaxRequested={setMaxRequested}
        colClassName={colClassName || "col-md-6 col-lg-4 col-sm-12 mb-4 mx-0"}
        dataRecords={stylistsData}
        detailsStartExpanded={detailsStartExpanded}
      />
    )
  );
}
export default StylistsRow;
