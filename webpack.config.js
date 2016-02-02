const path = require('path')
const webpack = require('webpack')
var fs = require('fs')

var preload = {}
fs.readdirSync('./preload/').forEach(function(fileName){
    preload[fileName.replace('.js', '')] = path.resolve(
        __dirname, 'preload/' + fileName
    )
})

module.exports = {
    entry: Object.assign(preload, {
        bundle: path.resolve(__dirname, 'react/main.js')
    }),
    output: {
        path: path.resolve(__dirname, 'electron/web/js'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        }),
        new webpack.ExternalsPlugin('commonjs', [
            'desktop-capturer',
            'electron',
            'ipc',
            'ipc-renderer',
            'native-image',
            'remote',
            'web-frame',
            'clipboard',
            'crash-reporter',
            'screen',
            'shell'
        ])
    ]
}
