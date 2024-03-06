import Joi from 'joi';
// joi is a validation library of User // 
export const middlewareUsers = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().min(2).max(50).required(),
      middle: Joi.string().min(2).max(50).allow(""),
      last: Joi.string().min(2).max(50).required(),
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message(' "email" must be a valid email address')
    .required(),
  IsBusiness: Joi.boolean().allow(""),
  phone: Joi.string()
    .pattern(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/)
    .message('user "phone" must be a valid Israeli phone number')
    .required(),
  password: Joi.string()
    .pattern(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .message(
      '"Password" must be 7-20 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character (!@#$%^&*-).'
    )
    .required(),
  image: Joi.object({
    url: Joi.string()
      .pattern(/(http(s?):)([/|.|\w|\s|-])*\./)
      .message('The "url" must be a valid image URL')
      .allow(""),
    alt: Joi.string().min(2).max(50).allow(""),
  }),
  serviceDepartment: Joi.boolean().required(),
  conservationDepartment: Joi.boolean().required(),
  teamName: Joi.string().valid("iron", "impact", "toy").required(),
  userId: Joi.string().allow(""),
});


