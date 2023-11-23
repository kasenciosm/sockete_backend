export class OrderController {
    constructor(orderService) {
        this.orderService = orderService
    }

    async getAllCartProducts(req, res) {
        return res.json(await this.orderService.getAll())
    }
}

export default new OrderController()