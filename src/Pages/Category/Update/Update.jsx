import React, { memo, useEffect, useState } from "react";
import Form, { useForm } from "rc-field-form";
import { useDispatch, useSelector } from "react-redux";

import Modal from "Components/Atoms/Modal";
import {
  categorySuccess,
  getCategories,
  updateCategories,
} from "Stores/Slices/Category";
import { enumStatus } from "Constants/status";
import CategoryAPI from "Apis/Category";
import EditIcon from "Components/Atoms/Icons/edit";
import CategoriesSelector from "Stores/Slices/Category/selector";
import FormCategory from "../_Form";

const UpdateCategory = memo(({ id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();

  const { categories = [] } = useSelector(CategoriesSelector.getCategory);

  const handleVisible = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const getParentName = (parent_id) => {
    if (!parent_id || +parent_id === 0) return "";
    const parent = categories.find((category) => category.id === parent_id);
    return parent?.nameSelect || "";
  };

  const editCategory = async () => {
    const response = await CategoryAPI.edit(id);
    const { data } = response;

    form.setFieldsValue({
      name: data.name,
      status: data.status === enumStatus.available,
      parent_id: {
        value: data.parent_id,
        label: getParentName(data.parent_id),
      },
    });
  };

  useEffect(() => {
    if (!isVisible) return;
    editCategory();
  }, [isVisible]);

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    const params = {
      ...formValues,
      parent_id: formValues.parent_id.value,
      status: formValues.status ? enumStatus.available : enumStatus.disabled,
    };

    try {
      const response = await dispatch(updateCategories(id, params));
      const { status = false } = response;
      if (status) {
        setIsVisible(false);
        dispatch(categorySuccess(response));
        dispatch(getCategories());
      }
    } catch (error) {}
  };
  const options = categories
    .map((category) => {
      if (
        !(category.parents && category.parents.some((item) => item === id)) &&
        category.id !== id
      ) {
        return { value: category.id, label: category.nameSelect };
      }
      return null;
    })
    .filter((item) => item);

  return (
    <>
      <EditIcon />
      <span onClick={handleVisible} className="pl-1" aria-hidden="true">
        Cập nhật
      </span>
      <Modal
        isVisible={isVisible}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        btnCancelName="Hủy bỏ"
        title="Cập nhật"
        type="medium"
        btnSubmitName="Cập nhật"
      >
        <Form form={form} onFinish={handleSubmit}>
          <FormCategory options={options} />
        </Form>
      </Modal>
    </>
  );
});

export default UpdateCategory;
