/* eslint-disable */
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");
const path = require("path");

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.VUE_APP_PUBLIC_PATH
        ? process.env.VUE_APP_PUBLIC_PATH
        : "",
    configureWebpack: {
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, "./**/*.vue"),
                    path.join(__dirname, "./src/**/*.js"),
                    path.join(__dirname, "./src/**/*.ts")
                ]),
                minify: true
            })
        ]
    }
};
