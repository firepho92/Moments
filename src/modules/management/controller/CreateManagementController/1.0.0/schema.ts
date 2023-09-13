import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().max(120).required(),
}).required();

export default schema;