import { nodeExternalsPlugin } from 'esbuild-node-externals';

module.exports =  [nodeExternalsPlugin({
  packagePath: "./package.json",
})]