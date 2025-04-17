// import system dependencies
const path = require('path');

////////////////////////////////////////////////////////////////////////////////////////////////////

const configuration = {
    devtool: 'source-map',
    entry: {
        main: './client/index.tsx',
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public'),
    },
    resolve: {
        alias: {
            "@client": path.resolve(__dirname, './client'),
            "@shared": path.resolve(__dirname, './shared'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '*'],
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = configuration;
