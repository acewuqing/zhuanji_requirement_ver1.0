// 左侧菜单交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏切换
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // 保存状态到本地存储
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
    }
    
    // 恢复侧边栏状态
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
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
    
    // 子菜单项点击
    const navChildren = document.querySelectorAll('.nav-child');
    navChildren.forEach(function(child) {
        child.addEventListener('click', function(e) {
            // 移除其他活动状态
            navChildren.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 加载页面内容
            const pageType = this.getAttribute('data-page');
            if (pageType) {
                loadPageContent(pageType, this.querySelector('.nav-text').textContent);
            }
            
            // 阻止事件冒泡
            e.stopPropagation();
        });
    });
    
    // 移动端菜单处理
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            // 创建遮罩层
            if (!document.querySelector('.sidebar-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                
                // 点击遮罩层关闭菜单
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('show');
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
                    sidebar.classList.add('show');
                    document.querySelector('.sidebar-overlay').classList.add('show');
                });
            }
        }
    }
    
    // 初始化移动端菜单
    handleMobileMenu();
    
    // 窗口大小改变时重新处理
    window.addEventListener('resize', handleMobileMenu);
    
    // 页面初始化时加载默认内容
    loadFinancialReconciliationContent();
});

// 模态框功能
function showConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function generateSettlement() {
    // 这里可以添加生成结算单的逻辑
    alert('结算单生成成功！');
    hideConfirmModal();
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('confirmModal');
    if (modal && e.target === modal) {
        hideConfirmModal();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideConfirmModal();
    }
});

// 表格标签页切换
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 移除其他活动状态
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 这里可以添加切换表格内容的逻辑
            const tabType = this.textContent.trim();
            console.log('切换到:', tabType);
        });
    });
});

// 表单重置功能
document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.querySelector('.btn-secondary');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                form.reset();
            }
        });
    }
});

// 查询功能
document.addEventListener('DOMContentLoaded', function() {
    const queryBtn = document.querySelector('.btn-primary');
    if (queryBtn) {
        queryBtn.addEventListener('click', function() {
            // 这里可以添加查询逻辑
            console.log('执行查询...');
            
            // 模拟查询结果
            setTimeout(function() {
                console.log('查询完成');
            }, 1000);
        });
    }
});

// 导出功能
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.btn-success');
    if (exportBtn && exportBtn.textContent.includes('导出')) {
        exportBtn.addEventListener('click', function() {
            // 这里可以添加导出逻辑
            console.log('开始导出数据...');
            
            // 模拟导出过程
            setTimeout(function() {
                alert('数据导出成功！');
            }, 2000);
        });
    }
});

// 分页功能
document.addEventListener('DOMContentLoaded', function() {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (this.textContent === '上一页' || this.textContent === '下一页') {
                // 处理上一页/下一页逻辑
                console.log('切换到:', this.textContent);
            } else {
                // 移除其他活动状态
                pageBtns.forEach(function(b) {
                    if (b !== btn && !b.textContent.includes('页')) {
                        b.classList.remove('active');
                    }
                });
                
                // 添加当前活动状态
                this.classList.add('active');
                
                // 这里可以添加页面切换逻辑
                console.log('切换到第', this.textContent, '页');
            }
        });
    });
});

// 工具提示功能
document.addEventListener('DOMContentLoaded', function() {
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(function(icon) {
        const tooltip = icon.getAttribute('title');
        if (tooltip) {
            // 移除默认title属性
            icon.removeAttribute('title');
            
            // 创建自定义工具提示
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltip;
            icon.appendChild(tooltipElement);
        }
    });
});

// 页面内容加载功能
function loadPageContent(pageType, pageName) {
    const contentContainer = document.getElementById('content-container');
    const currentPageSpan = document.getElementById('current-page');
    
    if (!contentContainer) return;
    
    // 更新面包屑导航
    if (currentPageSpan) {
        currentPageSpan.textContent = pageName;
    }
    
    // 根据页面类型加载不同内容
    switch (pageType) {
        case 'financial-reconciliation':
            loadFinancialReconciliationContent();
            break;
        default:
            console.log('未知的页面类型:', pageType);
    }
}

