import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class CategoryRepository{
   private Collection = collection(ConnectionDB , "category");
   private uuIDV4 = v4();

    async getAll(){
        const categorySnapShot = await getDocs(this.Collection)
        return categorySnapShot.docs.map(doc => doc.data())
    }
    async insert(category : any){
        category.id = category.id ? category.id : v4();
        const categoryRef = doc(this.Collection , category.id);
        return setDoc(categoryRef, category, { merge: true });
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
    async update(category : any){
        const categoryRef = doc(this.Collection , category.id);
        return setDoc(categoryRef, category, { merge: true });
    }
    async delete(productId : string){
        const productRef = doc(this.Collection , productId)
        return deleteDoc(productRef);
    }

}

export const categoryRepository = new CategoryRepository();