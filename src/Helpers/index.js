/* eslint-disable import/prefer-default-export */
export const getFieldErrors = (errorFields) => {
  const fieldErrors = errorFields.reduce((accumulator, current) => {
    const { name, errors } = current;
    accumulator = {
      ...accumulator,
      [name]: errors,
    };
    return accumulator;
  }, {});

  return fieldErrors;
};

export const getResultForm = async (form) => {
  try {
    const fields = await form.validateFields();
    return {
      status: true,
      result: fields,
    };
  } catch (error) {
    const { errorFields = [] } = error;
    return {
      status: false,
      errors: getFieldErrors(errorFields),
    };
  }
};