// 加载财务对账页面内容
function loadFinancialReconciliationContent() {
    const contentContainer = document.getElementById('content-container');
    
    // 显示加载状态
    contentContainer.innerHTML = '<div class="loading">正在加载财务对账页面...</div>';
    
    // 模拟加载延迟
    setTimeout(() => {
        try {
            // 直接嵌入财务对账页面的内容
            const financialContent = `
                <!-- 查询条件卡片 -->
                <div class="card">
                    <div class="card-title">查询条件</div>
                    <form class="form-grid">
                        <div class="form-group">
                            <label>订单号</label>
                            <input type="text" placeholder="请输入订单号">
                        </div>
                        <div class="form-group">
                            <label>专业</label>
                            <input type="text" placeholder="请输入专业名称">
                        </div>
                        <div class="form-group">
                            <label>科目</label>
                            <select>
                                <option value="">请选择科目</option>
                                <option value="1">计算机科学与技术</option>
                                <option value="2">软件工程</option>
                                <option value="3">数据科学</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>课程名称</label>
                            <input type="text" placeholder="请输入课程名称">
                        </div>
                        <div class="form-group">
                            <label>课程状态</label>
                            <select>
                                <option value="">请选择状态</option>
                                <option value="1">进行中</option>
                                <option value="2">已完成</option>
                                <option value="3">已取消</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>学员信息</label>
                            <input type="text" placeholder="姓名/手机号/身份证">
                        </div>
                        <div class="form-group">
                            <label>支付方式</label>
                            <select>
                                <option value="">请选择支付方式</option>
                                <option value="1">微信支付</option>
                                <option value="2">聚合支付</option>
                                <option value="3">余额支付</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>支付状态</label>
                            <select>
                                <option value="">请选择支付状态</option>
                                <option value="1">支付成功</option>
                                <option value="2">支付失败</option>
                                <option value="3">待支付</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>支付时间</label>
                            <div class="date-range">
                                <input type="date">
                                <span>至</span>
                                <input type="date">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>订单时间</label>
                            <div class="date-range">
                                <input type="date">
                                <span>至</span>
                                <input type="date">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>课程类型</label>
                            <select>
                                <option value="">请选择课程类型</option>
                                <option value="1">在线课程</option>
                                <option value="2">面授课程</option>
                                <option value="3">混合课程</option>
                            </select>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn btn-primary">查询</button>
                            <button type="button" class="btn btn-secondary">重置</button>
                            <button type="button" class="btn btn-success">导出</button>
                        </div>
                    </form>
                </div>

                <!-- 汇总信息 -->
                <div class="summary-container">
                    <!-- 收入汇总 -->
                    <div class="summary-group income-group">
                        <div class="summary-group-title">
                            <span class="income-title">收入汇总</span>
                        </div>
                        <div class="summary-grid">
                            <div class="summary-card">
                                <h4>收入金额合计（元）<span class="info-icon" title="用户支付金额合计（不含退款金额）=微信支付+聚合支付+余额支付">!</span></h4>
                                <div class="amount">¥125,680.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>微信支付合计（元）<span class="info-icon" title="用户微信支付金额（不含退款金额）">!</span></h4>
                                <div class="amount">¥68,420.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>聚合支付合计（元）<span class="info-icon" title="用户聚合支付金额（不含退款金额）">!</span></h4>
                                <div class="amount">¥42,160.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>余额支付合计（元）<span class="info-icon" title="用户余额支付金额（不含退款金额）">!</span></h4>
                                <div class="amount">¥15,100.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>后台开课合计（元）<span class="info-icon" title="管理员后台开课金额（不含退款金额）">!</span></h4>
                                <div class="amount">¥0.00</div>
                            </div>
                        </div>
                    </div>

                    <!-- 退款汇总 -->
                    <div class="summary-group refund-group">
                        <div class="summary-group-title">
                            <span class="refund-title">退款汇总</span>
                        </div>
                        <div class="summary-grid">
                            <div class="summary-card">
                                <h4>退款金额合计（元）<span class="info-icon" title="用户退款支付金额合计">!</span></h4>
                                <div class="amount">¥8,520.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>微信退款合计（元）<span class="info-icon" title="用户微信支付退款金额">!</span></h4>
                                <div class="amount">¥4,680.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>聚合退款合计（元）<span class="info-icon" title="用户聚合支付退款金额">!</span></h4>
                                <div class="amount">¥2,840.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>余额退款合计（元）<span class="info-icon" title="用户余额支付退款金额">!</span></h4>
                                <div class="amount">¥1,000.00</div>
                            </div>
                            <div class="summary-card">
                                <h4>后台开课合计（元）<span class="info-icon" title="管理员后台开退款课金额">!</span></h4>
                                <div class="amount">¥0.00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作区域 -->
                <div class="action-section">
                    <div class="action-left">
                        <span class="order-count">共查询到 <strong>1,256</strong> 条订单记录</span>
                        <span class="payment-count">支付订单：<strong>1,180</strong> 条</span>
                        <span class="refund-count">退款订单：<strong>76</strong> 条</span>
                    </div>
                    <div class="action-right">
                        <button class="btn btn-success" onclick="showConfirmModal()">生成结算单</button>
                    </div>
                </div>

                <!-- 表格区域 -->
                <div class="table-section">
                    <div class="table-header">
                        <div class="table-title">订单列表</div>
                        <div class="table-tabs">
                            <button class="tab active">交易账单</button>
                            <button class="tab">退款单</button>
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>订单号</th>
                                    <th>学员名称</th>
                                    <th>手机号</th>
                                    <th>课程名称</th>
                                    <th>课程类型</th>
                                    <th>有效类型</th>
                                    <th>有效结束时间</th>
                                    <th>订单时间</th>
                                    <th>冻结状态</th>
                                    <th>支付状态</th>
                                    <th>发票状态</th>
                                    <th>课程学时</th>
                                    <th>订单金额</th>
                                    <th>实付金额</th>
                                    <th>支付时间</th>
                                    <th>退款时间</th>
                                    <th>支付方式</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>DD20241201001</td>
                                    <td>张三</td>
                                    <td>138****8888</td>
                                    <td>Python数据分析基础</td>
                                    <td>在线课程</td>
                                    <td>永久有效</td>
                                    <td>2025-12-01</td>
                                    <td>2024-12-01 09:30:15</td>
                                    <td><span class="status-badge status-success">正常</span></td>
                                    <td><span class="status-badge status-success">已支付</span></td>
                                    <td><span class="status-badge status-pending">待开具</span></td>
                                    <td>48学时</td>
                                    <td>¥1,280.00</td>
                                    <td>¥1,280.00</td>
                                    <td>2024-12-01 09:35:22</td>
                                    <td>-</td>
                                    <td>微信支付</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>DD20241201002</td>
                                    <td>李四</td>
                                    <td>139****9999</td>
                                    <td>Java企业级开发</td>
                                    <td>在线课程</td>
                                    <td>一年有效</td>
                                    <td>2025-12-01</td>
                                    <td>2024-12-01 10:15:30</td>
                                    <td><span class="status-badge status-success">正常</span></td>
                                    <td><span class="status-badge status-success">已支付</span></td>
                                    <td><span class="status-badge status-success">已开具</span></td>
                                    <td>96学时</td>
                                    <td>¥2,580.00</td>
                                    <td>¥2,580.00</td>
                                    <td>2024-12-01 10:20:45</td>
                                    <td>-</td>
                                    <td>聚合支付</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>DD20241201003</td>
                                    <td>王五</td>
                                    <td>137****7777</td>
                                    <td>前端开发实战</td>
                                    <td>在线课程</td>
                                    <td>永久有效</td>
                                    <td>2025-12-01</td>
                                    <td>2024-12-01 11:00:00</td>
                                    <td><span class="status-badge status-frozen">已冻结</span></td>
                                    <td><span class="status-badge status-failed">已退款</span></td>
                                    <td><span class="status-badge status-pending">待开具</span></td>
                                    <td>64学时</td>
                                    <td>¥1,680.00</td>
                                    <td>¥1,680.00</td>
                                    <td>2024-12-01 11:05:12</td>
                                    <td>2024-12-01 14:30:00</td>
                                    <td>余额支付</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 分页 -->
                <div class="pagination">
                    <button class="page-btn">上一页</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <span>...</span>
                    <button class="page-btn">50</button>
                    <button class="page-btn">下一页</button>
                </div>
            `;
            
            // 更新内容容器
            contentContainer.innerHTML = financialContent;
            
            // 重新初始化工具提示
            initializeTooltips();
            
            // 重新绑定事件
            bindEvents();
            
        } catch (error) {
            console.error('加载页面内容失败:', error);
            contentContainer.innerHTML = '<div class="error">加载页面内容失败，请刷新页面重试。</div>';
        }
    }, 500); // 模拟500ms加载延迟
}

