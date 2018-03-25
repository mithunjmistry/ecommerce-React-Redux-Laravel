let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

let preprocessorsExcludes = [];
if (mix.preprocessors) {
    mix.preprocessors.forEach(preprocessor => {
        preprocessorsExcludes.push(preprocessor.test());
    });
}

let rules = [
    {
        test: /\.s[ac]ss$/,
        exclude: preprocessorsExcludes,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
    }
];


mix.react('resources/assets/js/app.js', 'public/js')
    .webpackConfig({
        module: {
            rules: rules
        }
    }).sourceMaps();
