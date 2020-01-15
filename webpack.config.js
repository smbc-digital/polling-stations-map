const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

let config = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    plugins: [
        new CompressionPlugin({
            filename: '[path].gz[query]',
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            deleteOriginalAssets: true
        })
    ]
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.output.filename = '[name]-latest.js'
        config.devtool = 'source-map'
        config.devServer = {
            inline: true,
            historyApiFallback: true,
            sockPort: 8080
        }
        config.plugins = [
            new HtmlWebpackPlugin({
                template: './index.html'
            })
        ]
    }
    if (argv.mode === 'production') {
        config.output.filename = '[name]-latest.js'
        config.optimization = {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        }
    }

    return config
}
