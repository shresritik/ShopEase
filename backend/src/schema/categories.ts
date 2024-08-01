import Joi from "joi";

export const createCategorySchema = Joi.object({
  categoryName: Joi.string().messages({
    "string.base": "categoryName must be string",
  }),
}).options({
  stripUnknown: true,
});
export const categoryByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
