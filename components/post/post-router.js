var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var connection = require('../../config/db');
var date = require('date-and-time');
const { response } = require('express');

module.exports = function(app) {

    app.use('/posts', express.static(path.join(__dirname, 'posts')));

        connection.query("SELECT post_url FROM posts", function (err, result, fields) {
        app.get('/posts/:postName' , (req, res, err)=> {
            var sPostName = req.params.postName;
            res.sendFile(path.resolve('C:/Users/ilter/Desktop/Node Blog/posts/' + sPostName + '.html')) 
            
        })        
    });

    app.get('/posts',(req, res)=>{
        res.send('')
    });
}