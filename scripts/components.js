// 公共组件管理脚本

// 页面配置
const pageConfig = {
    'index.html': {
        title: '系统首页',
        subtitle: '专技系统管理控制台',
        activePage: 'home',
        breadcrumb: ['首页']
    },
    'index-new.html': {
        title: '交易账单',
        subtitle: '财务对账管理',
        activePage: 'financial-reconciliation',
        breadcrumb: ['首页', '财务账单', '交易账单']
    },
    'settlement_statement.html': {
        title: '结算单管理',
        subtitle: '财务结算单审核与管理',
        activePage: 'settlement-statement',
        breadcrumb: ['首页', '财务账单', '结算单']
    },
    'example-page.html': {
        title: '示例页面',
        subtitle: '组件化架构演示',
        activePage: 'example-page',
        breadcrumb: ['首页', '财务账单', '示例页面']
    },
    'financial_reconciliation_prototype.html': {
        title: '交易账单对账',
        subtitle: '财务报表管理',
        activePage: 'financial-reconciliation',
        breadcrumb: ['首页', '财务账单', '交易账单对账']
    },
    'refund_order_list.html': {
        title: '退款订单列表',
        subtitle: '学员退款订单管理',
        activePage: 'refund-order',
        breadcrumb: ['首页', '学员管理', '退款订单列表']
    },

    'test-prototype.html': {
        title: '测试页面',
        subtitle: '组件化架构验证',
        activePage: 'test-page',
        breadcrumb: ['首页', '财务账单', '测试页面']
    },
    'test-fix.html': {
        title: '修复测试页面',
        subtitle: '组件化修复验证',
        activePage: 'test-fix',
        breadcrumb: ['首页', '财务账单', '修复测试']
    },
    'test-navigation.html': {
        title: '导航测试页面',
        subtitle: '菜单导航功能验证',
        activePage: 'test-navigation',
        breadcrumb: ['首页', '财务账单', '导航测试']
    },
    'test-modal.html': {
        title: '弹窗测试页面',
        subtitle: '确认弹窗优化验证',
        activePage: 'test-modal',
        breadcrumb: ['首页', '财务账单', '弹窗测试']
    },
    'test-compact-modal.html': {
        title: '紧凑弹窗测试',
        subtitle: '进一步优化弹窗布局',
        activePage: 'test-compact-modal',
        breadcrumb: ['首页', '财务账单', '紧凑弹窗测试']
    }
};

