import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import RouterRoot from "./Route";
import "Styles/custom.scss";
import "Styles/sidebar.scss";

const App = React.memo(() => {
  return (
    <Suspense fallback={<div />}>
      <RouterRoot />
      <Toaster />
    </Suspense>
  );
});

export default App;
