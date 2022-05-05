import {createClientAsync} from 'soap';
import frete from 'frete';

class CorreiosService{

    
    private returnServicesAvailable(codeService : string){
        switch(codeService){
            case '04510': 
                return frete.servicos.pac
            case '04014': 
                return frete.servicos.sedex
            // case '40215': 
            //     return frete.servicos.sedex10
            // case '40169':
            //     return frete.servicos.sedex12
            // case '40290': 
            //     return frete.servicos.sedexHoje;
            default : 
            return frete.servicos.pac
        }
    }

    async getServices( req: any , res: any ){
        res.send(frete.codigos)
    }

    async calcPrecoPrazo(req: any, res: any ){
        const { valuesToCalculate } = req.body;
        try{
            const resultsToFrete = await frete()
            .cepOrigem('13221541')
            .servico(this.returnServicesAvailable(valuesToCalculate.code))
            .peso(1)
            .formato(frete.formatos.caixaPacote)
            .comprimento(16)
            .altura(2)
            .largura(11)
            .diametro(1)
            .valorDeclarado(0)
            .maoPropria('N')
            .precoPrazo(valuesToCalculate.cepDestino)
            return res.send({precoPrazo : resultsToFrete[0]});
        }
        catch(err : any){
            res.status(400).send({success : false , error : err.message});
        }
        
    }

}

export const correiosService = new CorreiosService;