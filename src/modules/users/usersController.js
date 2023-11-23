
export class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async getAllUsers(req, res) {
        return res.json(await this.userService.getAll());
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userService.getById(parseInt(userId));
            return res.json(user);
        } catch (e) {
            return res.status(e.code).json({ message: e.message })

        }
    }

    async createUser(req, res) {
        const user = await this.userService.create(req.body)
        return res.status(201).json(user);
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userService.update(parseInt(userId), req.body);
            return res.json(user);
        } catch (e) {
            return res.status(e.code).json({ message: e.message })
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await this.userService.delete(parseInt(userId));
            res.status(204).send('');
        } catch (er) {
            return res.status(e.code).json({ message: e.message })
        }
    }
}
