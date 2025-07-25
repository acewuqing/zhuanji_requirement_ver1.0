// 证书管理系统 JavaScript

// 全局变量
let selectedCourses = [];
let certificates = [];
let currentPage = 'course'; // 'course' 或 'certificate'

// 模拟课程数据
const courseData = [
    { id: 1, name: '建筑工程施工技术', type: '专业课', hours: 24, year: '2024' },
    { id: 2, name: '工程质量管理', type: '专业课', hours: 16, year: '2024' },
    { id: 3, name: '安全生产管理', type: '公需课', hours: 12, year: '2024' },
    { id: 4, name: '法律法规基础', type: '公需课', hours: 8, year: '2024' },
    { id: 5, name: '建筑材料学', type: '建工课', hours: 20, year: '2024' },
    { id: 6, name: '工程测量技术', type: '建工课', hours: 18, year: '2024' },
    { id: 7, name: '工程造价管理', type: '专业课', hours: 22, year: '2023' },
    { id: 8, name: '工程合同管理', type: '专业课', hours: 14, year: '2023' }
];

// 模拟证书数据
const certificateData = [
    {
        id: 1,
        year: '2024',
        name: '建筑工程施工技术证书',
        number: 'CERT2024001',
        status: 'active',
        unit: '建设部',
        issueDate: '2024-01-15',
        type: '专业课',
        courses: [1, 2]
    },
    {
        id: 2,
        year: '2024',
        name: '工程质量管理证书',
        number: 'CERT2024002',
        status: 'inactive',
        unit: '建设部',
        issueDate: '2024-02-20',
        type: '专业课',
        courses: [3, 4]
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

// 初始化页面
function initPage() {
    if (document.getElementById('courseTableBody')) {
        // 课程管理页面
        renderCourseTable();
        initCourseEventListeners();
    }
    
    if (document.getElementById('certificateTableBody')) {
        // 证书管理页面
        renderCertificateTable();
        initCertificateEventListeners();
    }
}

// 渲染课程表格
function renderCourseTable() {
    const tbody = document.getElementById('courseTableBody');
    tbody.innerHTML = '';
    
    courseData.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="course-checkbox" data-id="${course.id}"></td>
            <td>${course.name}</td>
            <td>${course.type}</td>
            <td>${course.hours}小时</td>
            <td>${course.year}</td>
        `;
        tbody.appendChild(row);
    });
}

// 初始化课程页面事件监听
function initCourseEventListeners() {
    // 全选/取消全选
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.course-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateSelectedCourses();
    });
    
    // 单个课程选择
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('course-checkbox')) {
            updateSelectedCourses();
        }
    });
    
    // 申报证书按钮
    const applyBtn = document.getElementById('applyCertificateBtn');
    applyBtn.addEventListener('click', function() {
        if (selectedCourses.length > 0) {
            showCertificateModal();
        }
    });
    
    // 筛选功能
    const filterYear = document.getElementById('filterYear');
    const filterType = document.getElementById('filterType');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    [filterYear, filterType].forEach(element => {
        element.addEventListener('change', filterCourses);
    });
    
    searchBtn.addEventListener('click', filterCourses);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterCourses();
        }
    });
}

// 更新已选课程
function updateSelectedCourses() {
    const checkboxes = document.querySelectorAll('.course-checkbox:checked');
    selectedCourses = [];
    
    checkboxes.forEach(checkbox => {
        const courseId = parseInt(checkbox.dataset.id);
        const course = courseData.find(c => c.id === courseId);
        if (course) {
            selectedCourses.push(course);
        }
    });
    
    // 更新统计信息
    const selectedCount = document.getElementById('selectedCount');
    const selectedHours = document.getElementById('selectedHours');
    const applyBtn = document.getElementById('applyCertificateBtn');
    
    const totalHours = selectedCourses.reduce((sum, course) => sum + course.hours, 0);
    
    selectedCount.textContent = selectedCourses.length;
    selectedHours.textContent = totalHours;
    
    // 启用/禁用申报按钮
    applyBtn.disabled = selectedCourses.length === 0;
}

// 筛选课程
function filterCourses() {
    const year = document.getElementById('filterYear').value;
    const type = document.getElementById('filterType').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    const rows = document.querySelectorAll('#courseTableBody tr');
    
    rows.forEach(row => {
        const cells = row.cells;
        const courseName = cells[1].textContent.toLowerCase();
        const courseType = cells[2].textContent;
        const courseYear = cells[4].textContent;
        
        const yearMatch = !year || courseYear === year;
        const typeMatch = !type || courseType === type;
        const searchMatch = !search || courseName.includes(search);
        
        row.style.display = yearMatch && typeMatch && searchMatch ? '' : 'none';
    });
}

// 渲染证书表格
function renderCertificateTable() {
    const tbody = document.getElementById('certificateTableBody');
    tbody.innerHTML = '';
    
    certificateData.forEach(certificate => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${certificate.year}</td>
            <td>${certificate.name}</td>
            <td>${certificate.number}</td>
            <td><span class="status-badge ${certificate.status === 'active' ? 'status-active' : 'status-inactive'}">${certificate.status === 'active' ? '有效' : '作废'}</span></td>
            <td>${certificate.unit}</td>
            <td>${certificate.issueDate}</td>
            <td>${certificate.type}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="viewCertificate(${certificate.id})">查看证书</button>
                    <button class="btn btn-sm btn-warning" onclick="voidCertificate(${certificate.id})">作废</button>
                    <button class="btn btn-sm btn-info" onclick="viewCourseList(${certificate.id})">学习清单</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 初始化证书页面事件监听
function initCertificateEventListeners() {
    const generateBtn = document.getElementById('generateCertificateBtn');
    generateBtn.addEventListener('click', function() {
        showConfirmModal();
    });
}

// 显示二次确认弹窗
function showConfirmModal() {
    // 默认值
    const defaultYear = new Date().getFullYear().toString();
    const defaultType = '专业课';
    const defaultName = '新建证书';
    const defaultHours = '0';
    
    // 填充确认信息
    document.getElementById('confirmYear').textContent = defaultYear;
    document.getElementById('confirmType').textContent = defaultType;
    document.getElementById('confirmName').textContent = defaultName;
    document.getElementById('confirmHours').textContent = defaultHours + '小时';
    
    // 显示弹窗
    document.getElementById('confirmGenerateModal').classList.add('show');
}

// 关闭二次确认弹窗
function closeConfirmModal() {
    document.getElementById('confirmGenerateModal').classList.remove('show');
}

// 确认生成证书
function confirmGenerate() {
    closeConfirmModal();
    showCertificateModal();
}

// 显示生成证书弹窗
function showCertificateModal() {
    // 加载弹窗HTML
    loadCertificateModal();
    
    // 填充年份选项
    const yearSelect = document.getElementById('modalYear');
    yearSelect.innerHTML = '<option value="">请选择年份</option>';
    for (let year = 2024; year >= 2020; year--) {
        yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
    }
    
    // 渲染已选课程
    renderSelectedCourses();
    
    // 显示弹窗
    document.getElementById('certificateGenerateModal').classList.add('show');
    
    // 初始化弹窗事件
    initCertificateModalEvents();
}

// 加载证书弹窗HTML
function loadCertificateModal() {
    const container = document.getElementById('certificateModalContainer');
    if (!container.querySelector('#certificateGenerateModal')) {
        container.innerHTML = `
            <!-- 生成证书弹窗组件 -->
            <div class="certificate-modal" id="certificateGenerateModal">
                <div class="certificate-modal-content">
                    <div class="certificate-modal-header">
                        <h3><i class="fas fa-certificate"></i> 生成证书</h3>
                        <button class="certificate-close-btn" onclick="closeCertificateModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="certificate-modal-body">
                        <form id="generateCertificateForm">
                            <div class="form-group">
                                <label>年份</label>
                                <select id="modalYear" required></select>
                            </div>
                            <div class="form-group">
                                <label>课程类型</label>
                                <select id="modalType" required>
                                    <option value="">请选择</option>
                                    <option value="专业课">专业课</option>
                                    <option value="公需课">公需课</option>
                                    <option value="建工课">建工课</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>证书名称</label>
                                <input type="text" id="modalName" placeholder="请输入证书名称" required>
                            </div>
                            <div class="form-group">
                                <label>已选课程</label>
                                <div class="selected-courses-list" id="selectedCoursesList">
                                    <!-- 课程列表由JS渲染 -->
                                </div>
                            </div>
                            <div class="stat-info">
                                已选课程 <span id="modalSelectedCount">0</span> 门，总学时 <span id="modalSelectedHours">0</span> 小时
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeCertificateModal()">取消</button>
                                <button type="submit" class="btn btn-primary" id="confirmGenerateBtn">确认生成</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

// 渲染已选课程列表
function renderSelectedCourses() {
    const container = document.getElementById('selectedCoursesList');
    const countSpan = document.getElementById('modalSelectedCount');
    const hoursSpan = document.getElementById('modalSelectedHours');
    
    container.innerHTML = '';
    
    if (selectedCourses.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无已选课程</p>';
    } else {
        selectedCourses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <div class="course-info">
                    <div class="course-name">${course.name}</div>
                    <div class="course-details">${course.type} | ${course.hours}小时 | ${course.year}年</div>
                </div>
                <button type="button" class="remove-course" onclick="removeCourse(${course.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(courseItem);
        });
    }
    
    const totalHours = selectedCourses.reduce((sum, course) => sum + course.hours, 0);
    countSpan.textContent = selectedCourses.length;
    hoursSpan.textContent = totalHours;
}

// 移除课程
function removeCourse(courseId) {
    selectedCourses = selectedCourses.filter(course => course.id !== courseId);
    renderSelectedCourses();
    
    // 同步更新课程管理页面的选择状态
    const checkbox = document.querySelector(`.course-checkbox[data-id="${courseId}"]`);
    if (checkbox) {
        checkbox.checked = false;
        updateSelectedCourses();
    }
}

// 初始化证书弹窗事件
function initCertificateModalEvents() {
    const form = document.getElementById('generateCertificateForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateCertificate();
    });
    
    // 点击遮罩层关闭
    const modal = document.getElementById('certificateGenerateModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCertificateModal();
        }
    });
}

