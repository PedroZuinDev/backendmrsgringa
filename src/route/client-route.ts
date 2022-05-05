import { Router , Request , Response } from "express";
import { clientController } from "../usecase/clients/client-controller";
import { loginController } from "../usecase/login/login-controller";

const route = Router(); 

class ClientRoute{
    initRoutes(){
        return(
                    route.post('/insertClient' , loginController.compareToken ,  (req : Request, res : Response)=>clientController.insertClient(req,res)),
                    route.get('/getAllClients' , loginController.compareToken ,(req : Request, res : Response)=>clientController.getAllClient(req,res)),
                    route.get('/getClientByStatus' , loginController.compareToken ,  (req : Request, res : Response)=>clientController.getOneByStatus(req,res)),
                    route.get('/getClientById' , loginController.compareToken ,(req : Request, res : Response)=>clientController.getOneById(req,res)),
                    route.put('/editClient' , loginController.compareToken ,  (req : Request, res : Response)=>clientController.editClient(req,res)),
                    route.delete('/deleteClient' , loginController.compareToken ,  (req : Request, res : Response)=>clientController.deleteClient(req,res))
                );
    }
}

export const clientRoute = new ClientRoute();