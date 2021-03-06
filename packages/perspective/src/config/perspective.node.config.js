const path = require("path");
const common = require("./common.config.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = Object.assign({}, common(), {
    entry: "./cjs/js/perspective.node.js",
    target: "node",
    externals: [/^([a-z0-9]|\@(?!apache\-arrow)).*?(?!wasm)$/g],
    node: {
        __dirname: false,
        __filename: false
    },
    output: {
        filename: "perspective.node.js",
        path: path.resolve(__dirname, "../../build"),
        libraryTarget: "umd"
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                test: /\.js(\?.*)?$/i,
                exclude: /node/,
                sourceMap: true
            }),
            new TerserPlugin({
                cache: true,
                parallel: true,
                test: /node/,
                sourceMap: true,
                terserOptions: {
                    mangle: false,
                    keep_infinity: true
                }
            })
        ]
    }
});
