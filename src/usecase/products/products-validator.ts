class ProductValidator{
        validateForRegister(product : any){
            if(!product.name){throw "Campo [Name] Obrigatório";}
            else if(!product.quantity){throw "Campo [Quantity] Obrigatório";}
            else if(!product.buyprice){throw "Campo [BuyPrice] Obrigatório";}
            else if(!product.sellprice){throw "Campo [SellPrice] Obrigatório";}
            else if(!product.reference){throw "Campo [Reference] Obrigatório";}
            else if(!product.urlImage){throw "Campo [URLImage] Obrigatório";}
            else if(!product.status){throw "Campo [Status] Obrigatório";}
            else if(!product.idcategory){throw "Campo [Category] Obrigatório";}
            else{
                return true;
            }
    }
}
export const productValidator = new ProductValidator();