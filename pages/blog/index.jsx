import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import BlogPageCard from "@/components/cards/BlogPageCard";
import allBlogPagesData from "@/data/blog/blog-pages.json";
import formatDocTitle from "@/utils/formatDocTitle";

function BlogPage() {
  useEffect(() => {
    document.title = formatDocTitle("Blog");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <MDBTypography tag="h2" className="my-4">Featured Articles</MDBTypography>
            <ContentRow
              colComponent={BlogPageCard}
              colData={allBlogPagesData}
              sortKey="rating"
              showFirstNCols={6}
              maxCols={10}
              colContainerClass={"col-md-12 col-lg-6 col-sm-12 mb-4"}
              detailsStartExpanded={true}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default BlogPage;
