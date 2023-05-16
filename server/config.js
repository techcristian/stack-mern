import dotenv from 'dotenv';

dotenv.config();
// DB
export const MYSQL_ROOT = process.env.MYSQL_ROOT || 'root';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'abcd';
export const MYSQL_NAME= process.env.MYSQL_NAME || 'db_mern';
export const MYSQL_PORT=process.env.MYSQL_PORT || 3306;
export const MYSQL_HOST=process.env.MYSQL_HOST || "localhost";
// PORT
export const PORT = process.env.PORT || 4000;

//CLOUDINARY
  

export const CLOUD_NAME= process.env.CLOUD_NAME;
export const API_KEY= process.env.API_KEY;
export const API_SECRET= process.env.API_SECRET;