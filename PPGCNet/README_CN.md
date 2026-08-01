# 学术项目主页模板

这是一个纯静态网页模板，不需要安装 React、Vue 或数据库。解压后即可使用。

## 文件作用

- `index.html`：页面结构，通常不用改。
- `style.css`：颜色、字体、间距和视频布局。
- `config.js`：论文标题、作者、摘要、链接、图片和视频配置。你主要修改这个文件。
- `app.js`：自动生成页面并同步播放同一行视频，通常不用改。
- `assets/`：放论文 PDF、方法图和视频。

## 最快替换步骤

1. 用 VS Code 打开整个文件夹。
2. 打开 `config.js`，替换标题、作者、机构、摘要和链接。
3. 用自己的图片替换 `assets/teaser.svg`，或在 `config.js` 中修改图片路径。
4. 将视频分别放进：
   - `assets/videos/input-a/`
   - `assets/videos/input-b/`
   - `assets/videos/ours/`
5. 在 `config.js` 的 `comparison.samples` 中填写视频文件名。
6. 本地运行：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 视频配置示例

```javascript
comparison: {
  labels: ["Input", "Baseline", "Ours"],
  folders: [
    "assets/videos/input-a/",
    "assets/videos/input-b/",
    "assets/videos/ours/"
  ],
  samples: [
    {
      title: "Scene 01",
      files: [
        "input01.mp4",
        "baseline01.mp4",
        "ours01.mp4"
      ]
    }
  ]
}
```

三个 `files` 项会按顺序对应三个 `folders`。

## GitHub Pages 发布

将所有文件上传到 GitHub 仓库根目录，然后进入：

`Settings → Pages → Deploy from a branch → main → /(root)`

保存后即可发布。
