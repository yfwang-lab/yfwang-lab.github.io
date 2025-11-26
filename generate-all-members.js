#!/usr/bin/env node

/**
 * 批量生成所有成员页面
 * 使用方法：node generate-all-members.js
 */

const fs = require('fs');
const path = require('path');

// 导入模板引擎
const MemberProfileTemplate = require('./assets/js/member-template.js');

// 配置路径
const DATA_DIR = path.join(__dirname, 'members', 'data');
const OUTPUT_DIR = path.join(__dirname, 'members');

console.log('🧬 Wang Lab 成员页面批量生成器\n');
console.log('📂 数据目录:', DATA_DIR);
console.log('📂 输出目录:', OUTPUT_DIR);
console.log('');

// 检查目录是否存在
if (!fs.existsSync(DATA_DIR)) {
    console.error('❌ 错误：数据目录不存在！');
    console.error('   请创建目录：members/data/');
    process.exit(1);
}

// 读取所有JSON文件
const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));

if (files.length === 0) {
    console.warn('⚠️  警告：未找到任何JSON数据文件');
    console.log('   请在 members/data/ 目录中添加成员数据文件');
    process.exit(0);
}

console.log(`📋 找到 ${files.length} 个成员数据文件\n`);

let successCount = 0;
let errorCount = 0;

// 处理每个文件
files.forEach((file, index) => {
    try {
        console.log(`[${index + 1}/${files.length}] 处理: ${file}`);
        
        // 读取JSON数据
        const filePath = path.join(DATA_DIR, file);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const memberData = JSON.parse(jsonData);
        
        // 生成HTML
        const template = new MemberProfileTemplate(memberData);
        const html = template.render();
        
        // 确定输出文件名
        const outputFileName = file.replace('.json', '-new.html');
        const outputPath = path.join(OUTPUT_DIR, outputFileName);
        
        // 写入文件
        fs.writeFileSync(outputPath, html, 'utf8');
        
        console.log(`   ✅ 成功生成: ${outputFileName}`);
        console.log(`   👤 成员: ${memberData.name}`);
        console.log('');
        
        successCount++;
    } catch (error) {
        console.error(`   ❌ 错误: ${error.message}`);
        console.log('');
        errorCount++;
    }
});

// 输出统计
console.log('━'.repeat(50));
console.log('📊 生成统计:');
console.log(`   ✅ 成功: ${successCount} 个`);
console.log(`   ❌ 失败: ${errorCount} 个`);
console.log(`   📁 总计: ${files.length} 个`);
console.log('━'.repeat(50));

if (successCount > 0) {
    console.log('\n🎉 页面生成完成！');
    console.log('💡 下一步：');
    console.log('   1. 检查生成的HTML文件');
    console.log('   2. 在主页 indexnew.html 中添加成员链接');
    console.log('   3. 提交到Git仓库');
}

if (errorCount > 0) {
    console.log('\n⚠️  部分文件生成失败，请检查错误信息');
    process.exit(1);
}
