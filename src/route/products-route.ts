import { Router , Request , Response } from "express";
import { loginController } from "../usecase/login/login-controller";
import { productsController } from "../usecase/products/products-controller";

const route = Router();

class ProductRoute{
    initRoutes(){
        return(
                    route.get('/getAllProducts' , loginController.compareToken , (req : Request, res : Response)=>productsController.getAllProducts(req,res)),
                    route.get('/getOneByStatus' , loginController.compareToken , (req : Request, res : Response)=>productsController.getOneByStatus(req,res)),
                    route.get('/getAllByCategory' , (req : Request, res : Response)=>productsController.getAllByCategory(req,res)),
                    route.get('/getProductsOnPromotion' , (req : Request, res : Response)=>productsController.getAllByPromotion(req,res)),
                    route.get('/getOneById' , loginController.compareToken , (req : Request, res : Response)=>productsController.getOneById(req,res)),
                    route.post('/insertProduct' , loginController.compareToken , (req : Request, res : Response)=>productsController.insertProduct(req,res)),
                    route.put('/editProduct' , loginController.compareToken , (req : Request, res : Response)=>productsController.editProduct(req,res)),
                    route.delete('/deleteProduct' , loginController.compareToken , (req : Request, res : Response)=>productsController.deleteProduct(req,res))
                );
    }
}

export const productRoute = new ProductRoute();