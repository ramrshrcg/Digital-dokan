import User from "../Model/userModel"
import hash_password from "../services/hashpassword";

const adminSeeder = async () => {

    const [data] = await User.findAll({
        where:{
        email: "admin@gmail.com",
        }
    })
    if (!data) {
        await User.create({
            username: "admin",
            email: "admin@gmail.com",
            password: hash_password('admin@123'),
            role: "admin"
        })
        console.log('admin seeded');
    }else{
        console.log('admin already seeded');
    }
}
export default adminSeeder;