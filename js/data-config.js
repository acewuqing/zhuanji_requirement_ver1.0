// 模块数据配置
const DataConfig = {
    // 业务概览数据
    overview: {
        title: '业务概览仪表板',
        subtitle: '全面掌握职称交付系统整体运营状况',
        cards: [
            { title: '总订单数量', value: '2,847', trend: '较上月增长 12.5%', icon: '📋', color: 'blue' },
            { title: '资料完成率', value: '89.6%', trend: '较上月增长 3.2%', icon: '✅', color: 'green' },
            { title: '平均回款率', value: '91.2%', trend: '较上月增长 1.8%', icon: '💰', color: 'orange' },
            { title: 'VIP客户数量', value: '364', trend: '较上月增长 8.7%', icon: '👑', color: 'purple' },
            { title: '审核通过率', value: '94.6%', trend: '较上月增长 1.8%', icon: '✔️', color: 'green' },
            { title: '异常订单数', value: '56', trend: '较上月减少 15.2%', icon: '⚠️', color: 'red' }
        ],
        tableData: {
            title: '业务综合数据表',
            headers: ['指标名称', '当前值', '目标值', '完成率', '环比', '同比', '状态'],
            rows: [
                ['订单总数', '2,847', '2,500', '113.9%', '+12.5%', '+23.1%', '<span class="status-badge success">优秀</span>'],
                ['完成率', '87.3%', '85%', '102.7%', '+3.2%', '+5.8%', '<span class="status-badge success">达标</span>'],
                ['回款率', '92.1%', '90%', '102.3%', '0%', '+2.1%', '<span class="status-badge success">达标</span>'],
                ['客户满意度', '94.2%', '95%', '99.2%', '+2.1%', '+3.5%', '<span class="status-badge warning">接近</span>'],
                ['异常率', '2.0%', '3%', '66.7%', '-15.2%', '-22.3%', '<span class="status-badge success">优秀</span>']
            ]
        },
        pieChartData: {
            labels: ['已完成', '进行中', '待开始', '异常'],
            data: [2487, 285, 75, 56],
            colors: ['#52c41a', '#1677ff', '#fa8c16', '#ff4d4f']
        }
    },

    // 产品制作统计数据
    production: {
        title: '产品制作统计',
        subtitle: '各类型产品制作进度与质量分析',
        cards: [
            // 资料制作指标（7个）
            { title: '资料收集完成率', value: '96.8%', trend: '↑2.1%', icon: '📁', color: 'blue', category: 'material' },
            { title: 'VIP数量占比', value: '19.2%', trend: '↑8.7%', icon: '👑', color: 'blue', category: 'material' },
            { title: '交付率', value: '89.2%', trend: '↑1.5%', icon: '📋', color: 'blue', category: 'material' },
            { title: '送审率', value: '92.3%', trend: '↑3.2%', icon: '📤', color: 'blue', category: 'material' },
            { title: '送审通过率', value: '94.6%', trend: '↑1.8%', icon: '✅', color: 'blue', category: 'material' },
            { title: '暂停率', value: '3.2%', trend: '↓0.8%', icon: '⏸️', color: 'blue', category: 'material' },
            { title: '审核退回率', value: '2.1%', trend: '↓1.2%', icon: '↩️', color: 'blue', category: 'material' },
            
            // 论文指标（5个）
            { title: '论文选题率', value: '88.5%', trend: '↑2.3%', icon: '💡', color: 'green', category: 'paper' },
            { title: '论文撰写率', value: '85.2%', trend: '↑1.9%', icon: '✍️', color: 'green', category: 'paper' },
            { title: '论文核稿率', value: '92.1%', trend: '↑1.7%', icon: '📝', color: 'green', category: 'paper' },
            { title: '论文发表率', value: '85.6%', trend: '↑4.1%', icon: '📄', color: 'green', category: 'paper' },
            { title: '论文到刊率', value: '78.9%', trend: '↑3.5%', icon: '📚', color: 'green', category: 'paper' },
            
            // 继续教育指标（2个）
            { title: '继续教育交付率', value: '95.8%', trend: '↑2.1%', icon: '🎓', color: 'orange', category: 'education' },
            { title: '继续教育开课率', value: '97.2%', trend: '↑1.3%', icon: '📅', color: 'orange', category: 'education' },
            
            // 知识产权指标（2个）
            { title: '软著交付率', value: '87.5%', trend: '↑2.8%', icon: '💻', color: 'purple', category: 'patent' },
            { title: '专利交付率', value: '83.2%', trend: '↑3.1%', icon: '⚖️', color: 'purple', category: 'patent' }
        ],
        tableData: {
            title: '产品制作核心指标统计表',
            headers: ['产品类型', '主要指标', '完成率', '订单数量', '通过率', '平均耗时', '客户满意度'],
            rows: [
                ['资料制作', '资料收集→交付→送审→通过', '96.8%→89.2%→92.3%→94.6%', '1,856', '94.6%', '6.8天', '4.7分'],
                ['论文', '选题→撰写→发表→到刊', '88.5%→92.1%→85.6%→78.9%', '423', '78.9%', '45天', '4.8分'],
                ['继续教育', '开课→交付', '97.2%→95.8%', '312', '95.8%', '7天', '4.9分'],
                ['知识产权', '软著→专利', '87.5%→83.2%', '256', '85.4%', '120天', '4.6分']
            ]
        },
        pieChartData: {
            labels: ['资料制作', '论文', '继续教育', '知识产权'],
            data: [62, 15, 11, 9],
            colors: ['#1677ff', '#52c41a', '#fa8c16', '#722ed1']
        }
    },

    // 区域业绩分析数据
    regional: {
        title: '区域业绩分析',
        subtitle: '各分校区域业绩对比与增长趋势分析',
        cards: [
            { title: '一分校', value: '892', trend: '完成率 90.1%', icon: '🏪', color: 'blue' },
            { title: '二分校', value: '756', trend: '完成率 86.3%', icon: '🏬', color: 'green' },
            { title: '三分校', value: '634', trend: '完成率 87.9%', icon: '🏭', color: 'orange' },
            { title: '常德分校', value: '389', trend: '完成率 85.1%', icon: '🏘️', color: 'purple' },
            { title: '其他分校', value: '176', trend: '完成率 88.5%', icon: '🏢', color: 'cyan' },
            { title: '区域平均完成率', value: '87.6%', trend: '整体稳定增长', icon: '📊', color: 'green' }
        ],
        tableData: {
            title: '区域业绩详细对比表',
            headers: ['分校名称', '订单数量', '完成数量', '完成率', '回款金额', '回款率', 'VIP客户', '异常订单'],
            rows: [
                ['一分校', '892', '804', '90.1%', '¥1,856,000', '94.2%', '128', '18'],
                ['二分校', '756', '652', '86.3%', '¥1,580,000', '91.5%', '95', '15'],
                ['三分校', '634', '557', '87.9%', '¥1,325,000', '89.8%', '78', '12'],
                ['常德分校', '389', '331', '85.1%', '¥812,000', '87.3%', '45', '9'],
                ['其他分校', '176', '156', '88.5%', '¥367,000', '93.1%', '18', '2']
            ]
        },
        pieChartData: {
            labels: ['一分校', '二分校', '三分校', '常德分校', '其他分校'],
            data: [31, 26, 22, 13, 6],
            colors: ['#1677ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2']
        }
    },

    // 客户分析数据
    customer: {
        title: '客户分析报告',
        subtitle: '客户结构分析与VIP客户服务质量统计',
        cards: [
            { title: '总客户数量', value: '1,892', trend: '较上月增长 8.3%', icon: '👥', color: 'blue' },
            { title: 'VIP客户占比', value: '19.2%', trend: '较上月增长 1.2%', icon: '👑', color: 'purple' },
            { title: '新增客户', value: '145', trend: '本月新增', icon: '🆕', color: 'green' },
            { title: '客户满意度', value: '94.2%', trend: '较上月增长 2.1%', icon: '😊', color: 'orange' },
            { title: '复购率', value: '68.7%', trend: '较上月增长 5.4%', icon: '🔄', color: 'cyan' },
            { title: '业务类型覆盖', value: '4个', trend: '涵盖全部业务', icon: '🎯', color: 'green' }
        ],
        tableData: {
            title: '客户分析详细数据表',
            headers: ['客户类型', '数量', '占比', '平均订单金额', '复购率', '满意度', '流失率'],
            rows: [
                ['VIP客户', '364', '19.2%', '¥3,850', '85.2%', '96.8%', '2.1%'],
                ['普通客户', '1,528', '80.8%', '¥2,180', '65.3%', '93.2%', '8.7%'],
                ['新客户', '145', '7.7%', '¥2,450', '0%', '91.5%', '12.3%'],
                ['老客户', '1,747', '92.3%', '¥2,680', '72.1%', '94.8%', '5.2%']
            ]
        },
        pieChartData: {
            labels: ['VIP客户', '普通客户', '新客户', '老客户'],
            data: [364, 1528, 145, 1747],
            colors: ['#722ed1', '#1677ff', '#52c41a', '#fa8c16']
        }
    },

    // 异常数据监控
    exception: {
        title: '异常数据监控',
        subtitle: '异常订单处理与问题类型分析统计',
        cards: [
            { title: '异常订单总数', value: '56', trend: '较上月减少 15.2%', icon: '⚠️', color: 'red' },
            { title: '处理中异常', value: '12', trend: '待处理数量', icon: '🔄', color: 'orange' },
            { title: '已解决异常', value: '44', trend: '解决率 78.6%', icon: '✅', color: 'green' },
            { title: '平均处理时长', value: '2.3天', trend: '较上月缩短 0.5天', icon: '⏱️', color: 'blue' },
            { title: '退回重做率', value: '3.2%', trend: '较上月减少 0.8%', icon: '↩️', color: 'purple' },
            { title: '客户投诉率', value: '1.1%', trend: '较上月减少 0.3%', icon: '📞', color: 'cyan' }
        ],
        tableData: {
            title: '异常数据详细分析表',
            headers: ['异常类型', '数量', '占比', '平均处理时长', '解决率', '重复率', '影响程度'],
            rows: [
                ['资料不全', '22', '39.3%', '1.8天', '95.5%', '18.2%', '中等'],
                ['流程问题', '15', '26.8%', '2.5天', '86.7%', '13.3%', '高'],
                ['沟通误解', '10', '17.9%', '1.2天', '100%', '10.0%', '低'],
                ['系统故障', '6', '10.7%', '4.2天', '83.3%', '33.3%', '高'],
                ['其他问题', '3', '5.4%', '2.1天', '100%', '0%', '低']
            ]
        },
        pieChartData: {
            labels: ['资料问题', '流程问题', '沟通问题', '系统问题', '其他'],
            data: [22, 15, 10, 6, 3],
            colors: ['#ff4d4f', '#fa8c16', '#1677ff', '#722ed1', '#8c8c8c']
        }
    }
};

// 产品分组配置
const ProductGroups = {
    material: { name: '资料制作', icon: '📋', color: '#1677ff', summary: '职称评审资料制作与审核流程', totalCount: 1856 },
    paper: { name: '论文', icon: '📄', color: '#52c41a', summary: '学术论文选题、撰写、发表全流程', totalCount: 423 },
    education: { name: '继续教育', icon: '🎓', color: '#fa8c16', summary: '继续教育培训课程与学分管理', totalCount: 312 },
    patent: { name: '知识产权', icon: '⚖️', color: '#722ed1', summary: '软件著作权与专利申请服务', totalCount: 256 }
};

// 导出配置
window.DataConfig = DataConfig;
window.ProductGroups = ProductGroups; 