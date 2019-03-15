const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const fs = require('fs');

module.exports = {
	entry: ['./src/app.js'],
	output: {
		filename: `[name].js`,
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'all',
					minChunks: 2
				},
				vendors: {
					test: /[\\/]node_modules[\\/](react.*|prop-types)[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					// options: {
					// 	babelrc: true
					// }
				}],
				include: [
					path.resolve(__dirname, '../src'),
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /src\/index.html/,
				loader: 'prerender-loader?string',
			},
			{
				type: 'javascript/auto',
				test: /manifest\.json$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `[name].[ext]?branch=${process.env.SOURCE_BRANCH}`
						},
					},
				],
				include: [
					path.resolve(__dirname, '../../src'),
				]
			},
			{
				test: /\.(png|jpg|gif|ico|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `./src/index.html`,
			filename: `index.html`,
			inject: true,
		}),
		new WorkboxPlugin.GenerateSW({
			// these options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true,
		})
	]
};
