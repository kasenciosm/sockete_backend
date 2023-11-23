import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';
import config from '../../config/sequelizeConfig'

const models = {};
const sequelize = new Sequelize(config.development)

const modulesDir = path.join(__dirname, '..', '..', 'modules');
const modulesFolders = fs.readdirSync(modulesDir).filter((folder) =>
    fs.statSync(path.join(modulesDir, folder)).isDirectory());

modulesFolders.forEach((folder) => {
    const routeFile = path.join(modulesDir, folder, `${(folder)}Model.js`)
    if (fs.existsSync(routeFile)) {
        const importModel = require(path.resolve(routeFile));
        models[folder] = importModel.default.init(sequelize);
    }
});

Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

export { models, sequelize }
