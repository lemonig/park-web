import React from "react";
import "./index.less";

function Index({ title, value, prefix }, ...props) {
  return (
    <div className="lm-statistic">
      <div className="lm-statistic-title">{title}</div>
      <div className="lm-statistic-content">
        <span className="lm-statistic-content-prefix">{prefix}</span>
        <span className="lm-statistic-content-value">
          <span className="lm-statistic-content-value-init">{value}</span>
        </span>
      </div>
    </div>
  );
}

export default Index;
