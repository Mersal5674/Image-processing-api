// Fisrt we are gonna call the express to use it using ES6
import app from '../app/app';
// import the port
import { port } from '../routes/const';
// import express so we can build a server on '/' endpoint
import express from 'express';

const server = express();
// add get method to the server
server.get('/', (req: express.Request, res: express.Response): void => {
    res.send(`Welcome to the server!`);
});

// use the info i got from app
server.use('/', app);

// Build the server
server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}`);
});
