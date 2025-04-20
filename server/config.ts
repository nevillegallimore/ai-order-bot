// import internal dependencies
const pkg = require('../package.json');

////////////////////////////////////////////////////////////////////////////////////////////////////

const api = {
    url: 'http://localhost:3000/api',
};

const app = {
    urls: {
        api: 'http://localhost:3000/api',
        app: 'http://localhost:3000',
    },
    author: pkg.author,
    version: pkg.version,
};

const server = {
    port: 3000,
    url: 'http://localhost:3000',
};

const config = { api, app, server };

////////////////////////////////////////////////////////////////////////////////////////////////////

export default config;
