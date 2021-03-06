const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/users', (req, res, next) => {

    fs.access('./username.txt', fs.constants.F_OK, (err) => {

        if(err)
        res.sendFile(path.join(__dirname, '../', 'views', 'greet.html'));
        else{
            const users = [];
            let idx = 0;
            fs.readFile('username.txt', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
                        
            users.push(...data.toString().split('\n'));
            users.pop();
               
            res.write('<html>');
            res.write('<head>');
            res.write('<title>User Info</title>');
            res.write('<link rel="stylesheet" href="/css/nav.css">');
            res.write('<link rel="stylesheet" href="/css/users.css">');
            res.write('</head>');
            res.write('<body>');
            res.write('<header class="main-header">');
            res.write('<nav class="main-header_nav">');
            res.write('<ul class="main-header_list">');
            res.write('<li class="main_header_list-item"><a href="./" title="greetings">Greetings</a></li>');
            res.write('<li class="main_header_list-item"><a href="./create" title="create username">Create</a></li>');
            res.write('<li class="main_header_list-item"><a href="./users" title="show username">Users</a></li>');
            res.write('</ul>');
            res.write('</nav>');
            res.write('</header>');
            res.write('<main class="in-main">');
            res.write('<p>User Information</p>');
            res.write('<div class="in-main_table">');
            res.write('<table cellpadding="6px">');
            res.write('<thead>');
            res.write('<tr><td class="main_th1">S.No</td><td class="main_th2">Usernames</td> </tr>')
            res.write('</thead>');
            res.write('<tbody>');   
            for(const user of users){ 
                res.write('<tr>'); 
                res.write(`<td class="main_td1">${++idx}</td>`);
                res.write(`<td class="main_td2">${user}</td>`); 
                res.write('</tr>'); 
            }
            res.write('</tbody>');  
            res.write('</table>');
            res.write('<div>');
            res.write('</main>');
            res.write('</body>');
            res.write('</html>');
            return res.end();});
        }
    });
});

module.exports = router;