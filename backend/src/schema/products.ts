import Joi from "joi";

export const getProductByQuerySchema = Joi.object({
  search: Joi.string().optional().messages({
    "string.base": "search must start with search and must be string",
  }),
  price: Joi.string().optional().messages({
    "string.base": "price must be string",
  }),
  rating: Joi.string().optional().messages({
    "string.base": "rating must be string",
  }),
  category: Joi.string().optional().messages({
    "string.base": "category must be string",
  }),
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

export const createProductSchema = Joi.object({
  productName: Joi.string().required().min(3).max(100),
  categoryId: Joi.number().integer().positive().required(),
  costPrice: Joi.number().positive().precision(2).required(),
  sellingPrice: Joi.number().positive().precision(2).required(),
  description: Joi.string().required().min(10).max(1000),
  stock: Joi.number().integer().min(0).required(),
}).options({
  stripUnknown: true,
});
export const productByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
