import React, { memo } from "react";

import { IconStar } from "Components/Atoms/Icons";

const Stars = memo(({ star }) => {
  return (
    <div className="flex flex-row mt-1 rating">
      {[1, 2, 3, 4, 5].map((item) => (
        <span key={item} className={star >= item ? "active" : ""}>
          <IconStar />
        </span>
      ))}
    </div>
  );
});

export default Stars;
