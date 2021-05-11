const bodyParser = require("body-parser");

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/post-panel', (req, res)=>{
        const {username, pass} = req.body;
        
        if (username == "admin" && pass == "123" ) {
            res.sendFile(__dirname + '/admin.html')
        } else {
            res.send('Error!');
        }

    })
}