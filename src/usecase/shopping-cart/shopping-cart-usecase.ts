import { Request, Response } from "express";
import { productRepository } from "../../repository/product-repository";
import { shoppingCartRepository } from "../../repository/shopping-cart-repository";
import { utilsShoppingCart } from "../utils/shoppingCart";

class ShoppingCartUseCase{

    async createNewCart(newCart:  any , operation : string){
        return shoppingCartRepository.upsert(newCart , operation);
    }
    async addProductOnCart(product : any , idShoppingCart : string , iduser : string){
        const returnProductRepository = await productRepository.getOneByIdForThePushCart(product.id);
        if(returnProductRepository.length === 0){ throw "Produto Não Encontrado"; }
        const getCartForIdClient = await shoppingCartRepository.getCartByUserId(iduser);
        const shoppingCartUpdated = utilsShoppingCart.insertProductOnTheCart(returnProductRepository[0] , product.quantity , getCartForIdClient[0] );
        return (await shoppingCartRepository.upsert(shoppingCartUpdated , "edit"));

    }
    async removeProductOnCart(idproduct : string, iduser: string, idshoppingcart : string){
        const returnShoppingCartRepository = await shoppingCartRepository.getCartByUserId(iduser);
        const newShoppingCart = utilsShoppingCart.removeProductOnTheCart(returnShoppingCartRepository[0] , idproduct);
        return (await shoppingCartRepository.upsert(newShoppingCart , "edit"));
    }

    async getCartByUserId(iduser : string){
        return await shoppingCartRepository.getCartByUserId(iduser);
    }

}

export const shoppingCartUseCase = new ShoppingCartUseCase();