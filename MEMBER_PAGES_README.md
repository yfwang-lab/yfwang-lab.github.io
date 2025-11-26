# 成员页面系统说明

## 📁 文件结构

```
yfwang-lab.github.io/
├── indexnew.html                    # 主页（新版现代化设计）
├── members/                         # 成员详细页面目录
│   ├── zhaojinglu-new.html         # 赵静璐详细页面
│   ├── lidingyang-new.html         # 李定阳详细页面
│   ├── liyiyun-new.html            # 李怡芸详细页面
│   ├── cailizhi-new.html           # 蔡立志详细页面
│   └── xuyuan-new.html             # 徐源详细页面
├── assets/images/                   # 成员照片
│   ├── zhaojinglu1.jpg
│   ├── lidingyang.jpg
│   ├── liyiyun1.jpg
│   ├── cailizhi1.jpg
│   └── xuyuan1.jpg
└── logo.png                         # 实验室Logo
```

## ✨ 功能特性

### 1. **统一的现代化设计**
- 所有页面使用 Tailwind CSS 框架
- 与主页 `indexnew.html` 保持一致的视觉风格
- 响应式设计，支持移动端和桌面端

### 2. **点击跳转功能**
- 主页团队部分的每个成员卡片都可点击
- 点击后跳转到该成员的详细个人页面
- 个人页面包含"返回主页"按钮

### 3. **成员页面内容模块**
每个成员页面包含以下部分：
- **导航栏**：与主页一致，包含返回按钮
- **个人信息卡片**：头像、姓名、职位、联系方式
- **教育背景**：学历信息，带时间线样式
- **研究兴趣**：研究方向列表
- **科研项目**：主持或参与的项目（如适用）
- **发表论文**：学术成果列表
- **兴趣爱好**：个人爱好展示
- **页脚**：实验室Logo和版权信息

## 🎨 设计规范

### 颜色方案
- **主色调**：Teal-600 (#0d9488) - 实验室主题色
- **博士生**：Blue-600 (#2563eb)
- **硕士生**：Teal-600 (#0d9488)
- **本科生**：Purple-600 (#9333ea)
- **背景色**：Slate-50 (#f8fafc)

### 组件样式
- **卡片**：白色背景，圆角 (rounded-xl)，阴影效果
- **按钮**：悬停效果，平滑过渡
- **图片**：圆角设计，阴影增强层次感
- **图标**：Font Awesome 6.4.0

## 📝 如何添加新成员

### 步骤1：准备照片
将成员照片放入 `assets/images/` 目录，命名格式：`姓名拼音.jpg`

### 步骤2：创建个人页面
复制现有成员页面模板（如 `zhaojinglu-new.html`），修改以下内容：
1. `<title>` 标签中的姓名
2. 个人信息部分（姓名、职位、邮箱等）
3. 教育背景
4. 研究兴趣
5. 发表论文
6. 兴趣爱好
7. 图片路径

### 步骤3：更新主页
在 `indexnew.html` 的相应团队分组中添加成员卡片：

```html
<a href="members/新成员名-new.html" class="member-card bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200 hover:border-blue-300 transition block cursor-pointer">
    <img src="assets/images/新成员照片.jpg" alt="新成员名" class="w-24 h-24 mx-auto rounded-full object-cover mb-4 shadow-md">
    <h4 class="font-bold text-slate-900 text-sm">新成员名</h4>
    <p class="text-xs text-blue-600 font-bold uppercase mt-1">职位</p>
    <p class="text-xs text-slate-500 mt-1">专业</p>
</a>
```

## 🔧 技术栈

- **CSS框架**：Tailwind CSS 3.x (CDN)
- **图标库**：Font Awesome 6.4.0
- **字体**：Inter, system-ui
- **响应式**：移动优先设计

## 📱 响应式断点

- **移动端**：< 768px
- **平板**：768px - 1024px
- **桌面**：> 1024px

## 🚀 部署说明

1. 确保所有图片路径使用相对路径（不以 `/` 开头）
2. 测试所有链接是否正常工作
3. 提交到 GitHub 仓库
4. GitHub Pages 会自动部署

## 📞 维护联系

如需更新成员信息或添加新成员，请联系实验室管理员。

---
最后更新：2025年11月
