<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Architect a Complex App from scratch](#architect-a-complex-app-from-scratch)
  - [Step1: Config all necessary elements for a project (Done)](#step1-config-all-necessary-elements-for-a-project-done)
    - [ES6, JSX:](#es6-jsx)
    - [CSS, LESS](#css-less)
    - [Images, Fonts](#images-fonts)
    - [File Change listener](#file-change-listener)
    - [Hot Update](#hot-update)
    - [File Fingerprinter](#file-fingerprinter)
    - [Files Compression](#files-compression)
  - [Step2: Optimze the project by Webpack I](#step2-optimze-the-project-by-webpack-i)
    - [Auto clear file folder](#auto-clear-file-folder)
    - [PostCSS-Autoprefixer for CSS3](#postcss-autoprefixer-for-css3)
  - [Step3: Optimze the project by Webpack II](#step3-optimze-the-project-by-webpack-ii)
  - [Step4: Apply plugins to analysis and make webpack fast](#step4-apply-plugins-to-analysis-and-make-webpack-fast)
  - [Step5: Microservice for Front end: main app + subapps](#step5-microservice-for-front-end-main-app--subapps)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



# Architect a Complex App from scratch

## Step1: Config all necessary elements for a project (Done)
### ES6, JSX: ###
config .babelrl file and add babel-loader in webpack.config.js

### CSS, LESS ###
use less-loader, css-loader and style-loader

### Images, Fonts ###
file-loader, url-loader

### File Change listener ###
M1: add webpack --config scripts in package.json <br />
```
"watch": "webpack --watch",
```
**Disadvantage**: don't auto refresh browser<br />
<br />

M2: add in webpack.config.js
```
watch: true,
watchOptions: {...}
```

### Hot Update ###
**M1: use webpack-dev-server and HotModuleReplacementPlugin**
add --open in package.json
```
"dev": "webpack-dev-server --config webpack.dev.js --open"
```
add devServer in webpack.config.js
```
 plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
  })],
  devServer: {
    contentBase: './dist',
    hot: true
  }
```

**M2: Webpack-dev-middleware**

use nodejs to start a server and pass output of webpack to this server


### File Fingerprinter ###
There are **3 fingers**: <br />
**Hash**: Related to the whole project. One file change would change the hash of the whole project <br />
**Chunkhash**: Realted to packaged chunks. Different entries would generate different chucnkhash <br />
**Contenthash**: Related to file content. Contenthash wouldn't change if file content doesn't change<br />
<br />

**JS Files**: '[name][chunkhash:8].js'<br />
**CSS Files**: set MiniCssExtractPlugin and use contenthash<br />
'[name][contenthash:8].css'<br />
**Image Files**: add options in file-loader<br />
Add options in rules
```
{
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name]_[hash:8].[ext]'
      }
    }
  ]
}
```
Add plugin:
```
new MiniCssExtractPlugin({
  filename: '[name]_[contenthash:8].css'
})
```

### Files Compression ### 
**HTML Files**: download html-webpack-plugin and add plgins for each html<br />
```
new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/test.html'),
  filename: 'test.html',
  chunks: ['test'],
  inject: true,
  minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false
  }
})
```
**CSS Files**: use optimize-css-assets-webpack-plugin combined with cssnano<br />
```
new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano')
}),
```
**JS Files**: uglifyjs-webpack-plugin is inside webpack. It's can also be downloaded to do paralle compression<br />

## Step2: Optimze the project by Webpack I
### Auto clear file folder ###
**1. install clean-webpack-plugin**

**2. add it in plugins in webpack config files**
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
    new CleanWebpackPlugin(),
    ...
]
```

### PostCSS-Autoprefixer for CSS3 ###
**1. Install postcss-loader and autoprefixer**
**2. Add it in less-loader**
```
{
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'less-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')({
            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
  ...
}
```
About browsers, it can also be added in package.json as browserslist
```
in package.js
{
  "browserslist": []
}
```


### PX to rem on Mobile ###
**1. install px2rem-loader/lib-flexible**
**2. add it in less-loader**
```

```



**Unfinished**: multi pages, source map, tree shaking, public resource, eslint, log, ssr

## Step3: Optimze the project by Webpack II
config packepage, config scripts, unit tests, smoking tests, Travis

## Step4: Apply plugins to analysis and make webpack fast

## Step5: Microservice for Front end: main app + subapps
