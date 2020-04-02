const hacker = require('resourcehack-js')
const fse = require('fs-extra')
const nodePath = require('path')
const pkgInfo = require('../package.json')
const buildConfig = require('./build.config')
const buildPath = nodePath.join(buildConfig.out, `${pkgInfo.name}-win32-${buildConfig.arch}`)
const installPath = nodePath.join(buildConfig.out, `${pkgInfo.name}-win32-${buildConfig.arch}-install`)
const iconPath = nodePath.resolve(buildConfig.icon, '..')
const buildAppExePath = nodePath.join(buildPath, `${pkgInfo.name}.exe`)
const buildAppIconPath = nodePath.join(buildPath, 'icon.ico')
const issFilePath = nodePath.join(installPath, `${pkgInfo.name}_setup.iss`)
const setupEnv = process.env.SETUP_ENV || 'production'
const setupEnvConfig = require('./setup.config')[setupEnv]
const encoding = require('encoding')
const compiler = require('innosetup-compiler')
const packTpl = require('../setup/win32/lib/packTpl')

if (!setupEnvConfig) {
  throw new Error(`${setupEnv} is not found in setup.config, check SETUP_ENV = ${setupEnv} in package.json script?`)
} else {
  console.log(`current SETUP_ENV is ${setupEnv}`)
}
const setIcon = async (exePath, iconPath) => {
  try {
    await hacker({
      action: 'addoverwrite',
      open: exePath,
      save: exePath,
      resource: iconPath,
      mask: {
        type: 'ICONGROUP',
        name: '1',
        lang: ''
      }
    })
  } catch (err) {
    throw new Error(`resource_hack fail, error message${err.message}`)
  }
}

const createIssFile = async (savePath, config) => {
  // 创建iss打包文件
  try {
    if (fse.existsSync(issFilePath)) {
      fse.removeSync(issFilePath)
    }
    const tplConfig = {}
    tplConfig.MySetupIconPath = nodePath.join(iconPath, 'install.ico')
    tplConfig.MyIconPath = buildAppIconPath
    tplConfig.MyExePath = buildAppExePath
    tplConfig.MySourcePath = `${buildPath}\\*`
    tplConfig.MyOutputDirPath = installPath
    tplConfig.MyLangPath = nodePath.resolve(__dirname, '..', nodePath.join('setup', 'win32', 'lang', 'Chinese.isl'))
    tplConfig.MyAppExeName = `${pkgInfo.name}.exe`
    const options = Object.assign({}, tplConfig, config)
    let content = packTpl(options)
    content = encoding.convert(content, 'gbk')
    await fse.outputFileSync(savePath, content)
  } catch (error) {
    throw error
  }
}

async function runInnoSetup(issPath) {
  return new Promise((resolve, reject) => {
    compiler(issPath, {
      gui: false,
      verbose: true
    }, function (error) {
      if (error) {
        reject(new Error(`打包安装包错误${error.message}`))
      } else {
        resolve()
      }
    })
  })
}

const main = async () => {
  try {
    // 是否有打包目录,无则创建,有则清空
    if (fse.pathExistsSync(installPath)) {
      fse.emptyDirSync(installPath)
    } else {
      fse.ensureDirSync(installPath)
    }
    // 复制图标到使用electron-packager的目录文件下,需要注意的是,目录有可能是[appName]-win32-[win32|ia32]
    const files = fse.readdirSync(iconPath)
    for (let iconFileName of files) {
      if (iconFileName.indexOf('install') !== -1) continue
      await fse.copyFile(nodePath.join(iconPath, iconFileName), nodePath.join(buildPath, iconFileName))
    }
    // 使用resource-hack修改上述目录的exe文件的图标
    await setIcon(buildAppExePath, buildAppIconPath)
    // 创建inno-setup脚本文件
    await createIssFile(issFilePath, setupEnvConfig)
    // 执行安装包打包
    await runInnoSetup(issFilePath)
  } catch (error) {
    throw error
  }
}


main()


