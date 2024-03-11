import { schemaOperations } from "../schemas/schemaOperation";

// handleInput is for creating a new item
export const handleInput = (e, formData, setFormData, errors, setErrors, setIsFormValid) => {
  const { id, value } = e.target;
  const obj = { ...formData, [id]: value };
  setFormData(obj);

  const validate = schemaOperations.validate(obj, { abortEarly: false });
  const tempErrors = { ...errors };
  delete tempErrors[id];

  if (validate.error) {
    const item = validate.error.details.find((e) => e.context.key === id);

    if (item) {
      tempErrors[id] = item.message;
    }
  }
  setIsFormValid(!validate.error);
  setErrors(tempErrors);
};
// handleInputEdit is for editing an existing item
export const handleInputEdit = (e, item, setItem, errors, setErrors, setIsFormValid) => {
  const { id, value } = e.target;
  const obj = { ...item, [id]: value };
  setItem(obj);

  const validate = schemaOperations.validate(obj, { abortEarly: false });
  const tempErrors = { ...errors };
  delete tempErrors[id];

  if (validate.error) {
    const item = validate.error.details.find((e) => e.context.key === id);

    if (item) {
      tempErrors[id] = item.message;
    }
  }
  setIsFormValid(!validate.error);
  setErrors(tempErrors);
};