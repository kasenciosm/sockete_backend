import { Router } from 'express';
import { models } from '../../infrastructure/models'
import { CategoryService } from './categoriesService';
import { CategoryController } from './categoriesController';

class CategoryRouter {
    constructor() {
        this.router = Router()
        this.model = models.categories;
        this.service = new CategoryService(this.model);
        this.controller = new CategoryController(this.service);
    }

    init() {
        // this.router.use(isAuthenticated)
        return this.router
            .get('/', (req, res) => this.controller.getAllCategories(req, res))
            .post('/', (req, res) => this.controller.createCategory(req, res))
            .get('/:id', (req, res) => this.controller.getCategoryById(req, res))
            .patch('/:id', (req, res) => this.controller.updateCategory(req, res))
            .delete('/id', (req, res) => this.controller.deleteCategory(req, res))
    }
}

export default new CategoryRouter()