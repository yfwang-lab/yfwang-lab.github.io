/**
 * Wang Lab 统一导航栏组件
 * 在所有页面中引用此文件，自动生成统一的导航栏
 */

class NavbarComponent {
    constructor(config = {}) {
        this.config = {
            labName: config.labName || 'Wang Lab',
            institution: config.institution || 'CUHK-SZ',
            homePath: config.homePath || 'indexnew.html',
            currentPage: config.currentPage || 'home',
            menuItems: config.menuItems || [
                { name: 'Home', href: '#home', id: 'home' },
                { name: 'Research', href: '#research', id: 'research' },
                { name: 'Team', href: '#team', id: 'team' },
                { name: 'Funding', href: '#funding', id: 'funding' },
                { name: 'Publications', href: '#publications', id: 'publications' },
                { name: 'Teaching', href: '#teaching', id: 'teaching' },
                { name: 'Join Us', href: 'join-us.html', id: 'join-us' },
                { name: 'Contact', href: '#contact', id: 'contact' }
            ],
            showBackButton: config.showBackButton || false,
            backButtonText: config.backButtonText || 'Back to Home',
            ...config
        };
    }

    /**
     * 生成导航栏 HTML
     */
    render() {
        return `
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                ${this.renderLogo()}
                ${this.renderMenu()}
                ${this.renderMobileToggle()}
            </div>
        </div>
        ${this.renderMobileMenu()}
    </nav>
        `.trim();
    }

    /**
     * 渲染 Logo
     */
    renderLogo() {
        return `
                <a href="${this.config.homePath}" class="flex items-center gap-3 hover:opacity-80 transition">
                    <div class="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                        <i class="fas fa-dna"></i>
                    </div>
                    <span class="text-xl font-bold text-slate-900 tracking-tight">${this.config.labName} <span class="text-slate-400 font-light">| ${this.config.institution}</span></span>
                </a>
        `.trim();
    }

    /**
     * 渲染菜单
     */
    renderMenu() {
        if (this.config.showBackButton) {
            return `
                <div class="flex items-center gap-4">
                    <a href="${this.config.homePath}" class="text-sm font-medium text-slate-600 hover:text-teal-600 transition">
                        <i class="fas fa-arrow-left mr-2"></i>${this.config.backButtonText}
                    </a>
                </div>
            `.trim();
        }

        const menuHtml = this.config.menuItems.map(item => {
            const isActive = item.id === this.config.currentPage;
            const activeClass = isActive ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-600 hover:text-teal-600';
            return `<a href="${item.href}" class="text-sm font-medium ${activeClass} transition">${item.name}</a>`;
        }).join('\n                    ');

        return `
                <div class="hidden md:flex space-x-8 text-sm font-medium">
                    ${menuHtml}
                </div>
        `.trim();
    }

    /**
     * 渲染移动端切换按钮
     */
    renderMobileToggle() {
        if (this.config.showBackButton) {
            return '';
        }
        return `
                <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="md:hidden text-slate-600 hover:text-teal-600">
                    <i class="fas fa-bars text-xl"></i>
                </button>
        `.trim();
    }

    /**
     * 渲染移动端菜单
     */
    renderMobileMenu() {
        if (this.config.showBackButton) {
            return '';
        }

        const mobileMenuHtml = this.config.menuItems.map(item => 
            `<a href="${item.href}" class="block py-2 text-slate-600">${item.name}</a>`
        ).join('\n            ');

        return `
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 p-4">
            ${mobileMenuHtml}
        </div>
        `.trim();
    }

    /**
     * 自动插入导航栏到页面
     */
    autoInsert() {
        if (typeof document !== 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                const nav = document.createElement('div');
                nav.innerHTML = this.render();
                document.body.insertBefore(nav.firstElementChild, document.body.firstChild);
            });
        }
    }

    /**
     * 替换现有导航栏
     */
    replace() {
        if (typeof document !== 'undefined') {
            document.addEventListener('DOMContentLoaded', () => {
                const existingNav = document.querySelector('nav');
                if (existingNav) {
                    const newNav = document.createElement('div');
                    newNav.innerHTML = this.render();
                    existingNav.replaceWith(newNav.firstElementChild);
                }
            });
        }
    }
}

// 导出供不同环境使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarComponent;
}

// 浏览器环境下自动可用
if (typeof window !== 'undefined') {
    window.NavbarComponent = NavbarComponent;
}
