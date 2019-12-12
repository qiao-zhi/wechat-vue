module.exports = {
	publicPath: './',
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8088',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}