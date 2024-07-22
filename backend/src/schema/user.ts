import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - role_id
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: jane.doe@example.com
 *         name:
 *           type: string
 *           default: Jane Doe
 *         role_id:
 *           type: number
 *           default: 1
 *         password:
 *           type: string
 *           default: Password123!
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           default: jane.doe@example.com
 *         name:
 *           type: string
 *           default: Jane Doe
 *         password:
 *           type: string
 *           default: Password123!
 *     GetUserById:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           default: user-id-123
 *     GetUserByQuery:
 *       type: object
 *       properties:
 *         q:
 *           type: string
 *           description: Optional search query
 *         page:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           description: Page number must be greater than 0
 *         size:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           default: 10
 *           description: Page size must be between 1 and 10
 */

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  role_id: Joi.number().required().messages({
    "any.required": "roleId is required",
    "number.base": "roleId must be number",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "password.uppercase": "Password must have at least one uppercase",
      "password.lowercase": "Password must have at least one lowercase",
      "password.special": "Password must have at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string()
    .min(8)
    .optional()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "password.uppercase": "Password must have at least one uppercase",
      "password.lowercase": "Password must have at least one lowercase",
      "password.special": "Password must have at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});

export const getUserByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});

export const getUserByQuerySchema = Joi.object({
  q: Joi.string().optional(),
  page: Joi.number().min(1).optional().default(1),
  size: Joi.number().min(1).max(10).optional().default(10),
}).options({
  stripUnknown: true,
});
