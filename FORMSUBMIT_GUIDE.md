# 📧 FormSubmit.co 使用指南

## ✅ 已切换到 FormSubmit.co

**原因：** FormSubmit 免费版完全支持文件上传！

## 🎯 FormSubmit vs Formspree

| 功能 | FormSubmit | Formspree 免费版 |
|------|-----------|-----------------|
| **文件上传** | ✅ 完全支持 | ❌ 不支持/有限制 |
| **提交次数** | ✅ 无限制 | ❌ 50次/月 |
| **需要注册** | ❌ 不需要 | ✅ 需要验证 |
| **文件大小** | ✅ 最大 10MB | ❌ 受限 |
| **多文件上传** | ✅ 支持 | ❌ 不支持 |
| **配置复杂度** | ✅ 简单 | ❌ 较复杂 |
| **自定义感谢页** | ✅ 支持 | ✅ 支持 |
| **垃圾邮件防护** | ✅ 内置 | ✅ reCAPTCHA |

## 🚀 当前配置

### 表单设置

```html
<form action="https://formsubmit.co/yongfeiwang@cuhk.edu.cn" 
      method="POST" 
      enctype="multipart/form-data">
```

### 隐藏配置字段

```html
<!-- 自定义邮件主题 -->
<input type="hidden" name="_subject" value="New Application from Wang Lab Website">

<!-- 禁用验证码（可选） -->
<input type="hidden" name="_captcha" value="false">

<!-- 蜜罐字段防垃圾邮件 -->
<input type="text" name="_honey" style="display:none">
```

## 📝 工作流程

### 首次使用（重要！）

1. **提交第一个测试表单**
   - 访问 `http://localhost:8000/join-us.html`
   - 填写表单并提交

2. **检查邮箱**
   - 查看 `yongfeiwang@cuhk.edu.cn`
   - 会收到一封**激活邮件**

3. **点击激活链接**
   - 邮件中有一个确认链接
   - 点击确认后表单才会正式激活

4. **激活后**
   - 所有后续提交会直接发送到你的邮箱
   - 不再需要确认

### 正常使用流程

用户提交表单 → FormSubmit 处理 → 发送邮件到你的邮箱

**邮件包含：**
- ✅ 所有表单字段
- ✅ 文件附件（CV、其他文档）
- ✅ 提交时间
- ✅ 用户邮箱（可直接回复）

## 🎨 可选配置

### 1. 自定义感谢页面

添加隐藏字段：
```html
<input type="hidden" name="_next" value="https://yfwang-lab.github.io/thank-you.html">
```

### 2. 自定义邮件模板

添加隐藏字段：
```html
<input type="hidden" name="_template" value="table">
```

选项：
- `table` - 表格格式（推荐）
- `box` - 卡片格式
- `basic` - 基本格式

### 3. 抄送其他邮箱

添加隐藏字段：
```html
<input type="hidden" name="_cc" value="another@email.com">
```

### 4. 启用验证码

修改隐藏字段：
```html
<input type="hidden" name="_captcha" value="true">
```

### 5. 自定义回复邮箱

表单会自动使用申请者的邮箱作为回复地址（`email` 字段）

## 📧 收到的邮件格式

```
发件人: FormSubmit <noreply@formsubmit.co>
回复: 申请者邮箱
主题: New Application from Wang Lab Website

Full Name: 张三
Email: zhangsan@example.com
Phone: 13800138000
Institution: Test University
Position: PhD Student
Start Date: 2025-01-01
Degree: Master's Degree
Major: Bioinformatics
Interests: 研究兴趣内容...
Experience: 研究经历内容...
Skills: Python, R, Machine Learning
Message: 附加信息...

附件:
📎 CV.pdf (2.3 MB)
📎 Transcript.pdf (1.5 MB)
```

## 🧪 测试步骤

### 1. 首次激活测试

1. 访问表单页面
2. 填写所有必填字段
3. 上传一个小的 PDF 文件（<1MB）
4. 提交
5. 检查邮箱 `yongfeiwang@cuhk.edu.cn`
6. 点击激活链接

### 2. 正常提交测试

1. 再次填写表单
2. 上传 CV 文件
3. 提交
4. 应该立即收到邮件（包含附件）

### 3. 多文件测试

