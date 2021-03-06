const express = require('express');
const path = require('path');

const greetRoute = require('./routes/greet');
const createRoute = require('./routes/create');
const usersRoute = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(greetRoute);
app.use(createRoute);
app.use(usersRoute);

app.use((req, res, next) => {

    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);