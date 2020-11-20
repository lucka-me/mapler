import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const config: webpack.Configuration = {
    entry: { mapler: './src/mapler.ts' },
    output: {
        filename: 'lib/[name].[chunkhash].js',
        chunkFilename: 'lib/[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        alias: {
            root: path.join(__dirname, 'src', '../'),
            data: path.join(__dirname, 'src', 'data'),
            service: path.join(__dirname, 'src', 'service'),
            ui: path.join(__dirname, 'src', 'ui'),
            eli: path.join(__dirname, 'src', 'ui', 'eli'),
        },
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: { comments: false },
                },
                extractComments: true,
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            maxInitialRequests: 7,
            cacheGroups: {
                service: {
                    test: /[\\/]src[\\/]service[\\/]/,
                    name: 'service',
                    priority: 40,
                },
                ui: {
                    test: /[\\/]src[\\/]ui[\\/]/,
                    name: 'ui',
                    priority: 40,
                },
                data: {
                    test: /[\\/]src[\\/](data|locales)[\\/]/,
                    name: 'data',
                    priority: 30,
                },
                mdc: {
                    test: /[\\/]node_modules[\\/]@material/,
                    name: 'mdc',
                    priority: 20,
                    reuseExistingChunk: true,
                },
                modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'modules',
                    priority: 10,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8000,
        contentBasePublicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            scriptLoading: 'defer',
            chunks: [ 'mapler' ],
            filename: 'index.html',
            meta: {
                'description': 'Make map as wallpaper',
                'viewport': 'width=device-width, height=device-height, initial-scale=1',
                'theme-color': '#29b6f6',

                'apple-mobile-web-app-capable': 'yes',
                'apple-mobile-web-app-status-bar-style': 'dark',
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
                { from: 'manifest.json' },
            ],
        }),
    ],
};

export default config;