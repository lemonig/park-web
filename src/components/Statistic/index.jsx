import React from "react";
import "./index.less";

function Index({ title, value, prefix }, ...props) {
  return (
    <div className="statistic">
      <div className="title">{title}</div>
      <div className="content">
        <span className="content-prefix">{prefix}</span>
        <span className="content-value">
          <span className="content-value-init">{value}</span>
        </span>
      </div>
    </div>
  );
}

export default Index;
