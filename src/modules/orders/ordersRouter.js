import { Router } from "express";
import { models } from "../../infrastructure/models";
import { OrderService } from "./ordersService";
import { OrderController } from "./ordersController";

class ProductCartRouter {
    constructor() {
        this.router = Router()
        this.service = new OrderService(models)
        this.controller = new OrderController(this.service)
    }

    init() {
        return this.router
            .get('/order/:orderId', (req, res) => this.controller.getCartByOrderId(req, res))
    }
}

export default new ProductCartRouter()