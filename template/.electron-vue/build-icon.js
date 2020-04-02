const fse = require('fs-extra')
const png2icons = require('png2icons')
const path = require('path')
const exeIconPath = path.resolve(__dirname, '..', 'build/icons/256x256.png')
const installIconPath = path.resolve(__dirname, '..', 'build/icons/install.png')
const savePath = path.resolve(__dirname, '..', 'build/icons')

const createIcon = (orginIcon, targetName) => {
  try {
    if (fse.pathExistsSync(orginIcon) === false) {
      throw new Error(`not found ${targetName} icon, must be set the icon png`)
    }
    const input = fse.readFileSync(orginIcon)
    png2icons.setLogger(console.log)
    let output = png2icons.createICNS(input, png2icons.BILINEAR, 0)
    if (output) {
      fse.writeFileSync(path.join(savePath, `${targetName}.icns`), output)
    }
    output = png2icons.createICO(input, png2icons.BEZIER, 20, true)
    fse.writeFileSync(path.join(savePath, `${targetName}.ico`), output)
    console.log(`build ${targetName} icons success`)
  } catch (error) {
    throw error
  }
}

const main = () => {
  try {
    createIcon(exeIconPath, 'icon')
    createIcon(installIconPath, 'install')
  } catch (error) {
    throw error
  }
}

main()
