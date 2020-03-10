const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const withDefaults = require('./utils/default-options')


exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState()
  // get options with defaults
  const { contentPath } = withDefaults(options)
  // figure out the content path
  const dir = path.join(program.directory, contentPath)
  // if directory doesn't exist, create it..
  if (!fs.existsSync(dir)) {
    // create the dir
    mkdirp.sync(dir)
  }
}