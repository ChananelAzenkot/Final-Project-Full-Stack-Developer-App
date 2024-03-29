import Joi from "joi";
// joi is a validation library of Cards //
export const schemaSales = Joi.object({
  nameAgent: Joi.string().required().min(3).max(100).allow(""),
  sellerFiber: Joi.number()
    .required()
    .min(0)
    .max(15)
    .message("כמות המכירות של פייבר חייבת להיות בין1 -2 ספרות"),
  sellerTV: Joi.number()
    .required()
    .min(0)
    .max(15)
    .message("כמות המכירות של טלוויזיה חייבת להיות בין1 -2 ספרות"),
  easyMesh: Joi.number()
    .required()
    .min(0)
    .max(15)
    .message("כמות המכירות של איזי מש חייבת להיות בין1 -2 ספרות"),
  upgradeProgress: Joi.number()
    .required()
    .min(0)
    .max(15)
    .message("כמות השדרוגים חייבת להיות בין1 -2 ספרות"),
      customerCode: Joi.string()
    .required()
    .min(9)
    .max(9)
    .messages({
      "string.empty": "קוד לקוח חובה",
      "string.min": "קוד לקוח חייב להיות בדיוק 9 תווים",
    }),
  targets: Joi.number()
    .min(0)
    .max(30)
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


