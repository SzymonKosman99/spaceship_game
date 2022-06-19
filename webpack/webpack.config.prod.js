const path = require('path')

const settings = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './public/typescript/index.ts',
    output: {
        path: path.join(__dirname, '..', '/public/dist'),
        filename: 'bundle.js',
        publicPath: '/public/dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(svg|ico|png|gif|jpeg|jpg)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

module.exports = settings
