'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_id" from table "users"
 *
 **/

var info = {
    "revision": 7,
    "name": "add_fields_products_table",
    "created": "2023-11-15T16:12:18.183Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["users", "user_id"]
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
