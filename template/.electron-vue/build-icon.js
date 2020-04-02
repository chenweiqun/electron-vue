const fse = require('fs-extra')
const png2icons = require("png2icons");
const path = require('path')
const savePath = path.resolve(__dirname, '..', 'build/icons')
const jimp = require('jimp')
const iconSizeList = [64, 128, 256, 512]
const icoSize = 256
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

const main = async () => {
  try {
    const icoPath = path.resolve(__dirname, '..', `build/icons/${icoSize}x${icoSize}.png`)
    const installIconPath = path.resolve(__dirname, '..', 'build/icons/install.png')
    const exeIconPath = path.resolve(__dirname, '..', 'build/icons/icon.png')
    for (let i = 0;i < iconSizeList.length; i++) {
      const size = iconSizeList[i]
      const img = await jimp.read(exeIconPath)
      await img.resize(size, size)
      img.write(path.resolve(__dirname, '..', `build/icons/${size}x${size}.png`))
    }
    createIcon(icoPath, 'icon')
    createIcon(installIconPath, 'install')
  } catch (error) {
    throw error
  }
}

main()
