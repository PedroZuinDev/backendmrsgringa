import { clientRepository } from "../../repository/client-repository";
import { deliveryDataRepository } from "../../repository/delivery-data-repository";

class DeliveryDataUseCase {

    async saveDeliveryData(saveDeliveryData : any){
        return await deliveryDataRepository.insert(saveDeliveryData);
    }
    // async getOneByStatus(status : String){
    //     return await clientRepository.getAllByStatus(status)
    // }
    async getOneById(id : string){
        return await deliveryDataRepository.getOneById(id);
    }
    // async insertClient(client : any){
    //     return await clientRepository.insert(client);
    // }
    // async updateClient(client : any){
    //     return await clientRepository.update(client);
    // }
    async getAllDeliveryDates(){
        return await deliveryDataRepository.getAll();
    }
    async deleteDeliveryData(id : string){
        return await deliveryDataRepository.delete(id);
    }

}

export const deliveryDataUseCase = new DeliveryDataUseCase();