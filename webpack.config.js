const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, "./src"),
    entry: {
        storm: "./index.ts"
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        library: "[name]",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader",
                options: {
                    configFile: "tsconfig.build.json",
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify( require("./package.json").version ),
            REVISION: JSON.stringify( require("child_process").execSync('git rev-parse --short HEAD').toString().trim() ),
            BRANCH: JSON.stringify( require("child_process").execSync('git rev-parse --abbrev-ref HEAD').toString().trim() ),
            BUILD_DATE: JSON.stringify( new Date().toJSON() ),
        }),
    ],
};