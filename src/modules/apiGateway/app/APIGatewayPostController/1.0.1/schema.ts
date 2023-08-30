import Joi from "joi";

const schema = Joi.object({
  couple: Joi.array().items({
    name: Joi.string().max(120).required(),
    age: Joi.number().min(1).max(120)
  })
}).required();

export default schema;