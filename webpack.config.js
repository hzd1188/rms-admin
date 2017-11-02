path = require('path');

var htmlwp = require('html-webpack-plugin');
// 配置文件在控制台上使用webpack，会默认查找webpack.sonfig.js的配置文件去执行
module.exports = {
    // 1.配置打包时的入口文件
    entry: './src/main.js',

    // 配置打包时生成文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'build.js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|ttf|woff)$/,
                // loader: ['url-loader']

                loader: ['url-loader?limit=10240']
            },

            // 配置vue文件打包正则
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index1.html'
        })
    ]
}