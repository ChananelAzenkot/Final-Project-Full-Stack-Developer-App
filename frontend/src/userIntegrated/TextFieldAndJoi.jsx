import Joi from "joi";

const schema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).required().messages({
      "string.empty": "שם פרטי  הינו חובה",
      "string.min": "השם חייב להכיל לפחות שתי תווים",
    }),
    middle: Joi.string().allow("").optional(),
    last: Joi.string().min(2).required().messages({
      "string.empty": "שם משפחה הינו חובה",
      "string.min": "שם משפחה חייב להכיל לפחות שתי תווים",
    }),
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "כתובת מייל הינה חובה",
    "string.email": "כתובת האיימל אינה תקינה",
  }),
  IsBusiness: Joi.boolean().allow(""),
  phone: Joi.string()
    .max(10)
    .pattern(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/)
    .messages({
      "string.empty": "מספר נייד הינו חובה",
      "string.pattern.base":
        "מספר הנייד חייב להיות בן 10 ספרות, הוא צריך להיות רק מספרים",
      "string.max": "מספר הטלפון לא יעלה על 10 ספרות",
    }),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/)
    .required()
    .messages({
      "string.empty": "דרושה סיסמא",
      "string.min": "הסיסמה חייבת להיות באורך 8 תווים לפחות",
      "string.max": "הסיסמה לא תעלה על 32 תווים",
      "string.pattern.base":
        "הסיסמה חייבת להכיל לפחות אות אחת גדולה ותו מיוחד אחד",
    }),
  teamName: Joi.string().valid("iron", "impact", "toy").required().messages({
    "any.only": "שם הצוות חייב להיות אחד מהאפשרויות הבאות: iron, impact, toy",
    "string.empty": "שם הצוות הינו חובה",
  }),
  serviceDepartment: Joi.boolean().allow(""),
  conservationDepartment: Joi.boolean().allow(""),
});

export default schema;
