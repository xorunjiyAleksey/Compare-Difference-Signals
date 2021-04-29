const path = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BUILD = path.resolve(__dirname, './dist');
const BUILD_PROD = path.resolve(__dirname, '../public');
const ENV_MODE = process.env.NODE_ENV === 'development' ? BUILD : BUILD_PROD;

module.exports = {
    entry: './src/index.js',
    output: {
        path: ENV_MODE,
        filename: 'index.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            [
                                '@babel/plugin-proposal-decorators',
                                {
                                    legacy: true,
                                },
                            ],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-transform-regenerator',
                            '@babel/plugin-syntax-import-meta',
                            '@babel/plugin-proposal-json-strings',
                            '@babel/plugin-proposal-function-sent',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-proposal-throw-expressions',
                            '@babel/plugin-proposal-export-default-from',
                            '@babel/plugin-proposal-logical-assignment-operators',
                            '@babel/plugin-proposal-optional-chaining',
                            [
                                '@babel/plugin-proposal-pipeline-operator',
                                {
                                    proposal: 'minimal',
                                },
                            ],
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            '@babel/plugin-proposal-do-expressions',
                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-transform-runtime',
                            [
                                'babel-plugin-styled-components',
                                {
                                    pure: true,
                                    fileName: false,
                                    displayName: false,
                                },
                            ],
                        ]
                    }
                }
            },
            { test: /\.(png|jpg|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images'
                }
            },
            { test: /\.css$/, use: [CssExtractPlugin.loader, 'css-loader'] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        new CssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: '#source-map',
}