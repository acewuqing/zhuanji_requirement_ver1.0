// 联系页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    
    // 复制功能
    const copyButtons = document.querySelectorAll('.copy-btn');
    const copyToast = document.getElementById('copyToast');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            copyToClipboard(textToCopy);
            showCopyToast();
        });
    });
    
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
        copyToast.classList.add('show');
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 2000);
    }
    
    // FAQ展开收起功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 关闭其他所有FAQ
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // 如果当前项未激活，则激活它
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // 扫码功能
    const scanButton = document.querySelector('.btn-sm:not(.copy-btn)');
    if (scanButton) {
        scanButton.addEventListener('click', function() {
            // 这里可以集成真实的扫码功能
            // 目前显示提示信息
            showScanModal();
        });
    }
    
    // 显示扫码模态框
    function showScanModal() {
        const modal = document.createElement('div');
        modal.className = 'scan-modal';
        modal.innerHTML = `
            <div class="scan-modal-content">
                <div class="scan-modal-header">
                    <h3><i class="fas fa-qrcode"></i> 扫码功能</h3>
                    <button class="scan-close-btn">&times;</button>
                </div>
                <div class="scan-modal-body">
                    <div class="scan-placeholder">
                        <i class="fas fa-camera"></i>
                        <p>请使用微信扫描二维码</p>
                        <p class="scan-tip">或直接搜索微信号：18685139192</p>
                    </div>
                </div>
            </div>
        `;
        
        // 添加模态框样式
        const style = document.createElement('style');
        style.textContent = `
            .scan-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: modalFadeIn 0.3s ease;
            }
            
            .scan-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                animation: modalSlideIn 0.3s ease;
            }
            
            .scan-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .scan-modal-header h3 {
                color: #1890ff;
                font-size: 18px;
                font-weight: 600;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .scan-close-btn {
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .scan-close-btn:hover {
                background: #f5f5f5;
                color: #666;
            }
            
            .scan-modal-body {
                padding: 40px 20px;
                text-align: center;
            }
            
            .scan-placeholder {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
            }
            
            .scan-placeholder i {
                font-size: 64px;
                color: #1890ff;
                margin-bottom: 16px;
            }
            
            .scan-placeholder p {
                font-size: 16px;
                color: #333;
                margin: 0;
                font-weight: 500;
            }
            
            .scan-tip {
                font-size: 14px !important;
                color: #666 !important;
                font-weight: normal !important;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // 关闭模态框
        const closeBtn = modal.querySelector('.scan-close-btn');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    }
    
    // 在线沟通按钮功能
    const onlineChatBtn = document.querySelector('.btn-large');
    if (onlineChatBtn) {
        onlineChatBtn.addEventListener('click', function() {
            // 这里可以集成在线聊天功能
            // 目前显示提示信息
            showOnlineChatModal();
        });
    }
    
    // 显示在线沟通模态框
    function showOnlineChatModal() {
        const modal = document.createElement('div');
        modal.className = 'chat-modal';
        modal.innerHTML = `
            <div class="chat-modal-content">
                <div class="chat-modal-header">
                    <h3><i class="fas fa-comments"></i> 在线沟通</h3>
                    <button class="chat-close-btn">&times;</button>
                </div>
                <div class="chat-modal-body">
                    <div class="chat-options">
                        <div class="chat-option" data-type="wechat">
                            <i class="fab fa-weixin"></i>
                            <span>微信咨询</span>
                            <small>推荐使用</small>
                        </div>
                        <div class="chat-option" data-type="phone">
                            <i class="fas fa-phone"></i>
                            <span>电话咨询</span>
                            <small>工作时间</small>
                        </div>
                        <div class="chat-option" data-type="qq">
                            <i class="fab fa-qq"></i>
                            <span>QQ咨询</span>
                            <small>在线客服</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加模态框样式
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
                z-index: 1000;
                animation: modalFadeIn 0.3s ease;
            }
            
            .chat-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                animation: modalSlideIn 0.3s ease;
            }
            
            .chat-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .chat-modal-header h3 {
                color: #1890ff;
                font-size: 18px;
                font-weight: 600;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .chat-close-btn {
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
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
                padding: 30px;
            }
            
            .chat-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 16px;
            }
            
            .chat-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 24px 16px;
                border: 2px solid #f0f0f0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }
            
            .chat-option:hover {
                border-color: #1890ff;
                background: #f0f8ff;
                transform: translateY(-4px);
                box-shadow: 0 4px 16px rgba(24, 144, 255, 0.15);
            }
            
            .chat-option i {
                font-size: 32px;
                color: #1890ff;
                margin-bottom: 12px;
            }
            
            .chat-option span {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }
            
            .chat-option small {
                font-size: 12px;
                color: #666;
            }
            
            .chat-option[data-type="wechat"] i {
                color: #07c160;
            }
            
            .chat-option[data-type="phone"] i {
                color: #1890ff;
            }
            
            .chat-option[data-type="qq"] i {
                color: #12b7f5;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // 关闭模态框
        const closeBtn = modal.querySelector('.chat-close-btn');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        // 选择沟通方式
        const chatOptions = modal.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                handleChatOption(type);
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
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
    
    // 页面加载动画
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.style.opacity = '0';
        contactCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contactCard.style.transition = 'all 0.6s ease';
            contactCard.style.opacity = '1';
            contactCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.service-info-card, .faq-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // 清理观察器
    return () => {
        observer.disconnect();
    };
}); 