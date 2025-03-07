import User from '../Model/userModel';
import { envConfig } from './../config/envConfig';
import { Sequelize } from "sequelize-typescript";


const sequalize  = new Sequelize (`${envConfig.db}`,{
    models:[User]
}) 

// const sequalize = new Sequelize(envConfig.db as string,{
//     models : [__dirname + '/models']
// })
try {
    sequalize.authenticate().then(()=>
    {
        console.log("connected  to sequalize")

    }).catch(err=>{
        console.log('not connected ', err)
    })

    
} catch (error) {
    console.log(error);
}

export default sequalize;  
