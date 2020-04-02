export default {
  getIcon () {
    return require('appIcons/icon.png')
  },
  getName () {
    return process.env.npm_package_productName
  }
}
