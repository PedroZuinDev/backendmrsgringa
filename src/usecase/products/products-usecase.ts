import { productRepository } from "../../repository/product-repository";

class ProductUseCase{

    async getAllProducts(){
        return await productRepository.getAll();
    }
    async getOneByStatus(status : String){
        return await productRepository.getAllByStatus(status)
    }
    async getOneById(id : string){
        return await productRepository.getOneById(id);
    }
    async insertProduct(product : any){
        return await productRepository.insert(product);
    }
    async updateProduct(product : any){
        return await productRepository.update(product);
    }
    async deleteProduct(productId : string){
        return await productRepository.delete(productId);
    }
    async getAllByCategory(idcategory : string) {
        return await productRepository.getAllByCategory(idcategory);
    }
    async getAllByPromotion() {
        return await productRepository.getAllByPromotion();
    }
}

export const productsUseCase = new ProductUseCase();