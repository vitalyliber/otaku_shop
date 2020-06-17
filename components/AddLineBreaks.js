import React, { Fragment } from "react";

const AddLineBreaks = ({ string }) =>
  string.split("\n").map((text, index) => (
    <Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </ Fragment>
  ));

export default AddLineBreaks;
