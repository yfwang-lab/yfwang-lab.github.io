/**
 * Wang Lab 统一页脚组件
 * 在所有页面中引用此文件，自动生成统一的页脚
 */

class FooterComponent {
    constructor(config = {}) {
        this.config = {
            labName: config.labName || 'Wang Lab',
            institution: config.institution || 'CUHK-Shenzhen',
            year: config.year || new Date().getFullYear(),
            fullName: config.fullName || "Yongfei Wang's Lab",
            logoPath: config.logoPath || 'logo.png',
            backgroundColor: config.backgroundColor || 'bg-white',
            borderColor: config.borderColor || 'border-slate-200',
            textColor: config.textColor || 'text-slate-700',
            subtextColor: config.subtextColor || 'text-slate-500',
            ...config
        };
    }

    /**
     * 生成页脚 HTML
     */
    render() {
        return `
    <!-- Footer -->
    <footer class="${this.config.backgroundColor} border-t ${this.config.borderColor} py-12 text-center mt-16">
        <div class="max-w-7xl mx-auto px-4">
            <img src="${this.config.logoPath}" alt="Lab Logo" class="h-20 mx-auto mb-4 rounded-lg px-4 py-2 shadow-md">
            <p class="${this.config.textColor} font-medium mb-2">${this.config.labName} @ ${this.config.institution}</p>
            <p class="${this.config.subtextColor} text-sm">&copy; ${this.config.year} ${this.config.fullName}. All rights reserved.</p>
        </div>
    </footer>
        `.trim();
    }

    /**
     * 自动插入页脚到页面
     * 在 body 结束标签前插入
     */
    autoInsert() {
        if (typeof document !== 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                const footer = document.createElement('div');
                footer.innerHTML = this.render();
                document.body.appendChild(footer.firstElementChild);
            });
        }
    }

    /**
     * 替换现有页脚
     * 查找页面中的 footer 元素并替换
     */
    replace() {
        if (typeof document !== 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                const existingFooter = document.querySelector('footer');
                if (existingFooter) {
                    const newFooter = document.createElement('div');
                    newFooter.innerHTML = this.render();
                    existingFooter.replaceWith(newFooter.firstElementChild);
                }
            });
        }
    }
}

// 默认配置
const defaultFooter = new FooterComponent();

// 导出供不同环境使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
}

// 浏览器环境下自动可用
if (typeof window !== 'undefined') {
    window.FooterComponent = FooterComponent;
    window.labFooter = defaultFooter;
}
