import { verifyToken } from "../../utils/jwtUtil";
import { isAuthenticated } from "../../middlewares/authenticationMiddleware";

export class ProductController {
    constructor(productService) {
        this.productService = productService
    }

    async getAllProducts(req, res) {
        return res.json(await this.productService.getAll());

    }


    async getProductById(req, res) {
        const productId = req.params.id;
        const product = await this.productService.getById(parseInt(productId));
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        };
        return res.json(product);
    }

    async createProduct(req, res) {
        try {
            const { cart_id, ...productData } = req.body
            const product = await this.productService.create({
                ...productData,
                cart_id: cart_id
            })
            return res.status(201).json(product)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.id;
        const product = await this.productService.update(parseInt(productId), req.body);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        };

        return res.json(product);
    }

    async deleteProduct(req, res) {
        const productId = req.params.id;
        const deleted = await this.productService.delete(parseInt(productId));
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        res.status(204).send('');
    }
}

export default new ProductController();