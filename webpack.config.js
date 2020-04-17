const path = require("path");
const webpack = require('webpack');

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
            { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify( require("./package.json").version ),
            REVISION: JSON.stringify( require("child_process").execSync('git rev-parse --short HEAD').toString().trim() ),
            BRANCH: JSON.stringify( require("child_process").execSync('git rev-parse --abbrev-ref HEAD').toString().trim() ),
            BUILD_DATE: JSON.stringify( new Date().toJSON() ),
        }),
    ],
};