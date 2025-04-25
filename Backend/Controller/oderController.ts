import { PaymentMethod } from './../Global/types/index';
import { Request, Response } from "express";
import Order from "../Model/orderModel";
import OrderDetails from "../Model/orderDetails";
import { IExtendedRequest } from '../Middleware/tokenAuth';
import Payment from '../Model/paymentModel';
import axios from 'axios';

interface Iproduct {
    productId: string,
    productQty: string
}
class orderController {

    static async createOrder(req: IExtendedRequest, res: Response) {

        const user = req.user;

        const { phoneNumber, shippingAddress, totalAmount, quantity, paymentMethod } = req.body
        const products: Iproduct[] = req.body.products

        if (!phoneNumber || !totalAmount || !quantity || products.length == 0 || !shippingAddress||!paymentMethod) {
            res.status(400).json({
                Message: "please enter phno, total amt, qty, shipping address and select at least one product" +"payment method"
            })
            return
        }

        const oderData = await Order.create({
            phoneNumber: phoneNumber,
            totalAmount,
            AddressLine: shippingAddress,
            userId:user?.id
        })
        // console.log(oderData);
        //order details 
        products.forEach(function (product) {
           OrderDetails.create({
                quantity: product.productQty,
                productId: product.productId,
                orderId:oderData.dataValues.id,
            })
        })

       

        //payment 

       const paymentData= await Payment.create({
            orderId:oderData.id,
            paymentMethod:paymentMethod
        })
       if(paymentMethod== PaymentMethod.Esewa)
        {

            //esewa

        }else if (paymentMethod== PaymentMethod.Khalti){
            //khalti
            const data = {
                return_url:"http://localhost/",
                website_url	:"http://localhost/",
                amount:totalAmount*100,
                purchase_order_id:oderData.id,
                purchase_order_name: "order_"+oderData.id,
            }
           const response= await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
                headers:{
                    Authorization:"key 0382de58480044cfa86185b5f2b785de"
                }
            

            })
            // console.log(response.data);
            const khaltiResponse= response.data

            paymentData.pidx= khaltiResponse.pidx;
            paymentData.save()

            // res.redirect(khaltiResponse.payment_url)

            res.status(200).json({
                message:"order created sucessfully",
                khaltiResponse
            })


        }
    }



}
export default orderController;