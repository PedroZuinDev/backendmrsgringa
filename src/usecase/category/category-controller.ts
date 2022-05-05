import {Request , Response} from 'express';
import { categoryUseCase } from './category-usecase';
import { categoryValidator } from './category-validator';

class CategoryController{

    async getAllCategory(req : Request, res : Response){
       try{
        const returnUseCase = await categoryUseCase.getAllCategory();
        return res.send({success : true, message : `Categorias encontradas : ${returnUseCase.length}` , category : returnUseCase});
       }
       catch(err){
           throw err;
       }
    }
    
    async insertCategory(req : Request, res : Response){
        const {category} = req.body;
        try{
            //Passa pela rotina de validação
            categoryValidator.validatingFields(category);
            // se estiver tudo preenchido e tudo ok envia para cadastro
            const returnUseCase = await categoryUseCase.insertCategory(category);
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : "Categoria cadastrada com Sucesso!" , id : returnUseCase});
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async getOneByStatus(req : Request, res : Response){
        const {status} = req.query;
        try{
            if(!status) throw "Campo [Status] Obrigatório";
            const returnUseCase = await categoryUseCase.getOneByStatus(status.toString());
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : `Categorias encontradas : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(err : any){
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async getOneById(req : Request, res : Response){
        const {idCategory} = req.query;
        try{
            if(!idCategory) throw "[idCategory] Obrigatório";
            const returnUseCase = await categoryUseCase.getOneById(idCategory.toString());

            if(returnUseCase.length != 0) {
                return res.send({success : true, message : "Categoria Encontrada !" , category : returnUseCase});
            }
            return res.send({success : false, message : "Categoria NÃO Encontrada !" , category : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async editCategory(req : Request, res : Response){
        const {category} = req.body;
        try{
            if(!category) throw "[Catregoria] Obrigatório";
            const returnUseCase = await categoryUseCase.updateCategory(category);
            return res.send({success : true, message : "Categoria Editada com Sucesso !" , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async deleteCategory(req : Request, res : Response){
        const {categoryId} = req.body;
        try{
            if(!categoryId) throw "[ID da Categoria] Obrigatório";
            const returnUseCase = await categoryUseCase.deleteCategory(categoryId);
            return res.send({success : true, message : "Producto Deletado com Sucesso !" , category : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
}
export const categoryController = new CategoryController();