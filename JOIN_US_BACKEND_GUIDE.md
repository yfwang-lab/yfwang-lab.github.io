# Join Us 表单后端集成指南

## 📋 概述

`join-us.html` 页面包含一个完整的在线申请表单，支持：
- ✅ 个人信息收集
- ✅ CV/简历上传
- ✅ 附加文件上传
- ✅ 表单验证
- ✅ 拖拽上传

## 🔧 当前状态

目前表单是**前端演示版本**，提交后数据会在浏览器控制台显示，但不会发送到服务器。

## 🚀 后端集成方案

### 方案1：使用 Formspree（最简单，无需编程）

1. **注册 Formspree**
   - 访问 https://formspree.io
   - 创建免费账户
   - 创建新表单，获取表单ID

2. **修改 join-us.html**
   ```html
   <!-- 找到这一行 -->
   <form id="applicationForm" class="space-y-6">
   
   <!-- 改为 -->
   <form id="applicationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="space-y-6">
   ```

3. **完成！** Formspree会自动：
   - 接收表单数据
   - 发送邮件通知
   - 存储提交记录
   - 处理文件上传

### 方案2：使用 Google Forms（免费）

1. **创建 Google Form**
   - 创建对应字段的表单
   - 获取表单提交URL

2. **使用 Google Apps Script**
   ```javascript
   // 在 join-us.html 中修改提交函数
   fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
       method: 'POST',
       body: formData
   })
   ```

### 方案3：自建后端（Node.js + Express）

#### 安装依赖
```bash
npm install express multer nodemailer cors
```

#### 创建 server.js
```javascript
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 配置文件上传
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDF, DOC, DOCX files are allowed'));
    }
});

// 配置邮件发送
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

// 处理表单提交
app.post('/api/submit-application', upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'additional', maxCount: 5 }
]), async (req, res) => {
    try {
        const formData = req.body;
        const files = req.files;

        // 准备邮件内容
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'yongfeiwang@cuhk.edu.cn',
            subject: `New Application: ${formData.fullName} - ${formData.position}`,
            html: `
                <h2>New Lab Application</h2>
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> ${formData.fullName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Institution:</strong> ${formData.institution}</p>
                
                <h3>Position Applied</h3>
                <p><strong>Position:</strong> ${formData.position}</p>
                <p><strong>Start Date:</strong> ${formData.startDate}</p>
                
                <h3>Education</h3>
                <p><strong>Highest Degree:</strong> ${formData.degree}</p>
                <p><strong>Major:</strong> ${formData.major}</p>
                
                <h3>Research Information</h3>
                <p><strong>Research Interests:</strong></p>
                <p>${formData.interests}</p>
                
                <p><strong>Experience:</strong></p>
                <p>${formData.experience || 'N/A'}</p>
                
                <p><strong>Skills:</strong></p>
                <p>${formData.skills || 'N/A'}</p>
                
                <p><strong>Additional Message:</strong></p>
                <p>${formData.message || 'N/A'}</p>
            `,
            attachments: [
                ...files.cv.map(f => ({ path: f.path })),
                ...(files.additional || []).map(f => ({ path: f.path }))
            ]
        };

        // 发送邮件
        await transporter.sendMail(mailOptions);

        // 返回成功响应
        res.json({
            success: true,
            message: 'Application submitted successfully'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application'
        });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### 修改 join-us.html
```javascript
// 在 join-us.html 中找到表单提交部分，替换为：
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
    submitBtn.disabled = true;
    
    // 发送到后端
    fetch('http://your-server.com/api/submit-application', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Submission failed. Please try again.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});
```

### 方案4：使用 Netlify Forms（推荐用于GitHub Pages）

1. **如果部署在 Netlify**，只需在表单中添加：
   ```html
   <form name="application" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
       <input type="hidden" name="form-name" value="application">
       <!-- 其他表单字段 -->
   </form>
   ```

2. **Netlify 会自动处理**：
   - 表单提交
   - 文件上传
   - 邮件通知
   - 垃圾邮件过滤

## 📧 邮件通知配置

### 使用 Gmail SMTP
```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password' // 需要在Google账户中生成应用专用密码
    }
});
```

### 使用 CUHK 邮箱
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.cuhk.edu.cn',
    port: 587,
    secure: false,
    auth: {
        user: 'yongfeiwang@cuhk.edu.cn',
        pass: 'your-password'
    }
});
```

## 📁 文件存储方案

### 本地存储
```javascript
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
```

### 云存储（AWS S3）
```javascript
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'your-bucket-name',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});
```

## 🔒 安全建议

1. **文件验证**
   - 限制文件类型（PDF, DOC, DOCX）
   - 限制文件大小（10MB）
   - 扫描病毒

2. **表单验证**
   - 前端验证（已实现）
   - 后端验证（必须）
   - 防止SQL注入

3. **防止垃圾邮件**
   - 添加 reCAPTCHA
   - 使用 honeypot 字段
   - 限制提交频率

4. **数据隐私**
   - HTTPS 加密传输
   - 安全存储个人信息
   - 遵守 GDPR/数据保护法

## 🧪 测试

### 本地测试
```bash
# 启动后端服务器
node server.js

# 在浏览器中打开
http://localhost:3000/join-us.html
```

### 测试清单
- [ ] 表单验证正常工作
- [ ] CV文件上传成功
- [ ] 附加文件上传成功
- [ ] 邮件通知发送成功
- [ ] 成功消息正确显示
- [ ] 错误处理正常工作
- [ ] 移动端显示正常

## 📊 数据管理

### 存储申请数据（可选）
```javascript
// 使用数据库存储
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    position: String,
    submittedAt: { type: Date, default: Date.now },
    cvPath: String,
    status: { type: String, default: 'pending' }
});

const Application = mongoose.model('Application', ApplicationSchema);

// 保存申请
const application = new Application(formData);
await application.save();
```

## 🎯 推荐方案

**对于快速部署：** 使用 **Formspree** 或 **Netlify Forms**
- 无需编程
- 5分钟配置完成
- 免费额度足够使用

**对于完全控制：** 使用 **Node.js + Express**
- 完全自定义
- 数据存储在自己服务器
- 可以添加更多功能

## 📞 技术支持

如需帮助配置后端，请联系：
- 实验室IT支持
- CUHK-SZ 技术服务部门

---
最后更新：2025年11月
