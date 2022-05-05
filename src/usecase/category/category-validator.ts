class CategoryValidator{

    validatingFields(category : any) {
        if(!category.name)throw "Campo [Name] Obrigatório";
        else if(!category.status)throw "Campo [Status] Obrigatório";
        else if(!category.description)throw "Campo [Descrição] Obrigatório";
        else if(!category.type)throw "Campo [Tipo] Obrigatório";
        else{return true;}
    } 

}

export const categoryValidator = new CategoryValidator();