import {NextFunction, Request , Response} from 'express';
import { jsonWebTokenMiddleware } from '../../middleware/json-web-token-middliware';
import { userUseCase } from '../user/user-usecase';
import { loginUseCase } from './login-usecase';

class LoginController{
    async authenticateUser(req : Request, res : Response){
        const {email , password} = req.body;
        try{
                const user = await loginUseCase.validateEmailAndPass(email , password);
                const token = await jsonWebTokenMiddleware.generateToken(user.id);
                res.send({success: true, token:  token.jwt, dateNow : new Date().toLocaleString('pt-br') , iduser : token.iduser})
        }
        catch(error : any){
            return res.json({success: false, message : error.message, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    async compareToken(req : Request, res : Response , next : NextFunction){
        try {
            const xAccessToken = req.get('x-access-token');
            if(!xAccessToken) throw "Token Não Enviado";
            await jsonWebTokenMiddleware.verifyToken(xAccessToken);
            next();
        } catch (error) {
            return res.status(403).json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    async compareTokenRoute(req : Request, res : Response){
        try {
            const xAccessToken = req.get('x-access-token');
            if(!xAccessToken) throw "Token Não Enviado";
            console.log('[VALIDANDO TOKEN] =>' , xAccessToken )
            await jsonWebTokenMiddleware.verifyToken(xAccessToken);
            res.send({success : true, message : "Token Válido"})
        } catch (error) {
            return res.status(403).json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }


}
export const loginController = new LoginController();