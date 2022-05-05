import md5 from 'md5';
import {userRepository} from '../../repository/user-repository'

class LoginUseCase{

    public async validateEmailAndPass(email : string , pass : string){
            const userInDb = await userRepository.getOneByEmail(email);
            const user = userInDb[0];
    
            if(user.password === md5(pass)){
                return user;
            }
            else{
               throw "Usuario ou Senha Inválidos !";
            }
    }

}

export const loginUseCase = new LoginUseCase();