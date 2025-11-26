# 📝 表单测试指南

## 🔧 已修复的问题

1. ✅ 移除了 CV 的 `required` 属性（Formspree 免费版可能不支持文件上传）
2. ✅ 添加了文件大小检查（>10MB 会提示）
3. ✅ 改进了错误处理和提示信息
4. ✅ 添加了备用方案提示（通过邮件发送）

## 🧪 测试步骤

### 测试 1：不带文件提交（推荐先测试这个）

1. 访问 `http://localhost:8000/join-us.html`
2. 填写所有文本字段：
   - Full Name: 测试用户
   - Email: test@example.com
   - Phone: 13800138000
   - Institution: Test University
   - Position: PhD Student
   - Degree: Master's Degree
   - Major: Bioinformatics
   - Research Interests: 填写一些文字
3. **不要上传文件**
4. 点击 "Submit Application"
5. 观察结果

**预期结果：**
- ✅ 显示 "Submitting..."
- ✅ 成功后显示绿色成功消息
- ✅ 你的邮箱收到通知（包含所有文本字段）

### 测试 2：带小文件提交

1. 准备一个小于 1MB 的 PDF 文件
2. 填写表单
3. 上传 PDF 文件
4. 提交

**预期结果：**
- ✅ 提交成功
- ✅ 弹出提示：请通过邮件发送 CV
- ✅ 邮件中可能包含或不包含文件（取决于 Formspree 配置）

### 测试 3：带大文件提交

1. 准备一个大于 10MB 的文件
2. 填写表单
3. 上传文件
4. 提交

**预期结果：**
- ✅ 弹出警告：文件太大
- ✅ 自动移除文件
- ✅ 仅提交文本数据

## 🔍 调试方法

### 1. 打开浏览器控制台

按 F12 打开开发者工具，查看：

**Console 标签：**
```
查看 JavaScript 错误和日志
```

**Network 标签：**
```
查找 formspree.io 的请求
点击查看：
- Request Headers
- Request Payload
- Response
```

### 2. 检查 Formspree 状态

访问：https://formspree.io/forms/mjkdqzaa/integration

检查：
- ✅ 表单是否激活（Active）
- ✅ 是否需要验证邮箱
- ✅ 文件上传是否启用

### 3. 查看详细错误

如果提交失败，控制台会显示：
```javascript
Error: [具体错误信息]
```

常见错误：
- `403 Forbidden` - 表单未激活或需要验证
- `422 Unprocessable Entity` - 数据格式错误
- `413 Payload Too Large` - 文件太大
- `Network Error` - 网络连接问题

## 💡 解决方案

### 方案 A：仅文本提交（最简单）

如果文件上传一直失败：

1. 用户填写表单（不上传文件）
2. 提交后收到确认
3. 用户单独发送 CV 到邮箱

**优点：** 100% 可靠
**缺点：** 需要两步操作

### 方案 B：使用 Google Forms（推荐）

如果 Formspree 问题持续：

1. 创建 Google Form
2. 添加文件上传字段
3. 替换表单 action

**优点：** 
- ✅ 免费
- ✅ 支持文件上传
- ✅ 自动保存到 Google Drive
- ✅ 可导出为 Excel

### 方案 C：升级 Formspree

Formspree 付费版：
- ✅ 无限提交
- ✅ 文件上传支持
- ✅ 自定义邮件模板
- ✅ Webhook 集成

价格：约 $10/月

## 📧 当前备用方案

表单页面已添加提示：

```
Note: If file upload fails, please email your CV directly to 
yongfeiwang@cuhk.edu.cn
```

这样即使文件上传失败，申请者也知道如何发送材料。

## ✅ 验证清单

提交测试后检查：

- [ ] 表单提交成功（显示成功消息）
- [ ] 收到邮件通知
- [ ] 邮件包含所有文本字段
- [ ] 邮件包含申请者邮箱（可回复）
- [ ] 文件上传成功或有备用方案提示
- [ ] 错误处理正常工作
- [ ] 用户体验流畅

## 🎯 推荐配置

### Formspree 后台设置

1. **Email Settings**
   - To: yongfeiwang@cuhk.edu.cn
   - Subject: New Application from {{fullName}}
   - Reply-To: {{email}}

2. **Form Settings**
   - Enable reCAPTCHA: ✅
   - Enable Honeypot: ✅
   - File Uploads: 启用（如果可用）

3. **Auto-Response**
   ```
   Subject: Application Received

   Dear {{fullName}},

   Thank you for your application to Wang Lab!
   We have received your information and will review it shortly.

   If you haven't already, please email your CV to yongfeiwang@cuhk.edu.cn

   Best regards,
   Wang Lab Team
   ```

## 📞 需要帮助？

如果测试失败：

1. **检查控制台错误** - 截图发送
2. **检查 Network 请求** - 查看响应内容
3. **尝试不带文件提交** - 确认基本功能
4. **检查 Formspree 后台** - 确认表单状态

---
最后更新：2025年11月26日
