import React, { memo } from "react";
import { PlusCircle } from "Components/Atoms/Icons";

const CreateCategory = memo(() => {
  return (
    <button type="button" className="btn btn-success flex space-x-1">
      <PlusCircle></PlusCircle>
      <span>Thêm mới</span>
    </button>
  );
});

export default CreateCategory;
