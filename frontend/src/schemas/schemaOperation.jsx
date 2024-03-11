  import Joi from "joi";

  export const schemaOperations = Joi.object({
    nameAgent: Joi.string().min(3).required().messages({
      "string.empty": "נדרש שם נציג",
      "string.min": "שם סוכן חייב להיות בין 3 ל-30 תווים",
    }),
    numberCalls: Joi.string().min(1).required().messages({
      "string.empty": "כמות שיחות נדרשת",
      "string.min": "כמות שיחות חייבת להיות בין 1 ל-2 ספרות",
    }),
    productivity: Joi.string().min(3).required().messages({
      "string.empty": "נדרש פיריון",
      "string.min": "פיריון חייב להיות בין 1 ל-3 ספרות",
    }),
    simurTV: Joi.string().min(3).required().messages({
      "string.empty": "נדרש שימור טלוויזיה",
      "string.min": "שימור טלוויזיה חייב להיות בין 1 ל-3 ספרות",
    }),
    simurFiber: Joi.string().min(3).required().messages({
      "string.empty": "נדרש שימור פייבר",
      "string.min": "שימור פייבר חייב להיות בין 1 ל-3 ספרות",
    }),
    tvDisconnection: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות התנתקויות טלוויזיה",
      "string.min": "כמות התנתקויות טלוויזיה חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    fiberDisconnection: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות התנתקויות פייבר",
      "string.min": "כמות התנתקויות פייבר חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    sellerFiber: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות מכירות פייבר",
      "string.min": "כמות מכירות פייבר חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    sellerTV: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות מכירות טלוויזיה",
      "string.min": "כמות מכירות טלוויזיה חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    easyMesh: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות מכירת - easy mesh",
      "string.min": "כמות מכירת - easy mesh חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    upgradeProgress: Joi.string().min(1).required().messages({
      "string.empty": "נדרש כמות בשדרוג",
      "string.min": "כמות שדרוג חייבת להיות לפחות ספרה גם אם זה - 0",
    }),
    satisfaction: Joi.string().min(3).required().messages({
      "string.empty": "נדרש סמ׳׳ט",
      "string.min": "סמ׳׳ט חייב להיות בין 1 ל-3 ספרות",
    }),
    teamName: Joi.string()
    .valid("iron", "impact", "toy")
    .required()
    .messages({
      "any.only": "שם הצוות חייב להיות אחד מהאפשרויות הבאות: iron, impact, toy",
      "string.empty": "שם הצוות הינו חובה",
    }),
  });