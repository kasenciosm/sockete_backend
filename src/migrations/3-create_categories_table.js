'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "categories", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "create_categories_table",
    "created": "2023-11-08T02:24:16.996Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "categories",
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
            "status": {
                "type": Sequelize.BOOLEAN,
                "field": "status",
                "defaultValue": true
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
