import React from "react";
import { MDBTabsPane } from "mdb-react-ui-kit";

function BlogTabPane({ index, fillActive, name, data }) {
  return (
    <MDBTabsPane open={fillActive === `tab${index}`}>{data.goals}</MDBTabsPane>
  );
}

export default BlogTabPane;
