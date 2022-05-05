import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
const {X_ACCESS_SECRET , EXPIRES_TOKEN_IN} = process.env;

class JsonWebTokenMiddleware{
    async generateToken(userId : string){
        return {jwt : jwt.sign({userId} , X_ACCESS_SECRET as Secret , {expiresIn : 5000}) , iduser : userId}
    }

    async verifyToken(token: string){
        return jwt.verify(token ,X_ACCESS_SECRET as Secret, (err , decoded)=>{
            if(err) throw "Token Inválido/Expirado";
            return decoded;
        } );
    }


}

export const jsonWebTokenMiddleware = new JsonWebTokenMiddleware();