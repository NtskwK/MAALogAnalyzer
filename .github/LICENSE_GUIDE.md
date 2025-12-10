# 📜 开源许可证配置说明

## ✅ 当前配置

您的项目使用 **MIT License**，这是最流行的开源许可证之一。

### 已配置的文件

1. **`LICENSE`** - 根目录的许可证文件
   - 许可证类型：MIT License
   - 版权所有者：MaaXYZ
   - 版权年份：2025

2. **`src-tauri/Cargo.toml`**
   ```toml
   license = "MIT"
   ```

3. **`src-tauri/tauri.conf.json`**
   ```json
   "copyright": "Copyright © 2025"
   ```

## 🚀 自动打包时的作用

### 1. LICENSE 文件会被自动包含

Tauri 在打包时会自动将 `LICENSE` 文件包含到安装包中：

- **Windows (.msi)**：LICENSE 显示在安装向导中
- **macOS (.dmg)**：LICENSE 包含在应用包中
- **Linux (.deb)**：LICENSE 作为 copyright 文件

### 2. 版权信息显示

在应用程序的"关于"界面和安装程序中会显示：
- 产品名称：MAA 日志分析器
- 版权信息：Copyright © 2025
- 许可证：MIT License

### 3. GitHub Release 中的许可证

GitHub 会自动识别您的 LICENSE 文件，并在仓库页面显示许可证类型。

## 📝 MIT License 说明

### 允许的操作

✅ **商业使用** - 可用于商业项目  
✅ **修改** - 可以修改代码  
✅ **分发** - 可以分发软件  
✅ **私人使用** - 可以私人使用  
✅ **专利授权** - 授予专利权

### 必须遵守的条件

⚠️ **保留许可证和版权声明** - 必须在副本中包含原始许可证和版权声明

### 不提供的保障

❌ **责任** - 作者不承担任何责任  
❌ **担保** - 软件按"原样"提供，不提供任何担保

## 🔄 其他常见开源许可证

如果您想更改为其他许可证，以下是一些选择：

### Apache 2.0
- 类似 MIT，但更注重专利保护
- 适合：需要专利保护的项目

### GPL v3
- 强 copyleft 许可证
- 要求：衍生作品必须开源
- 适合：确保代码永远开源的项目

### BSD 3-Clause
- 类似 MIT，但禁止使用作者名字做宣传
- 适合：学术和研究项目

### Creative Commons (CC)
- 不适合软件代码
- 适合：文档、图片、设计等

## 🛠️ 如何更改许可证

如果需要更改为其他许可证：

### 1. 替换 LICENSE 文件

访问 [choosealicense.com](https://choosealicense.com/licenses/) 选择并复制新的许可证文本。

### 2. 更新 Cargo.toml

```toml
license = "Apache-2.0"  # 或其他许可证标识符
```

许可证标识符列表：https://spdx.org/licenses/

### 3. 更新 package.json（可选）

```json
{
  "license": "MIT"
}
```

### 4. 更新源代码文件头（可选）

某些许可证（如 Apache 2.0）建议在每个源文件开头添加许可证声明：

```rust
// Copyright 2025 MaaXYZ
//
// Licensed under the MIT License
```

## 📋 LICENSE 文件检查清单

在发布前检查：

- [ ] LICENSE 文件存在于项目根目录
- [ ] 版权年份正确（2025）
- [ ] 版权所有者正确（MaaXYZ）
- [ ] Cargo.toml 中的 license 字段已设置
- [ ] tauri.conf.json 中的 copyright 字段已设置
- [ ] 所有年份和信息保持一致

## 🔗 相关资源

- [Choose a License](https://choosealicense.com/) - 选择开源许可证
- [SPDX License List](https://spdx.org/licenses/) - 许可证标识符列表
- [Open Source Initiative](https://opensource.org/licenses) - OSI 认证的许可证
- [GitHub Licensing](https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) - GitHub 许可证文档

## 💡 最佳实践

1. **尽早选择许可证**  
   在项目初期就确定许可证类型

2. **保持一致性**  
   确保所有配置文件中的许可证信息一致

3. **明确归属**  
   在贡献指南中说明贡献者需要同意的许可证

4. **第三方依赖**  
   注意第三方库的许可证兼容性

5. **更新年份**  
   每年更新一次版权年份（可选）

---

**您当前的 MIT License 配置已经完善，可以直接用于自动打包发布！** ✅

