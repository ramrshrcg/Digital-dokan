import { config } from 'dotenv';
config()

 export const envConfig = {
    port: process.env.PORT,
    //database
    db: process.env.sequalize_url,

    //jwt
    secret:process.env.SECRET,

    // node mailer
    app_password:process.env.app_password,
    app_email: process.env.app_email,

    
}