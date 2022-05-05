import { paymentDataRepository } from "../../repository/payment-data-repository";

class PaymentDataUseCase {

    async savePaymentData(paymentData : any){
        return await paymentDataRepository.upsert(paymentData);
    }
    async getAll(){
        return await paymentDataRepository.getAll();
    }
    // async getOneByStatus(status : String){
    //     return await clientRepository.getAllByStatus(status)
    // }
    async getOneById(id : string){
        return await paymentDataRepository.getOneById(id);
    }
    async deletePaymentData(id : string){
        return await paymentDataRepository.delete(id);
    }

}

export const paymentDataUseCase = new PaymentDataUseCase();