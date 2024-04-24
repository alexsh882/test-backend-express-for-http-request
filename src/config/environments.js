import "dotenv/config";

export const environments = {
    APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  APP_URL: process.env.APP_URL,
  DB: {
    DB_DATABASE: process.env.DB_DATABASE,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_STORAGE: process.env.DB_STORAGE,
  },
};