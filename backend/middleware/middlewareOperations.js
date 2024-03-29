import Joi from "joi";
// joi is a validation library of Cards //
export const middlewareOperations = Joi.object({
  nameAgent: Joi.string().required().min(3).max(100),
  numberCalls: Joi.number().required().min(0).max(100),

  productivity: Joi.string()
    .required()
    .min(0)
    .max(3)
    .message("פיריון חייב להיות בין1 -3 ספרות"),
  tvDisconnection: Joi.number()
    .required()
    .min(0)
    .max(100)
    .message("ניתוק טלוויזיה חייב להיות בין1 -2 ספרות"),
  fiberDisconnection: Joi.number()
    .required()
    .min(0)
    .max(100)
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
  satisfaction: Joi.string()
    .required()
    .min(1)
    .max(3)
    .message("כמות השביעות רצון חייבת להיות בין1 -2 ספרות"),
  targets: Joi.number()
    .min(1)
    .max(3)
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
  simurFiberColor: Joi.string().allow(""),
  simurTVColor: Joi.string().allow(""),
  userId: Joi.string().allow(""),
  user_id: Joi.string().allow(""),
});

export const middlewareBiz = Joi.object({
  newBizNumber: Joi.number().min(100000000).max(999999999),
});




