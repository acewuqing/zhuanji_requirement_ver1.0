// 联系弹窗功能

// 全局变量
let contactModal = null;
let copyToast = null;

// 初始化弹窗
function initContactModal() {
    // 检查是否已经存在弹窗
    if (document.getElementById('contactModal')) {
        return;
    }
    
    // 加载弹窗HTML
    loadContactModalHTML();
    
    // 初始化事件监听
    initEventListeners();
}

// 加载弹窗HTML
function loadContactModalHTML() {
    const modalHTML = `
        <!-- 联系弹窗组件 -->
        <div class="contact-modal" id="contactModal">
            <div class="contact-modal-content">
                <!-- 弹窗头部 -->
                <div class="contact-modal-header">
                    <h3><i class="fas fa-headset"></i> 客服中心</h3>
                    <button class="contact-close-btn" onclick="closeContactModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- 弹窗主体 -->
                <div class="contact-modal-body">
                    <!-- 微信二维码区域 -->
                    <div class="qr-section">
                        <div class="qr-code-container">
                            <div class="qr-code">
                                <div class="qr-placeholder">
                                    <i class="fab fa-weixin"></i>
                                    <span>微信二维码</span>
                                </div>
                                <div class="profile-pic">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <p class="qr-label">客服微信</p>
                        </div>
                    </div>

                    <!-- 分割线 -->
                    <div class="divider"></div>

                    <!-- 联系方式列表 -->
                    <div class="contact-methods">
                        <!-- 微信扫码 -->
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-qrcode"></i>
                            </div>
                            <div class="contact-info">
                                <span class="contact-text">打开微信扫描上面的二维码</span>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="showScanTip()">
                                <i class="fas fa-camera"></i> 扫码
                            </button>
                        </div>

                        <!-- 微信咨询 -->
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fab fa-weixin"></i>
                            </div>
                            <div class="contact-info">
                                <span class="contact-text">微信咨询: 18685139192</span>
                            </div>
                            <button class="btn btn-primary btn-sm copy-btn" data-text="18685139192">
                                <i class="fas fa-copy"></i> 复制
                            </button>
                        </div>

                        <!-- 电话客服 -->
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-info">
                                <span class="contact-text">电话客服电话: 18685139192</span>
                                <span class="contact-text">学校电话: 085188506066</span>
                            </div>
                            <button class="btn btn-primary btn-sm copy-btn" data-text="18685139192">
                                <i class="fas fa-copy"></i> 复制
                            </button>
                        </div>

                        <!-- 客服在线时间 -->
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="contact-info">
                                <span class="contact-text">客服在线时间:</span>
                                <span class="contact-text">上午8:30-12:00</span>
                                <span class="contact-text">下午14:00-17:30</span>
                            </div>
                            <button class="btn btn-primary btn-sm copy-btn" data-text="上午8:30-12:00，下午14:00-17:30">
                                <i class="fas fa-copy"></i> 复制
                            </button>
                        </div>

                        <!-- QQ咨询 -->
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fab fa-qq"></i>
                            </div>
                            <div class="contact-info">
                                <span class="contact-text">QQ咨询: 379867411</span>
                            </div>
                            <button class="btn btn-primary btn-sm copy-btn" data-text="379867411">
                                <i class="fas fa-copy"></i> 复制
                            </button>
                        </div>
                    </div>

                    <!-- 在线沟通按钮 -->
                    <div class="contact-action">
                        <button class="btn btn-primary btn-large" onclick="showOnlineChat()">
                            <i class="fas fa-comments"></i> 在线沟通
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 复制成功提示 -->
        <div class="copy-toast" id="copyToast">
            <i class="fas fa-check"></i>
            <span>复制成功</span>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 获取元素引用
    contactModal = document.getElementById('contactModal');
    copyToast = document.getElementById('copyToast');
}

// 初始化事件监听
function initEventListeners() {
    // 复制按钮事件
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            copyToClipboard(textToCopy);
            showCopyToast();
        });
    });
    
    // 点击遮罩层关闭弹窗
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });
}

// 显示联系弹窗
function showContactModal() {
    if (!contactModal) {
        initContactModal();
    }
    
    // 显示弹窗
    contactModal.classList.add('show');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 添加动画类
    setTimeout(() => {
        contactModal.querySelector('.contact-modal-content').style.transform = 'scale(1)';
    }, 10);
}

// 关闭联系弹窗
function closeContactModal() {
    if (!contactModal) return;
    
    // 添加关闭动画
    const modalContent = contactModal.querySelector('.contact-modal-content');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        contactModal.classList.remove('show');
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

// 显示扫码提示
function showScanTip() {
    const tipModal = document.createElement('div');
    tipModal.className = 'tip-modal';
    tipModal.innerHTML = `
        <div class="tip-modal-content">
            <div class="tip-modal-header">
                <h4><i class="fas fa-qrcode"></i> 扫码提示</h4>
                <button class="tip-close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="tip-modal-body">
                <i class="fas fa-camera" style="font-size: 48px; color: #1890ff; margin-bottom: 16px;"></i>
                <p>请使用微信扫描页面上的二维码</p>
                <p style="font-size: 14px; color: #666; margin-top: 8px;">或直接搜索微信号：18685139192</p>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .tip-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .tip-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 320px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: modalSlideIn 0.3s ease;
        }
        
        .tip-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .tip-modal-header h4 {
            color: #1890ff;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .tip-close-btn {
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .tip-close-btn:hover {
            background: #f5f5f5;
            color: #666;
        }
        
        .tip-modal-body {
            padding: 24px 20px;
            text-align: center;
        }
        
        .tip-modal-body p {
            font-size: 14px;
            color: #333;
            margin: 0;
            line-height: 1.5;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(tipModal);
    
    // 点击背景关闭
    tipModal.addEventListener('click', function(e) {
        if (e.target === tipModal) {
            document.body.removeChild(tipModal);
            document.head.removeChild(style);
        }
    });
}

// 显示在线沟通选择
function showOnlineChat() {
    const chatModal = document.createElement('div');
    chatModal.className = 'chat-modal';
    chatModal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-modal-header">
                <h4><i class="fas fa-comments"></i> 选择沟通方式</h4>
                <button class="chat-close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="chat-modal-body">
                <div class="chat-options">
                    <div class="chat-option" onclick="handleChatOption('wechat'); this.parentElement.parentElement.parentElement.parentElement.remove()">
                        <i class="fab fa-weixin"></i>
                        <span>微信咨询</span>
                        <small>推荐使用</small>
                    </div>
                    <div class="chat-option" onclick="handleChatOption('phone'); this.parentElement.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-phone"></i>
                        <span>电话咨询</span>
                        <small>工作时间</small>
                    </div>
                    <div class="chat-option" onclick="handleChatOption('qq'); this.parentElement.parentElement.parentElement.parentElement.remove()">
                        <i class="fab fa-qq"></i>
                        <span>QQ咨询</span>
                        <small>在线客服</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .chat-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: modalSlideIn 0.3s ease;
        }
        
        .chat-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .chat-modal-header h4 {
            color: #1890ff;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .chat-close-btn {
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .chat-close-btn:hover {
            background: #f5f5f5;
            color: #666;
        }
        
        .chat-modal-body {
            padding: 20px;
        }
        
        .chat-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
        }
        
        .chat-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 12px;
            border: 2px solid #f0f0f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .chat-option:hover {
            border-color: #1890ff;
            background: #f0f8ff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
        }
        
        .chat-option i {
            font-size: 24px;
            color: #1890ff;
            margin-bottom: 8px;
        }
        
        .chat-option span {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
        }
        
        .chat-option small {
            font-size: 11px;
            color: #666;
        }
        
        .chat-option:nth-child(1) i {
            color: #07c160;
        }
        
        .chat-option:nth-child(2) i {
            color: #1890ff;
        }
        
        .chat-option:nth-child(3) i {
            color: #12b7f5;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(chatModal);
    
    // 点击背景关闭
    chatModal.addEventListener('click', function(e) {
        if (e.target === chatModal) {
            document.body.removeChild(chatModal);
            document.head.removeChild(style);
        }
    });
}

// 处理沟通方式选择
function handleChatOption(type) {
    switch(type) {
        case 'wechat':
            showCopyToast();
            copyToClipboard('18685139192');
            break;
        case 'phone':
            window.location.href = 'tel:18685139192';
            break;
        case 'qq':
            showCopyToast();
            copyToClipboard('379867411');
            break;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 自动初始化弹窗
    initContactModal();
});

// 导出函数供全局使用
window.showContactModal = showContactModal;
window.closeContactModal = closeContactModal;
window.showScanTip = showScanTip;
window.showOnlineChat = showOnlineChat;
window.handleChatOption = handleChatOption; 