'use strict';
const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const getConfig = require('hjs-webpack');



const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

const dotEnvVars = dotenv.config();
const environEnv = dotenv.config({
    path: join(root, 'config', `${NODE_ENV}.config.js`),
    silent: true
});

const envVars = Object.assign({}, dotEnvVars, environEnv);
const defines = Object.keys(envVars)
    .reduce((memo, key)=>{
        const val = JSON.stringify(envVars[key]);
        memo[`__${key.toUpperCase()}__`] = val;
        return memo;
    }, {
        __NODE_ENV__: JSON.stringify(NODE_ENV)
    });

const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

let config = getConfig({
    isDev: isDev,
    in: join(src, 'app.js'),
    out: dest,
    clearBeforeBuild:true
});

const cssModuleNames = `${isDev ? '[path][name]__[local]__':''}[hash:base64:5]`;
const matchCssLoaders = /(^|!)(css-loader)($|!)/;
const findLoader = (loaders, match) => {
    const found = loaders.filter(l=>l && l.loader && l.loader.match(match));
    return found ? found[0]: null;
};

//find existing css loader
const cssloader = findLoader(config.module.loaders, matchCssLoaders);
// merge into new loader
const newLoader = Object.assign({}, cssloader, {
    test: /\.module\.css$/,
    include: [src],
    loader: cssloader.loader
        .replace(matchCssLoaders,
        `$1$2?modules&localIdentName=${cssModuleNames}$3`)
});

config.module.loaders.push(newLoader);

cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newLoader.loader;

config.module.loaders.push({
    test:/\.css$/,
    include: [modules],
    loader: 'style!css'
});

config.postcss  = [].concat([
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({})
]);

// set require aliases
config.resolve.root = [src, modules];
config.resolve.alias = {
    'css': join(src, 'styles'),
    'containers': join(src, 'containers'),
    'components': join(src, 'components'),
    'utils': join(src, 'utils')
};

config.plugins = [
    new webpack.DefinePlugin(defines)
].concat(config.plugins);

if (isTest) {
    config.externals = {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true,

    };
    config.plugins = config.plugins.filter(p=>{
        const name = p.constructor.toString();
        const fnName = name.match(/^function (.*)\((.*\))/);

        const idx = [
            'DedupePlugin',
            'UglifyJsPlugin'
        ].indexOf(fnName[1]);
        return idx < 0;
    });
}

module.exports = config;