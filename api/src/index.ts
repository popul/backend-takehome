import http from 'http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { readFile } from './api/readFile';
import { userRoute } from './user';
import { SCHEDULE_FILE_PATH, setScheduleList } from './store';
import { startScheduler } from './scheduler';
import { fileExists } from './api/fileExists';
import { writeToFile } from './api/writeToFile';

const HTTP_PORT = 3001;

function initRoutes(app: Router) {
    app.use(bodyParser.json());
    app.post('/user', userRoute);
}


async function initStore() {
    if (!fileExists(SCHEDULE_FILE_PATH)) {
        await writeToFile(SCHEDULE_FILE_PATH, []);
    }
    const content = await readFile(SCHEDULE_FILE_PATH);
    
    setScheduleList(JSON.parse(content));
}

function startServer() {
    initStore();
    startScheduler();

    const app = express();
    initRoutes(app);
    const serverHttp = http.createServer(app);
    serverHttp.listen(3001);
    console.log(`api started on port ${HTTP_PORT}`)
}

startServer();
