const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')}).parsed;

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    target: "node", // if you use webpack version 5 or higher, It's very important to set this target to node.
    devServer: {
        open: true,
        host: process.env.Dev_Server_HOST,
        port: process.env.Dev_Server_PORT
    },
    stats: {
        assets: false,
        errorDetails: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./package.json",
                    to: "./package.json"
                },
            ]
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new WebpackShellPlugin({
            onBuildEnd: {
                scripts: ['npm run start']
            }
        }),
        new webpack.ContextReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname)
        ]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
