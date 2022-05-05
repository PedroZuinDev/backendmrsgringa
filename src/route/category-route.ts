import { Router , Request , Response } from "express";
import { categoryController } from "../usecase/category/category-controller";
import { loginController } from "../usecase/login/login-controller";

const route = Router();

class CategoryRoute{
    initRoutes(){
        return(
                    route.post('/insertCategory' , loginController.compareToken , (req : Request, res : Response)=>categoryController.insertCategory(req,res)),
                    route.get('/getAllCategory' , loginController.compareToken , (req : Request, res : Response)=>categoryController.getAllCategory(req,res)),
                    route.get('/getOneByStatus' , loginController.compareToken , (req : Request, res : Response)=>categoryController.getOneByStatus(req,res)),
                    route.get('/getOneById' , loginController.compareToken , (req : Request, res : Response)=>categoryController.getOneById(req,res)),
                    route.put('/editCategory' , loginController.compareToken , (req : Request, res : Response)=>categoryController.editCategory(req,res)),
                    route.delete('/deleteCategory' , loginController.compareToken , (req : Request, res : Response)=>categoryController.deleteCategory(req,res))
                );
    }
}

export const categoryRoute = new CategoryRoute();