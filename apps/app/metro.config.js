// metro.config.js da taxminan shunday sozlama bo'lishi shart:
const path = require('path')
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules')
]
