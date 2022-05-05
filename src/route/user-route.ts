import { Router , Request , Response } from "express";
import { userController } from "../usecase/user/user-controller";
const route = Router();

class UserRoute{
    initRoutes(){
        return(
                    route.post('/registration' , (req : Request, res : Response)=>userController.createUser(req,res))
                    // route.get('/getAll' , (req : Request, res : Response)=>paymentDataController.getAllPaymentData(req,res)),
                    // route.get('/getOneById' , (req : Request, res : Response)=>paymentDataController.getOneById(req,res)),
                    // route.put('/editPaymentData' , (req : Request, res : Response)=>paymentDataController.insertPaymentData(req,res)),
                    // route.delete('/deletePaymentData' , (req : Request, res : Response)=>paymentDataController.deletePaymentData(req,res))
                );
    }
}

export const userRoute = new UserRoute();