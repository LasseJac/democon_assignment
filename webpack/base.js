const path = require('path');
const entry = path.resolve(__dirname, '..', 'src', 'client', 'start');

const config = {
    entry: {
        main: entry
    },
    output: {
        filename: '[name].[contentHash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
				test: /\.scss$/,
				use: [
                    'style-loader', // TO-DO: mini-css-extract-plugin
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[hash:base64:5]'
							}
						}
					},
                    'sass-loader'
				]
			},
        ]
    },

};

module.exports = config;