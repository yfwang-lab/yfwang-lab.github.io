# 🚀 快速开始指南

## 添加新成员只需3步

### 步骤1：准备数据文件

复制模板并填写信息：
```bash
cp members/data/template.json members/data/新成员.json
```

编辑JSON文件，填写成员信息（参考 `zhaojinglu.json`）

### 步骤2：生成页面

**选项A - 可视化工具（推荐）：**
1. 打开 `members/generate-member-page.html`
2. 上传JSON文件
3. 复制生成的HTML
4. 保存为 `members/新成员-new.html`

**选项B - 命令行：**
```bash
node generate-all-members.js
```

### 步骤3：更新主页

在 `index.html` 添加成员卡片链接

完成！🎉

---

## 📚 详细文档

- 完整指南：`MODULAR_SYSTEM_GUIDE.md`
- 数据格式：`members/data/template.json`
- 示例数据：`members/data/zhaojinglu.json`
