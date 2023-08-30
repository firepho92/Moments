import Joi from 'joi';

const schema = Joi.object().keys({
  pageNumber: Joi.number().integer().min(1).optional(),
  size: Joi.number().integer().min(1).optional()
});

export default schema;