import { config } from 'dotenv';
config()

 export const envConfig = {
    port: process.env.PORT,
    db: process.env.sequalize_url
}