// 组件内容缓存
const componentCache = {
    'sidebar': `
        <!-- 左侧菜单导航栏组件 -->
        <div class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDJMMjggMTZIMjBWMzBIMTJWMjZIMFYxNkwxNiAyWiIgZmlsbD0iIzE4OTBmZiIvPgo8L3N2Zz4K" alt="Logo">
                    <span class="logo-text">专技系统</span>
                </div>
                <button class="sidebar-toggle" id="sidebarToggle">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            
            <nav class="sidebar-nav">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <div class="nav-link nav-parent expanded" data-menu="finance">
                            <div class="nav-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 1V15M4 5H12M4 9H12M4 13H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <span class="nav-text">财务账单</span>
                            <svg class="nav-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <ul class="nav-submenu expanded" id="finance-submenu">
                            <li class="nav-item">
                                <a href="financial_reconciliation_prototype.html" class="nav-link nav-child" data-page="financial-reconciliation">
                                    <div class="nav-icon">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 2H12V12H2V2Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M2 6H12M6 2V12" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <span class="nav-text">交易账单</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="settlement_statement.html" class="nav-link nav-child" data-page="settlement-statement">
                                    <div class="nav-icon">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 2H12V12H2V2Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M2 6H12M6 2V12" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <span class="nav-text">结算单</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link nav-parent" data-menu="student">
                            <div class="nav-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2C9.10457 2 10 2.89543 10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2Z" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <span class="nav-text">学员管理</span>
                            <svg class="nav-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <ul class="nav-submenu" id="student-submenu">
                            <li class="nav-item">
                                <a href="refund_order_list.html" class="nav-link nav-child" data-page="refund-order">
                                    <div class="nav-icon">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 2H12V12H2V2Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M4 6L10 6M4 9L10 9" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <span class="nav-text">退款订单</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
            
            <div class="sidebar-footer">
                <div class="user-info">
                    <div class="user-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="user-details">
                        <div class="user-name">财务管理员</div>
                        <div class="user-role">系统管理员</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    'top-nav': `
        <!-- 顶部导航栏组件 -->
        <div class="top-nav">
            <div class="top-nav-left">
                <div class="page-title">
                    <h1 id="pageTitle">页面标题</h1>
                    <span class="page-subtitle" id="pageSubtitle">页面副标题</span>
                </div>
            </div>
            <div class="top-nav-right">
                <div class="nav-actions">
                    <button class="nav-btn" title="消息通知">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 2C5.68629 2 3 4.68629 3 8V12L1 15H17L15 12V8C15 4.68629 12.3137 2 9 2Z" stroke="currentColor" stroke-width="1.5"/>
                            <circle cx="13" cy="5" r="2" fill="#ff4d4f"/>
                        </svg>
                    </button>
                    <button class="nav-btn" title="系统设置">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M16.5 9C16.5 8.5 16.3 8 16 7.5L17.5 6.5L16.5 5L15 6C14.5 5.7 14 5.5 13.5 5.5L13 4H11L10.5 5.5C10 5.5 9.5 5.7 9 6L7.5 5H6L7 6.5C6.7 7 6.5 7.5 6.5 8V9C6.5 9.5 6.7 10 7 10.5L6 11.5L7.5 12.5L9 12C9.5 12.3 10 12.5 10.5 12.5L11 14H13L13.5 12.5C14 12.5 14.5 12.3 15 12L16.5 13L17.5 11.5L16 10.5C16.3 10 16.5 9.5 16.5 9Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `
};

// 加载组件
async function loadComponent(componentName, targetId) {
    try {
        const target = document.getElementById(targetId);
        if (target && componentCache[componentName]) {
            target.innerHTML = componentCache[componentName];
        } else {
            console.error(`组件 ${componentName} 不存在或目标元素 ${targetId} 未找到`);
        }
    } catch (error) {
        console.error(`加载组件 ${componentName} 失败:`, error);
    }
}

// 初始化页面
async function initializePage() {
    const currentPage = getCurrentPage();
    const config = pageConfig[currentPage];
    
    if (config) {
        // 设置页面标题
        document.title = `${config.title} - 专技系统`;
        
        // 设置页面标题和副标题
        setPageTitle(config.title, config.subtitle);
        
        // 设置面包屑导航
        setBreadcrumb(config.breadcrumb);
        
        // 设置当前页面菜单高亮
        setActiveMenu(config.activePage);
    }
    
    // 初始化侧边栏交互
    initializeSidebar();
}

// 设置页面标题和副标题
function setPageTitle(title, subtitle) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    if (pageSubtitle) {
        pageSubtitle.textContent = subtitle;
    }
}

// 获取当前页面
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename || 'index.html';
}

// 设置面包屑导航
function setBreadcrumb(breadcrumbItems) {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (breadcrumbContainer && breadcrumbItems) {
        let breadcrumbHTML = '';
        breadcrumbItems.forEach((item, index) => {
            if (index === breadcrumbItems.length - 1) {
                breadcrumbHTML += `<span id="current-page">${item}</span>`;
            } else {
                breadcrumbHTML += `${item} <span>></span> `;
            }
        });
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
}

// 设置当前页面菜单高亮
function setActiveMenu(activePage) {
    // 移除所有活动状态
    const allMenuItems = document.querySelectorAll('.nav-child');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 设置当前页面为活动状态
    const currentMenuItem = document.querySelector(`[data-page="${activePage}"]`);
    if (currentMenuItem) {
        currentMenuItem.classList.add('active');
    }
}

// 初始化侧边栏交互
function initializeSidebar() {
    // 侧边栏切换
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // 保存状态到本地存储
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
    }
    
    // 恢复侧边栏状态
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true' && sidebar) {
        sidebar.classList.add('collapsed');
    }
    
    // 菜单展开/收起
    const navParents = document.querySelectorAll('.nav-parent');
    navParents.forEach(function(parent) {
        parent.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            const arrow = this.querySelector('.nav-arrow');
            
            // 切换展开状态
            this.classList.toggle('expanded');
            submenu.classList.toggle('expanded');
            
            // 旋转箭头
            if (arrow) {
                arrow.style.transform = this.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });
    
    // 移动端菜单处理
    handleMobileMenu();
    
    // 窗口大小改变时重新处理
    window.addEventListener('resize', handleMobileMenu);
}

// 移动端菜单处理
function handleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth <= 768) {
        // 创建遮罩层
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            // 点击遮罩层关闭菜单
            overlay.addEventListener('click', function() {
                if (sidebar) {
                    sidebar.classList.remove('show');
                }
                this.classList.remove('show');
            });
        }
        
        // 添加移动端菜单按钮
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn nav-btn';
            mobileBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 6H15M3 9H15M3 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
            mobileBtn.title = '菜单';
            
            const navActions = document.querySelector('.nav-actions');
            if (navActions) {
                navActions.insertBefore(mobileBtn, navActions.firstChild);
            }
            
            // 移动端菜单按钮点击事件
            mobileBtn.addEventListener('click', function() {
                if (sidebar) {
                    sidebar.classList.add('show');
                }
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) {
                    overlay.classList.add('show');
                }
            });
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 导出函数供其他脚本使用
window.ComponentManager = {
    loadComponent,
    initializePage,
    setActiveMenu,
    setBreadcrumb
}; 