'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiEndPoint: '"http://localhost:8020"',
  formUrl: '"http://localhost:8080"'
})
