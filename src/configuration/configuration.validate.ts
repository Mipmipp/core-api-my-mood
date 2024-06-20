import * as Joi from 'joi';

export const configurationValidate = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required,
});
