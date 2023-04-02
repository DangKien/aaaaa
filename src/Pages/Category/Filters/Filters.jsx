import React, { memo, useState } from "react";

import Modal from "Components/Atoms/Modal";
import FormFilter from "../_Form";
import { PlusCircle } from "Components/Atoms/Icons";

const CreateCategory = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <button
      type="button"
      className="btn flex space-x-1 "
      onClick={handleVisible}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="css-i6dzq1"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span>Bộ lọc</span>

      <Modal
        isVisible={isVisible}
        handleCancel={handleCancel}
        btnCancelName="Hủy bỏ"
        title="Bộ lọc"
        type="medium"
        btnSubmitName="Lọc"
      >
        <form action="">
          <FormFilter />
        </form>
      </Modal>
    </button>
  );
});

export default CreateCategory;
