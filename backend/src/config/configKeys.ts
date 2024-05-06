import dotenv from 'dotenv';

dotenv.config(); 
 
export const configKeys = {
    
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        //secret: process.env.JWT_SECRET,
        //audience: process.env.JWT_AUDIENCE,
        //issuer: process.env.JWT_ISSUER
    },
    
    port: process.env.PORT,
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY
};
