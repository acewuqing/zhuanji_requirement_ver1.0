// 结算单页面专用功能

// 显示审核模态框
function showAuditModal(settlementNo) {
    const modal = document.getElementById('auditModal');
    const settlementNoSpan = document.getElementById('auditSettlementNo');
    
    if (modal && settlementNoSpan) {
        settlementNoSpan.textContent = settlementNo;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 隐藏审核模态框
function hideAuditModal() {
    const modal = document.getElementById('auditModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // 清空审核意见
        const opinionTextarea = document.getElementById('auditOpinion');
        if (opinionTextarea) {
            opinionTextarea.value = '';
        }
    }
}

// 显示详情模态框
function showDetailModal(settlementNo) {
    const modal = document.getElementById('detailModal');
    const settlementNoSpan = document.getElementById('detailSettlementNo');
    
    if (modal && settlementNoSpan) {
        settlementNoSpan.textContent = settlementNo;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 隐藏详情模态框
function hideDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 审核通过
function approveAudit() {
    const settlementNo = document.getElementById('auditSettlementNo').textContent;
    const opinion = document.getElementById('auditOpinion').value;
    
    // 这里可以添加审核通过的逻辑
    console.log('审核通过:', settlementNo, '意见:', opinion);
    
    // 模拟审核过程
    setTimeout(() => {
        alert('审核通过成功！');
        hideAuditModal();
        
        // 更新页面状态（实际项目中应该刷新数据）
        updateSettlementStatus(settlementNo, '审核通过');
    }, 1000);
}

// 审核拒绝
function rejectAudit() {
    const settlementNo = document.getElementById('auditSettlementNo').textContent;
    const opinion = document.getElementById('auditOpinion').value;
    
    if (!opinion.trim()) {
        alert('请填写拒绝原因！');
        return;
    }
    
    // 这里可以添加审核拒绝的逻辑
    console.log('审核拒绝:', settlementNo, '原因:', opinion);
    
    // 模拟审核过程
    setTimeout(() => {
        alert('审核拒绝成功！');
        hideAuditModal();
        
        // 更新页面状态（实际项目中应该刷新数据）
        updateSettlementStatus(settlementNo, '审核拒绝');
    }, 1000);
}

// 导出结算订单明细
function exportOrderDetails(settlementNo) {
    console.log('导出结算订单明细:', settlementNo);
    
    // 异步导出 - 显示成功提示
    showSuccessMessage('操作成功！任务生成后可点击查看导出记录，下载记录。');
    
    // 在实际应用中，这里会调用后端API
    // 例如：fetch('/api/export/settlement-details', { 
    //     method: 'POST', 
    //     body: JSON.stringify({ settlementNo: settlementNo }) 
    // })
    
    // 模拟异步导出过程
    setTimeout(() => {
        console.log('异步导出任务已提交:', settlementNo);
    }, 1000);
}

// 导出结算订单汇总
function exportOrderSummary(settlementNo) {
    console.log('导出结算订单汇总:', settlementNo);
    
    // 模拟导出过程
    const loadingMsg = '正在导出结算订单汇总...';
    showLoadingMessage(loadingMsg);
    
    setTimeout(() => {
        hideLoadingMessage();
        alert(`结算订单汇总导出成功！\n文件名：${settlementNo}_订单汇总_${getCurrentDate()}.xlsx`);
    }, 2000);
}

// 更新结算单状态
function updateSettlementStatus(settlementNo, status) {
    // 查找对应的表格行
    const table = document.querySelector('table');
    if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 1 && cells[1].textContent === settlementNo) {
                // 更新状态列
                const statusCell = cells[7];
                if (statusCell) {
                    const statusBadge = statusCell.querySelector('.status-badge');
                    if (statusBadge) {
                        statusBadge.className = `status-badge ${getStatusClass(status)}`;
                        statusBadge.textContent = status;
                    }
                }
                
                // 更新操作按钮
                const actionCell = cells[8];
                if (actionCell) {
                    updateActionButtons(actionCell, status, settlementNo);
                }
            }
        });
    }
}

