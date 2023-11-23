import { Router } from "express";
import { models } from "../../infrastructure/models";
import { CartService } from "./cartsService";
import { CartController } from "./cartsController";
import { isAuthenticated } from '../../middlewares/authenticationMiddleware';


class CartRouter {
    constructor() {
        this.router = Router()
        this.service = new CartService(models)
        this.controller = new CartController(this.service)
    }

    init() {
        return this.router
            .get('/', (req, res) => this.controller.getAllCarts(req, res))
            .post('/', (req, res) => this.controller.createCart(req, res))
            .get('/:id', (req, res) => this.controller.getCartById(req, res))
            .get('/:order_number', (req, res) => this.controller.getCartByOrderId(req, res))
            .patch('/:id', (req, res) => this.controller.updateCart(req, res))
            .delete('/:id', (req, res) => this.controller.deleteCart(req, res))
    }
}

export default new CartRouter()