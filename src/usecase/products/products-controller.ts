import {Request , Response} from 'express';
import { productsUseCase } from './products-usecase';
import { productValidator } from './products-validator';

class ProductController{

    async getAllProducts(req : Request, res : Response){
       try{
        const returnUseCase = await productsUseCase.getAllProducts();
        return res.send(returnUseCase)
       }
       catch(err){
           throw err;
       }
    }
    
    async insertProduct(req : Request, res : Response){

        try{
            const {product} = req.body;
            const operation = product.id ? "edit" : "insert";
            //Passa pela rotina de validação
            productValidator.validateForRegister(product);
            const returnUseCase = await productsUseCase.insertProduct(product);
            return (operation === "edit" ? 
            res.send({success : true, message : "Produto Editado com Sucesso!" , id : returnUseCase}) : 
            res.send({success : true, message : "Produto Criado com Sucesso!" , id : returnUseCase}));
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async getOneByStatus(req : Request, res : Response){
        const {status} = req.query;
        try{
            if(!status) throw "Campo [Status] Obrigatório";
            const returnUseCase = await productsUseCase.getOneByStatus(status.toString());
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : `Quantidade de Produtos Retornados : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(err : any){
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async getOneById(req : Request, res : Response){
        const {productId} = req.query;
        try{
            if(!productId) throw "[productId] Obrigatório";
            const returnUseCase = await productsUseCase.getOneById(productId.toString());
            if(returnUseCase.length != 0){
                return res.send({success : true, message : `Produto encontrado !` , products : returnUseCase});
            }
            else{
                return res.send({success : false, message : `Produto Não Encontrado` , products : returnUseCase});
            }
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async editProduct(req : Request, res : Response){
        const {product} = req.body;
        try{
            if(!product) throw "[Produto] Obrigatório";
            const returnUseCase = await productsUseCase.updateProduct(product);
            return res.send({success : true, message : "Produto Editado com Sucesso !" , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async deleteProduct(req : Request, res : Response){
        const {productId} = req.body;
        try{
            if(!productId) throw "[ID do Produto] Obrigatório";
            const returnUseCase = await productsUseCase.deleteProduct(productId);
            return res.send({success : true, message : "Produto Deletado com Sucesso !" , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async getAllByCategory(req : Request, res : Response){
        const { idcategory } = req.query;
        try{
            if(!idcategory) throw "[ID da Categoria] Obrigatório";
            const returnUseCase = await productsUseCase.getAllByCategory(idcategory.toString());
            return res.send({success : true, message : `Quantidade de Produtos Retornados : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }

    }
    async getAllByPromotion(req : Request, res : Response){
        try{
            const returnUseCase = await productsUseCase.getAllByPromotion();
            return res.send({success : true, message : `Quantidade de Produtos Retornados : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }

    }
}
export const productsController = new ProductController();