import { Router , Request , Response } from "express";
import { deliveryDataController } from "../usecase/delivery-data/delivery-data-controller";
import { loginController } from "../usecase/login/login-controller";

const route = Router();

class DeliveryDataRoute{
    initRoutes(){
        return(
                    route.post('/newData' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.insertDeliveryData(req,res)),
                    route.put('/editData' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.insertDeliveryData(req,res)),
                    route.delete('/deleteData' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.deleteData(req,res)),
                    route.get('/getAllDatas' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.getAllDeliveryDate(req,res)),
                    route.get('/getOneById' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.getOneById(req,res)),
                    route.get('/getOneByClientId' , loginController.compareToken , (req : Request, res : Response)=>deliveryDataController.getOneById(req,res))
                );
    }
}

export const deliveryDataRoute = new DeliveryDataRoute();