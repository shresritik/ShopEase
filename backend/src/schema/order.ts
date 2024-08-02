import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - quantity
 *         - sellingPrice
 *         - categoryId
 *       properties:
 *         id:
 *           type: integer
 *           minimum: 1
 *         quantity:
 *           type: integer
 *           minimum: 1
 *         sellingPrice:
 *           type: string
 *           pattern: ^\d+(\.\d{1,2})?$
 *         categoryId:
 *           type: integer
 *           minimum: 1
 *     CreateOrderInput:
 *       type: object
 *       required:
 *         - products
 *         - totalAmount
 *         - userId
 *       properties:
 *         location:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *           minItems: 1
 *         totalAmount:
 *           type: number
 *         userId:
 *           type: integer
 *           minimum: 1
 *         discount:
 *           type: string
 *         profit:
 *           type: number
 *         vat:
 *           type: number
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         location:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         totalAmount:
 *           type: number
 *         userId:
 *           type: integer
 *         discount:
 *           type: string
 *         profit:
 *           type: number
 *         vat:
 *           type: number
 *     OrderQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         size:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           default: 10
 */

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
  sellingPrice: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required(),
  categoryId: Joi.number().integer().positive().required(),
});

export const getOrderByBodySchema = Joi.object({
  location: Joi.string().optional(),
  products: Joi.array().items(productSchema).min(1).required(),
  totalAmount: Joi.number().required(),
  userId: Joi.number().integer().positive().required(),
  discount: Joi.string().optional().allow(),
  profit: Joi.number().optional(),
  vat: Joi.number().optional(),
}).options({
  stripUnknown: true,
});

export const orderByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
