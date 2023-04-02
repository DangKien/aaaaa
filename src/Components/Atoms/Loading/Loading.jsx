import React, { memo } from "react";
import "Styles/loading.scss";

const Loading = memo(({ isLoading }) => {
  /* <div className="fixed top-0 left-0 bg-black opacity-70 w-full h-full z-50">
          <div className="loader" id="spinner">
            <div className="fa-first" />
            <div className="fa-second" />
            <div className="fa-third" />
            <div className="fa-fourth" />
            <div className="fa-first-in" />
            <div className="fa-second-in" />
            <div className="fa-third-in" />
            <div className="fa-fourth-in" />
          </div>
        </div> */
  return <>{isLoading ? "" : ""}</>;
});

export default Loading;
