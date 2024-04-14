import React from "react";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";

export default function ProgressBar(props) {
  return (
    <MDBProgress>
      <MDBProgressBar
        width={props.now || 0}
        valuenow={props.now || 0}
        valuemin={props.min || 0}
        valuemax={props.max || 100}
      />
    </MDBProgress>
  );
}
