const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/create', (req, res, next) =>{

    res.sendFile(path.join(__dirname,'..','views','create.html'));
});

router.post('/add', (req, res, next) =>{
    
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () =>{
        const parseBody = Buffer.concat(body).toString();
        const username = parseBody.split('=')[1] + '\n';

        fs.appendFile('username.txt', username, (err) => {
            res.statusCode = 302;
            return res.end();
        });
    });

    res.redirect('/');
});

module.exports = router;