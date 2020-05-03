const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const config = require('../config/config');
const db = require('../database/users');
const {pinoLogger, pinoExpressLogger} = require('../config/logger/pinoLogger');
const {winstonLogger} = require('../config/logger/winstonLogger');

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(pinoExpressLogger);

app.get("/", (req, res) => {
    res.json({info : "Server started"});
});

app.get('/users', async (req, res) => {
    let users = await db.getUsers();
    res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let user = await db.getUserById(id);
    res.status(200).json(user);
});

app.post('/users', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    await db.createUser(firstName, lastName, email);
    res.status(201).json({message : "User created successfully"});
});

app.put('/users/:id', db.updateUser);

app.delete("/users/:id", (req, res) => {
    db.deleteUser(req, res);
});


app.listen(port, () => {
    pinoLogger.info("server started running on port - %s", port);
    winstonLogger.info("server started running on port - %s", port);
});