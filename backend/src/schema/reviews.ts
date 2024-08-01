import Joi from "joi";
export const createReviewSchema = Joi.object({
  rating: Joi.number().max(5).min(0).optional().messages({
    "number.base": "Rating must be number",
  }),
  userId: Joi.number().optional().messages({
    "number.base": "userId must be number",
  }),

  product_name: Joi.string().optional().messages({
    "string.base": "product_name must be string",
  }),
  name: Joi.string().optional().allow("").allow(null).messages({
    "string.base": "name must be string",
  }),
}).options({
  stripUnknown: true,
});
export const getReviewByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Product id must be string",
  }),
}).options({
  stripUnknown: true,
});