// 初始化工具提示
function initializeTooltips() {
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(function(icon) {
        const tooltip = icon.getAttribute('title');
        if (tooltip) {
            // 移除默认title属性
            icon.removeAttribute('title');
            
            // 创建自定义工具提示
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltip;
            icon.appendChild(tooltipElement);
        }
    });
}

// 重新绑定事件
function bindEvents() {
    // 重新绑定表格标签页事件
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // 重新绑定分页事件
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (this.textContent === '上一页' || this.textContent === '下一页') {
                console.log('切换到:', this.textContent);
            } else {
                pageBtns.forEach(function(b) {
                    if (b !== btn && !b.textContent.includes('页')) {
                        b.classList.remove('active');
                    }
                });
                this.classList.add('active');
                console.log('切换到第', this.textContent, '页');
            }
        });
    });
    
    // 重新绑定按钮事件
    const queryBtn = document.querySelector('.btn-primary');
    if (queryBtn) {
        queryBtn.addEventListener('click', function() {
            console.log('执行查询...');
        });
    }
    
    const resetBtn = document.querySelector('.btn-secondary');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                form.reset();
            }
        });
    }
    
    const exportBtn = document.querySelector('.btn-success');
    if (exportBtn && exportBtn.textContent.includes('导出')) {
        exportBtn.addEventListener('click', function() {
            console.log('开始导出数据...');
            setTimeout(function() {
                alert('数据导出成功！');
            }, 2000);
        });
    }
    
    const settlementBtn = document.querySelector('.btn-success');
    if (settlementBtn && settlementBtn.textContent.includes('生成结算单')) {
        settlementBtn.addEventListener('click', function() {
            showConfirmModal();
        });
    }
} 