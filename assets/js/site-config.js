/**
 * Wang Lab 网站全局配置
 * 修改此文件即可更新整个网站的设置
 */

const SiteConfig = {
    // 实验室信息
    lab: {
        name: 'Wang Lab',
        shortName: 'CUHK-SZ',
        fullName: "Yongfei Wang's Lab",
        institution: 'CUHK-Shenzhen',
        fullInstitution: 'The Chinese University of Hong Kong, Shenzhen',
        department: 'Warshel Institute for Computational Biology',
        school: 'School of Medicine'
    },

    // PI 信息
    pi: {
        name: 'Yongfei WANG',
        title: 'Assistant Professor',
        email: 'yongfeiwang@cuhk.edu.cn',
        profileUrl: 'https://med.cuhk.edu.cn/en/teacher/733',
        image: '462c111e-5be7-45dc-9404-fc4063b9306e.png'
    },

    // 页脚配置
    footer: {
        backgroundColor: 'bg-white',
        borderColor: 'border-slate-200',
        textColor: 'text-slate-700',
        subtextColor: 'text-slate-500',
        logoPath: 'logo.png',
        showYear: true,
        customText: null // 如果需要自定义文本，在这里设置
    },

    // 导航栏配置
    navbar: {
        homePath: 'index.html',
        menuItems: [
            { name: 'Home', href: '#home', id: 'home' },
            { name: 'Research', href: '#research', id: 'research' },
            { name: 'Team', href: '#team', id: 'team' },
            { name: 'Funding', href: '#funding', id: 'funding' },
            { name: 'Publications', href: '#publications', id: 'publications' },
            { name: 'Teaching', href: '#teaching', id: 'teaching' },
            { name: 'Join Us', href: 'join-us.html', id: 'join-us' },
            { name: 'Contact', href: '#contact', id: 'contact' }
        ]
    },

    // 颜色主题
    theme: {
        primary: 'teal-600',
        primaryLight: 'teal-50',
        secondary: 'blue-600',
        accent: 'purple-600',
        text: 'slate-900',
        textLight: 'slate-600',
        background: 'slate-50'
    },

    // 社交媒体链接
    social: {
        email: 'yongfeiwang@cuhk.edu.cn',
        researchGate: null,
        googleScholar: null,
        github: null,
        twitter: null
    },

    // 表单配置
    forms: {
        formspreeId: 'mjkdqzaa', // Join Us 表单 ID
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFileTypes: ['.pdf', '.doc', '.docx']
    },

    // 联系信息
    contact: {
        email: 'yongfeiwang@cuhk.edu.cn',
        phone: null,
        address: 'Warshel Institute for Computational Biology, CUHK-Shenzhen',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.392847434086!2d114.26836931495804!3d22.53089998519586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f3c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2sCUHK-Shenzhen!5e0!3m2!1sen!2shk!4v1234567890123!5m2!1sen!2shk'
    },

    // 版权信息
    copyright: {
        year: new Date().getFullYear(),
        holder: "Yongfei Wang's Lab",
        allRightsReserved: true
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteConfig;
}

// 浏览器环境
if (typeof window !== 'undefined') {
    window.SiteConfig = SiteConfig;
}
