import {Request , Response} from 'express';
import { saleUseCase } from './sale-usecase';


class SaleController{

    async createNewSale(req : Request, res : Response){
        const {sale} = req.body;
        const operation = sale.id ? "edit" : "insert";
        try{
            const returnUseCase = await saleUseCase.insertSale(sale , operation);
            return (operation === "edit" ? 
            res.send({success : true, message : "Venda Editada com sucesso!" , id : returnUseCase}) : 
            res.send({success : true, message : "Venda Registrada com Sucesso!" , id : returnUseCase}));
        }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
            }
        }
        
        async getAllSales(req : Request, res : Response){
            try{
                const returnUseCase = await saleUseCase.getAllSales();
                res.send({success : true, message : "Vendas Encontradas!" , sales : returnUseCase});
           }
           catch(err : any){
               return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
           }
    }

    async editSaleToDeliveryData(req : Request, res : Response){
        try{
 
            const { newDeliveryData } = req.body;
            let returnUseCase = await saleUseCase.getOneById(newDeliveryData.idsale , newDeliveryData.iduser);
            if(returnUseCase.length !== 0){
                returnUseCase[0].deliveryData = newDeliveryData;
                if(newDeliveryData.frete.valor){
                    let valueToAdd = newDeliveryData.frete.valor.replace(',' , '.');
                    returnUseCase[0].subTotal = (returnUseCase[0].subTotal + parseFloat(valueToAdd));
                    returnUseCase[0].total = (returnUseCase[0].total + parseFloat(valueToAdd));
                }
            }
            const returnUseCaseEdit = await saleUseCase.insertSale(returnUseCase[0] , 'edit');
            res.send({success : true, message : "Venda Atualizada com Sucesso" , sales : returnUseCaseEdit});
       }
       catch(err : any){
           console.log(err)
           return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
       }
    }

    async editSaleToPaymentData(req : Request, res : Response){
        try{
            const { newPaymentData } = req.body;
            let returnUseCase = await saleUseCase.getOneById(newPaymentData.idsale , newPaymentData.iduser);
            if(returnUseCase.length !== 0){
                returnUseCase[0].paymentData = newPaymentData;
            }
            const returnUseCaseEdit = await saleUseCase.insertSale(returnUseCase[0] , 'edit');
            res.send({success : true, message : "Venda Atualizada com Sucesso" , sales : returnUseCaseEdit});
       }
       catch(err : any){
           console.log(err)
           return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
       }
    }

    // async getOneByStatus(req : Request, res : Response){
    //     const {status} = req.query;
    //     try{
    //         if(!status) throw "Campo [Status] Obrigatório";
    //         const returnUseCase = await productsUseCase.getOneByStatus(status.toString());
    //         //prepara o retorno de sucesso para o front-end
    //         return res.send({success : true, message : `Quantidade de Produtos Retornados : ${returnUseCase.length}` , products : returnUseCase});
    //     }
    //     catch(err : any){
    //         return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
    //     }
    // }
    async getOneById(req : Request, res : Response){
        const {idsale , iduser} = req.query;
        try{
            if(!idsale) throw "[idsale] Obrigatório";
            if(!iduser) throw "[iduser] Obrigatório";
            const returnUseCase = await saleUseCase.getOneById(idsale.toString() , iduser.toString());
            if(returnUseCase.length != 0){
                return res.send({success : true, message : `Venda Encontrada !` , sale : returnUseCase});
            }
            else{
                return res.send({success : false, message : `Venda Não Encontrada` , products : returnUseCase});
            }
        }
        catch(error: any){
            return res.status(500).json({success: false, message : error.message, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
    // async editProduct(req : Request, res : Response){
    //     const {product} = req.body;
    //     try{
    //         if(!product) throw "[Produto] Obrigatório";
    //         const returnUseCase = await productsUseCase.updateProduct(product);
    //         return res.send({success : true, message : "Produto Editado com Sucesso !" , products : returnUseCase});
    //     }
    //     catch(error){
    //         return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
    //     }
    // }
    async deleteSaleByID(req : Request, res : Response){
        const {idsale} = req.body;
        try{
            if(!idsale) throw "[ID DA VENDA] Obrigatório";
            const returnUseCase = await saleUseCase.deleteSaleByID(idsale);
            return res.send({success : true, message : "Venda Deletada com Sucesso !" , sale : returnUseCase});
        }
        catch(error){
            return res.json({success: false, message : error, dateNow : new Date().toLocaleString('pt-br')})
        }
    }
}
export const saleController = new SaleController();