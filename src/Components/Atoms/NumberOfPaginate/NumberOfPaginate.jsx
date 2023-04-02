import React from "react";

const NumberOfPaginate = React.memo(({ value }) => {
  return (
    <>
      <p className="text-default text-xs py-2 pl-2 opacity-75 italic">
        Trong tổng số {value ?? 0} bản ghi
      </p>
    </>
  );
});

export default NumberOfPaginate;
