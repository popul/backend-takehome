import http from 'http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { user } from './user';

const HTTP_PORT = 3001;

function initRoutes(app: Router) {
    app.use(bodyParser.json());
    app.post('/user', user);
}

function startServer() {
    const app = express();
    initRoutes(app);
    const serverHttp = http.createServer(app);
    serverHttp.listen(3001);
    console.log(`api started on port ${HTTP_PORT}`)
}

startServer();
