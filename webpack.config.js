const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const root = (...args) => resolve(__dirname, ...args);

module.exports = {

    entry: root('src/main'),

    output: {
        path: root('dist/'),
        filename: 'app.[contenthash].js'
    },

    plugins: [
        new HtmlPlugin({
            inject: true,
            template: root('src/index.html')
        })
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.styl'],
        modules: [root('node_modules/'), root('src/')]
    },

    devServer: {
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:8080/'
            },
            '/static': {
                changeOrigin: true,
                target: 'http://localhost:8080/'
            }
        }
    }

};
