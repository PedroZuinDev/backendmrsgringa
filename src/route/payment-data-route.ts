import { Router , Request , Response } from "express";
import { loginController } from "../usecase/login/login-controller";
import { paymentDataController } from "../usecase/payment-data/payment-data-controller";
const route = Router();

class PaymentDataRoute{
    initRoutes(){
        return(
                    route.post('/newPaymantData' , loginController.compareToken , (req : Request, res : Response)=>paymentDataController.insertPaymentData(req,res)),
                    route.get('/getAll' , loginController.compareToken , (req : Request, res : Response)=>paymentDataController.getAllPaymentData(req,res)),
                    route.get('/getOneById' , loginController.compareToken , (req : Request, res : Response)=>paymentDataController.getOneById(req,res)),
                    route.put('/editPaymentData' , loginController.compareToken , (req : Request, res : Response)=>paymentDataController.insertPaymentData(req,res)),
                    route.delete('/deletePaymentData' , loginController.compareToken , (req : Request, res : Response)=>paymentDataController.deletePaymentData(req,res))
                );
    }
}

export const paymentDataRoute = new PaymentDataRoute();