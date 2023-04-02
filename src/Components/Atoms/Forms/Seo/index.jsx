import React from "react";

import Input from "Components/Atoms/Forms/Input";
import TextArea from "Components/Atoms/Forms/Textarea";
import TagInput from "../TagInput";

export default function Seo({}) {
  return (
    <div className="card mx-4">
      <div className="card-body p-4">
        <div className="card-header">
          <h5 className="flex-wrap">Thông tin seo</h5>
        </div>
        <div className="flex space-x-4">
          <Input label="Seo title" name={["seo_title"]} />
          <TagInput label="Seo keyword" name={["seo_keywords"]} />
        </div>
        <div className="flex space-x-4">
          <Input label="Seo facebook" name={["seo_google"]} />
          <Input label="Seo google" name={["seo_facebook"]} />
        </div>

        <TextArea
          label="Mô tả sản phẩm"
          name={["seo_description"]}
          className="no-resize"
        />
      </div>
    </div>
  );
}
