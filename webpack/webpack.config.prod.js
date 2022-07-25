const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const settings = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './public/typescript/index.ts',
    output: {
        path: path.join(__dirname, '..', '/public/dist'),
        filename: 'bundle.js',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
    ],
};

module.exports = settings;
