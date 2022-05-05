import { Router , Request , Response, NextFunction } from "express";
import { loginController } from "../usecase/login/login-controller";

const route = Router();

class LoginRoute{
    initRoutes(){
        return(
                    route.post('/login' , (req : Request, res : Response)=>loginController.authenticateUser(req,res)),
                    route.get('/verifyToken' , (req : Request, res : Response)=>loginController.compareTokenRoute(req,res))
                );
    }
}

export const loginRoute = new LoginRoute();