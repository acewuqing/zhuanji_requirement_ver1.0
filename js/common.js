// 通用工具函数
const Utils = {
    // 导出表格数据为Excel
    exportToExcel: function(data, filename) {
        const ws_data = [data.headers, ...data.rows.map(row => 
            row.map(cell => cell.replace(/<[^>]*>/g, '')) // 移除HTML标签
        )];
        
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, data.title);
        
        const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        alert('表格数据已导出为Excel文件！');
    },

    // 下载图表
    downloadChart: function(canvasId, filename) {
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            const link = document.createElement('a');
            link.download = `${filename}_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    },

    // 格式化数字
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // 获取查询参数
    getUrlParams: function() {
        const params = {};
        window.location.search.substr(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) params[key] = decodeURIComponent(value || '');
        });
        return params;
    },

    // 设置页面标题
    setPageTitle: function(title, subtitle) {
        document.getElementById('moduleTitle').textContent = title;
        document.getElementById('moduleSubtitle').textContent = subtitle;
        document.title = title + ' - 资料管理系统';
    },

    // 渲染趋势图表
    renderTrendChart: function(ctx, data) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [{
                    label: '数据量',
                    data: data || [180, 165, 220, 245, 298, 315, 342, 368, 285, 312, 295, 278],
                    borderColor: '#1677ff',
                    backgroundColor: 'rgba(22, 119, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // 渲染饼图
    renderPieChart: function(ctx, data) {
        return new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    },

    // 生成状态徽章HTML
    generateStatusBadge: function(status, text) {
        const statusClass = {
            'success': 'success',
            'warning': 'warning', 
            'danger': 'danger',
            'excellent': 'success',
            'good': 'success',
            'average': 'warning',
            'poor': 'danger'
        };
        
        return `<span class="status-badge ${statusClass[status] || 'success'}">${text}</span>`;
    }
};

// 筛选器管理
const FilterManager = {
    // 初始化筛选器
    init: function() {
        document.getElementById('timeRange')?.addEventListener('change', this.onFilterChange);
        document.getElementById('productType')?.addEventListener('change', this.onFilterChange);
        document.getElementById('region')?.addEventListener('change', this.onFilterChange);
    },

    // 筛选器变化处理
    onFilterChange: function(e) {
        console.log('筛选器变化:', e.target.id, e.target.value);
        // 触发数据重新加载事件
        window.dispatchEvent(new CustomEvent('filterChange', {
            detail: {
                type: e.target.id,
                value: e.target.value
            }
        }));
    },

    // 获取当前筛选器状态
    getCurrentFilters: function() {
        return {
            timeRange: document.getElementById('timeRange')?.value || 'thisYear',
            productType: document.getElementById('productType')?.value || 'all',
            region: document.getElementById('region')?.value || 'all'
        };
    }
};

// 标签页管理
const TabManager = {
    // 切换标签页
    switchTab: function(event, tabId, skipEvent = false) {
        if (!skipEvent && event) {
            event.preventDefault();
        }
        
        // 更新标签导航状态
        document.querySelectorAll('.tab-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        if (event) {
            event.target.classList.add('active');
        } else {
            document.querySelector('.tab-nav-link').classList.add('active');
        }
        
        // 更新标签内容
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
        
        // 触发标签切换事件
        window.dispatchEvent(new CustomEvent('tabSwitch', {
            detail: { tabId: tabId }
        }));
    }
};

// 侧边栏管理
const SidebarManager = {
    // 设置活动菜单项
    setActiveMenuItem: function(moduleId) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-module="${moduleId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    FilterManager.init();
    
    // 监听筛选器变化事件
    window.addEventListener('filterChange', function(e) {
        console.log('全局筛选器变化事件:', e.detail);
        // 各个页面可以监听此事件来更新数据
    });
    
    // 监听标签切换事件
    window.addEventListener('tabSwitch', function(e) {
        console.log('标签切换事件:', e.detail);
        // 各个页面可以监听此事件来加载对应数据
    });
});

// 导出给全局使用
window.Utils = Utils;
window.FilterManager = FilterManager;
window.TabManager = TabManager;
window.SidebarManager = SidebarManager; 