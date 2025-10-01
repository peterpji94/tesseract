import dotenv from 'dotenv';
import Joi from 'joi';

export type Env = {
  postgres: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  port: number;
  logLevel: string;
};

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(8080),
  LOG_LEVEL: Joi.string().default('info'),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
}).unknown();

function constructEnv(): Env {
  dotenv.config();
  const {error, value: processEnv} = envSchema.validate(process.env, {abortEarly: false});
  if (error) throw new Error(`Config validation error: ${error.message}`);

  const env = {
    postgres: {
      host: processEnv.POSTGRES_HOST,
      port: processEnv.POSTGRES_PORT,
      database: processEnv.POSTGRES_DB,
      user: processEnv.POSTGRES_USER,
      password: processEnv.POSTGRES_PASSWORD,
    },
    port: processEnv.PORT,
    logLevel: processEnv.LOG_LEVEL,
  };

  return env;
}

export const env = constructEnv();
