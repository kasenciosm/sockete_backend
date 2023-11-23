'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "products", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "create_products_table",
    "created": "2023-11-07T23:30:35.443Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "products",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name"
            },
            "description": {
                "type": Sequelize.STRING,
                "field": "description"
            },
            "price": {
                "type": Sequelize.FLOAT,
                "field": "price"
            },
            "image": {
                "type": Sequelize.STRING,
                "field": "image"
            },
            "category_id": {
                "type": Sequelize.INTEGER,
                "field": "category_id"
            },
            "status": {
                "type": Sequelize.BOOLEAN,
                "field": "status"
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
