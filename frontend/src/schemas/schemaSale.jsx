import Joi from "joi";
// joi is a validation library of Sales //

const customMessages = {
  'value.invalid': 'אתה צריך לפחות מכירה אחת',
};
export const schemaSales = Joi.object({
  nameAgent: Joi.string().required().min(3).max(100).allow(""),
sellerFiber: Joi.number()
  .required()
  .min(0)
  .max(15)
  .messages({
    'number.base': 'כמות מכירות Fiber חייב לציין גם אם זה - 0',
  }),
sellerTV: Joi.number()
  .required()
  .min(0)
  .max(15)
  .messages({
    'number.base': 'כמות מכירות TV חייב לציין גם אם זה - 0',
  }),
  easyMesh: Joi.number()
    .required()
    .min(0)
    .max(15)
      .messages({
    'number.base': 'כמות מכירות EasyMesh חייב לציין גם אם זה - 0',
  }),
  upgradeProgress: Joi.number()
    .required()
    .min(0)
    .max(15)
  .messages({
    'number.base': 'כמות מכירות שדרוג חייב לציין גם אם זה - 0',
  }),
  customerCode: Joi.string().required().min(9).max(9).messages({
    "string.empty": "קוד לקוח חובה",
    "string.min": "קוד לקוח חייב להיות בדיוק 9 תווים",
  }),
  targets: Joi.number()
    .min(0)
    .max(30)
    .message("כמות היעדים חייב להיות בין1 -2 ספרות")
    .allow(""),
  teamName: Joi.string()
    .required()
    .pattern(/iron|impact|toy/)
    .message("The team name must include 'iron' or 'impact' or 'toy'")
    .allow(""),
  userId: Joi.string().allow(""),
  user_id: Joi.string().allow(""),
}).custom((value, helpers) => {
  if (value.sellerFiber >= 1 || value.sellerTV >= 1 || value.easyMesh >= 1 || value.upgradeProgress >= 1) {
    return value;
  } else {
    return helpers.error('value.invalid');
  }
}).messages(customMessages);

export const middlewareBiz = Joi.object({
  newBizNumber: Joi.number().min(100000000).max(999999999),
});
