import { Request, Response } from 'express';
import { StatusCode } from '../utils/STATUS_CODES_ERRORS';
import {shoppingCartUseCase} from './shopping-cart-usecase'

class ShoppingCartController{

    async createNewCart(req:Request , res : Response){
        try{
            const { newShoppingCart } = req.body;
            const operation = newShoppingCart.id ? "edit" : "insert";
            const returnUseCase = await shoppingCartUseCase.createNewCart(newShoppingCart , operation);
            return (operation === "edit" ? 
            res.send({success : true, message : "Carrinho Editado com Sucesso!" , id : returnUseCase}) : 
            res.send({success : true, message : "Carrinho Criado com Sucesso!" , id : returnUseCase}));
        }
        catch(err) {
            console.log('[ERROR] => ', err);
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    async addProductOnCart(req:Request , res : Response){
        try{
            const { product , idshoppingcart, iduser } = req.body;
            const returnUseCase = await shoppingCartUseCase.addProductOnCart(product, idshoppingcart, iduser);
            res.send({success : true, message : "Produto Adicionado com Sucesso!" , id : returnUseCase});
        }
        catch(err) {
            console.log('[ERROR] => ', err);
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    async removeProductOnCart(req:Request , res : Response){
        try{
            const { idshoppingcart , iduser , idproduct } = req.body;
            const returnUseCase = await shoppingCartUseCase.removeProductOnCart(idproduct, iduser, idshoppingcart);
            res.send({success : true, message : "Produto Removido com Sucesso!" , id : returnUseCase});
        }
        catch(err) {
            console.log('[ERROR] => ', err);
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    async   getShoppigCartByClientID(req:Request , res : Response){
        try {
            const { iduser } = req.body;
            const returnUseCase = await shoppingCartUseCase.getCartByUserId(iduser);
            if(returnUseCase.length === 0) throw {message : `Este Cliente não possui um carrinho de compras ativo | IDCLIENT > ${iduser}` , statusCode : StatusCode[404]}
            return res.send({success : true, message : "Carrinho de Compras encontrado com Sucesso ! " , shoppingCart : returnUseCase});
        } catch (err : any) {
            console.error('[ERROR] => ', err);
            if(err.statusCode == StatusCode[404]){
                return res.status(500).json({success: false, message : err.message, dateNow : new Date().toLocaleString('pt-br') , statusCode : StatusCode[404]})
            }
            else{
                return res.status(500).json({success: false, message : err.message, dateNow : new Date().toLocaleString('pt-br') , statusCode : StatusCode[500]})
            }
        }
    }
} 

export const shoppingCartController = new ShoppingCartController();