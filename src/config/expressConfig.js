import express from 'express'
import bodyParser from 'body-parser'
import { errors } from 'celebrate';
import routers from '../infrastructure/routers'
import cors from 'cors'

export class ExpressConfig {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this._setMiddleware();
        this._setRouters()
    }

    _setMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    _setRouters() {
        routers(this.app)
        this.app.use(errors())
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Express is listening on PORT ${this.port}`);
        })
    }
}