var path = require("path");
var webpack = require("webpack");

var ENV = process.env.NODE_ENV || "development";
var API_URL = process.env.API_URL || "https://localhost:8443/marketplace";
var LOGOUT_URL = process.env.LOGOUT_URL || "#";

module.exports = {
    // This is the main file that should include all other JS files
    entry: "./app/js/main.js",
    target: "web",
    debug: true,
    cache: true,
    output: {
        path: path.join(__dirname, "dist/assets"),
        publicPath: "dist/assets",
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "main.js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            react$: "react/addons",
            jquery$: "jquery/dist/jquery",
            bootstrap$: "bootstrap-sass/assets/javascripts/bootstrap",
            carouFredSel$: "carouFredSel/jquery.carouFredSel-6.2.1",
            lodash: "lodash-amd/modern",
            "magnific-popup$": "magnific-popup/dist/jquery.magnific-popup",
        },
        // Tell webpack to look for required files in bower and node
        modulesDirectories: ['bower_components', 'node_modules'],
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "jshint-loader", exclude: /node_modules|bower_components|gulp|dist/ }
        ],
        loaders: [
            { test: /\.css/, loader: "style-loader!css-loader" },
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.js$/, loader: "jsx-loader" }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify(ENV),
            },
            "API_URL": JSON.stringify(API_URL),
            "LOGOUT_URL": JSON.stringify(LOGOUT_URL),
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
