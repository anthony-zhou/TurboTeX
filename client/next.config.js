/** @type {import('next').NextConfig} */

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const monacoRules = [
  {
    test: /\.ttf$/,
    type: 'asset/resource'
  }
]


const nextConfig = {
    reactStrictMode: false,

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        if(!isServer) {
            config.plugins.push(new MonacoWebpackPlugin({
              languages: ["javascript", "markdown", "yaml"],
              filename: "static/[name].worker.js",
            }))
            config.module.rules.push(...monacoRules)
          }

        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    }
}

module.exports = nextConfig
