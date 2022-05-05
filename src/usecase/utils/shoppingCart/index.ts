

class UtilsShoppingCart{
    insertProductOnTheCart(product: any , quantity: any, shoppingCart: any){

        const indexOfTheProduct = shoppingCart.products.findIndex((productToSearch: any) => productToSearch.id == product.id);

        if(shoppingCart.products.length != 0){
            shoppingCart.products.map((productUnit : any)  => {
                if(productUnit.id == product.id && indexOfTheProduct != -1){
                    let newProductToAdd = product;
                    newProductToAdd.quantity = (quantity += productUnit.quantity);
                    shoppingCart.products[indexOfTheProduct] = newProductToAdd;
                }
            });
            if(indexOfTheProduct === -1){
                product.quantity = quantity;
                shoppingCart.products.push(product);
            }
        }
        else{
            product.quantity = quantity;
            shoppingCart.products.push(product);
        }
        this.calculateSubTotal(shoppingCart);
        return shoppingCart;
    }

    removeProductOnTheCart(shoppingCart : any, idproduct : string){
        const shoppingCartRemoveItem = shoppingCart.products.filter(( product:any ) => product.id != idproduct);
        shoppingCart.products = shoppingCartRemoveItem
        return this.calculateSubTotal(shoppingCart);
    }

    calculateSubTotal(shoppingCart:any ){
        let subtotalValue = 0;
        shoppingCart.products.map((product : any) => subtotalValue += (product.sellprice * product.quantity));
        shoppingCart.subtotal = subtotalValue;
        return shoppingCart;
    }
}

export const utilsShoppingCart = new UtilsShoppingCart();