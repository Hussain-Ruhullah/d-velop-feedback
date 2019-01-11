const express = require('express');
const router = express.Router();
//CRUD Operations

//Create a new User to db
router.post('/index', function(req, res){
    console.log(req.body);
    res.send({type:'POST'})
})
// upgrate a user in the db
router.put('/index/:id', function(req, res){
    res.send({type:'PUT'})
})
// Delete a user from db
router.delete('/index/:id', function(req, res){
    res.send({type:'DELETE'})
})

module.exports = router;