// 关闭证书弹窗
function closeCertificateModal() {
    document.getElementById('certificateGenerateModal').classList.remove('show');
}

// 生成证书
function generateCertificate() {
    const year = document.getElementById('modalYear').value;
    const type = document.getElementById('modalType').value;
    const name = document.getElementById('modalName').value;
    
    if (!year || !type || !name) {
        alert('请填写完整的证书信息');
        return;
    }
    
    if (selectedCourses.length === 0) {
        alert('请至少选择一门课程');
        return;
    }
    
    // 生成证书编号
    const certificateNumber = 'CERT' + year + String(certificateData.length + 1).padStart(3, '0');
    
    // 创建新证书
    const newCertificate = {
        id: certificateData.length + 1,
        year: year,
        name: name,
        number: certificateNumber,
        status: 'active',
        unit: '建设部',
        issueDate: new Date().toISOString().split('T')[0],
        type: type,
        courses: selectedCourses.map(course => course.id)
    };
    
    certificateData.push(newCertificate);
    
    // 关闭弹窗
    closeCertificateModal();
    
    // 如果当前在证书管理页面，刷新表格
    if (document.getElementById('certificateTableBody')) {
        renderCertificateTable();
    }
    
    // 清空已选课程
    selectedCourses = [];
    
    alert('证书生成成功！');
}

