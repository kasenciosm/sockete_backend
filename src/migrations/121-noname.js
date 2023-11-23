'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "order_number" to table "carts"
 *
 **/

var info = {
    "revision": 121,
    "name": "noname",
    "created": "2023-11-20T17:27:18.415Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "carts",
        "order_number",
        {
            "type": Sequelize.INTEGER,
            "field": "order_number"
        }
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
