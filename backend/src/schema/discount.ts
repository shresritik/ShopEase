import Joi from "joi";

export const createDiscountSchema = Joi.object({
  code: Joi.string().messages({
    "string.base": "code must be string",
  }),
  percentage: Joi.number().max(100).messages({
    "number.base": "percentage must be number",
  }),
  validFrom: Joi.date().messages({
    "date.base": "validFrom must be date in ISO",
  }),
  validUntil: Joi.date().messages({
    "date.base": "validUntil must be date in ISO",
  }),
}).options({
  stripUnknown: true,
});
export const discountByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
