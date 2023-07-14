import * as Joi from 'joi';

const JoiValidation = Joi.object({
  //Application
  APP_PORT: Joi.number().default(3000),

  //Database main
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_NAME: Joi.required(),
  JWT_SECRET: Joi.required(),
});

export default JoiValidation;
