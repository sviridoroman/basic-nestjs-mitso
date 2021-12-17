import * as dotenv from 'dotenv';

dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
const AUTHOR: string = process.env.AUTHOR || '';

// application
const PORT: number = parseInt(process.env.PORT, 10) || 4000;
const USE_FASTIFY: boolean = process.env.USE_FASTIFY === 'true';
const HTTP_ADAPTER: string = USE_FASTIFY ? 'fastify' : 'express';

// jsonwebtoken
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'secret-key';

// auth
const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';

// database
const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const POSTGRES_DB = process.env.POSTGRES_DB || 'express';

export {
  NODE_ENV,
  AUTHOR,
  PORT,
  USE_FASTIFY,
  HTTP_ADAPTER,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};
