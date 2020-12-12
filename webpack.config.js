const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Qiniu = require('qiniu-cdn-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const CDN_HOST = `http://cdn.vwood.xyz`
var webpackConfig = {
    mode: getMode(),
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        port: 3010,
        contentBase: __dirname + '/build',
        historyApiFallback: true,
        proxy: {
            '/v1': {
                target: 'https://api.vwood.xyz',
                secure: false,
                changeOrigin: true,
            }
        }
    },
    entry: {
        app: `${__dirname}/src/page/App.js`,
    },
    output: {
        path: `${__dirname}/build/`,
        publicPath: '/',
        filename: isDev() ? '[name].[hash].js' : '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.(png|woff|woff2|eot|ttf|svg|pdf|jpg)$/,
            loader: 'url-loader',
            options: {
                name: '[path][name].[hash].[ext]',
                limit: 8192,
                context: 'src',
            },
        },
            {
                test: /\.css$/,
                use: [
                    isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\/src\/common\/assets\/style\//,
                loader: scssRules({
                    global: false,
                }),
            },
            {
                test: /\/src\/common\/assets\/style\//,
                loader: scssRules({
                    global: true,
                }),
            },
            {
                test: /\.jsx$|\.js$/,
                include: /src/,
                exclude: [/axios/, /node_modules/, /src\/common\/assets/],
                loader: 'babel-loader',
                options: {
                    // babelrc: false,
                    compact: false,
                    sourceMap: false,
                    comments: false,
                },
            },
            {
                test: [/\.tsx?$/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            //   babelrc: false,
                            compact: false,
                            sourceMap: false,
                            comments: false,
                            shouldPrintComment: (value = '') =>
                                value.indexOf('@license') >= 0 ||
                                value.indexOf('@preserve') >= 0 ||
                                /webpack[A-Z]/.test(value),
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            experimentalWatchApi: true,
                            transpileOnly: true, // 加快编译速度
                        },
                    },
                ],
                exclude: [/node_modules/, /\.scss.ts$/, /\.test.tsx?$/],
            },
        ],
        noParse: [require.resolve('lodash')],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/common/assets/index.ejs',
            minify: {
                collapseWhitespace: true,
            },
            title: 'vwood'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new MonacoWebpackPlugin(['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'typescript', 'vb', 'xml', 'yaml'])
    ],
    resolve: {
        alias: {
            "@services": __dirname + "/src/services",
            "@/services": __dirname + "/src/services",
            "@utils": __dirname + "/src/utils",
            "@/utils": __dirname + "/src/utils",
            "@page": __dirname + "/src/page",
            "@domain": __dirname + "/src/domain",
            "@/domain": __dirname + "/src/domain",
            "@components": __dirname + "/src/components",
            "@/components": __dirname + "/src/components",
            "@common": __dirname + "/src/common",
            "@/common": __dirname + "/src/common",
            "@/*": __dirname + "/src/*",
            "@gen": __dirname + "/packages/gen",
            "@gen/*": __dirname + "/packages/gen/*",
        },
        modules: ['src', 'node_modules', 'packages'],
        extensions: ['.js', '.jsx', '.scss', '.css', '.tsx', '.ts'],
    },
    optimization: {
        minimize: isDev() ? false : true,
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                common: {
                    test: /.js$/,
                    name: 'common', // 名字，设置为true，表示根据模块和缓存组自动生成，
                    chunks: 'initial', // initial: 初始块，all: 所有块，async：按需加载
                    priority: 2,
                    minChunks: 2, // 最小引用次数
                    reuseExistingChunk: true, // 是否使用已经存在的chunk, 前提是代码没有变化，
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                },
            },
        },
        minimizer: [
            // new UglifyJsPlugin({
            //     exclude: [/\.min\.js$/],
            //     cache: true,
            //     parallel: true,
            //     sourceMap: false,
            //     extractComments: false,
            //     uglifyOptions: {
            //         compress: {
            //             unused: true,
            //             drop_debugger: true,
            //         },
            //         output: {
            //             comments: false,
            //         },
            //     },
            // }),
            new TerserPlugin({
                exclude: [/\.min\.js$/],
                parallel: true,
                extractComments: true
            }),
        ],
    },
};

if (isDev()) {
    webpackConfig.plugins.push(
        new webpack.HashedModuleIdsPlugin()
    )
}

if (isProd()) {
    Reflect.deleteProperty(webpackConfig, 'devtool');
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            chunkFilename: '[id].[chunkhash].css',
        })
    );
    // webpackConfig.plugins.push(
    //     new Qiniu({
    //         accessKey: 'ZUeDQBNFMaae9jrxYmFNNNfaUUfhAFKyLbPutdZF',
    //         secretKey: 'Sb5MCKPs4bM-qexChWNHVL0QM0fgg575lYQAWnLL',
    //         bucket: 'vwood',
    //         zone: 'Zone_z2',
    //         exclude: /(\.html)|(\.map)/,
    //         refreshCDN: CDN_HOST,
    //         // refreshFilter: /(.*\.js)|(.*\.css)/,
    //     })
    // )
}

module.exports = webpackConfig;

function scssRules({
                       global
                   }) {
    return [
        isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: global ? {
                importLoaders: 1,
            } : {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: function () {
                    return [require('autoprefixer')];
                },
            },
        },
        'sass-loader',
    ];
}

function isDev() {
    return process.env.NODE_ENV === 'development';
}

function isProd() {
    return process.env.NODE_ENV === 'production';
}

function getMode() {
    return isDev() ? 'development' : 'production';
}

function getPublicPath() {
    if (isProd()) {
        return CDN_HOST + '/';
    }
    return '/';
}