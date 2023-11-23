import { ProductInterface } from "./productsInterface";

export class ProductService extends ProductInterface {
    constructor(models) {
        super();
        this.productModel = models.products;
        this.categoryModel = models.categories;
    }

    async getAll() {
        return await this.productModel.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at', 'category_id', 'cart_id', 'status']
            },
            where: {
                status: true,
            },
            order: [['id', 'ASC']],
            include: {
                model: this.categoryModel,
                attributes: {
                    exclude: ['status', 'created_at', 'updated_at']
                }
            }
        });
    }

    async getById(id) {
        return await this.productModel.findOne({
            where: id,
            attributes: {
                exclude: ['created_at', 'updated_at', 'category_id', 'cart_id', 'status']
            },
        },

        );
    }

    async create(body) {
        return await this.productModel.create(body);
    }

    async update(id, body) {
        const product = await this.getById(id);
        if (product) {
            await product.update(body);
        }
        return product;
    }

    async delete(id) {
        const product = await this.getById(id);
        if (product) {
            await product.destroy();
        }
        return product;
    }
}