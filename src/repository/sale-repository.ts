import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentReference, FieldValue, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { ConnectionDB } from "../firebase/connection";
import {v4} from 'uuid';

class SaleRepository{
   private Collection = collection(ConnectionDB , "sales");
   private CollectionShoppingCart = collection(ConnectionDB , "shoppingCarts");
   private CollectionClients = collection(ConnectionDB , "clients");
   private CollectionPaymentData = collection(ConnectionDB , "paymentData");
   private CollectionDeliveryData = collection(ConnectionDB , "deliveryDatas");
   private uuIDV4 = v4();
   
   async insert(sale : any){
       try{
           sale.id ? sale.id : sale.id = v4();
           const saleRef = doc(this.Collection , sale.id)
           setDoc(saleRef, sale, { merge: true });
           return sale.id
       }
       catch(error : any){
           throw new Error('CONNECTION ERROR => ' + error.message);
       }
   }    

   async delete(saleId : string){
        const saleRef = doc(this.Collection , saleId);
        return deleteDoc(saleRef);
    }
    async getAllSales(){
        const saleSnapShot = await getDocs(this.Collection);
        const returnQuerySale =  saleSnapShot.docs.map(doc => doc.data());
        return this.generateStructureForReturnSale(returnQuerySale);
    }
    async getOneById(id: string , iduser : string){
        const queryByStatus = query(this.Collection , where("id" , "==" , id))
        const querySnapshot = await getDocs(queryByStatus);
        return querySnapshot.docs.map(doc => {
            const Sale = doc.data();
            if(Sale.client.idclient === iduser){
                return Sale;
            }
            else{
                throw new Error('Venda nao encontrada para este cliente')
            }
        });
    }

    // async getAllByStatus(status : String){
    //     const queryByStatus = query(this.Collection , where("status" , "==" , status))
    //     const querySnapshot = await getDocs(queryByStatus);
    //     return querySnapshot.docs.map(doc => doc.data());
    // }

    private async generateStructureForReturnSale(returnQuerySale : any){
            return await Promise.resolve(
                Promise.all(
                returnQuerySale.map(async (sale : any) => {
                        const queryByStatusIDShoppingCart = query(this.CollectionShoppingCart , where("id" , "==" , sale.shoppingCart.idshoppingcart ))
                        const shoppingCartSnapShot = await getDocs(queryByStatusIDShoppingCart);
                        const returnQueryShoppingCart =  shoppingCartSnapShot.docs.map(doc => doc.data());
                        sale.shoppingCart = returnQueryShoppingCart[0]
                        
                        const queryByIdClient = query(this.CollectionClients , where("id" , "==" , sale.client.idclient ))
                        const clientSnapShot = await getDocs(queryByIdClient);
                        const returnQueryClient =  clientSnapShot.docs.map(doc => doc.data());
                        sale.client = returnQueryClient[0];
                        
                        const queryByIdPaymentData = query(this.CollectionPaymentData , where("id" , "==" , sale.paymentData.idpaymantdata ))
                        const paymentDataSnapShot = await getDocs(queryByIdPaymentData);
                        const returnQueryPaymantData =  paymentDataSnapShot.docs.map(doc => doc.data());
                        sale.paymentData = returnQueryPaymantData[0];
                        
                        const queryByIdDeliveryData = query(this.CollectionDeliveryData , where("id" , "==" , sale.deliveryData.iddeliverydata ))
                        const deliveryDataSnapShot = await getDocs(queryByIdDeliveryData);
                        const returnQueryDeliveryData =  deliveryDataSnapShot.docs.map(doc => doc.data());
                        sale.deliveryData = returnQueryDeliveryData[0];

                        return sale;
        })));
    }
}

export const saleRepository = new SaleRepository();