const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/public/admin-login.html')
});


require('./components/login')(app);
require('./components/post/create-post')(app);
require('./components/post/homepage')(app);
require('./components/post/post-router')(app);

app.listen(3000, function() {
    console.log('Port:3000')
})