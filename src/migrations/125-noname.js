'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "product_prices" from table "carts"
 *
 **/

var info = {
    "revision": 125,
    "name": "noname",
    "created": "2023-11-22T18:37:06.000Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["carts", "product_prices"]
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
