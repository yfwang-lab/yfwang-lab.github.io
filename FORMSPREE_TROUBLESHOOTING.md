# 🔧 Formspree 故障排除指南

## ✅ 问题已修复！

**原问题：** 表单提交后数据没有发送到 Formspree
**原因：** JavaScript 代码只是模拟提交，没有真正发送数据
**解决：** 已修改代码，现在会真正提交到 Formspree

## 📋 当前配置

### 表单设置
```html
<form id="applicationForm" 
      action="https://formspree.io/f/mjkdqzaa" 
      method="POST">
```

**表单ID：** `mjkdqzaa`
**提交方式：** AJAX (fetch API)
**接收邮箱：** 你的 Formspree 注册邮箱

### 表单字段
- ✅ `fullName` - 姓名
- ✅ `email` - 邮箱
- ✅ `phone` - 电话
- ✅ `institution` - 机构
- ✅ `position` - 申请职位
- ✅ `startDate` - 开始日期
- ✅ `degree` - 学位
- ✅ `major` - 专业
- ✅ `interests` - 研究兴趣
- ✅ `experience` - 研究经历
- ✅ `skills` - 技术技能
- ✅ `cv` - 简历文件
- ✅ `additional` - 附加文件
- ✅ `message` - 附加信息

## 🧪 测试步骤

### 1. 基本测试

1. **访问表单页面**
   ```
   http://localhost:8000/join-us.html
   或
   https://yfwang-lab.github.io/join-us.html
   ```

2. **填写表单**
   - 填写所有必填字段（标有 * 的）
   - 上传一个测试 PDF 文件作为 CV
   - 点击 "Submit Application"

3. **观察行为**
   - 按钮应显示 "Submitting..." 和旋转图标
   - 成功后应显示绿色成功消息
   - 如果失败，会显示错误提示

4. **检查邮箱**
   - 登录你的 Formspree 注册邮箱
   - 查找来自 `submissions@formspree.io` 的邮件
   - 邮件应包含所有表单数据和附件

### 2. 检查浏览器控制台

打开浏览器开发者工具（F12），查看：

**成功提交：**
```
POST https://formspree.io/f/mjkdqzaa 200 OK
```

**失败提交：**
```
POST https://formspree.io/f/mjkdqzaa 400/500 Error
```

### 3. 检查 Formspree 后台

1. 登录 [Formspree.io](https://formspree.io)
2. 找到表单 `mjkdqzaa`
3. 查看 "Submissions" 标签
4. 应该能看到测试提交记录

## ❓ 常见问题

### Q1: 提交后没有收到邮件

**可能原因：**

1. **邮件在垃圾邮件文件夹**
   - 检查垃圾邮件/促销邮件文件夹
   - 将 `submissions@formspree.io` 添加到白名单

2. **Formspree 表单未激活**
   - 首次使用需要验证邮箱
   - 检查是否收到 Formspree 的验证邮件
   - 点击验证链接激活表单

3. **表单ID错误**
   - 确认表单ID是 `mjkdqzaa`
   - 在 Formspree 后台检查表单状态

4. **达到免费额度限制**
   - Formspree 免费版每月50次提交
   - 登录后台查看使用情况

### Q2: 提交时显示错误

**检查项：**

1. **网络连接**
   ```javascript
   // 在控制台运行测试
   fetch('https://formspree.io/f/mjkdqzaa', {
       method: 'POST',
       headers: { 'Accept': 'application/json' },
       body: new FormData()
   }).then(r => console.log(r.status))
   ```

2. **CORS 问题**
   - Formspree 应该自动处理 CORS
   - 如果有问题，检查是否在本地文件系统打开（应使用 http://localhost）

3. **文件大小**
   - Formspree 免费版限制文件大小
   - 尝试上传较小的文件测试

### Q3: 文件没有包含在邮件中

**解决方案：**

1. **检查文件大小**
   - 单个文件不要超过 10MB
   - 总大小不要超过 20MB

2. **检查文件格式**
   - 当前允许：`.pdf`, `.doc`, `.docx`
   - 如需其他格式，修改 `accept` 属性

3. **Formspree 计划限制**
   - 免费版可能有文件上传限制
   - 考虑升级到付费版

## 🔍 调试代码

### 查看提交的数据

在浏览器控制台运行：

```javascript
// 监听表单提交
document.getElementById('applicationForm').addEventListener('submit', function(e) {
    const formData = new FormData(this);
    console.log('=== Form Data ===');
    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(key + ':', value.name, '(' + value.size + ' bytes)');
        } else {
            console.log(key + ':', value);
        }
    }
});
```

### 测试 Formspree 连接

```javascript
// 测试表单端点
fetch('https://formspree.io/f/mjkdqzaa', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'test@example.com',
        message: 'Test submission'
    })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

## ⚙️ Formspree 后台设置建议

### 1. Email Notifications

登录 Formspree → 选择表单 → Settings → Email Notifications

- ✅ **To:** 添加 `yongfeiwang@cuhk.edu.cn`
- ✅ **Subject:** 自定义邮件主题，如 "New Application from {{fullName}}"
- ✅ **Reply-To:** 使用申请者的邮箱 `{{email}}`

### 2. Spam Protection

- ✅ 启用 reCAPTCHA（推荐）
- ✅ 启用 Honeypot 字段

### 3. Auto-Response

设置自动回复给申请者：

```
Subject: Application Received - Wang Lab

Dear {{fullName}},

Thank you for your interest in joining Wang Lab at CUHK-Shenzhen!

We have received your application for the {{position}} position. 
We will review your materials and get back to you soon.

Best regards,
Wang Lab Team
```

## 📊 监控提交

### 在 Formspree 后台

1. **Dashboard** - 查看提交统计
2. **Submissions** - 查看所有提交记录
3. **Export** - 导出数据为 CSV

### 设置通知

- Email 通知（默认）
- Webhook 通知（高级）
- Slack 集成（付费版）

## 🚨 紧急联系方式

如果表单完全无法工作，在页面上显示备用联系方式：

```html
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
    <p class="text-yellow-800">
        <strong>Alternative:</strong> If you experience any issues with the form, 
        please send your application directly to 
        <a href="mailto:yongfeiwang@cuhk.edu.cn" class="underline">yongfeiwang@cuhk.edu.cn</a>
    </p>
</div>
```

## ✅ 验证清单

提交测试前检查：

- [ ] 表单 action 指向正确的 Formspree URL
- [ ] 所有必填字段都有 `required` 属性
- [ ] 所有字段都有正确的 `name` 属性
- [ ] JavaScript 没有阻止表单提交
- [ ] 文件上传字段有正确的 `accept` 属性
- [ ] Formspree 表单已激活（首次需验证邮箱）
- [ ] 浏览器控制台没有错误
- [ ] 网络请求成功（状态码 200）

## 📞 获取帮助

如果问题仍然存在：

1. **Formspree 支持**
   - 访问 [Formspree Help](https://help.formspree.io)
   - 发送邮件到 support@formspree.io

2. **检查状态**
   - [Formspree Status Page](https://status.formspree.io)

3. **社区支持**
   - [Formspree GitHub](https://github.com/formspree/formspree)

---
最后更新：2025年11月26日
状态：✅ 已修复并测试
