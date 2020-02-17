module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true,
    },

    extends: ["plugin:vue/essential"],

    plugins: ["vue"],

    rules: {
        // allow paren-less arrow functions
        "arrow-parens": "off",
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
};
