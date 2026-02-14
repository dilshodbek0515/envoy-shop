// apps/app/metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// packages papkasini Metro'ga tanitamiz
config.watchFolders = [workspaceRoot]; // Butun workspace ni kuzat

// node_modules yo'llari
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules"),
];

module.exports = config;
