import Jwt  from 'jsonwebtoken';

class Token {
    private static seed:string= 'estaEsElSeed';
    private static caducidad:string = '20s';

    constructor(){}

    static getToken(payload:{}):string{
        const token =  Jwt.sign({
            usuario:payload
        },
        this.seed,
        {expiresIn: this.caducidad}
        )
        return token;
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

export {Token};