// import external dependencies
import express, { Express, Request, Response } from 'express';

// import system dependencies
import path from 'path';

// import internal dependencies
import config from '@server/config';
import router from '@server/router';

////////////////////////////////////////////////////////////////////////////////////////////////////

const server: Express = express();

server.disable('x-powered-by');

server.use(express.json());
server.use('/public', express.static('public'));
server.use('/api', router);

server.get('/{*splat}', (request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, './index.html'));
});

server.listen(config.server.port, () => {
    console.log(`Server running @ ${config.server.url}/.`);
});
