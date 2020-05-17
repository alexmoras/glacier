const config = require('./config');

module.exports = {
    // If components don't load, set this to true. We don't need it if we use the "render" function in our "index.js".
    runtimeCompiler: false,
    devServer: {
        proxy: "http://localhost:3000/"
    }
};