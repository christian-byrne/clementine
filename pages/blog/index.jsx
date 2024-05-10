import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import BlogPageCard from "@/components/cards/BlogPageCard";
import allBlogPagesData from "@/data/blog/blog-pages.json";
import formatDocTitle from "@/utils/formatDocTitle";
import TitleText from "@/components/title-text/TitleText";

function BlogPage() {
  useEffect(() => {
    document.title = formatDocTitle("Blog");
  }, []);

  const [maxRequested, setMaxRequested] = useState(10);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <TitleText text="Featured Articles" />
            <ContentRow
              colComponent={BlogPageCard}
              colClassName={"col-md-12 col-lg-6 col-sm-12 mb-4"}
              dataRecords={allBlogPagesData}
              initialVisibleNum={6}
              maxRequested={maxRequested}
              setMaxRequested={setMaxRequested}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default BlogPage;