// 查看证书
function viewCertificate(certificateId) {
    const certificate = certificateData.find(c => c.id === certificateId);
    if (certificate) {
        alert(`证书详情：\n证书名称：${certificate.name}\n证书编号：${certificate.number}\n发证单位：${certificate.unit}\n发证时间：${certificate.issueDate}`);
    }
}

// 作废证书
function voidCertificate(certificateId) {
    if (confirm('确定要作废这个证书吗？')) {
        const certificate = certificateData.find(c => c.id === certificateId);
        if (certificate) {
            certificate.status = 'inactive';
            renderCertificateTable();
            alert('证书已作废');
        }
    }
}

// 查看学习清单
function viewCourseList(certificateId) {
    const certificate = certificateData.find(c => c.id === certificateId);
    if (certificate) {
        const courseList = certificate.courses.map(courseId => {
            const course = courseData.find(c => c.id === courseId);
            return course ? `${course.name} (${course.hours}小时)` : '';
        }).filter(name => name);
        
        alert(`学习清单：\n${courseList.join('\n')}`);
    }
}

// 全局函数导出
window.closeConfirmModal = closeConfirmModal;
window.confirmGenerate = confirmGenerate;
window.closeCertificateModal = closeCertificateModal;
window.removeCourse = removeCourse;
window.viewCertificate = viewCertificate;
window.voidCertificate = voidCertificate;
window.viewCourseList = viewCourseList; 