// 更新操作按钮
function updateActionButtons(actionCell, status, settlementNo) {
    const actionButtons = actionCell.querySelector('.action-buttons');
    if (actionButtons) {
        actionButtons.innerHTML = '';
        
        switch (status) {
            case '审核通过':
                actionButtons.innerHTML = `
                    <button class="btn btn-info btn-sm" onclick="showDetailModal('${settlementNo}')">详情</button>
                    <button class="btn btn-secondary btn-sm" onclick="exportOrderDetails('${settlementNo}')">导出结算订单明细</button>
                `;
                break;
            case '审核拒绝':
                actionButtons.innerHTML = `
                    <button class="btn btn-info btn-sm" onclick="showDetailModal('${settlementNo}')">详情</button>
                `;
                break;
            case '待审核':
                actionButtons.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="showAuditModal('${settlementNo}')">审核</button>
                    <button class="btn btn-secondary btn-sm" onclick="exportOrderDetails('${settlementNo}')">导出结算订单明细</button>
                `;
                break;
        }
    }
}

// 获取状态对应的CSS类
function getStatusClass(status) {
    switch (status) {
        case '待审核':
            return 'status-pending';
        case '审核通过':
            return 'status-success';
        case '审核拒绝':
            return 'status-failed';
        default:
            return 'status-pending';
    }
}

// 获取导出记录状态对应的CSS类
function getExportStatusClass(status) {
    switch (status) {
        case '已完成':
            return 'status-success';
        case '执行中':
            return 'status-info';
        case '执行失败':
            return 'status-danger';
        default:
            return 'status-info';
    }
}

// 显示加载消息
function showLoadingMessage(message) {
    // 创建加载提示
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.className = 'loading-message';
    loadingDiv.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">${message}</div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
    
    // 显示动画
    setTimeout(() => {
        loadingDiv.classList.add('show');
    }, 10);
}

// 隐藏加载消息
function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loadingMessage');
    if (loadingDiv) {
        loadingDiv.classList.remove('show');
        setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }, 300);
    }
}

// 获取当前日期字符串
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定查询按钮事件
    const queryBtn = document.querySelector('.btn-primary');
    if (queryBtn && queryBtn.textContent.includes('查询')) {
        queryBtn.addEventListener('click', function() {
            console.log('执行结算单查询...');
            // 这里可以添加查询逻辑
        });
    }
    
    // 绑定重置按钮事件
    const resetBtn = document.querySelector('.btn-secondary');
    if (resetBtn && resetBtn.textContent.includes('重置')) {
        resetBtn.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                form.reset();
            }
        });
    }
    
    // 绑定分页事件
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
    
    // 点击模态框外部关闭
    document.addEventListener('click', function(e) {
        const auditModal = document.getElementById('auditModal');
        const detailModal = document.getElementById('detailModal');
        
        if (auditModal && e.target === auditModal) {
            hideAuditModal();
        }
        
        if (detailModal && e.target === detailModal) {
            hideDetailModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAuditModal();
            hideDetailModal();
            hideExportRecordModal();
        }
    });
    
    // 绑定导出记录模态框事件
    const exportRecordModal = document.getElementById('exportRecordModal');
    if (exportRecordModal) {
        exportRecordModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideExportRecordModal();
            }
        });
    }
}); 

// 显示导出记录模态框
function showExportRecordModal() {
    const modal = document.getElementById('exportRecordModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        loadExportRecords(); // 每次弹窗时加载数据
    }
}

// 隐藏导出记录模态框
function hideExportRecordModal() {
    const modal = document.getElementById('exportRecordModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 下载文件
function downloadFile(fileName) {
    // 模拟文件下载
    console.log('下载文件:', fileName);
    
    // 在实际应用中，这里会创建一个下载链接
    // 例如：window.open('/api/download/' + fileName);
    
    showSuccessMessage('文件下载开始...');
}

// 重试导出
function retryExport(fileName) {
    console.log('重试导出:', fileName);
    showLoadingMessage('正在重试导出...');
    // 模拟重试过程
    setTimeout(() => {
        hideLoadingMessage();
        alert(`重试导出成功！\n文件名：${fileName}`);
        loadExportRecords(); // 刷新列表
    }, 1500);
}

function loadExportRecords() {
    // 模拟从服务器获取导出记录数据
    const exportRecords = [
        {
            fileName: 'JS20241201001_结算订单明细_20241201153022.xlsx',
            status: '已完成',
            operationTime: '2024-12-01 15:30:22',
            operator: 'admin'
        },
        {
            fileName: 'JS20241101001_结算订单明细_20241201091530.xlsx',
            status: '已完成',
            operationTime: '2024-12-01 09:15:30',
            operator: 'admin'
        },
        {
            fileName: 'JS20241201001_结算订单明细_20241201154500.xlsx',
            status: '执行中',
            operationTime: '2024-12-01 15:45:00',
            operator: 'admin'
        },
        {
            fileName: 'JS20241001001_结算订单明细_20241101103045.xlsx',
            status: '执行失败',
            operationTime: '2024-11-01 10:30:45',
            operator: 'admin'
        },
        // 新增几条演示数据
        {
            fileName: 'JS20240901001_结算订单明细_20241001120000.xlsx',
            status: '已完成',
            operationTime: '2024-10-01 12:00:00',
            operator: 'user1'
        },
        {
            fileName: 'JS20240801001_结算订单明细_20240901100000.xlsx',
            status: '执行中',
            operationTime: '2024-09-01 10:00:00',
            operator: 'user2'
        },
        {
            fileName: 'JS20240701001_结算订单明细_20240801150000.xlsx',
            status: '执行失败',
            operationTime: '2024-08-01 15:00:00',
            operator: 'user3'
        }
    ];
    
    renderExportRecords(exportRecords);
}

// 渲染导出记录列表
function renderExportRecords(records) {
    const tbody = document.getElementById('exportRecordTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.fileName}</td>
            <td><span class="status-badge ${getExportStatusClass(record.status)}">${record.status}</span></td>
            <td>${record.operationTime}</td>
            <td>${record.operator}</td>
            <td>
                ${record.status === '已完成' ? 
                    `<button class="btn btn-primary btn-sm" onclick="downloadFile('${record.fileName}')">下载</button>` : 
                    record.status === '执行失败' ? 
                        `<span class="text-muted">导出失败</span>` : 
                        `<span class="text-muted">处理中...</span>`
                }
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 显示成功提示消息
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message top-right';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}