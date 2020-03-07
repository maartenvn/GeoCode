module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.NODE_ENV == 'production' ? '/frontend/production' : process.env.NODE_ENV == 'development' ? '/frontend/development' : ''
};
