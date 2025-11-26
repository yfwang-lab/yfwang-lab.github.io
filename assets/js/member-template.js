/**
 * Wang Lab Member Profile Template System
 * 统一的成员页面模板生成器
 */

class MemberProfileTemplate {
    constructor(memberData) {
        this.data = memberData;
    }

    /**
     * 生成完整的成员页面HTML
     */
    render() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.data.name} | Wang Lab - CUHK(SZ)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
        }
    </style>
</head>
<body class="antialiased">

    ${this.renderNavigation()}
    ${this.renderProfile()}
    ${this.renderFooter()}

</body>
</html>
        `.trim();
    }

    /**
     * 渲染导航栏
     */
    renderNavigation() {
        return `
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                        <i class="fas fa-dna"></i>
                    </div>
                    <span class="text-xl font-bold text-slate-900 tracking-tight">Wang Lab <span class="text-slate-400 font-light">| CUHK-SZ</span></span>
                </div>
                <div class="flex items-center gap-4">
                    <a href="../indexnew.html" class="text-sm font-medium text-slate-600 hover:text-teal-600 transition">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Home
                    </a>
                </div>
            </div>
        </div>
    </nav>
        `;
    }

    /**
     * 渲染个人资料部分
     */
    renderProfile() {
        return `
    <!-- Member Profile Section -->
    <section class="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            ${this.renderHeaderCard()}
            ${this.renderContentSections()}
        </div>
    </section>
        `;
    }

    /**
     * 渲染头部信息卡片
     */
    renderHeaderCard() {
        return `
            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
                <div class="p-8 md:p-12">
                    <div class="flex flex-col md:flex-row gap-8 items-start">
                        <!-- Profile Image -->
                        <div class="flex-shrink-0">
                            <img src="${this.data.image}" alt="${this.data.name}" class="w-48 h-48 rounded-2xl object-cover shadow-xl border-4 border-white">
                        </div>
                        
                        <!-- Basic Info -->
                        <div class="flex-grow">
                            <h1 class="text-4xl font-bold text-slate-900 mb-2">${this.data.name}</h1>
                            <p class="text-xl text-teal-600 font-semibold mb-4">${this.data.position}</p>
                            
                            <div class="space-y-2 text-slate-600">
                                ${this.data.email ? `
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-envelope text-teal-500"></i>
                                    <a href="mailto:${this.data.email}" class="hover:text-teal-600 transition">${this.data.email}</a>
                                </div>
                                ` : ''}
                                ${this.data.institution ? `
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-graduation-cap text-teal-500"></i>
                                    <span>${this.data.institution}</span>
                                </div>
                                ` : ''}
                                ${this.data.links ? this.renderLinks() : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染外部链接
     */
    renderLinks() {
        return this.data.links.map(link => `
                                <div class="flex items-center gap-2">
                                    <i class="${link.icon} text-teal-500"></i>
                                    <a href="${link.url}" target="_blank" class="hover:text-teal-600 transition">${link.text}</a>
                                </div>
        `).join('');
    }

    /**
     * 渲染内容部分
     */
    renderContentSections() {
        return `
            <!-- Content Sections -->
            <div class="space-y-6">
                ${this.data.education ? this.renderEducation() : ''}
                ${this.data.research ? this.renderResearch() : ''}
                ${this.data.projects ? this.renderProjects() : ''}
                ${this.data.publications ? this.renderPublications() : ''}
                ${this.data.hobbies ? this.renderHobbies() : ''}
            </div>
        `;
    }

    /**
     * 渲染教育背景
     */
    renderEducation() {
        const borderColors = ['border-teal-500', 'border-blue-400', 'border-slate-300'];
        return `
                <!-- Education -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <i class="fas fa-user-graduate text-teal-600 mr-3"></i>
                        Education
                    </h2>
                    <div class="space-y-4">
                        ${this.data.education.map((edu, index) => `
                        <div class="border-l-4 ${borderColors[index % borderColors.length]} pl-4">
                            <h3 class="font-bold text-slate-900">${edu.degree}</h3>
                            <p class="text-slate-600">${edu.institution}</p>
                            ${edu.period ? `<p class="text-sm text-slate-500">${edu.period}</p>` : ''}
                        </div>
                        `).join('')}
                    </div>
                </div>
        `;
    }

    /**
     * 渲染研究兴趣
     */
    renderResearch() {
        return `
                <!-- Research Interests -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <i class="fas fa-microscope text-teal-600 mr-3"></i>
                        Research Interests
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${this.data.research.map(item => `
                        <div class="flex items-start gap-3">
                            <i class="fas fa-dna text-teal-500 mt-1"></i>
                            <span class="text-slate-700">${item}</span>
                        </div>
                        `).join('')}
                    </div>
                </div>
        `;
    }

    /**
     * 渲染科研项目
     */
    renderProjects() {
        return `
                <!-- Research Projects -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <i class="fas fa-flask text-teal-600 mr-3"></i>
                        Research Projects
                    </h2>
                    <div class="space-y-4">
                        ${this.data.projects.map(project => `
                        <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                                <div>
                                    <h3 class="font-bold text-slate-900 mb-2">${project.title}</h3>
                                    ${project.description ? `<p class="text-slate-700 mb-2">${project.description}</p>` : ''}
                                    <div class="flex flex-wrap gap-2 text-sm">
                                        ${project.role ? `<span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-semibold">${project.role}</span>` : ''}
                                        ${project.period ? `<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">${project.period}</span>` : ''}
                                        ${project.status ? `<span class="px-3 py-1 bg-green-100 text-green-700 rounded-full">${project.status}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
        `;
    }

    /**
     * 渲染发表论文
     */
    renderPublications() {
        return `
                <!-- Publications -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <i class="fas fa-book text-teal-600 mr-3"></i>
                        Publications
                    </h2>
                    <div class="space-y-4">
                        ${this.data.publications.map(pub => `
                        <div class="border-l-4 ${pub.isFirst ? 'border-teal-500' : 'border-blue-400'} pl-4 py-2 hover:bg-slate-50 transition rounded-r">
                            <p class="text-slate-700">${pub.citation}</p>
                        </div>
                        `).join('')}
                    </div>
                </div>
        `;
    }

    /**
     * 渲染兴趣爱好
     */
    renderHobbies() {
        return `
                <!-- Hobbies -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <i class="fas fa-heart text-teal-600 mr-3"></i>
                        Hobbies & Interests
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-${Math.min(this.data.hobbies.length, 4)} gap-4">
                        ${this.data.hobbies.map(hobby => `
                        <div class="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <i class="${hobby.icon} text-3xl text-teal-500 mb-2"></i>
                            <p class="text-sm font-medium text-slate-700">${hobby.name}</p>
                        </div>
                        `).join('')}
                    </div>
                </div>
        `;
    }

    /**
     * 渲染页脚
     */
    renderFooter() {
        return `
    <!-- Footer -->
    <footer class="bg-slate-900 py-12 text-center mt-16">
        <div class="max-w-7xl mx-auto px-4">
            <img src="../logo.png" alt="Lab Logo" class="h-20 mx-auto mb-4 bg-white rounded-lg px-4 py-2 shadow-lg">
            <p class="text-slate-500 mb-2">Wang Lab @ CUHK-Shenzhen</p>
            <p class="text-slate-600 text-sm">&copy; 2025 Yongfei Wang's Lab. All rights reserved.</p>
        </div>
    </footer>
        `;
    }
}

// 导出供Node.js或浏览器使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemberProfileTemplate;
}
