const handelChange = (ev) => {
  const { name, value, files } = ev.target;
  let obj = { ...formData };

  if (files) {
    let fileInput = document.querySelector('input[type="file"]');

    let file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: {
          ...formData.image,
          imageUpload: reader.result,
        },
      });
      console.log(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  if (name === "phone") {
    obj[name] = value.replace(/\D/g, "");
  } else if (name.includes(".")) {
    const [parent, child] = name.split(".");
    obj[parent] = { ...obj[parent], [child]: value };
  } else {
    obj = { ...obj, [name]: value };
  }

  setFormData(obj);

  const validate = schema.validate(obj, { abortEarly: false });
  const tempErrors = { ...errors };
  delete tempErrors[name];

  if (validate.error) {
    let item;
    if (name.includes(".")) {
      item = validate.error.details.find(
        (e) => e.context.key === name.split(".")[1]
      );
    } else {
      item = validate.error.details.find((e) => e.context.key === name);
    }

    if (item) {
      tempErrors[name] = item.message;
    }
  }

  setIsFormValid(!validate.error);
  setErrors(tempErrors);
  setUser({ ...user, [name]: ev.target.value });
};
