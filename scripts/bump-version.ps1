# 版本号更新脚本 (PowerShell)
# 用法: .\scripts\bump-version.ps1 <新版本号>
# 示例: .\scripts\bump-version.ps1 1.1.0

param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion
)

# 验证版本号格式
if ($NewVersion -notmatch '^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$') {
    Write-Host "❌ 错误: 版本号格式不正确" -ForegroundColor Red
    Write-Host "正确格式: X.Y.Z 或 X.Y.Z-beta.1"
    Write-Host "示例: 1.0.0, 2.1.3, 1.0.0-beta.1"
    exit 1
}

Write-Host ""
Write-Host "🚀 开始更新版本号到 $NewVersion..." -ForegroundColor Cyan
Write-Host ""

# 获取项目根目录
$RootDir = Split-Path -Parent $PSScriptRoot

try {
    # 更新 package.json
    $PackagePath = Join-Path $RootDir "package.json"
    $PackageJson = Get-Content $PackagePath -Raw | ConvertFrom-Json
    $OldVersion = $PackageJson.version
    $PackageJson.version = $NewVersion
    $PackageJson | ConvertTo-Json -Depth 10 | Set-Content $PackagePath -Encoding UTF8
    Write-Host "✅ package.json: $OldVersion → $NewVersion" -ForegroundColor Green

    # 更新 Cargo.toml
    $CargoPath = Join-Path $RootDir "src-tauri\Cargo.toml"
    $CargoContent = Get-Content $CargoPath -Raw
    $CargoContent -match 'version = "([^"]+)"' | Out-Null
    $OldVersion = $Matches[1]
    $CargoContent = $CargoContent -replace 'version = "[^"]+"', "version = `"$NewVersion`""
    Set-Content $CargoPath -Value $CargoContent -Encoding UTF8 -NoNewline
    Write-Host "✅ Cargo.toml: $OldVersion → $NewVersion" -ForegroundColor Green

    # 更新 tauri.conf.json
    $TauriConfPath = Join-Path $RootDir "src-tauri\tauri.conf.json"
    $TauriConf = Get-Content $TauriConfPath -Raw | ConvertFrom-Json
    $OldVersion = $TauriConf.package.version
    $TauriConf.package.version = $NewVersion
    $TauriConf | ConvertTo-Json -Depth 10 | Set-Content $TauriConfPath -Encoding UTF8
    Write-Host "✅ tauri.conf.json: $OldVersion → $NewVersion" -ForegroundColor Green

    Write-Host ""
    Write-Host "✨ 版本号更新完成！" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 接下来的步骤：" -ForegroundColor Yellow
    Write-Host "1. 检查更改: git diff"
    Write-Host "2. 提交更改: git add . && git commit -m `"chore: bump version to v$NewVersion`""
    Write-Host "3. 推送代码: git push"
    Write-Host "4. 创建标签: git tag -a v$NewVersion -m `"Release v$NewVersion`""
    Write-Host "5. 推送标签: git push origin v$NewVersion"
    Write-Host ""
    Write-Host "🎉 GitHub Actions 将自动开始构建和发布！" -ForegroundColor Cyan
    Write-Host ""
}
catch {
    Write-Host "❌ 更新失败: $_" -ForegroundColor Red
    exit 1
}

