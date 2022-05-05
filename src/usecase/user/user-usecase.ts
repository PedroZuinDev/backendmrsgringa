import { userRepository } from "../../repository/user-repository";

class UserUseCase{

    async createUser(user:  any , operation : string){
        return userRepository.upsert(user);
    }
}

export const userUseCase = new UserUseCase();