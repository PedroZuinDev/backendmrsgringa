import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class ClientRepository{
   private Collection = collection(ConnectionDB , "clients");
   private uuIDV4 = v4();

    async getAll(){
        const productsSnapShot = await getDocs(this.Collection)
        return productsSnapShot.docs.map(doc => doc.data())
    }
    async insert(client : any){
        client.id = client.id ? client.id : v4();
        const clientRef = doc(this.Collection , client.id);
        return setDoc(clientRef, client, { merge: true });
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
    async update(client : any){
        const productRef = doc(this.Collection , client.id);
        return setDoc(productRef, client, { merge: true });
    }
    async delete(clientId : string){
        const productRef = doc(this.Collection , clientId)
        return deleteDoc(productRef);
    }

}

export const clientRepository = new ClientRepository();