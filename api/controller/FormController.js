// //require('express');
const querystring = require('querystring'),
    UserService = require("../services/UserService"),
    http = require('http'),
    url = require('url'),
    path = require('path'),
    //  notify = require('../../client/client.js'),
    events = require('events'),
    util = require('util'),
    fs = require('fs');

let jData = fs.readFileSync('list.json');
jData = JSON.parse(jData);
sData = JSON.stringify(jData);

function getList(req, res, next) {
    res.render("dataList", { arr: jData })
}
exports.getList = getList;

function get(req, res, next) {
    res.render("postMessage", { firstName: "TEST" })
}

exports.get = get;

const myEmitter = new events.EventEmitter();
function post(req, res, next) {

    const userInput = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    };

    jData[jData.length] = userInput
    console.log(jData);
    fs.writeFileSync('list.json', JSON.stringify(jData), console.log);
    res.render('success.ejs', { root: __dirname, firstName: req.body.first_name });

}

exports.post = post;


