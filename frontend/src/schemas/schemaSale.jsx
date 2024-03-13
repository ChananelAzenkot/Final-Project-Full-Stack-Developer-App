import Joi from "joi";
// joi is a validation library of Cards //
export const schemaSales = Joi.object({
  nameAgent: Joi.string().required().min(3).max(100).allow(""),
  sellerFiber: Joi.string()
    .required()
    .min(1)
    .max(2)
    .pattern(/^[0-9]{1,2}$/)
    .message("כמות המכירות של פייבר חייבת להיות בין1 -2 ספרות"),
  sellerTV: Joi.string()
    .required()
    .min(1)
    .max(2)
    .pattern(/^[0-9]{1,2}$/)
    .message("כמות המכירות של טלוויזיה חייבת להיות בין1 -2 ספרות"),
  easyMesh: Joi.string()
    .required()
    .min(1)
    .max(2)
    .pattern(/^[0-9]{1,2}$/)
    .message("כמות המכירות של איזי מש חייבת להיות בין1 -2 ספרות"),
  upgradeProgress: Joi.string()
    .required()
    .min(1)
    .max(2)
    .pattern(/^[0-9]{1,2}$/)
    .message("כמות השדרוגים חייבת להיות בין1 -2 ספרות"),
    customerCode: Joi.string().required().min(3).max(100),
  targets: Joi.string()
    .min(1)
    .max(3)
    .pattern(/^[0-9]{1,3}%$/)
    .message("כמות היעדים חייבת להיות בין1 -2 ספרות")
    .allow(""),
  teamName: Joi.string()
    .required()
    .pattern(/iron|impact|toy/)
    .message("The team name must include 'iron' or 'impact' or 'toy'").allow(""),
  userId: Joi.string().allow(""),
  user_id: Joi.string().allow(""),
});

export const middlewareBiz = Joi.object({
  newBizNumber: Joi.number().min(100000000).max(999999999),
});


