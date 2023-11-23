import { Router } from "express";
import { models } from '../../infrastructure/models'
import { AuthService } from './authService'
import { UserPasswordService } from '../users/usersPasswordService'
import { UserService } from '../users/usersService'
import { AuthController } from './authController'

class AuthRouter {
    constructor() {
        this.router = Router()
        this.model = models.users
        this.servicePassword = new UserPasswordService()
        this.serviceUser = new UserService(models, this.servicePassword)
        this.service = new AuthService(
            this.model,
            this.servicePassword,
            this.serviceUser
        )
        this.controller = new AuthController(this.service)
    }

    init() {
        return this.router
            .post("/signin", (req, res) => this.controller.login(req, res))
            .post("/signup", (req, res) => this.controller.register(req, res))
            .post("/token/refresh", (req, res) =>
                this.controller.refreshAccess(req, res)
            );
    }
}

export default new AuthRouter()