const path = require('path')
const webpack = require('webpack')
var fs = require('fs')
var packageJson = require('./package.json')

var preload = {}
fs.readdirSync('./preload/').forEach(function(fileName){
    preload['electron/web/preload/' + fileName] = './preload/' + fileName
})

module.exports = {
    entry: Object.assign(preload, {
        'electron/web/js/bundle.js': './react/main.js',
        'electron/main.js': './electron/main.js'
    }),
    output: {
        path: './',
        filename: '[name]'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /electron\/main\.js$/],
                loader: "babel",
                query: {
                    plugins: ['transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
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
