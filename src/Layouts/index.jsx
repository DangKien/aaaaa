import React, { memo } from "react";

const Layout = memo(({ children }) => {
  return (
    <div className="wrapper">
      <div className="main relative w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </div>
    </div>
  );
});

export default Layout;
