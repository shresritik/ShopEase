import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCategoryInput:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         categoryName:
 *           type: string
 *           default: Dairy
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         categoryName:
 *           type: string
 *           description: The name of the category
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         categoryName:
 *           type: string
 */
export const createCategorySchema = Joi.object({
  categoryName: Joi.string().messages({
    "string.base": "categoryName must be string",
  }),
}).options({
  stripUnknown: true,
});

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the category
 */

export const categoryByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
