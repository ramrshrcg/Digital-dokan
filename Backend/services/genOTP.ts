

const otpgenerate= ()=>
{
    //create 6 digit ramdom otp
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;

}
export default otpgenerate