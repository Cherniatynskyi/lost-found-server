import Joi from "joi";

export const createCardSchema = Joi.object({
  type: Joi.string().label("Type").messages({
        "string.empty": '"Type" cannot be empty',
        "any.required": '"Type" is a required field',   
  }),
  title: Joi.string().label("Title").messages({
    "string.empty": '"Title" cannot be empty',
    "any.required": '"Title" is a required field',
  }),
  description: Joi.string().label("Description").messages({
    "string.empty": '"Description" cannot be empty',
    "any.required": '"Description" is a required field',
  }),
  category: Joi.string().label("Caregory").messages({
    "string.empty": '"Category" cannot be empty',
    "any.required": '"Category" is a required field',
  }),
  date: Joi.date().label("Date").messages({
    "any.required": '"Date" is a required field',
    "date.base": '"Date" field must be a date',
  }),
  location: Joi.string().label("Location").messages({
    "string.empty": '"Location" cannot be an empty field',
    "any.required": 'Missing required field "Location"',
  }),
  price: Joi.string().label("Price").messages({
    "string.empty": '"Price" cannot be an empty field',
  }),
  contact: Joi.string().label("Contact").messages({
    "string.empty": 'Contact" cannot be an empty field',
  }),
  photo_url: Joi.any()
});

export const updateCardSchema = Joi.object({
  type: Joi.string().valid('lost', 'found').label("Type").messages({
    "string.empty": '"Type" cannot be empty',
  }),
  title: Joi.string().label("Title").messages({
    "string.empty": '"Title" cannot be empty',
  }),
  description: Joi.string().label("Description").messages({
    "string.empty": '"Description" cannot be empty',
  }),
  category: Joi.string().label("Category").messages({
    "string.empty": '"Category" cannot be empty',
  }),
  date: Joi.date().label("Date").messages({
    "any.required": '"Date" is a required field',
  }),
  location: Joi.string().label("Location").messages({
    "string.empty": '"Location" cannot be an empty field',
  }),
  price: Joi.string().label("Price").messages({
    "string.empty": '"Price" cannot be an empty field',
  }),
  contact: Joi.string().label("Contact").messages({
    "string.empty": '"Price" cannot be an empty field',
  }),
  photo_url: Joi.string().label("Photo").messages({
    "string.empty": '"Photo" cannot be an empty field',
  }),
});
