import * as Joi from 'joi';

export const configurationValidate = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC: Joi.number().required(),
  HASH_SALT: Joi.number().required(),
});
