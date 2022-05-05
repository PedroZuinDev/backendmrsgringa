import { saleRepository } from "../../repository/sale-repository";

class SaleUseCase{

    async insertSale(sale : any , operation:string){
        return await saleRepository.insert(sale);
    }
    async getAllSales(){
        return await saleRepository.getAllSales();
    }
    // async getOneByStatus(status : String){
    //     return await productRepository.getAllByStatus(status)
    // }
    async getOneById(id : string , iduser : string){
        return await saleRepository.getOneById(id , iduser);
    }
    // async updateProduct(product : any){
    //     return await productRepository.update(product);
    // }
    async deleteSaleByID(saleId : string){
        return await saleRepository.delete(saleId);
    }
}

export const saleUseCase = new SaleUseCase();