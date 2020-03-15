/* eslint-disable */
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.VUE_APP_PUBLIC_PATH
        ? process.env.VUE_APP_PUBLIC_PATH
        : "",
    productionSourceMap: false,
    chainWebpack(config) {
        // Add GZIP-compression to the build cycle.
        config.plugin("CompressionPlugin").use(CompressionPlugin);
    }
};
