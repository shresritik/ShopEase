import Joi from "joi";
export const getOrderByQuerySchema = Joi.object({
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "page must be number",
      "number.min": "page must be greater than 0",
    })
    .default(1),
  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "size must be number",
      "number.min": "size must be greater than 0",
      "number.max": "size must be less than 11",
    })
    .default(10),
}).options({
  stripUnknown: true,
});
const productSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
  selling_price: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required(),
  category_id: Joi.number().integer().positive().required(),
});

export const getOrderByBodySchema = Joi.object({
  location: Joi.string().allow("").optional(),
  products: Joi.array().items(productSchema).min(1).required(),
  totalAmount: Joi.number().positive().required(),
  userId: Joi.number().integer().positive().required(),
}).options({
  stripUnknown: true,
});

export const orderByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
