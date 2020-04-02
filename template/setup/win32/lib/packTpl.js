const assert = require('assert')
const fs = require('fs')
module.exports = (options) => {
  assert.ok(options.MyAppName, 'MyAppName required')
  assert.ok(options.MyAppVersion, 'MyAppVersion required')
  // assert.ok(options.MyAppPublisher, 'MyAppPublisher required')
  // assert.ok(options.MyAppURL, 'MyAppURL required')
  assert.ok(options.MyAppExeName, 'MyAppExeName required')
  assert.ok(options.MyAppId, 'MyAppId required')
  assert.ok(options.MyIconPath, 'MyIconPath required')
  assert.ok(options.MyExePath, 'MyExePath required')
  assert.ok(options.MySourcePath, 'MySourcePath required')
  assert.ok(options.MyLangPath, 'MyLangPath required')
  // assert.ok(options.MyLicenseFilePath, 'MyLicenseFilePath required')
  assert.ok(options.MyOutputDirPath, 'MyOutputDirPath required')
  assert.ok(options.MyInstallName, 'MyInstallName required')
  assert.ok(options.MySetupIconPath, 'MySetupIconPath required')
  const tpl =
`
#define MyAppName "${options.MyAppName}"
#define MyInstallName "${options.MyInstallName}"
#define MyAppVersion "${options.MyAppVersion}"
${options.MyAppPublisher ? '' : '; '}#define MyAppPublisher "${options.MyAppPublisher}"
#define MySetupIconPath "${options.MySetupIconPath}"
${options.MyAppURL ? '' : '; '}#define MyAppURL "${options.MyAppURL}"
#define MyAppExeName "${options.MyAppExeName}"
#define MyAppId "{{${options.MyAppId}}"
#define MyIconPath "${options.MyIconPath}"
#define MyExePath "${options.MyExePath}"
#define MySourcePath "${options.MySourcePath}"
#define MyLangPath "${options.MyLangPath}"
#define MyLicenseFilePath "${options.MyLicenseFilePath}"
#define MyOutputDirPath "${options.MyOutputDirPath}"

[Setup]
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
${options.MyAppPublisher ? '' : '; '}AppPublisher={#MyAppPublisher}
${options.MyAppURL ? '' : '; '}AppPublisherURL={#MyAppURL}
${options.MyAppURL ? '' : '; '}AppSupportURL={#MyAppURL}
${options.MyAppURL ? '' : '; '}AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\\{#MyInstallName}
DisableProgramGroupPage=yes
OutputDir={#MyOutputDirPath}
OutputBaseFilename={#MyAppName}(v{#MyAppVersion})
${fs.existsSync(options.MyLicenseFilePath) ? '' : '; '}LicenseFile={#MyLicenseFilePath}
SetupIconFile={#MySetupIconPath}
Compression=lzma
SolidCompression=yes
DisableWelcomePage=false

[Languages]
Name: "chinese"; MessagesFile: "{#MyLangPath}"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags:
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: ; OnlyBelowVersion: 0,6.1
Name: "startupicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}";

[Files]
; Source: {#MyExePath}; DestDir: "{app}"; Flags: ignoreversion
Source: "{#MySourcePath}"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonprograms}\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName};"; IconFilename: "{app}\\icon.ico"
Name: "{commondesktop}\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName}"; IconFilename: "{app}\\icon.ico"; Tasks: desktopicon
Name: "{userappdata}\\Microsoft\\Internet Explorer\\Quick Launch\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName}"; IconFilename: "{app}\\icon.ico"; Tasks: quicklaunchicon
Name: "{userstartup}\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName}"; Tasks:desktopicon

[Run]
Filename: "{app}\\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
`
  return tpl
}
