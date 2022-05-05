import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import md5 from 'md5';
import {v4} from 'uuid';

class UserRepository{
   private Collection = collection(ConnectionDB , "users");
   private uuIDV4 = v4();
   
   private generateHashForPassword(password : string){return md5(password);}

    async getAll(){
        const userSnapshot = await getDocs(this.Collection)
        return userSnapshot.docs.map(doc => doc.data())
    }
    async upsert(user : any){
        user.id = user.id ? user.id : v4();
        user.password = this.generateHashForPassword(user.password);
        user.confirmpassword = this.generateHashForPassword(user.confirmpassword);
        const userRef = doc(this.Collection , user.id);
        return setDoc(userRef, user, { merge: true });
    }
    async getAllByStatus(status : String){
        const queryByStatus = query(this.Collection , where("status" , "==" , status))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async getOneById(id: string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => {
            const client = doc.data();
            delete client.password;
            delete client.confirmpassword;
            delete client.status;
            return client;
        });
    }
    async getOneByEmail(email: string){
        const queryByStatus = query(this.Collection , where("email" , "==" , email))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => doc.data());
    }
    async delete(userId : string){
        const userRef = doc(this.Collection , userId)
        return deleteDoc(userRef);
    }


}

export const userRepository = new UserRepository();