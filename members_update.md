# 🧬 Wang Lab 模块化成员页面系统

## 📋 系统概述

这是一个完全解耦的成员页面生成系统，通过分离**数据**、**模板**和**样式**，实现了高度可复用的架构。

## 🗂️ 文件结构

```
yfwang-lab.github.io/
├── assets/
│   └── js/
│       └── member-template.js          # 核心模板引擎（可复用）
├── members/
│   ├── data/                           # 成员数据文件夹
│   │   ├── zhaojinglu.json            # 赵静璐数据
│   │   ├── lidingyang.json            # 李定阳数据
│   │   └── ...                        # 其他成员数据
│   ├── generate-member-page.html      # 可视化页面生成器
│   ├── zhaojinglu-new.html            # 生成的页面
│   └── ...
└── index.html                       # 主页
```

## 🎯 核心组件

### 1. **模板引擎** (`member-template.js`)

这是系统的核心，包含一个 `MemberProfileTemplate` 类：

```javascript
const template = new MemberProfileTemplate(memberData);
const html = template.render();
```

**特性：**
- ✅ 完全独立，无外部依赖
- ✅ 支持所有常见模块（教育、研究、项目、论文、爱好）
- ✅ 自动处理可选字段
- ✅ 统一的样式和布局
- ✅ 可在浏览器或Node.js中使用

### 2. **数据文件** (JSON格式)

每个成员一个JSON文件，包含所有个人信息：

```json
{
  "name": "姓名",
  "position": "职位",
  "image": "照片路径",
  "email": "邮箱",
  "education": [...],
  "research": [...],
  "publications": [...]
}
```

### 3. **可视化生成器** (`generate-member-page.html`)

一个网页工具，可以：
- 📤 上传JSON数据文件
- 🎨 自动生成完整HTML
- 📋 一键复制代码
- 💾 直接保存为文件

## 🚀 使用方法

### 方法一：使用可视化生成器（推荐）
python3 -m http.server 8000
1. **打开生成器**
   ```
   在浏览器中打开：http://localhost:8000/members/generate-member-page.html
   ```

2. **准备数据文件**
   - 创建或编辑 `members/data/姓名.json`
   - 参考现有文件格式填写信息

3. **生成页面**
   - 点击"选择文件"，上传JSON
   - 点击"生成页面"
   - 复制生成的HTML代码
   - 保存为 `members/姓名-new.html`

4. **更新主页**
   - 在 `index.html` 中添加成员卡片链接

### 方法二：使用命令行（Node.js）

```javascript
const MemberProfileTemplate = require('./assets/js/member-template.js');
const fs = require('fs');

// 读取数据
const memberData = JSON.parse(fs.readFileSync('./members/data/zhaojinglu.json'));

// 生成HTML
const template = new MemberProfileTemplate(memberData);
const html = template.render();

// 保存文件
fs.writeFileSync('./members/zhaojinglu-new.html', html);
```

### 方法三：直接在浏览器中使用

```html
<script src="../assets/js/member-template.js"></script>
<script>
    fetch('data/zhaojinglu.json')
        .then(res => res.json())
        .then(data => {
            const template = new MemberProfileTemplate(data);
            document.body.innerHTML = template.render();
        });
</script>
```

## 📝 JSON数据格式详解

### 必填字段

```json
{
  "name": "姓名",                    // 必填
  "position": "职位描述",            // 必填
  "image": "../assets/images/xxx.jpg" // 必填
}
```

### 可选字段

```json
{
  "email": "邮箱地址",
  "institution": "所在机构",
  "links": [                         // 外部链接
    {
      "icon": "fab fa-researchgate", // Font Awesome图标
      "url": "https://...",
      "text": "显示文本"
    }
  ],
  "education": [                     // 教育背景
    {
      "degree": "学位名称",
      "institution": "学校",
      "period": "时间段（可选）"
    }
  ],
  "research": [                      // 研究兴趣（字符串数组）
    "研究方向1",
    "研究方向2"
  ],
  "projects": [                      // 科研项目
    {
      "title": "项目名称",
      "description": "项目描述",
      "role": "角色（如PI）",
      "period": "时间段",
      "status": "状态"
    }
  ],
  "publications": [                  // 发表论文
    {
      "citation": "完整引用（支持HTML）",
      "isFirst": true                // 是否为第一作者
    }
  ],
  "hobbies": [                       // 兴趣爱好
    {
      "name": "爱好名称",
      "icon": "fas fa-hiking"        // Font Awesome图标
    }
  ]
}
```

## 🎨 自定义样式

### 修改颜色主题

在 `member-template.js` 中修改：

```javascript
// 主色调
text-teal-600    → 改为你想要的颜色
bg-teal-100      → 对应的浅色背景

// 第一作者论文边框
border-teal-500  → 主色调
border-blue-400  → 非第一作者
```

### 添加新模块

在 `MemberProfileTemplate` 类中添加新方法：

```javascript
renderNewSection() {
    if (!this.data.newField) return '';
    
    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">
                <i class="fas fa-icon text-teal-600 mr-3"></i>
                新模块标题
            </h2>
            <!-- 你的内容 -->
        </div>
    `;
}
```

然后在 `renderContentSections()` 中调用：

```javascript
renderContentSections() {
    return `
        <div class="space-y-6">
            ${this.data.education ? this.renderEducation() : ''}
            ${this.data.newField ? this.renderNewSection() : ''}
            ...
        </div>
    `;
}
```

## 🔄 批量生成脚本

创建 `generate-all.js`：

```javascript
const MemberProfileTemplate = require('./assets/js/member-template.js');
const fs = require('fs');
const path = require('path');

const dataDir = './members/data';
const outputDir = './members';

// 读取所有JSON文件
fs.readdirSync(dataDir).forEach(file => {
    if (file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, file)));
        const template = new MemberProfileTemplate(data);
        const html = template.render();
        
        const outputFile = file.replace('.json', '-new.html');
        fs.writeFileSync(path.join(outputDir, outputFile), html);
        console.log(`✅ 生成: ${outputFile}`);
    }
});
```

运行：
```bash
node generate-all.js
```

## 📦 优势总结

### ✅ 完全解耦
- 数据（JSON）与模板（JS）分离
- 样式统一管理
- 易于维护和更新

### ✅ 高度复用
- 一个模板适用所有成员
- 添加新成员只需创建JSON文件
- 无需编写HTML代码

### ✅ 灵活扩展
- 轻松添加新字段
- 自定义样式和布局
- 支持多种使用方式

### ✅ 版本控制友好
- JSON文件易于diff
- 模板变更影响所有页面
- 便于团队协作

## 🛠️ 常见问题

### Q: 如何更新所有成员页面的样式？
A: 只需修改 `member-template.js`，然后重新生成所有页面。

### Q: 某个成员没有论文怎么办？
A: 不填写 `publications` 字段即可，模板会自动跳过该模块。

### Q: 可以添加自定义HTML吗？
A: 可以！在JSON的 `citation` 等字段中可以使用HTML标签。

### Q: 如何修改导航栏？
A: 在 `member-template.js` 的 `renderNavigation()` 方法中修改。

## 📞 技术支持

如有问题，请查看：
- 示例数据：`members/data/zhaojinglu.json`
- 模板源码：`assets/js/member-template.js`
- 生成器：`members/generate-member-page.html`

---
最后更新：2025年11月
