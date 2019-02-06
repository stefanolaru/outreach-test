// webpack v4
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: { main: "./src/index.js" },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},
	watch: true,
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							bypassOnDebug: true
						}
					}
				]
			},
			{
				test: /\.s[c|a]ss$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		// new VueLoaderPlugin(),
		new CleanWebpackPlugin('dist', {}),
		new MiniCssExtractPlugin({
			filename: "style.[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: "./src/index.html",
			filename: "index.html"
		}),
		new WebpackMd5Hash(),
		new BrowserSyncPlugin()
	]
};