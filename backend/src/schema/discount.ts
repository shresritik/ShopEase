import Joi from "joi";
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDiscountInput:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: The discount code
 *         percentage:
 *           type: number
 *           maximum: 100
 *           description: The discount percentage (0-100)
 *         validFrom:
 *           type: string
 *           format: date-time
 *           description: The start date of the discount validity (ISO format)
 *         validUntil:
 *           type: string
 *           format: date-time
 *           description: The end date of the discount validity (ISO format)
 *     Discount:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the discount
 *         code:
 *           type: string
 *         percentage:
 *           type: number
 *         validFrom:
 *           type: string
 *           format: date-time
 *         validUntil:
 *           type: string
 *           format: date-time
 */
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
