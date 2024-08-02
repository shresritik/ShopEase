import Joi from "joi";
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productName:
 *           type: string
 *         categoryId:
 *           type: integer
 *         costPrice:
 *           type: number
 *           format: float
 *         sellingPrice:
 *           type: number
 *           format: float
 *         description:
 *           type: string
 *         stock:
 *           type: integer
 *         imageUrl:
 *           type: string
 *     ProductInput:
 *       type: object
 *       required:
 *         - productName
 *         - categoryId
 *         - costPrice
 *         - sellingPrice
 *         - description
 *         - stock
 *       properties:
 *         productName:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         categoryId:
 *           type: integer
 *           minimum: 1
 *         costPrice:
 *           type: number
 *           format: float
 *           minimum: 0
 *         sellingPrice:
 *           type: number
 *           format: float
 *           minimum: 0
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 1000
 *         stock:
 *           type: integer
 *           minimum: 0
 *     ProductQuery:
 *       type: object
 *       properties:
 *         search:
 *           type: string
 *         price:
 *           type: string
 *         rating:
 *           type: string
 *         category:
 *           type: string
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
