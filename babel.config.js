module.exports = function (api) {
  api.cache(true)

  const presets = ["@babel/env", "@babel/react"]
  const plugins = []

  return {
    presets,
    plugins
  }
}