import { clientRepository } from "../../repository/client-repository";
import { userRepository } from "../../repository/user-repository";

class ClientUseCase {

    async getAllClients(){
        return await clientRepository.getAll();
    }
    async getOneByStatus(status : String){
        return await clientRepository.getAllByStatus(status)
    }
    async getOneById(id : string){
        return await userRepository.getOneById(id);
    }
    async insertClient(client : any){
        return await clientRepository.insert(client);
    }
    async updateClient(client : any){
        return await clientRepository.update(client);
    }
    async deleteClient(id : string){
        return await clientRepository.delete(id);
    }

}

export const clientUseCase = new ClientUseCase();