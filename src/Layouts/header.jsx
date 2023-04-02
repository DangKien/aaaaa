import React, { memo } from "react";

const Header = memo(() => {
  return (
    <div className="navbar-inner w-full flex items-center justify-start">
      <div className="hidden md:flex relative">
        <button
          type="button"
          className="flex items-center justify-center h-16 w-12"
        >
          <span className="text-base flag-icon flag-icon-us" />
        </button>
      </div>
      <div className="hidden md:flex relative">
        <button
          type="button"
          className="flex items-center justify-center h-16 w-12"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height={18}
            width={18}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
      <div className="relative">
        <button
          type="button"
          className="flex h-16 w-8 rounded-full ml-2 relative"
        >
          <span className="absolute top-0 left-0 pt-4">
            {/* <img
                className="h-8 w-8 rounded-full shadow"
                src="/images/faces/m1.png"
                alt="avatar"
              /> */}
            <span
              className="absolute uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-red-500 text-white ring-white"
              style={{ top: "10px", right: "-4px" }}
            >
              2
            </span>
          </span>
        </button>
      </div>
    </div>
  );
});

export default Header;
