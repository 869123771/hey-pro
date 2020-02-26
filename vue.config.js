const path = require("path");
const heyVars = require('./src/hey.js');
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);


module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_SRC || "/" : "./", // 默认'/'，部署应用包时的基本 URL
    outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
    assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map

    chainWebpack: config => {
        // 添加别名
        config.resolve.extensions.merge(['.js', '.jsx', '.vue', '.css','.less','.scss'])
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))

        if (IS_PROD) {
            // 压缩图片
            config.module
                .rule("images")
                .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
                .use("img-webpack-loader")
                .loader("img-webpack-loader")
                .options({
                    mozjpeg: { progressive: true, quality: 65 },
                    optipng: { enabled: false },
                    pngquant: { quality: [0.65, 0.90], speed: 4 },
                    gifsicle: { interlaced: false }
                });
        }

    },
    css: {
        loaderOptions: {
            less: {
                globalVars : {
                    ...heyVars
                }
            }
        }
    },
    pluginOptions: {

    },
    pwa: {},
    devServer: {
        // overlay: {
        //   warnings: true,
        //   errors: true
        // },
        open: IS_PROD,
        host: "localhost",
        port: 8099,
        https: false,
        hotOnly: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API || 'https://beta.vilson.xyz/index.php',
                ws: false,
                //secure: false,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            },
        },
    }
};
