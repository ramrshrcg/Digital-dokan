import { config } from 'dotenv';
config()

 export const envConfig = {
    port: process.env.PORT,
    db: process.env.sequalize_url,
    secret:process.env.SECRET,
    app_password:process.env.app_password,
    app_email: process.env.app_email,
}