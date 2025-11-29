# 燕云十六声百业组织网站

这是一个展示燕云十六声百业组织相关信息的静态网站，包含首页、发展历程、职位介绍、照片墙和活动预告等页面。

## 项目结构

```
.
├── activities.html    # 活动预告页面
├── gallery.html       # 照片墙页面
├── history.html       # 发展历程页面
├── index.html         # 首页
├── positions.html     # 职位介绍页面
├── main.js            # 主要JavaScript文件
├── .gitignore         # Git忽略文件
└── resources/         # 资源文件夹，包含所有SVG图片
    ├── activities-gallery.svg
    ├── avatar-*.svg   # 头像SVG文件
    ├── calendar-activities.svg
    ├── development-timeline.svg
    ├── hero-guild-hall.svg
    └── occupations-grid.svg
```

## GitHub上传步骤

### 1. 准备工作

确保已安装Git，并在GitHub上创建了一个新的仓库。

### 2. 初始化Git仓库

打开命令行工具（PowerShell、CMD或Git Bash），导航到项目文件夹，然后执行以下命令：

```bash
cd e:\网站
git init
```

### 3. 添加所有文件到暂存区

```bash
git add .
```

### 4. 提交文件

```bash
git commit -m "初始化网站项目"
```

### 5. 连接到GitHub仓库

将`your-username`替换为你的GitHub用户名，`your-repository-name`替换为你创建的仓库名称：

```bash
git remote add origin https://github.com/your-username/your-repository-name.git
```

### 6. 推送到GitHub

```bash
git push -u origin main
```

### 7. 启用GitHub Pages（可选）

如果需要通过GitHub Pages托管网站：

1. 打开GitHub上的仓库页面
2. 点击"Settings"选项卡
3. 在左侧菜单中选择"Pages"
4. 在"Source"部分，从下拉菜单中选择"main"分支
5. 点击"Save"按钮
6. 稍等几分钟，GitHub将生成网站URL

## 注意事项

1. 所有资源文件都使用相对路径引用，确保在不同环境下都能正常显示
2. 图片资源全部使用SVG格式，存放在resources目录下
3. 网站使用了Tailwind CSS、Google Fonts和一些第三方JavaScript库

## 开发环境

- 推荐使用Visual Studio Code或其他现代代码编辑器
- 可以使用Live Server扩展进行本地预览
- 无需特殊构建工具，直接编辑HTML、CSS和JavaScript文件即可