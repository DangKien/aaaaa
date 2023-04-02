import Collapse from "Components/Atoms/Icons/collapse";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Logo = memo(() => {
  return (
    <>
      <div className="brand flex">
        <NavLink to="/">
          <img alt="Logo" src="/" />
        </NavLink>

        <button
          type="button"
          className="brand-toggle px-0 cursor-pointer bg-transparent"
        >
          <span className="svg-icon text-white">
            <Collapse />
          </span>
        </button>
      </div>
    </>
  );
});
export default Logo;
