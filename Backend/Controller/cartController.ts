import { Request, Response } from "express";
import { IExtendedRequest } from "../Middleware/tokenAuth";
import CartModel from "../Model/cartModel";
import Product from "../Model/productModel";

class cartController {
    static async addToCart(req: IExtendedRequest, res: Response) {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const userId = req.user?.id;


        //chheck if the product is already in the cart
        const existingCartItem = await CartModel.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        });
        // console.log("the existing data is",existingCartItem);

        if (existingCartItem) {
            existingCartItem.quantity = Number(existingCartItem.quantity) + Number(quantity);//it adds strinds like '1' + '1' = '11'so correct it
            await existingCartItem.save();
            return res.status(200).json({ message: "Cart updated successfully", data: existingCartItem });
        }
        // If the product is not in the cart, create a new cart item
        const cartData = await CartModel.create({
            userId: userId,
            productId: productId,
            quantity: quantity,
        })

        if (!cartData) {
            return res.status(400).json({ message: "Failed to add to cart" });
        }
        return res.status(200).json({ message: "Added to cart successfully", data: cartData });
    }

    static async getCartItems(req: IExtendedRequest, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const cartItems = await CartModel.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "productName", "productPrice", "productImageUrl"],
                },
            ],
        });

        if (!cartItems) {
            return res.status(400).json({ message: "Failed to retrieve cart items" });
        }
        return res.status(200).json({ message: "Cart items retrieved successfully", data: cartItems });
    }

    static async deleteFromCart(req: IExtendedRequest, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Cart ID is required" });
        }

        const cartItem = await CartModel.findOne({
            where: {
                id: id,
                userId: req.user?.id,
            },
        });

        if (!cartItem) {
            return res.status(400).json({ message: "Cart item not found" });
        }

        await cartItem.destroy()
    

        return res.status(200).json({ message: "Cart item removed successfully" });
    }

    static async updateCartItem(req: IExtendedRequest, res: Response) {

        const { id } = req.params;
        const { quantity } = req.body;

        if (!id || !quantity) {
            return res.status(400).json({ message: "Cart ID and quantity are required" });
        }

        const cartItem = await CartModel.findOne({
            where: {
                id: id,
                userId: req.user?.id,
            },
        });

        if (!cartItem) {
            return res.status(400).json({ message: "Cart item not found" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({ message: "Cart item updated successfully", data: cartItem });
    }
    static async clearCart(req: IExtendedRequest, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        await CartModel.destroy({
            where: {
                userId: userId,
            },
        });

        return res.status(200).json({ message: "Cart cleared successfully" });
    }
}
export default cartController