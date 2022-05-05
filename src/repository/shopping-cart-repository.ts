import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class ShoppingCartRepository{
    private Collection = collection(ConnectionDB , "shoppingCarts");
    private uuIDV4 = v4();

    async upsert(newShoppingCart : any , operation : string){
        newShoppingCart.id = newShoppingCart.id ? newShoppingCart.id : v4();

        const queryByStatus = query(this.Collection , where("user.iduser" , "==" , newShoppingCart.user.iduser));
        const querySnapshot = await getDocs(queryByStatus);
        const verifyHaveInDatabase = querySnapshot.docs.map(doc => doc.data());
        
        if(verifyHaveInDatabase.filter(cart => cart.status === "open").length != 0 && operation === "insert"){
            throw "Cliente Possui um carrinho com o status : 'open'";
        }

        const shoppingCartsRef = doc(this.Collection , newShoppingCart.id);
        return setDoc(shoppingCartsRef, newShoppingCart, { merge: true });
    }
    async getCartByUserId(iduser: string){
        const queryByStatus = query(this.Collection , where("user.iduser" , "==" , iduser))
        const querySnapshot = await getDocs(queryByStatus);
        const shoppingCarts = querySnapshot.docs.map(doc => doc.data());
        const filteredShoppingCarts = shoppingCarts.filter(shoppingCart => shoppingCart.status === "open")
        return filteredShoppingCarts;
    }

    // async getAll(){
    //     const productsSnapShot = await getDocs(this.Collection)
    //     return productsSnapShot.docs.map(doc => doc.data())
    // }
    // async getAllByStatus(status : String){
    //     const queryByStatus = query(this.Collection , where("status" , "==" , status))
    //     const querySnapshot = await getDocs(queryByStatus);
    //     return querySnapshot.docs.map(doc => doc.data());
    // }
    // async update(product : any){
    //     const productRef = doc(this.Collection , product.id);
    //     return setDoc(productRef, product, { merge: true });
    // }
    // async delete(productId : string){
    //     const productRef = doc(this.Collection , productId)
    //     return deleteDoc(productRef);
    // }

}

export const shoppingCartRepository = new ShoppingCartRepository();