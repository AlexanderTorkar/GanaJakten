const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
    res.sendFile(path.join(__dirname, 'public/css/main.css'));

});

app.listen(1235);