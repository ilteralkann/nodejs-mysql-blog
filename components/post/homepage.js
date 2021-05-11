var bodyParser = require('body-parser')
var connection = require('../../config/db');
var date = require('date-and-time');
const { response } = require('express');

module.exports = function(app) {
    app.get('/' ,(req, res)=>{
        res.setHeader('Content-type', 'text/html; charset="utf-8"');
            connection.query("SELECT * FROM posts", function (err, result, fields) {
              if (err) throw err;
              res.write(`
              <title>Node Blog</title>
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Sora', sans-serif;
                  text-align : center;
                }

                a {
                  text-decoration: none;
                  font-size: 14px
                }

                h1 {
                  font-size: 48px
                }

                p {
                  font-size: 14px
                }

                .rd_time {
                  font-size: 12px
                }
              </style>
                <br> <br>
                <h1>İlter A.</h1>
                <a href="Twitter">Twitter</a> &nbsp; <a href="Linkedin">Linkedin</a> &nbsp; <a href="Instagram">Instagram</a> <br> <br> <br> <br>
              `)

              if (result == "") {
                res.write('<i>No posts shared yet.</i>')
              } else {
                for (const posts of result.reverse()) {
                  res.write('<hr>')
                  res.write('<b><a href="/posts/'+posts.post_url+'"><h2> ' + posts.title + '</h2></a> </b> ');
                  res.write('<i><p style="font-size:12px"> ' + posts.post_date + ' </i> - Reading Time: ' + posts.read_time + `</p>`);
                  res.write('<hr>')
              };
              }


              res.end();    
            });
    })  
}