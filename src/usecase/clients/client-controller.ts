import {Request , Response} from 'express';
import { clientUseCase } from './client-usecase';
import { clientValidator } from './client-validator';

class ClientController{

    async insertClient(req : Request, res : Response){
        const {client} = req.body;
        try{
            //Passa pela rotina de validação
            clientValidator.validatingFields(client);
            // se estiver tudo preenchido e tudo ok envia para cadastro

            const returnUseCase = await clientUseCase.insertClient(client);
            // const returnUseCaseCreateLogin = await makingCustomerBecomeUser(client)
            
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : "Cliente cadastrado com sucesso!" , id : returnUseCase});
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async getAllClient(req : Request, res : Response){
        try{
         const returnUseCase = await clientUseCase.getAllClients();
         return res.send({success : true, message : `Clientes encontrados : ${returnUseCase.length}` , clients : returnUseCase});
        }
        catch(err){
            throw err;
        }
     }

    async getOneByStatus(req : Request, res : Response){
        const {status} = req.query;
        try{
            if(!status) throw "Campo [Status] Obrigatório";
            const returnUseCase = await clientUseCase.getOneByStatus(status.toString());
            //prepara o retorno de sucesso para o front-end
            return res.send({success : true, message : `Quantidade de Clientes Retornados : ${returnUseCase.length}` , products : returnUseCase});
        }
        catch(err : any){
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async getOneById(req : Request, res : Response){
        const {iduser} = req.query;
        try{
            if(!iduser) throw "[iduser] Obrigatório";
            const returnUseCase = await clientUseCase.getOneById(iduser.toString());
            if(returnUseCase.length != 0){
                return res.send({success : true, message : "Cliente Encontrado !" , client : returnUseCase});
            }
            return res.send({success : false, message : "Cliente NÃO Encontrado !" , client : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async editClient(req : Request, res : Response){
        const {client} = req.body;
        try{
            if(!client) throw "[Cliente] Obrigatório";
            const returnUseCase = await clientUseCase.updateClient(client);
            return res.send({success : true, message : "Cliente Editado com Sucesso !" , client : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async deleteClient(req : Request, res : Response){
        const {clientId} = req.body;
        try{
            if(!clientId) throw "[ID do Produto] Obrigatório";
            const returnUseCase = await clientUseCase.deleteClient(clientId);
            return res.send({success : true, message : "Cliente Deletado com Sucesso !" , products : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
}
export const clientController = new ClientController();