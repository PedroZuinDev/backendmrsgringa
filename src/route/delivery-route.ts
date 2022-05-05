import { Router , Request , Response } from "express";
import { loginController } from "../usecase/login/login-controller";
import { correiosService } from "../utils/correios";

const route = Router();

class DeliveryRoute{
    initRoutes(){
        return(
                    route.get('/correios/getDeliveryServices' , loginController.compareToken , (req : Request, res : Response)=> correiosService.getServices(req,res)),
                    route.post('/correios/getPriceAndLine' , loginController.compareToken , (req : Request, res : Response)=> correiosService.calcPrecoPrazo(req,res))
                );
    }
}

export const deliveryRoute = new DeliveryRoute();