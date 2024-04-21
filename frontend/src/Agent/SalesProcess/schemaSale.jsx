import Joi from "joi";

export const schemaSale = Joi.object({
  title: Joi.string().min(4).required().messages({
    "string.empty": "Title is Required",
    "string.min": "Title must be at least 4 length long",
  }),
  description: Joi.string().min(5).required().messages({
    "string.empty": "description Required",
    "string.min": "description must be at least 5 length long",
  }),
  subtitle: Joi.string().min(5).required().messages({
    "string.empty": "subtitle Required",
    "string.min": "subtitle must be at least 5 length long",
  }),
  phone: Joi.string()
    .max(10)
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Phone Number is Required",
      "string.pattern.base":
        "Phone number must have 10 digits,its need to be only numbers",
      "string.max": "Phone number must not exceed 10 digits",
    }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email Address is required",
    "string.email": "Email must be a valid email address",
  }),
  web: Joi.string().min(8).max(32).required().messages({
    "string.empty": " web is required ",
    "string.min": "web must be at least 8 characters long",
    "string.max": "web must not exceed 32 characters",
    "string.pattern.base":
      "web must contain at least ''www'' in the start of the link ",
  }),
  imgUrl: Joi.string().required().messages({
    "string.empty": "Image Link is Required",
  }),
  imgAlt: Joi.string().required().messages({
    "string.empty": "Image Description is Required",
  }),
  state: Joi.string().required().messages({
    "string.empty": "State is Required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "County is Required",
  }),
  street: Joi.string().required().messages({
    "string.empty": "Street is Required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is Required",
  }),
  houseNumber: Joi.string().required().messages({
    "string.empty": "House Number is Required",
  }),
  zip: Joi.string().required().messages({
    "string.empty": "Zip is Required",
  }),
});