1. 填写表单
2. 上传 CV
3. 上传多个附加文件
4. 提交
5. 确认所有文件都在邮件中

## ⚠️ 注意事项

### 文件大小限制

- **单个文件：** 最大 10MB
- **总大小：** 建议不超过 20MB
- 超过限制会在提交前弹出警告

### 支持的文件格式

当前配置：
```html
accept=".pdf,.doc,.docx"
```

可以添加更多格式：
```html
accept=".pdf,.doc,.docx,.jpg,.png,.zip"
```

### 垃圾邮件防护

已启用蜜罐字段：
```html
<input type="text" name="_honey" style="display:none">
```

机器人会填写这个隐藏字段，FormSubmit 会自动拒绝。

## 🔧 故障排除

### 问题1：没有收到激活邮件

**解决：**
1. 检查垃圾邮件文件夹
2. 确认邮箱地址正确
3. 等待几分钟（可能有延迟）
4. 将 `noreply@formsubmit.co` 添加到白名单

### 问题2：激活后仍未收到邮件

**解决：**
1. 确认已点击激活链接
2. 检查垃圾邮件文件夹
3. 尝试提交另一个测试表单
4. 检查邮箱是否已满

### 问题3：文件未包含在邮件中

**解决：**
1. 确认表单有 `enctype="multipart/form-data"`
2. 检查文件大小（<10MB）
3. 确认文件格式被 `accept` 属性允许
4. 尝试更小的文件

### 问题4：提交后显示错误

**可能原因：**
- 表单未激活（首次需要激活）
- 文件太大
- 网络问题
- 邮箱地址格式错误

## 📊 监控和管理

### 查看提交记录

FormSubmit 不提供后台，所有提交直接发送到邮箱。

**建议：**
- 在邮箱中创建标签/文件夹
- 设置过滤规则自动分类
- 定期备份重要申请

### 邮箱过滤规则示例

Gmail 过滤器：
```
发件人: noreply@formsubmit.co
主题: New Application from Wang Lab
→ 标签: Lab Applications
→ 标记为重要
```

## 🎯 优化建议

### 1. 创建感谢页面

创建 `thank-you.html`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>Thank You - Wang Lab</title>
</head>
<body>
    <h1>Application Submitted!</h1>
    <p>Thank you for your interest in Wang Lab.</p>
    <p>We will review your application and contact you soon.</p>
    <a href="index.html">Return to Homepage</a>
</body>
</html>
```

然后在表单中添加：
```html
<input type="hidden" name="_next" value="https://yfwang-lab.github.io/thank-you.html">
```

### 2. 添加自动回复

FormSubmit 不支持自动回复，但你可以：
- 设置邮箱自动回复规则
- 或手动回复每个申请

### 3. 数据备份

建议：
- 定期导出邮件
- 保存到 Google Drive 或本地
- 创建申请者数据库（Excel/Notion）

## 🆚 对比其他方案

### FormSubmit vs Google Forms

| 功能 | FormSubmit | Google Forms |
|------|-----------|--------------|
| 集成到网站 | ✅ 完美 | ❌ 需要嵌入 |
| 自定义样式 | ✅ 完全自定义 | ❌ 有限 |
| 文件上传 | ✅ 邮件附件 | ✅ Google Drive |
| 数据管理 | ❌ 仅邮件 | ✅ 表格 |
| 免费额度 | ✅ 无限 | ✅ 无限 |

### 推荐使用场景

**使用 FormSubmit：**
- ✅ 需要完全自定义表单样式
- ✅ 希望通过邮件接收
- ✅ 不需要复杂的数据分析

**使用 Google Forms：**
- ✅ 需要数据统计和分析
- ✅ 需要团队协作查看
- ✅ 需要自动化工作流

## ✅ 当前状态

- ✅ 表单已配置 FormSubmit
- ✅ 支持文件上传（CV + 附加文件）
- ✅ 文件大小检查（10MB）
- ✅ 垃圾邮件防护
- ✅ 自定义邮件主题
- ⏳ 等待首次激活

## 📞 需要帮助？

FormSubmit 文档：https://formsubmit.co/documentation

常见问题：https://formsubmit.co/faq

---
最后更新：2025年11月26日
状态：✅ 已切换到 FormSubmit
