import React, { memo, useState } from "react";

import { PlusCircle } from "Components/Atoms/Icons";
import { Modal } from "bootstrap";

const CreateCategory = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = () => {
    setIsVisible(true);
  };
  return (
    <button
      type="button"
      className="btn btn-success flex space-x-1"
      onClick={handleVisible}
    >
      <PlusCircle></PlusCircle>
      <span>Thêm mới</span>

      {/* <Modal
        isVisible={isVisible}
        btnCancelName="Hủy bỏ"
        title="Thêm mới"
        type="medium"
        btnSubmitName="Thêm mới"
      ></Modal> */}
    </button>
  );
});

export default CreateCategory;
