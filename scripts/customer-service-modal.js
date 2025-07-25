// 客服电话弹窗功能

// 全局变量
let customerServiceModal = null;
let copyToast = null;

// 初始化客服电话弹窗
function initCustomerServiceModal() {
    // 检查是否已经存在弹窗
    if (document.getElementById('customerServiceModal')) {
        return;
    }
    
    // 加载弹窗HTML
    loadCustomerServiceModalHTML();
    
    // 初始化事件监听
    initCustomerServiceEventListeners();
}

// 加载客服电话弹窗HTML
function loadCustomerServiceModalHTML() {
    const modalHTML = `
        <!-- 客服电话弹窗组件 -->
        <div class="customer-service-modal" id="customerServiceModal">
            <div class="customer-service-modal-content">
                <!-- 弹窗头部 -->
                <div class="customer-service-modal-header">
                    <h3>客服电话</h3>
                    <button class="customer-service-close-btn" onclick="closeCustomerServiceModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- 弹窗主体 -->
                <div class="customer-service-modal-body">
                    <!-- 客服电话 -->
                    <div class="contact-info-item">
                        <span class="contact-label">客服电话:</span>
                        <span class="contact-value">18685139192</span>
                        <button class="copy-btn" data-text="18685139192">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>

                    <!-- 学校电话 -->
                    <div class="contact-info-item">
                        <span class="contact-label">学校电话:</span>
                        <span class="contact-value">085188506066</span>
                        <button class="copy-btn" data-text="085188506066">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>

                    <!-- 分割线 -->
                    <div class="divider-line"></div>

                    <!-- 客服在线时间 -->
                    <div class="service-hours">
                        <div class="hours-header">客服在线时间:</div>
                        <div class="hours-item">
                            <span class="hours-label">上午</span>
                            <span class="hours-value">8:30-12:00</span>
                            <button class="copy-btn" data-text="上午8:30-12:00">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <div class="hours-item">
                            <span class="hours-label">下午</span>
                            <span class="hours-value">14:00-17:30</span>
                            <button class="copy-btn" data-text="下午14:00-17:30">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 复制成功提示 -->
        <div class="copy-toast" id="customerServiceCopyToast">
            <i class="fas fa-check"></i>
            <span>复制成功</span>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 获取元素引用
    customerServiceModal = document.getElementById('customerServiceModal');
    copyToast = document.getElementById('customerServiceCopyToast');
}

// 初始化客服电话弹窗事件监听
function initCustomerServiceEventListeners() {
    // 复制按钮事件
    const copyButtons = document.querySelectorAll('#customerServiceModal .copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            copyToClipboard(textToCopy);
            showCopyToast();
        });
    });
    
    // 点击遮罩层关闭弹窗
    customerServiceModal.addEventListener('click', function(e) {
        if (e.target === customerServiceModal) {
            closeCustomerServiceModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && customerServiceModal.classList.contains('show')) {
            closeCustomerServiceModal();
        }
    });
}

// 显示客服电话弹窗
function showCustomerServiceModal() {
    if (!customerServiceModal) {
        initCustomerServiceModal();
    }
    
    // 显示弹窗
    customerServiceModal.classList.add('show');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 添加动画类
    setTimeout(() => {
        customerServiceModal.querySelector('.customer-service-modal-content').style.transform = 'scale(1)';
    }, 10);
}

// 关闭客服电话弹窗
function closeCustomerServiceModal() {
    if (!customerServiceModal) return;
    
    // 添加关闭动画
    const modalContent = customerServiceModal.querySelector('.customer-service-modal-content');
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        customerServiceModal.classList.remove('show');
        modalContent.style.transform = '';
        modalContent.style.opacity = '';
        
        // 恢复背景滚动
        document.body.style.overflow = '';
    }, 200);
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(text).then(() => {
            console.log('复制成功');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        // 降级方案
        fallbackCopyToClipboard(text);
    }
}

// 降级复制方案
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        console.log('复制成功');
    } catch (err) {
        console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopyToast() {
    if (!copyToast) return;
    
    copyToast.classList.add('show');
    setTimeout(() => {
        copyToast.classList.remove('show');
    }, 2000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 自动初始化客服电话弹窗
    initCustomerServiceModal();
});

// 导出函数供全局使用
window.showCustomerServiceModal = showCustomerServiceModal;
window.closeCustomerServiceModal = closeCustomerServiceModal; 