import { PaymentMethod } from './../Global/types/index';
import { Request, Response } from "express";
import Order from "../Model/orderModel";
import OrderDetails from "../Model/orderDetails";
import { IExtendedRequest } from '../Middleware/tokenAuth';
import Payment from '../Model/paymentModel';

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
        })

        //order details 
        products.forEach(function (product) {
           OrderDetails.create({
                quantity: product.productQty,
                productId: product.productId,
                oderId:oderData.id,
            })
        })

        //payment 
        if(paymentMethod==PaymentMethod.COD)
        {
            await Payment.create({
                orderId:oderData.id,
                paymentMethod:paymentMethod
            })


        }else if(paymentMethod== PaymentMethod.Esewa)
        {

            //esewa

        }else if (paymentMethod== PaymentMethod.Khalti){
            //khalti

        }
            
        




    }



}
export default orderController;