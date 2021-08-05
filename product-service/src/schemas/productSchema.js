import Joi from 'joi';

const productSchema = Joi
  .object()
  .keys({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    count: Joi.number().required(),
  });

export default productSchema;
