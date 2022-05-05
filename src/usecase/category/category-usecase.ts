import { categoryRepository } from "../../repository/category-repository";

class CategoryUseCase{

    async getAllCategory(){
        return await categoryRepository.getAll();
    }
    async getOneByStatus(status : String){
        return await categoryRepository.getAllByStatus(status)
    }
    async getOneById(id : string){
        return await categoryRepository.getOneById(id);
    }
    async insertCategory(category : any){
        return await categoryRepository.insert(category);
    }
    async updateCategory(category : any){
        return await categoryRepository.update(category);
    }
    async deleteCategory(categoryId : string){
        return await categoryRepository.delete(categoryId);
    }
}

export const categoryUseCase = new CategoryUseCase();