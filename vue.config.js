/* eslint-disable */
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.VUE_APP_PUBLIC_PATH
        ? process.env.VUE_APP_PUBLIC_PATH
        : "",
    chainWebpack(config) {
        config.plugins.delete("prefetch");

        // and this line
        config.plugin("CompressionPlugin").use(CompressionPlugin);
    }
};
