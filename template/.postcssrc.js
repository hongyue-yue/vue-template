const { webpackConfig } = require("./config");

module.exports = {
    ident: "postcss",
    sourceMap: webpackConfig.isDev,
    plugins: [
        require("autoprefixer")({
            overrideBrowserslist: ["ie 9-11", "last 5 version"] //兼容IE9到11，所有浏览器最近五个版本
        })
    ]
};
