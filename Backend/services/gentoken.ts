
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig';

const generateToken = (userID: string) => {
    //in jwt 3 things 1. header, payload, signature
    //header contains algorithm used
    //payload contains user data
    //signature contains header and payload


    const token = jwt.sign(
        {
            userID: userID//payload

        }, envConfig.secret as string,//secret
        {

            expiresIn: '10d' 
        });
    return token;


}


export default generateToken;