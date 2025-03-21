import nodemailer from 'nodemailer'
import { envConfig } from '../config/envConfig'

interface IData {
    to: string,
    subject: string,
    text: string,

}

const sendmail = async (data: IData) => {

    console.log(data);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: envConfig.app_email,
            pass: envConfig.app_password,
        }
    })
    const mailOption = {
        from: "Digital Dokan<dptest123@gmail.com>",
        to: data.to,
        subject: data.subject,
        text: data.text,

    }
    try {
        await transporter.sendMail(mailOption)
    }
    catch (err) {
        console.log(err)
    }

}

export default sendmail; 