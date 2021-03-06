const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development';

const getFileNameByEnv = (ext = '[ext]', name = '[name]') => isDevelopment ? `${name}.${ext}` : `${name}.[contenthash].${ext}`

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve(__dirname, 'src'), 
    entry: {
         main: path.resolve(__dirname, 'src/app.js')
    },
    output: {
        filename: getFileNameByEnv('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    optimization: isDevelopment ? {} : {
        minimize: true,
        minimizer: [new OptimizeCSSAssetsWebpackPlugin()]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                collapseWhitespace: !isDevelopment,
                removeComments: !isDevelopment,
                removeAttributeQuotes: !isDevelopment
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'service-worker.js'),
                    to: path.resolve(__dirname, 'dist/service-worker.js')
                },
                {
                    from: path.resolve(__dirname, 'manifest'),
                    to: path.resolve(__dirname, 'dist/manifest')
                } 
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: `./css/${getFileNameByEnv('css')}`,
            chunkFilename: getFileNameByEnv('css', '[id]')
        }),
        isDevelopment ? () => ({}) : new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                  [
                    'svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false,
                        },
                      ],
                    },
                  ],
                ],
              },
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /\.module\.css$/],
                use: [isDevelopment ? 'style-loader' : {
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: path.resolve(__dirname, 'build/css')
                    }
                },
                    'css-loader'
                ]
            },
            {
                test: /\.module\.css$/,
                exclude: [/node_modules/],
                use: [isDevelopment ? 'style-loader' : {
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: path.resolve(__dirname, 'build/css')
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDevelopment,
                        modules: true
                    }
                }
                ]
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${getFileNameByEnv()}`
                    }
                }]
            },
            {
                test: /\.(?:|woff2)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/${getFileNameByEnv()}`
                    }
                }]
            },
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            '@app': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@router': path.resolve(__dirname, 'src/router'),
            '@store': path.resolve(__dirname, 'src/store'),
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true,
        port: 3000,
        contentBase: path.resolve(__dirname, 'build'),
    }
}; 