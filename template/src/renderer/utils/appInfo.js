import fse from 'fs-extra'
import nodePath from 'path'
import { remote } from 'electron'
// console.log(fse)
export default {
  getIcon() {
    return require('appIcons/icon.png')
  },
  getName() {
    const info = this.getInfo()
    if (info) {
      return info.MyAppName
    } else {
      return process.env.npm_package_productName
    }
  },
  getVersion() {
    const info = this.getInfo()
    if (info) {
      return info.MyAppVersion
    } else {
      return process.env.npm_package_version
    }
  },
  getInfo() {
    const exePath = nodePath.resolve(remote.app.getPath('exe'), '..', 'appInfo.json')
    console.log(exePath)
    if (fse.existsSync(exePath)) {
      const obj = fse.readJsonSync(exePath)
      return obj
    } else {
      return null
    }
  }
}
