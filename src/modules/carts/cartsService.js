import { CartInterface } from "./cartsInterface"
import { CartNotFound } from "./cartsException"

export class CartService extends CartInterface {
    constructor(models) {
        super()
        this.cartModel = models.carts
        this.userModel = models.users
        this.productModel = models.products
    }

    async getAll() {
        return await this.cartModel.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            where: {
                status: true,
            },
            include: [
                {
                    model: this.userModel,
                    attributes: ['name', 'last_name']
                }
            ]
        })
    }

    async getById(order_number) {
        return await this.cartModel.findOne({
            where: { order_number: order_number },
            include: [
                {
                    model: this.userModel,
                    attributes: ['name', 'last_name']
                }
            ],
            attributes: {
                exclude: ['status', 'updated_at']
            }
        })
    }


    async create(body) {
        return await this.cartModel.create(body)
    }

    async update(id, body) {
        const cart = await this.getById(id)
        if (cart) {
            await cart.update(body)
        }
        return cart
    }

    async delete(id) {
        const cart = await this.getById(id)
        if (!cart) {
            throw new CartNotFound()
        }
        await cart.destroy()
        return cart
    }
}