# Tauri 图标目录

此目录用于存放应用图标。Tauri 会在初始化时自动生成默认图标。

## 自定义图标

如果要使用自定义图标，请准备以下文件：

### 源文件

- `icon.png` - 至少 512x512 像素的 PNG 文件

### 自动生成的文件

运行以下命令自动生成所有需要的图标尺寸：

```bash
npm run tauri icon path/to/your/icon.png
```

这将生成：

- `32x32.png`
- `128x128.png`
- `128x128@2x.png`
- `icon.icns` (macOS)
- `icon.ico` (Windows)
- `icon.png` (Linux)

## 注意事项

1. 图标应该是正方形
2. 推荐使用透明背景
3. PNG 格式，至少 512x512 像素
4. 边缘留一些空白，避免被裁切
