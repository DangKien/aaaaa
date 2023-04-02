import React, { memo } from "react";
import SwitchButton from "Components/Atoms/Forms/Switch/Switch";
import Select from "Components/Atoms/Forms/Select";

const FormCategory = memo(({ options = [], errors }) => {
  return (
    <>
      <div className="flex flex-col">
        <Select
          options={options}
          label="Tác giả:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={options}
          label="Nhà xuất bản:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>
      <div className="flex flex-col w-full">
        <Select
          options={options}
          label="Thể loại:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={options}
          label="Số bình luận:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>

      <div className="flex flex-col">
        <Select
          options={options}
          label="Số trang:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={options}
          label="Đánh giá:"
          name={["parent_id"]}
          errors={errors}
        />
      </div>

      <div className="flex flex-col">
        <SwitchButton label="Trạng thái" name={["status"]} />
      </div>
      <button type="submit" className="" />
    </>
  );
});

export default FormCategory;
