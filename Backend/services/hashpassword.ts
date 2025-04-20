 import bcrypt from 'bcrypt';

const hash_password= (password:string)=>{
    
    const hash = bcrypt.hashSync(password, 10)
    return hash
}
export  default hash_password;  //export the function to use it in other files