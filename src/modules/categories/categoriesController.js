export class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService
    }

    async getAllCategories(req, res) {
        return res.json(await this.categoryService.getAll());
    }

    async getCategoryById(req, res) {
        const categoryId = req.params.id;
        const category = await this.categoryService.getById(parseInt(categoryId));
        if (!category) {
            return res.status(404).json({ message: 'Categoria no encontrada' })
        };
        return res.json(category);
    }

    async createCategory(req, res) {
        const category = await this.categoryService.create(req.body)
        return res.status(201).json(category);
    }

    async updateCategory(req, res) {
        const categoryId = req.params.id;
        const category = await this.categoryService.update(parseInt(categoryId), req.body);
        if (!category) {
            return res.status(404).json({ message: 'Categoria no encontrada' })
        };

        return res.json(category);
    }

    async deleteCategory(req, res) {
        const categoryId = req.params.id;
        const deleted = await this.categoryService.delete(parseInt(categoryId));
        if (!deleted) {
            return res.status(404).json({ message: 'Categoria no encontrada' })
        }
        res.status(204).send('');
    }
}

export default new CategoryController();