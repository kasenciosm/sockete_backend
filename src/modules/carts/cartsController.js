
export class CartController {
    constructor(cartService, productService) {
        this.cartService = cartService
        this.productService = productService
    }

    async getAllCarts(req, res) {
        return res.json(await this.cartService.getAll())
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.id
            const cart = await this.cartService.getById(parseInt(cartId))
            return res.json(cart)
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }

    async getCartByOrderId(req, res) {
        try {
            const { order_number } = req.params
            const order = await this.cartService.getById(parseInt(order_number))
            return res.json(order)
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }

    async createCart(req, res) {
        try {
            const { user_id, products, order_number, product_prices, total_price } = req.body
            const cart = await this.cartService.create({
                user_id: user_id,
                order_number: order_number,
                product_details: products,
                product_prices: product_prices,
                total_price: total_price
            })

            return res.status(201).json(cart)
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }

    async updateCart(req, res) {
        try {
            const cartId = req.params.id
            const cart = await this.cartService.getById(parseInt(cartId), req.body)
            return res.json(cart)
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }

    async deleteCart(req, res) {
        try {
            const cartId = req.params.id;
            await this.cartService.delete(parseInt(cartId));
            res.status(204).send('');
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }
}