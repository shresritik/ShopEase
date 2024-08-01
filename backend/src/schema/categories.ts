import Joi from "joi";

export const createCategorySchema = Joi.object({
  category_name: Joi.string().messages({
    "string.base": "category_name must be string",
  }),
}).options({
  stripUnknown: true,
});
export const categoryByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
