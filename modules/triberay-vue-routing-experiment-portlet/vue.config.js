
module.exports = {
    // Change build path to make the liferay-npm-bundler find it
    outputDir: 'build/resources/main/META-INF/resources/lib',
    publicPath: '/web/triberayvuerouting/',
    css: {
        // Enable CSS source maps.
        sourceMap: true
    },
    configureWebpack: {
        performance: {
            hints: false
        }
    }
};
