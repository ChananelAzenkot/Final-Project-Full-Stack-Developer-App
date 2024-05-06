import Joi from "joi";

export const schemaOperations = Joi.object({
  nameAgent: Joi.string().min(3).required().messages({
    "string.empty": "נדרש שם נציג",
    "string.min": "שם סוכן חייב להיות בין 3 ל-30 תווים",
  }),
numberCalls: Joi.number().min(1).max(100).required().messages({
  "number.empty": "כמות שיחות נדרשת",
  "number.min": "כמות שיחות חייבת להיות בין 1 ל-2 ספרות",
}),
productivity: Joi.string().pattern(/^\d+\.\d{2}$/).required().messages({
    "string.empty": "נדרש פיריון",
    "string.pattern.base": "פיריון חייב להיות מספר עשרוני עם שני ספרות אחרי הנקודה (לדוגמה, 4.22)",
}),
  simurTV: Joi.string().min(3).required().messages({
    "string.empty": "נדרש שימור טלוויזיה",
    "string.min": "שימור טלוויזיה חייב להיות בין 1 ל-3 ספרות",
  }),
  simurFiber: Joi.string().min(3).required().messages({
    "string.empty": "נדרש שימור פייבר",
    "string.min": "שימור פייבר חייב להיות בין 1 ל-3 ספרות",
  }),
  tvDisconnection: Joi.number().min(0).max(100).required().messages({
    "number.base": "כמות התנתקויות טלוויזיה חייבת להיות לפחות ספרה גם אם זה - 0",
    "number.empty": "נדרש כמות התנתקויות טלוויזיה",
    "number.min": "כמות התנתקויות טלוויזיה חייבת להיות לפחות ספרה גם אם זה - 0",
  }),
  fiberDisconnection: Joi.number().min(0).max(100).required().messages({
    "number.base": "כמות התנתקויות פייבר חייבת להיות לפחות ספרה גם אם זה - 0",
    "number.empty": "נדרש כמות התנתקויות פייבר",
    "number.min": "כמות התנתקויות פייבר חייבת להיות לפחות ספרה גם אם זה - 0",
  }),
satisfaction: Joi.string().pattern(/^100%$|^[1-9][0-9]?%$|^[0-9]%$/).required().messages({
    "string.empty": "נדרש סמ׳׳ט",
    "string.pattern.base": "סמ׳׳ט חייב להיות בין 0% ל-100%",
}),
  teamName: Joi.string().valid("iron", "impact", "toy").required().messages({
    "any.only": "שם הצוות חייב להיות אחד מהאפשרויות הבאות: iron, impact, toy",
    "string.empty": "שם הצוות הינו חובה",
  }),
  simurFiberColor: Joi.string().allow(""),
  simurTVColor: Joi.string().allow(""),
});
