class ClientValidator{

    validatingFields(client : any) {
        if(!client.name)throw "Campo [Name] Obrigatório";
        else if(!client.status)throw "Campo [Status] Obrigatório";
        else if(!client.lastname)throw "Campo [Sobrenome] Obrigatório";
        else if(!client.email)throw "Campo [E-mail] Obrigatório";
        else if(!client.cellphone)throw "Campo [Numero do Celular] Obrigatório";
        else if(!client.surname)throw "Campo [Apelido] Obrigatório";
        else if(!client.avatar)throw "Campo [Avatar] Obrigatório";
        else if(!client.status)throw "Campo [Status] Obrigatório";
        else{return true;}
    } 

}

export const clientValidator = new ClientValidator();