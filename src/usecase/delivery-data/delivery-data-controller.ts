import {Request , Response} from 'express';
import { deliveryDataUseCase } from './delivery-data-usecase';

class DeliveryDataController{

    async insertDeliveryData(req : Request, res : Response){
        try{
            const { deliveryData } = req.body;
            const operation = deliveryData.id ? "edit" : "insert";
            const returnUseCase = await deliveryDataUseCase.saveDeliveryData(deliveryData);
            return (operation === "edit" ? 
            res.send({success : true, message : "Dados de Entrega Editado com Sucesso!" , id : returnUseCase}) : 
            res.send({success : true, message : "Dados de Entrega Criado com Sucesso!" , id : returnUseCase}));
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async getAllDeliveryDate(req : Request, res : Response){
        try{
            const returnUseCase = await deliveryDataUseCase.getAllDeliveryDates();
            return res.send({success : true, message : `Dados de Entrega encontrados : ${returnUseCase.length}` , clients : returnUseCase});
        }
        catch(err){
            throw err;
        }
     }

    async getOneById(req : Request, res : Response){
        const {ideliverydate} = req.query;
        try{
            if(!ideliverydate) throw "Campo [ID] Obrigatório";
            const returnUseCase = await deliveryDataUseCase.getOneById(ideliverydate?.toString());
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : `Quantidade de Dados de Entrega Retornados : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(err : any){
            return res.status(500).json({success: false, message : err.message, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    // async getOneById(req : Request, res : Response){
    //     const {idClient} = req.query;
    //     try{
    //         if(!idClient) throw "[idClient] Obrigatório";
    //         const returnUseCase = await clientUseCase.getOneById(idClient.toString());
    //         if(returnUseCase.length != 0){
    //             return res.send({success : true, message : "Cliente Encontrado !" , client : returnUseCase});
    //         }
    //         return res.send({success : false, message : "Cliente NÃO Encontrado !" , client : returnUseCase});
    //     }
    //     catch(error){
    //         return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
    //     }
    // }
    // async editClient(req : Request, res : Response){
    //     const {client} = req.body;
    //     try{
    //         if(!client) throw "[Cliente] Obrigatório";
    //         const returnUseCase = await clientUseCase.updateClient(client);
    //         return res.send({success : true, message : "Cliente Editado com Sucesso !" , client : returnUseCase});
    //     }
    //     catch(error){
    //         return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
    //     }
    // }
    async deleteData(req : Request, res : Response){
        const {deliveryDataId} = req.body;
        try{
            if(!deliveryDataId) throw "[ID dos Dados de Entrega] Obrigatório";
            const returnUseCase = await deliveryDataUseCase.deleteDeliveryData(deliveryDataId);
            return res.send({success : true, message : "Dados de Entrega Deletado com Sucesso !" , deliveryDate : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
}
export const deliveryDataController = new DeliveryDataController();