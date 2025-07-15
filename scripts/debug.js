// 调试脚本 - 用于诊断组件加载问题

// 调试信息
function debugInfo() {
    console.log('=== 组件化调试信息 ===');
    
    // 检查页面配置
    console.log('当前页面:', window.location.pathname);
    console.log('页面配置:', pageConfig);
    
    // 检查组件缓存
    console.log('组件缓存:', Object.keys(componentCache));
    
    // 检查DOM元素
    const sidebarContainer = document.getElementById('sidebar-container');
    const topNavContainer = document.getElementById('top-nav-container');
    const breadcrumb = document.querySelector('.breadcrumb');
    
    console.log('侧边栏容器:', sidebarContainer);
    console.log('顶部导航容器:', topNavContainer);
    console.log('面包屑容器:', breadcrumb);
    
    // 检查样式文件
    const stylesheets = Array.from(document.styleSheets);
    console.log('已加载的样式文件:', stylesheets.map(sheet => sheet.href || '内联样式'));
    
    // 检查脚本文件
    const scripts = Array.from(document.scripts);
    console.log('已加载的脚本文件:', scripts.map(script => script.src || '内联脚本'));
}

// 手动加载组件
function manualLoadComponents() {
    console.log('手动加载组件...');
    
    // 加载侧边栏
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer && componentCache['sidebar']) {
        sidebarContainer.innerHTML = componentCache['sidebar'];
        console.log('侧边栏组件已加载');
    } else {
        console.error('侧边栏组件加载失败');
    }
    
    // 加载顶部导航
    const topNavContainer = document.getElementById('top-nav-container');
    if (topNavContainer && componentCache['top-nav']) {
        topNavContainer.innerHTML = componentCache['top-nav'];
        console.log('顶部导航组件已加载');
    } else {
        console.error('顶部导航组件加载失败');
    }
}

// 检查组件是否正确渲染
function checkComponentRendering() {
    console.log('=== 检查组件渲染 ===');
    
    const sidebar = document.querySelector('.sidebar');
    const topNav = document.querySelector('.top-nav');
    
    console.log('侧边栏元素:', sidebar);
    console.log('顶部导航元素:', topNav);
    
    if (sidebar) {
        console.log('侧边栏样式:', window.getComputedStyle(sidebar));
        console.log('侧边栏可见性:', sidebar.offsetWidth, 'x', sidebar.offsetHeight);
    }
    
    if (topNav) {
        console.log('顶部导航样式:', window.getComputedStyle(topNav));
        console.log('顶部导航可见性:', topNav.offsetWidth, 'x', topNav.offsetHeight);
    }
}

// 页面加载完成后执行调试
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始调试...');
    
    // 延迟执行，确保其他脚本已加载
    setTimeout(function() {
        debugInfo();
        manualLoadComponents();
        
        // 再次延迟检查渲染
        setTimeout(function() {
            checkComponentRendering();
        }, 100);
    }, 100);
});

// 导出调试函数
window.DebugHelper = {
    debugInfo,
    manualLoadComponents,
    checkComponentRendering
}; 