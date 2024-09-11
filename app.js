const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.post('/signup', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
    };

    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(userData);
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            res.send('Signup successful');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});