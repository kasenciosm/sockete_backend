import { CategoryInterface } from "./categoriesInterface";

export class CategoryService extends CategoryInterface {
    constructor(categoryModel) {
        super();
        this.categoryModel = categoryModel;
    }

    async getAll() {
        return await this.categoryModel.findAll();
    }

    async getById(id) {
        return await this.categoryModel.findOne({ where: id });
    }

    async create(body) {
        return await this.categoryModel.create(body);
    }

    async update(id, body) {
        const category = await this.getById(id);
        if (category) {
            await category.update(body);
        }
        return category;
    }

    async delete(id) {
        const category = await this.getById(id);
        if (category) {
            await category.destroy();
        }
        return category;
    }
}