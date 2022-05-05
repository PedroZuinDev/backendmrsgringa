
import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class PaymentDataRepository{
   private Collection = collection(ConnectionDB , "paymentData");
   private uuIDV4 = v4();


    async upsert(paymentData : any){
        paymentData.id = paymentData.id ? paymentData.id : v4();
        console.log('[paymentData] => ' , paymentData);
        const paymentDataRef = doc(this.Collection , paymentData.id);
        return setDoc(paymentDataRef, paymentData, { merge: true });
    }
    async getAll(){
        const paymentDataSnapShot = await getDocs(this.Collection)
        return paymentDataSnapShot.docs.map(doc => doc.data())
    }
    // async getAllByStatus(status : String){
    //     const queryByStatus = query(this.Collection , where("status" , "==" , status))
    //     const querySnapshot = await getDocs(queryByStatus);
    //     return querySnapshot.docs.map(doc => doc.data());
    // }
    async getOneById(id: string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id));
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async delete(id : string){
        const paymentDataRef = doc(this.Collection , id);
        return deleteDoc(paymentDataRef);
    }

}

export const paymentDataRepository = new PaymentDataRepository();