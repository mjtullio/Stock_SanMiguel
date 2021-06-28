import Jwt  from 'jsonwebtoken';

class Token {
    private static seed:string= 'estaEsElSeed';
    private static caducidad:string = '1d';

    constructor(){}

    static getToken(payload:any):any{
        return Jwt.sign({
            usuario:payload
        },
        this.seed,{
            expiresIn: this.caducidad
        })

    }

    static checkToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            Jwt.verify(token, this.seed,(error,decode)=>{
                if(error){
                    return reject(error)
                }else{
                    return resolve(decode)
                }
            })
        })
    }
}

export default Token;