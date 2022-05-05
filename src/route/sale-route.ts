import { Router , Request , Response } from "express";
import { loginController } from "../usecase/login/login-controller";
import { saleController } from "../usecase/sale/sale-controller";

const route = Router();

class SaleRoute{
    initRoutes(){
        return(
                    route.post('/createNewSale' , loginController.compareToken , (req : Request, res : Response)=> saleController.createNewSale(req,res)),
                    route.get('/getbyid' , loginController.compareToken , (req : Request, res : Response)=>{ saleController.getOneById(req,res)}),
                    route.put('/editSale' , loginController.compareToken , (req : Request, res : Response)=>saleController.createNewSale(req,res)),
                    route.put('/editSale/toDeliveryData' , loginController.compareToken , (req : Request, res : Response)=>saleController.editSaleToDeliveryData(req,res)),
                    route.put('/editSale/toPaymentData' , loginController.compareToken , (req : Request, res : Response)=>saleController.editSaleToPaymentData(req,res)),
                    route.get('/getAll' , loginController.compareToken , (req : Request, res : Response)=>saleController.getAllSales(req,res)),
                    route.delete('/deleteSale' , loginController.compareToken , (req : Request, res : Response)=>saleController.deleteSaleByID(req,res))
                );
    }
}

export const saleRoute = new SaleRoute();