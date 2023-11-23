'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "order_number" from table "carts"
 *
 **/

var info = {
    "revision": 118,
    "name": "noname",
    "created": "2023-11-20T16:30:41.545Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["carts", "order_number"]
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
