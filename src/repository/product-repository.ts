import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class ProductRepository{
   private Collection = collection(ConnectionDB , "products");
   private uuIDV4 = v4();

    async getAll(){
        const productsSnapShot = await getDocs(this.Collection)
        return productsSnapShot.docs.map(doc => doc.data())
    }
    async insert(product : any){
        product.id = product.id ? product.id : v4();
        console.log("[product] => " , product);
        const deliveryDataRef = doc(this.Collection , product.id);
        return setDoc(deliveryDataRef, product, { merge: true });
    }
    async getAllByStatus(status : String){
        const queryByStatus = query(this.Collection , where("status" , "==" , status))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async getOneById(id: string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async getOneByIdForThePushCart(id: string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => {
            let product = doc.data();
            delete product.reference
            delete product.category
            delete product.quantity
            delete product.buyprice
            return product;
        });
    }
    async update(product : any){
        const productRef = doc(this.Collection , product.id);
        return setDoc(productRef, product, { merge: true });
    }
    async delete(productId : string){
        const productRef = doc(this.Collection , productId)
        return deleteDoc(productRef);
    }

    async getAllByCategory(idcategory : string){
        const queryByStatus = query(this.Collection , where("idcategory" , "==" , idcategory), where("status" , "==" , "active"))
        const querySnapshot = await getDocs(queryByStatus);
        const arrayToValues =  querySnapshot.docs.map(doc => doc.data());
        return arrayToValues.map(product => {
                delete product.buyprice,
                delete product.quantity 
                return product
        })
    }
    async getAllByPromotion(){
        const queryByStatus = query(this.Collection , where("showonhome" , "==" , true))
        const querySnapshot = await getDocs(queryByStatus);
        const arrayToValues =  querySnapshot.docs.map(doc => doc.data());
        return arrayToValues.map(product => {
                delete product.buyprice,
                delete product.quantity 
                return product
        })
    }

}

export const productRepository = new ProductRepository();