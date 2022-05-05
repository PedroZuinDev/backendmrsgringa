import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class DeliveryDataRepository{
   private Collection = collection(ConnectionDB , "deliveryDatas");
   private uuIDV4 = v4();


    async insert(deliveryData : any){
        deliveryData.id = deliveryData.id ? deliveryData.id : v4();
        const deliveryDataRef = doc(this.Collection , deliveryData.id);
        return setDoc(deliveryDataRef, deliveryData, { merge: true });
    }
    async getAll(){
        const deliveryDataSnapShot = await getDocs(this.Collection)
        return deliveryDataSnapShot.docs.map(doc => doc.data())
    }
    // async getAllByStatus(status : String){
    //     const queryByStatus = query(this.Collection , where("status" , "==" , status))
    //     const querySnapshot = await getDocs(queryByStatus);
    //     return querySnapshot.docs.map(doc => doc.data());
    // }
    async getOneById(id: string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async delete(deliveryDataId : string){
        const deliveryDataRef = doc(this.Collection , deliveryDataId)
        return deleteDoc(deliveryDataRef);
    }

}

export const deliveryDataRepository = new DeliveryDataRepository();