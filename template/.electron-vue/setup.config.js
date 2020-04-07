// MyAppName is program name
// MyInstallName is install folder name
// MyAppId use npm run gen:uuid create uuid
// MyLicenseFilePath must save ascii file
// MyAppVersion is required

const pkgInfo = require('../package.json')
const utils = require('./setup-utils')
module.exports =  {
  production: {
    "MyAppName": `${pkgInfo.name}`,
    "MyInstallName": `${pkgInfo.name}`,
    "MyAppId": '{{ uuid }}',
    "MyAppVersion": utils.getVersion() || pkgInfo.version
    // "MyLicenseFilePath": utils.joinSetupPath('license', 'LICENSE.txt')
  }
}
