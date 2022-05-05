import {Request , Response} from 'express';
import { paymentDataUseCase } from './payment-data-usecase';

class PaymentDataController{

    async insertPaymentData(req : Request, res : Response){
           try{
            const { paymentData } = req.body;
            const operation = paymentData.id ? "edit" : "insert";
            const returnUseCase = await paymentDataUseCase.savePaymentData(paymentData);
            return (operation === "edit" ? 
            res.send({success : true, message : "Dados de Pagamento Editado com Sucesso!" , id : returnUseCase}) : 
            res.send({success : true, message : "Dados de Pagamento Criado com Sucesso!" , id : returnUseCase}));
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async getAllPaymentData(req : Request, res : Response){
        try{
         const returnUseCase = await paymentDataUseCase.getAll();
         return res.send({success : true, message : `Dados de Pagamentos encontrados : ${returnUseCase.length}` , clients : returnUseCase});
        }
        catch(err){
            throw err;
        }
     }
    async getOneById(req : Request, res : Response){
        const {idpaymentdata} = req.query;
        try{
            if(!idpaymentdata) throw "[idpaymentdata] Obrigatório";
            const returnUseCase = await paymentDataUseCase.getOneById(idpaymentdata.toString());
            if(returnUseCase.length != 0){
                return res.send({success : true, message : "Forma de Pagamento Encontrada !" , paymentData : returnUseCase});
            }
            return res.send({success : false, message : "Forma de Pagamento NÃO Encontrada !" , paymentData : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    async deletePaymentData(req : Request, res : Response){
        const {idpaymentdata} = req.body;
        try{
            if(!idpaymentdata) throw "[idpaymentdata] Obrigatório";
            const returnUseCase = await paymentDataUseCase.deletePaymentData(idpaymentdata);
            return res.send({success : true, message : "Forma de Pagamento Deletada com Sucesso !" , paymentData : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

    // async getOneByStatus(req : Request, res : Response){
    //     const {status} = req.query;
    //     try{
    //         if(!status) throw "Campo [Status] Obrigatório";
    //         const returnUseCase = await clientUseCase.getOneByStatus(status.toString());
    //         //prepara o retorno de sucesso para o front-end
    //         return res.send({success : true, message : `Quantidade de Clientes Retornados : ${returnUseCase.length}` , products : returnUseCase});
    //     }
    //     catch(err : any){
    //         return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
    //     }
    // }
    
}
export const paymentDataController = new PaymentDataController();