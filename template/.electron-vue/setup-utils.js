const commitCount = require('git-commit-count')
const nodePath = require('path')
module.exports = {
  joinSetupPath (...args) {
    return nodePath.resolve(__dirname, '..', nodePath.join('setup', 'win32', ...args))
  },
  getTimeVersion () {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
  },
  getVersion () {
    const cnt = commitCount()
    // 若找不到commitCount的版本号
    if (cnt !== -1) {
      const pad = "000000000"
      const version = cnt.toString()
      let v = pad.substring(0, pad.length - version.length) + version
      let result = ''
      let index = 0
      for (let i = 0; i < v.length; i++) {
        index++
        result += v[i]
        if ((i !== v.length - 1) && index === 3) {
          result += '.'
          index = 0
        }
      }
      const fixResult = []
      for (let item of result.split('.')) {
        fixResult.push(parseInt(item))
      }
      return fixResult.join('.')
    } else {
      return null
    }
  }
}
