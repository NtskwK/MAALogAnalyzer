#!/usr/bin/env node

/**
 * 版本号更新脚本
 * 用法: node scripts/bump-version.js <新版本号>
 * 示例: node scripts/bump-version.js 1.1.0
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ 错误: 请提供新版本号');
  console.log('用法: node scripts/bump-version.js <版本号>');
  console.log('示例: node scripts/bump-version.js 1.1.0');
  process.exit(1);
}

// 验证版本号格式
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error('❌ 错误: 版本号格式不正确');
  console.log('正确格式: X.Y.Z 或 X.Y.Z-beta.1');
  console.log('示例: 1.0.0, 2.1.3, 1.0.0-beta.1');
  process.exit(1);
}

console.log(`\n🚀 开始更新版本号到 ${newVersion}...\n`);

// 更新 package.json
try {
  const packagePath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const oldVersion = packageJson.version;
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4) + '\n');
  console.log(`✅ package.json: ${oldVersion} → ${newVersion}`);
} catch (error) {
  console.error('❌ 更新 package.json 失败:', error.message);
  process.exit(1);
}

// 更新 Cargo.toml
try {
  const cargoPath = path.join(__dirname, '../src-tauri/Cargo.toml');
  let cargoContent = fs.readFileSync(cargoPath, 'utf8');
  const versionMatch = cargoContent.match(/version = "([^"]+)"/);
  const oldVersion = versionMatch ? versionMatch[1] : '未知';
  cargoContent = cargoContent.replace(
    /version = "[^"]+"/,
    `version = "${newVersion}"`
  );
  fs.writeFileSync(cargoPath, cargoContent);
  console.log(`✅ Cargo.toml: ${oldVersion} → ${newVersion}`);
} catch (error) {
  console.error('❌ 更新 Cargo.toml 失败:', error.message);
  process.exit(1);
}

// 更新 tauri.conf.json
try {
  const tauriConfPath = path.join(__dirname, '../src-tauri/tauri.conf.json');
  const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
  const oldVersion = tauriConf.package.version;
  tauriConf.package.version = newVersion;
  fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');
  console.log(`✅ tauri.conf.json: ${oldVersion} → ${newVersion}`);
} catch (error) {
  console.error('❌ 更新 tauri.conf.json 失败:', error.message);
  process.exit(1);
}

console.log('\n✨ 版本号更新完成！\n');
console.log('📝 接下来的步骤：');
console.log('1. 检查更改: git diff');
console.log('2. 提交更改: git add . && git commit -m "chore: bump version to v' + newVersion + '"');
console.log('3. 推送代码: git push');
console.log('4. 创建标签: git tag -a v' + newVersion + ' -m "Release v' + newVersion + '"');
console.log('5. 推送标签: git push origin v' + newVersion);
console.log('\n🎉 GitHub Actions 将自动开始构建和发布！\n');

