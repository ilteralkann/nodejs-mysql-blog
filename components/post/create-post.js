var bodyParser = require('body-parser')
var connection = require('../../config/db');
var date = require('date-and-time');
var fs = require('fs');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/create-post', (req, res)=>{
        const {title, content, maxread, verify, postUrl} = req.body;

        var postDate = date.format(new Date(), 'DD-MM-YYYY');
        var postMaxRead =  maxread + 'min'
        var postData = [title, postMaxRead, postDate, content, postUrl];

        if (verify == "123") {
        let sqlParam = `INSERT INTO posts VALUES(?, ?, ?, ?, ?, NULL);`;

            connection.query(sqlParam, postData, function (err, results) {
                if (err) throw err.message;
                console.log('New post published!');
                res.send('New post published! => <a href="/posts/'+postUrl+'">Here.</a>' )
            });

            var postFileHeader = `
            <title>Post: `+title+`</title>
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
            ` + ` <h2>`+title + `</h2> <i><p style="font-size:12px">  `+postDate +`  </i> - Reading Time:  `+postMaxRead+` </p> <br> <hr>`

            fs.writeFile('C:/Users/ilter/Desktop/Node Blog/posts/' +postUrl + '.html', postFileHeader + content, function (err, data) {
                if (err) throw err;
              });

        } else {
            res.send('Verify code is wrong!');
        }

    })
}