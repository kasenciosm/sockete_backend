import { Router } from 'express';
import { models } from '../../infrastructure/models';
import { ProductService } from './productsService';
import { ProductController } from './productsController';
import { isAuthenticated } from '../../middlewares/authenticationMiddleware';

class ProductRouter {
    constructor() {
        this.router = Router()
        this.service = new ProductService(models);
        this.controller = new ProductController(this.service);
    }

    init() {
        // this.router.use(isAuthenticated)
        return this.router
            .get('/', (req, res) => this.controller.getAllProducts(req, res))
            .post('/', (req, res) => this.controller.createProduct(req, res))
            .get('/:id', [isAuthenticated], (req, res) => this.controller.getProductById(req, res))
            .patch('/:id', (req, res) => this.controller.updateProduct(req, res))
            .delete('/:id', (req, res) => this.controller.deleteProduct(req, res))
    }
}

export default new ProductRouter()