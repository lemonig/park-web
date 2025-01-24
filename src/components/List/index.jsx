/*
 * @Author: Jonny
 * @Date: 2024-08-29 16:53:49
 * @LastEditors: Jonny
 * @LastEditTime: 2025-01-06 10:19:31
 * @FilePath: \park-h5\src\components\List\index.jsx
 */
import React from "react";
import "./index.less";

function Index({ prefix, extra, head, body, foot, ...rest }) {
  return (
    <div className="list-warp" {...rest}>
      <div className="left">{prefix}</div>
      <div className="right">
        {extra ? (
          extra
        ) : (
          <>
            <div className="header">{head}</div>
            <div className="bodyer">{body}</div>
            <div className="footer">{foot}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Index;
