import Joi from "joi";
// joi is a validation library of Cards //
export const middlewareOperations = Joi.object({
  nameAgent: Joi.string().required().min(3).max(100),
  numberCalls: Joi.number().required().min(2).max(100),

  productivity: Joi.string()
    .required()
    .min(1)
    .max(4)
    .message("פיריון חייב להיות בין1 -3 ספרות"),
  tvDisconnection: Joi.number()
    .required()
    .min(1)
    .max(2)
    .message("ניתוק טלוויזיה חייב להיות בין1 -2 ספרות"),
  fiberDisconnection: Joi.string()
    .required()
    .min(1)
    .max(3)
    .pattern(/^[0-9]{1,2}$/)
    .message("ניתוק פייבר חייב להיות בין1 -2 ספרות"),
  simurFiber: Joi.string()
    .min(1)
    .max(10)
    .message("אחוז שימור סיבים חייב להיות בין1 -2 ספרות")
    .allow(""),
  simurTV: Joi.string()
    .min(1)
    .max(10)
    .message("אחוז שימור טלוויזיה חייב להיות בין1 -2 ספרות")
    .allow(""),
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
  satisfaction: Joi.string()
    .required()
    .min(1)
    .max(3)
    .pattern(/^[0-9]{1,3}%$/)
    .message("כמות השביעות רצון חייבת להיות בין1 -2 ספרות"),
  targets: Joi.string()
    .min(1)
    .max(3)
    .pattern(/^[0-9]{1,3}%$/)
    .message("כמות היעדים חייבת להיות בין1 -2 ספרות")
    .allow(""),
  image: Joi.object().keys({
    url: Joi.string()
      .pattern(/(http(s?):)([/|.|\w|\s|-])*\./)
      .message('card.image "url" must be a valid url')
      .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  teamName: Joi.string()
    .required()
    .pattern(/iron|impact|toy/)
    .message("The team name must include 'iron' or 'impact' or 'toy'"),
  userId: Joi.string().allow(""),
  user_id: Joi.string().allow(""),
});

export const middlewareBiz = Joi.object({
  newBizNumber: Joi.number().min(100000000).max(999999999),
});




