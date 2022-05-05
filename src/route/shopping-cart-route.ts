import { Router , Request , Response } from "express";
import { categoryController } from "../usecase/category/category-controller";
import { shoppingCartController } from "../usecase/shopping-cart/shopping-cart-controller";

const route = Router();

class ShoppingCartRoute{
    initRoutes(){
        return(
                    route.post('/newCart' , (req : Request, res : Response)=>shoppingCartController.createNewCart(req,res)),
                    route.post('/addProductOnCart' , (req : Request, res : Response)=>shoppingCartController.addProductOnCart(req,res)),
                    route.post('/removeProductOnCart' , (req : Request, res : Response)=>shoppingCartController.removeProductOnCart(req,res)),
                    route.get('/editProductOnCart' , (req : Request, res : Response)=>categoryController.getOneById(req,res)),
                    route.post('/getCart' , (req : Request, res : Response)=>shoppingCartController.getShoppigCartByClientID(req,res)),
                    route.put('/goToCheckout' , (req : Request, res : Response)=>categoryController.editCategory(req,res))
                );
    }
}

export const shoppingCartRoute = new ShoppingCartRoute();