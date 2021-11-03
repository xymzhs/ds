process.env.NODE_ENV = 'production'
import config from './rollup.config.dev'
import { terser } from 'rollup-plugin-terser'
config.output = config.output.map(v => ({
  ...v,
  sourcemap: false,
}))
config.plugins = [...config.plugins, terser()]

module.exports = config
