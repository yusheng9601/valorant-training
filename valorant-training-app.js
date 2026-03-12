// 应用逻辑

// ==================== 通用工具函数 ====================
const AppUtils = {
    // 获取DOM元素
    $: (id) => document.getElementById(id),
    
    // 创建元素
    create: (tag, props = {}, children = []) => {
        const el = document.createElement(tag);
        Object.assign(el, props);
        children.forEach(child => {
            if (typeof child === 'string') el.textContent = child;
            else if (child instanceof Node) el.appendChild(child);
        });
        return el;
    },
    
    // 本地存储操作
    storage: {
        get: (key, defaultVal = null) => {
            try {
                return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
            } catch { return defaultVal; }
        },
        set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
        remove: (key) => localStorage.removeItem(key)
    },
    
    // 显示提示消息
    toast: (msg, type = 'info') => {
        const colors = { success: '#2ecc71', warning: '#feca57', error: '#e74c3c', info: '#48dbfb' };
        const toast = document.createElement('div');
        toast.style.cssText = `position:fixed;top:20px;right:20px;background:${colors[type]};color:#fff;padding:15px 25px;border-radius:10px;z-index:10001;box-shadow:0 4px 15px rgba(0,0,0,0.3);animation:slideIn 0.3s ease;`;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.animation = 'slideOut 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 2500);
    },
    
    // 显示确认对话框
    confirm: (msg) => confirm(msg),
    
    // 格式化时间
    formatTime: (seconds) => {
        const m = Math.floor(seconds / 60), s = seconds % 60;
        return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
};

// 时段名称映射
const PeriodNames = { morning: '🌅 上午', noon: '🌞 中午', afternoon: '🌆 下午', evening: '🌙 晚上' };
// 活动类型名称映射
const TypeNames = { aim: '🎯 瞄准训练', dm: '💀 死斗模式', ranked: '🏆 排位赛', rest: '😴 休息', theory: '📖 理论学习', practice: '🏃 练习', review: '📝 复盘', game: '🎮 游戏', test: '📊 测试' };

// 页面加载完成后初始化
window.onload = function() {
    initializeApp();
};

// 初始化应用
function initializeApp() {
    // 首先确保trainingPlans数组存在
    trainingPlans = JSON.parse(localStorage.getItem('trainingPlans') || '[]');
    
    // 如果没有计划，初始化默认计划
    if (trainingPlans.length === 0) {
        initDefaultPlans();
    }
    
    // 初始化视频库
    initVideoLibrary();
    
    // 获取当前计划ID
    let currentPlanId = localStorage.getItem('currentPlanId');
    
    // 如果没有当前计划ID，使用第一个计划
    if (!currentPlanId) {
        if (trainingPlans.length > 0) {
            currentPlanId = trainingPlans[0].id;
            localStorage.setItem('currentPlanId', currentPlanId);
        }
    }
    
    // 加载当前计划的训练数据
    const currentPlan = trainingPlans.find(p => p.id == currentPlanId);
    if (currentPlan && currentPlan.customData) {
        Object.assign(TRAINING_PLAN, JSON.parse(JSON.stringify(currentPlan.customData)));
    } else {
        // 如果没有自定义数据，尝试从localStorage加载
        const customPlan = localStorage.getItem('customTrainingPlan');
        if (customPlan) {
            try {
                const parsed = JSON.parse(customPlan);
                Object.assign(TRAINING_PLAN, parsed);
            } catch (e) {
                console.log('加载自定义计划失败', e);
            }
        }
    }
    
    loadProgress();
    updateTodaySection();
    updateStatsSection();
    updatePlanSection();
    updateCustomTrainingList();
    updateTimerHistory();
    
    // 延迟一点时间确保DOM元素已创建
    setTimeout(() => {
        updatePlansList();
        updateVideoList();
        addEventListeners();
    }, 100);
    
    console.log('应用初始化完成，当前计划ID:', currentPlanId);
}

// 添加事件监听器
function addEventListeners() {
    // 添加卡片悬停效果
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // 添加输入框焦点效果
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#feca57';
            this.style.boxShadow = '0 0 20px rgba(254, 202, 87, 0.3)';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.boxShadow = 'none';
        });
    });
    
    // 键盘快捷键导航
    document.addEventListener('keydown', function(e) {
        // 如果正在输入，不触发快捷键
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }
        
        // 快捷键映射
        const shortcuts = {
            '1': 'today',      // 1 - 今日训练
            '2': 'stats',      // 2 - 进度统计
            '3': 'record',     // 3 - 记录数据
            '4': 'plan',       // 4 - 完整计划
            '5': 'custom',     // 5 - 自定义训练
            '6': 'timer',      // 6 - 计时器
            'p': 'plans',      // P - 计划管理
            'e': 'edit',       // E - 编辑计划
            'g': 'generate',   // G - 视频生成
            'j': 'projects',   // J - 训练项目库
            'v': 'videos',     // V - 视频库
            'h': 'guide',      // H - 训练指南
            '?': 'help',       // ? - 帮助
            'Escape': 'today' // ESC - 返回首页
        };
        
        if (shortcuts[e.key]) {
            e.preventDefault();
            if (e.key === '?') {
                showShortcutHelp();
            } else {
                showSection(shortcuts[e.key]);
            }
        }
        
        // Alt + 数字 快速跳转
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const day = parseInt(e.key);
            jumpToDay(day);
        }
    });
    
    // 双击返回顶部
    document.addEventListener('dblclick', function(e) {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // 点击卡片动画效果
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 显示快捷键帮助
function showShortcutHelp() {
    const helpHtml = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 30px; border-radius: 20px; 
            z-index: 10000; box-shadow: 0 20px 60px rgba(0,0,0,0.5); max-width: 500px;">
            <h2 style="color: #feca57; text-align: center; margin-bottom: 20px;">⌨️ 键盘快捷键</h2>
            <div style="color: #ccc; font-size: 14px; line-height: 2;">
                <div><span style="color: #48dbfb; font-weight: bold;">1</span> - 今日训练</div>
                <div><span style="color: #48dbfb; font-weight: bold;">2</span> - 进度统计</div>
                <div><span style="color: #48dbfb; font-weight: bold;">3</span> - 记录数据</div>
                <div><span style="color: #48dbfb; font-weight: bold;">4</span> - 完整计划</div>
                <div><span style="color: #48dbfb; font-weight: bold;">5</span> - 自定义训练</div>
                <div><span style="color: #48dbfb; font-weight: bold;">6</span> - 计时器</div>
                <div><span style="color: #a55eea; font-weight: bold;">P</span> - 计划管理</div>
                <div><span style="color: #a55eea; font-weight: bold;">E</span> - 编辑计划</div>
                <div><span style="color: #a55eea; font-weight: bold;">G</span> - 视频生成</div>
                <div><span style="color: #ff9ff3; font-weight: bold;">J</span> - 训练项目库</div>
                <div><span style="color: #ff9ff3; font-weight: bold;">V</span> - 视频库</div>
                <div><span style="color: #ff9ff3; font-weight: bold;">H</span> - 训练指南</div>
                <div><span style="color: #ff6b6b; font-weight: bold;">Alt+1-9</span> - 跳转到指定天数</div>
                <div><span style="color: #ff6b6b; font-weight: bold;">ESC</span> - 返回今日训练</div>
                <div><span style="color: #ff6b6b; font-weight: bold;">?</span> - 显示此帮助</div>
                <div><span style="color: #ff6b6b; font-weight: bold;">双击</span> - 返回顶部</div>
            </div>
            <button onclick="this.closest('[style*=&quot;z-index: 10000&quot;]').remove()" 
                style="margin-top: 20px; width: 100%; padding: 12px; background: linear-gradient(45deg, #48dbfb, #0abde3); 
                border: none; border-radius: 8px; color: #1a1a2e; font-weight: bold; cursor: pointer;">关闭</button>
        </div>
    `;
    
    // 移除已存在的帮助
    const existing = document.querySelector('[style*="z-index: 10000"]');
    if (existing) existing.remove();
    
    const help = document.createElement('div');
    help.innerHTML = helpHtml;
    help.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; animation: fadeIn 0.3s ease;';
    help.onclick = function(e) { if (e.target === this) this.remove(); };
    document.body.appendChild(help);
}

// 跳转到指定天数
function jumpToDay(day) {
    if (day < 1 || day > 30) {
        showToast('请输入1-30之间的天数', 'warning');
        return;
    }
    
    const progress = loadProgress();
    progress.currentDay = day;
    saveProgress(progress);
    updateTodaySection();
    showSection('today');
    showToast(`已跳转到第${day}天训练`, 'success');
}

// 显示提示消息
function showToast(message, type = 'info') {
    const colors = {
        success: 'linear-gradient(135deg, #2ecc71, #27ae60)',
        warning: 'linear-gradient(135deg, #feca57, #f39c12)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #48dbfb, #0abde3)'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${colors[type]}; 
        color: white; padding: 15px 25px; border-radius: 10px; z-index: 10001; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: slideIn 0.3s ease;`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 显示指定 section
function showSection(sectionId) {
    // 隐藏所有 section
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // 等待动画结束后隐藏所有卡片
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('hidden');
        });
        
        // 显示选中的 section
        const targetSection = document.getElementById('section-' + sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            // 强制重排
            targetSection.offsetHeight;
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }
        
        // 如果是计划管理页面，刷新列表
        if (sectionId === 'plans') {
            updatePlansList();
        }
        
        // 如果是项目库页面，渲染项目列表
        if (sectionId === 'projects') {
            renderProjects('all');
        }
    }, 300);
    
    // 更新导航按钮状态
    document.querySelectorAll('.nav button').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.getElementById('btn-' + sectionId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// 加载训练进度
function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('valorantTrainingProgress') || '{"currentDay": 1, "completedDays": 0, "gamesPlayed": 0, "aimScores": [], "rankHistory": [], "completedWeeks": 0}');
    return progress;
}

// 保存训练进度
function saveProgress(progress) {
    localStorage.setItem('valorantTrainingProgress', JSON.stringify(progress));
}

// 更新今日训练部分
function updateTodaySection() {
    const progress = loadProgress();
    const currentDay = progress.currentDay;
    
    // 计算当前周
    const currentWeek = Math.ceil(currentDay / 7);
    const weekKey = 'week' + currentWeek;
    const dayInWeek = (currentDay - 1) % 7 + 1;
    
    // 获取今日训练数据
    const dayData = TRAINING_PLAN[weekKey].days[dayInWeek];
    
    // 更新标题和提示
    document.getElementById('today-title').textContent = `📅 第${currentDay}天 - ${dayData.title}`;
    document.getElementById('today-week').textContent = `📊 第${currentWeek}周：${TRAINING_PLAN[weekKey].theme}`;
    document.getElementById('today-tips').textContent = dayData.tips;
    
    // 更新时间表
    const scheduleContainer = document.getElementById('today-schedule');
    scheduleContainer.innerHTML = '';
    
    // 遍历所有时段
    const periods = ['morning', 'noon', 'afternoon', 'evening'];
    periods.forEach(period => {
        const periodActivities = dayData.schedule[period];
        if (periodActivities && periodActivities.length > 0) {
            const periodElement = document.createElement('div');
            periodElement.innerHTML = `<h3>${getPeriodName(period)}</h3>`;
            
            periodActivities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'schedule-item';
                let videoHtml = '';
                if (activity.video) {
                    if (activity.video.includes('douyin.com') || activity.video.includes('v.douyin.com')) {
                        videoHtml = `
                            <div class="schedule-video" style="margin-top: 10px;">
                                <a href="${activity.video}" target="_blank" style="display: inline-block; padding: 10px 20px; background: #FE2C55; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                    📺 打开抖音视频
                                </a>
                            </div>
                        `;
                    } else {
                        videoHtml = `
                            <div class="schedule-video" style="margin-top: 10px;">
                                <iframe width="100%" height="200" src="${activity.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                }
                
                let subItemsHtml = '';
                if (activity.subItems && activity.subItems.length > 0) {
                    subItemsHtml = `
                        <div class="schedule-subitems" style="margin-top: 10px; margin-left: 265px;">
                            <ul style="list-style-type: disc; padding-left: 20px;">
                                ${activity.subItems.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                activityElement.innerHTML = `
                    <div class="schedule-time">${activity.time}</div>
                    <div class="schedule-type type-${activity.type}">${getActivityTypeName(activity.type)}</div>
                    <div class="schedule-activity">${activity.activity}</div>
                    ${activity.description ? `<div class="schedule-description" style="margin-top: 8px; color: #aaa; font-size: 0.9em;">📝 ${activity.description}</div>` : ''}
                    ${videoHtml}
                    ${subItemsHtml}
                    <div style="margin-top: 8px;">
                        <button onclick="quickTimer('${activity.activity}', 15)" style="padding: 4px 10px; background: #48dbfb; border: none; border-radius: 4px; color: #1a1a2e; font-size: 0.8em; cursor: pointer; margin-right: 5px;">⏱️ 15分钟</button>
                        <button onclick="quickTimer('${activity.activity}', 30)" style="padding: 4px 10px; background: #48dbfb; border: none; border-radius: 4px; color: #1a1a2e; font-size: 0.8em; cursor: pointer; margin-right: 5px;">⏱️ 30分钟</button>
                        <button onclick="quickTimer('${activity.activity}', 60)" style="padding: 4px 10px; background: #48dbfb; border: none; border-radius: 4px; color: #1a1a2e; font-size: 0.8em; cursor: pointer;">⏱️ 60分钟</button>
                    </div>
                `;
                periodElement.appendChild(activityElement);
            });
            
            scheduleContainer.appendChild(periodElement);
        }
    });
}

// 获取时段名称
function getPeriodName(period) {
    return PeriodNames[period] || period;
}

// 获取活动类型名称
function getActivityTypeName(type) {
    return TypeNames[type] || type;
}

// 更新统计部分
function updateStatsSection() {
    const progress = loadProgress();
    
    // 更新基本统计
    document.getElementById('stat-current-day').textContent = progress.currentDay;
    document.getElementById('stat-completed').textContent = progress.completedDays;
    document.getElementById('stat-games').textContent = progress.gamesPlayed;
    document.getElementById('stat-aim-time').textContent = Math.round(progress.aimScores.length * 1.5) + 'h';
    
    // 更新进度条
    const totalProgress = Math.min(Math.round((progress.currentDay / 30) * 100), 100);
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = totalProgress + '%';
    progressFill.textContent = totalProgress + '%';
    
    // 更新每周完成度
    const weekProgressContainer = document.getElementById('week-progress');
    weekProgressContainer.innerHTML = '';
    
    for (let week = 1; week <= 4; week++) {
        const weekElement = document.createElement('div');
        weekElement.innerHTML = `<h4>第${week}周</h4>`;
        
        const daysContainer = document.createElement('div');
        daysContainer.className = 'week-progress';
        
        for (let day = 1; day <= 7; day++) {
            const dayNum = (week - 1) * 7 + day;
            const dayElement = document.createElement('div');
            dayElement.className = 'day-dot';
            dayElement.textContent = day;
            
            if (dayNum < progress.currentDay) {
                dayElement.classList.add('completed');
            } else if (dayNum === progress.currentDay) {
                dayElement.classList.add('current');
            }
            
            daysContainer.appendChild(dayElement);
        }
        
        weekElement.appendChild(daysContainer);
        weekProgressContainer.appendChild(weekElement);
    }
    
    // 更新Aim分数记录
    const aimScoresContainer = document.getElementById('aim-scores');
    aimScoresContainer.innerHTML = '';
    
    if (progress.aimScores.length > 0) {
        progress.aimScores.forEach((score, index) => {
            const scoreElement = document.createElement('div');
            scoreElement.className = 'schedule-item';
            scoreElement.innerHTML = `
                <div class="schedule-time">第${index + 1}天</div>
                <div class="schedule-activity">Aim Lab分数: ${score}</div>
            `;
            aimScoresContainer.appendChild(scoreElement);
        });
    } else {
        aimScoresContainer.innerHTML = '<p>暂无Aim分数记录</p>';
    }
    
    // 更新段位记录
    const rankRecordContainer = document.getElementById('rank-record');
    rankRecordContainer.innerHTML = '';
    
    if (progress.rankHistory.length > 0) {
        progress.rankHistory.forEach((rank, index) => {
            const rankElement = document.createElement('div');
            rankElement.className = 'schedule-item';
            rankElement.innerHTML = `
                <div class="schedule-time">第${index + 1}天</div>
                <div class="schedule-activity">段位: ${rank}</div>
            `;
            rankRecordContainer.appendChild(rankElement);
        });
    } else {
        rankRecordContainer.innerHTML = '<p>暂无段位记录</p>';
    }
}

// 更新完整计划部分
function updatePlanSection() {
    const planContainer = document.getElementById('full-plan');
    planContainer.innerHTML = '';
    
    // 遍历所有周
    for (let week = 1; week <= 4; week++) {
        const weekKey = 'week' + week;
        const weekData = TRAINING_PLAN[weekKey];
        
        const weekElement = document.createElement('div');
        weekElement.className = 'card';
        weekElement.innerHTML = `
            <h3>📅 第${week}周 - ${weekData.theme}</h3>
            <p style="color: #a0a0a0; margin-bottom: 20px;">🎯 重点：${weekData.focus}</p>
        `;
        
        // 遍历每周的天
        for (let day = 1; day <= 7; day++) {
            const dayNum = (week - 1) * 7 + day;
            if (dayNum > 30) break;
            
            const dayData = weekData.days[day];
            const dayElement = document.createElement('div');
            dayElement.innerHTML = `
                <h4>第${dayNum}天 - ${dayData.title}</h4>
                <div class="tips">
                    <div class="tips-title">💡 提示</div>
                    <p>${dayData.tips}</p>
                </div>
            `;
            
            weekElement.appendChild(dayElement);
        }
        
        planContainer.appendChild(weekElement);
    }
}

// 记录Aim分数
function recordAimScore() {
    const input = document.getElementById('aim-score-input');
    const score = parseInt(input.value);
    
    if (isNaN(score) || score <= 0) {
        showNotification('请输入有效的Aim分数');
        return;
    }
    
    const progress = loadProgress();
    progress.aimScores.push(score);
    saveProgress(progress);
    
    showNotification('Aim分数记录成功！');
    input.value = '';
    updateStatsSection();
}

// 记录段位
function recordRank() {
    const input = document.getElementById('rank-input');
    const rank = input.value.trim();
    
    if (!rank) {
        showNotification('请输入段位');
        return;
    }
    
    const progress = loadProgress();
    progress.rankHistory.push(rank);
    saveProgress(progress);
    
    showNotification('段位记录成功！');
    input.value = '';
    updateStatsSection();
}

// 记录排位场次
function recordGames() {
    const input = document.getElementById('games-input');
    const games = parseInt(input.value);
    
    if (isNaN(games) || games < 0) {
        showNotification('请输入有效的场次');
        return;
    }
    
    const progress = loadProgress();
    progress.gamesPlayed += games;
    saveProgress(progress);
    
    showNotification('排位场次记录成功！');
    input.value = '';
    updateStatsSection();
}

// 完成今日训练
function completeDay() {
    const progress = loadProgress();
    
    if (progress.currentDay >= 30) {
        showNotification('🎉 恭喜你完成了30天训练计划！');
        return;
    }
    
    progress.completedDays++;
    progress.currentDay++;
    saveProgress(progress);
    
    showNotification('今日训练完成！已自动进入下一天');
    updateTodaySection();
    updateStatsSection();
    showSection('today');
}

// 重置进度
function resetProgress() {
    if (confirm('确定要重置所有训练进度吗？此操作不可恢复。')) {
        const resetProgress = {
            currentDay: 1,
            completedDays: 0,
            gamesPlayed: 0,
            aimScores: [],
            rankHistory: [],
            completedWeeks: 0
        };
        saveProgress(resetProgress);
        
        showNotification('进度已重置！');
        updateTodaySection();
        updateStatsSection();
        showSection('today');
    }
}

// 重置欢迎信息（重新显示首次使用提示）
function resetWelcome() {
    localStorage.removeItem('trainingPlanInitialized');
    alert('✅ 已重置！刷新页面后将重新显示欢迎信息。');
}

// 显示通知
function showNotification(message) {
    // 播放提示音
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA');
    audio.play().catch(e => console.log('音频播放失败:', e));
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 训练计时器变量
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerTargetSeconds = 30 * 60;

// 训练历史记录
let trainingHistory = JSON.parse(localStorage.getItem('trainingHistory') || '[]');

// 自定义音效存储
let customSounds = JSON.parse(localStorage.getItem('customSounds') || '[]');

// 音效生成函数
function generateSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'default':
        case 'bell':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
        case 'chime':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'celebration':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
    }
}

// 预览音效
function previewSound() {
    const soundType = document.getElementById('timer-sound-type').value;
    
    if (soundType === 'custom') {
        if (customSounds.length > 0) {
            playCustomSound(customSounds[0].data);
        } else {
            alert('请先上传自定义音效！');
        }
    } else {
        generateSound(soundType);
    }
}

// 播放自定义音效
function playCustomSound(base64Data) {
    const audio = new Audio(base64Data);
    audio.play().catch(e => console.log('音频播放失败:', e));
}

// 上传自定义音效
function uploadCustomSound() {
    const fileInput = document.getElementById('custom-sound-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('请选择音频文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Data = e.target.result;
        
        const soundName = file.name.replace(/\.[^/.]+$/, '');
        customSounds.push({
            id: Date.now(),
            name: soundName,
            data: base64Data
        });
        
        localStorage.setItem('customSounds', JSON.stringify(customSounds));
        
        alert('✅ 音效上传成功！');
        renderCustomSoundsList();
        
        // 添加到下拉框
        const select = document.getElementById('timer-sound-type');
        const option = document.createElement('option');
        option.value = 'custom_' + customSounds.length;
        option.textContent = '📁 ' + soundName;
        select.appendChild(option);
    };
    reader.readAsDataURL(file);
}

// 渲染自定义音效列表
function renderCustomSoundsList() {
    const container = document.getElementById('custom-sounds-items');
    const listContainer = document.getElementById('custom-sounds-list');
    
    if (customSounds.length === 0) {
        listContainer.style.display = 'none';
        return;
    }
    
    listContainer.style.display = 'block';
    container.innerHTML = '';
    
    customSounds.forEach((sound, index) => {
        const item = document.createElement('div');
        item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 8px;';
        item.innerHTML = `
            <span>${sound.name}</span>
            <div>
                <button onclick="playCustomSound('${sound.data}')" style="padding: 5px 10px; background: linear-gradient(45deg, #48dbfb, #0abde3); border: none; border-radius: 5px; color: white; cursor: pointer; margin-right: 5px;">▶</button>
                <button onclick="deleteCustomSound(${index})" style="padding: 5px 10px; background: linear-gradient(45deg, #e74c3c, #c0392b); border: none; border-radius: 5px; color: white; cursor: pointer;">🗑️</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// 删除自定义音效
function deleteCustomSound(index) {
    if (confirm('确定删除这个音效吗？')) {
        customSounds.splice(index, 1);
        localStorage.setItem('customSounds', JSON.stringify(customSounds));
        renderCustomSoundsList();
    }
}

// 页面加载时渲染自定义音效列表
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('custom-sounds-items')) {
        renderCustomSoundsList();
    }
});

// 启动计时器
function startTimer() {
    if (timerRunning) return;
    
    const duration = parseInt(document.getElementById('timer-duration').value) || 30;
    timerTargetSeconds = duration * 60;
    
    timerRunning = true;
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
        
        if (timerSeconds >= timerTargetSeconds) {
            pauseTimer();
            document.getElementById('timer-alert').style.display = 'block';
            playSelectedSound();
            saveTrainingRecord();
        }
    }, 1000);
}

// 播放选中的音效
function playSelectedSound() {
    const soundType = document.getElementById('timer-sound-type').value;
    const soundEnabled = document.getElementById('timer-sound').checked;
    
    if (!soundEnabled) return;
    
    if (soundType === 'custom') {
        if (customSounds.length > 0) {
            playCustomSound(customSounds[0].data);
        }
    } else if (soundType.startsWith('custom_')) {
        const index = parseInt(soundType.split('_')[1]) - 1;
        if (customSounds[index]) {
            playCustomSound(customSounds[index].data);
        }
    } else {
        generateSound(soundType);
    }
}

// 暂停计时器
function pauseTimer() {
    if (!timerRunning) return;
    
    timerRunning = false;
    clearInterval(timerInterval);
    
    if (timerSeconds >= timerTargetSeconds) {
        document.getElementById('timer-alert').style.display = 'block';
        playSelectedSound();
    }
}

// 重置计时器
function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    timerTargetSeconds = (parseInt(document.getElementById('timer-duration').value) || 30) * 60;
    updateTimerDisplay();
    document.getElementById('timer-alert').style.display = 'none';
}

// 更新计时器显示
function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    document.getElementById('timer-display').textContent = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

// 保存训练记录
function saveTrainingRecord() {
    const taskName = document.getElementById('timer-task').value || '未命名训练';
    const duration = Math.floor(timerSeconds / 60);
    
    const record = {
        task: taskName,
        duration: duration,
        date: new Date().toLocaleString()
    };
    
    trainingHistory.push(record);
    localStorage.setItem('trainingHistory', JSON.stringify(trainingHistory));
    updateTimerHistory();
}

// 更新训练历史显示
function updateTimerHistory() {
    const historyContainer = document.getElementById('timer-history');
    if (!historyContainer) return;
    
    const today = new Date().toLocaleDateString();
    const todayRecords = trainingHistory.filter(r => r.date.includes(today));
    
    if (todayRecords.length === 0) {
        historyContainer.innerHTML = '<p style="color: #a0a0a0;">今日暂无训练记录</p>';
        return;
    }
    
    let html = '';
    let totalMinutes = 0;
    todayRecords.forEach((record, index) => {
        totalMinutes += record.duration;
        html += `
            <div style="padding: 10px; margin-bottom: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <strong>${index + 1}. ${record.task}</strong><br>
                <span style="color: #48dbfb;">⏱️ ${record.duration}分钟</span>
                <span style="color: #a0a0a0; margin-left: 10px;">${record.date}</span>
            </div>
        `;
    });
    
    html += `<div style="padding: 10px; background: rgba(72, 219, 251, 0.2); border-radius: 8px; margin-top: 10px;">
        <strong>今日总训练时长: ${totalMinutes}分钟</strong>
    </div>`;
    
    historyContainer.innerHTML = html;
}

// 自定义训练项目
let customTrainings = JSON.parse(localStorage.getItem('customTrainings') || '[]');

// 添加自定义训练项目
function addCustomTraining() {
    const title = document.getElementById('custom-title').value;
    const type = document.getElementById('custom-type').value;
    const video = document.getElementById('custom-video').value;
    const duration = parseInt(document.getElementById('custom-duration').value) || 30;
    const desc = document.getElementById('custom-desc').value;
    const day = parseInt(document.getElementById('custom-day').value);
    const period = document.getElementById('custom-period').value;
    
    if (!title) {
        alert('请输入训练项目名称');
        return;
    }
    
    const training = {
        id: Date.now(),
        title,
        type,
        video,
        duration,
        desc,
        day,
        period
    };
    
    customTrainings.push(training);
    localStorage.setItem('customTrainings', JSON.stringify(customTrainings));
    
    // 清空输入框
    document.getElementById('custom-title').value = '';
    document.getElementById('custom-video').value = '';
    document.getElementById('custom-desc').value = '';
    
    updateCustomTrainingList();
    alert('训练项目添加成功！');
}

// 更新自定义训练列表显示
function updateCustomTrainingList() {
    const container = document.getElementById('custom-items');
    if (!container) return;
    
    if (customTrainings.length === 0) {
        container.innerHTML = '<p style="color: #a0a0a0;">暂无自定义训练项目</p>';
        return;
    }
    
    let html = '';
    customTrainings.forEach((training, index) => {
        const typeName = getActivityTypeName(training.type);
        const periodName = getPeriodName(training.period);
        
        let videoBtn = '';
        if (training.video) {
            if (training.video.includes('douyin.com') || training.video.includes('v.douyin.com')) {
                videoBtn = `<a href="${training.video}" target="_blank" style="display: inline-block; padding: 5px 10px; background: #FE2C55; color: white; text-decoration: none; border-radius: 5px; font-size: 0.8em; margin-left: 10px;">📺 抖音视频</a>`;
            } else {
                videoBtn = `<a href="${training.video}" target="_blank" style="display: inline-block; padding: 5px 10px; background: #feca57; color: #1a1a2e; text-decoration: none; border-radius: 5px; font-size: 0.8em; margin-left: 10px;">🎬 观看视频</a>`;
            }
        }
        
        html += `
            <div style="padding: 15px; margin-bottom: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; border-left: 4px solid #ff6b6b;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4>${index + 1}. ${training.title} ${typeName}</h4>
                    <button onclick="deleteCustomTraining(${training.id})" style="padding: 5px 10px; background: #e74c3c; border: none; border-radius: 5px; color: white; cursor: pointer;">🗑️ 删除</button>
                </div>
                <p style="color: #a0a0a0; margin: 5px 0;">📅 第${training.day}天 - ${periodName}</p>
                <p style="color: #a0a0a0; margin: 5px 0;">⏱️ ${training.duration}分钟</p>
                ${training.desc ? `<p style="margin: 5px 0;">${training.desc}</p>` : ''}
                ${videoBtn}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 删除自定义训练项目
function deleteCustomTraining(id) {
    if (!confirm('确定要删除这个训练项目吗？')) return;
    
    customTrainings = customTrainings.filter(t => t.id !== id);
    localStorage.setItem('customTrainings', JSON.stringify(customTrainings));
    updateCustomTrainingList();
}

// 音效提醒功能
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const soundEnabled = document.getElementById('timer-sound')?.checked;
    if (soundEnabled === false) return;
    
    const soundType = document.getElementById('timer-sound-type')?.value || 'default';
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(soundType) {
        case 'bell':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
        case 'chime':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'celebration':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.6);
            break;
        default:
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// 修改计时器功能，添加音效提醒
let originalStartTimer = startTimer;
startTimer = function() {
    if (timerRunning) return;
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const duration = parseInt(document.getElementById('timer-duration').value) || 30;
    timerTargetSeconds = duration * 60;
    
    timerRunning = true;
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
        
        // 每分钟提醒一次
        if (timerSeconds > 0 && timerSeconds % 60 === 0 && timerSeconds < timerTargetSeconds) {
            playSound('chime');
        }
        
        if (timerSeconds >= timerTargetSeconds) {
            pauseTimer();
            document.getElementById('timer-alert').style.display = 'block';
            playSound('celebration');
            saveTrainingRecord();
        }
    }, 1000);
};

// 训练计划管理
let trainingPlans = [];
let appInitialized = false;

// 初始化默认训练计划
function initDefaultPlans() {
    // 从localStorage加载
    trainingPlans = JSON.parse(localStorage.getItem('trainingPlans') || '[]');
    
    if (trainingPlans.length === 0) {
        // B站视频版本 - 放在第一位
        const bilibiliPlan = {
            id: 1,
            name: '📺 B站视频速成计划',
            description: '根据B站视频定制的30天训练计划（第1-4天已配置B站教学视频）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: false,
            hasVideos: true,
            videoSources: ['B站'],
            videoLinks: {
                1: ['https://www.bilibili.com/video/BV1GJ411x7h7/'],
                2: ['https://www.bilibili.com/video/BV1yp4o1W7Jd/'],
                3: ['https://www.bilibili.com/video/BV1Vh411G7gS/'],
                4: ['https://www.bilibili.com/video/BV1D54y1o7Vc/']
            },
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        // 自定义训练计划 - 放在第二位（锁定状态 - 模板计划）
        const customPlan = {
            id: 2,
            name: '📋 训练模板计划',
            description: '标准训练模板 - 30天完整训练内容（锁定不可修改）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: true,
            hasVideos: false,
            videoSources: [],
            videoLinks: {},
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        // 抖音视频计划 - 放在第三位（可编辑）
        const defaultPlan = {
            id: 3,
            name: '📱 抖音视频速成计划',
            description: '根据抖音视频定制的30天训练计划（第1-4天已配置抖音视频）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: false,
            hasVideos: true,
            videoSources: ['抖音'],
            videoLinks: {
                1: ['https://v.douyin.com/zNTinaxbPm8/'],
                2: ['https://v.douyin.com/kwCQH5p_HIg/'],
                3: ['https://v.douyin.com/l62UQn2L1zs/'],
                4: ['https://v.douyin.com/AgqYYDGzskE/']
            },
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        trainingPlans = [bilibiliPlan, customPlan, defaultPlan];
        localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
        
        // 保存当前选中的计划ID（默认使用B站视频计划）
        localStorage.setItem('currentPlanId', 1);
    }
    
    // 保存当前选中的计划ID
    if (!localStorage.getItem('currentPlanId')) {
        localStorage.setItem('currentPlanId', trainingPlans[0].id);
    }
    
    console.log('训练计划已加载:', trainingPlans.length, '个计划');
}

// 创建新训练计划
function createNewPlan() {
    const planName = document.getElementById('new-plan-name').value;
    const planDays = parseInt(document.getElementById('new-plan-days').value) || 30;
    
    if (!planName) {
        alert('请输入训练计划名称');
        return;
    }
    
    const plan = {
        id: Date.now(),
        name: planName,
        description: '自定义训练计划',
        days: planDays,
        createdAt: new Date().toLocaleString(),
        currentDay: 1,
        completed: false,
        isDefault: false,
        hasVideos: false,
        videoSources: [],
        videoLinks: {},
        customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
    };
    
    trainingPlans.push(plan);
    localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
    
    document.getElementById('new-plan-name').value = '';
    updatePlansList();
    
    // 显示成功提示
    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; padding: 15px 25px; border-radius: 10px; z-index: 10000;';
    successMsg.innerHTML = `✅ 已创建: ${planName}`;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 2000);
}

// 更新训练计划列表显示
function updatePlansList() {
    const container = document.getElementById('plans-items');
    if (!container) {
        console.log('plans-items 容器未找到');
        return;
    }
    
    console.log('updatePlansList 被调用');
    
    // 强制从localStorage重新加载最新数据
    const savedPlans = localStorage.getItem('trainingPlans');
    console.log('localStorage trainingPlans:', savedPlans ? '存在' : '不存在');
    
    if (savedPlans) {
        try {
            const parsed = JSON.parse(savedPlans);
            console.log('解析后的计划数量:', parsed ? parsed.length : 0);
            if (parsed && parsed.length > 0) {
                trainingPlans = parsed;
            }
        } catch (e) {
            console.error('解析训练计划失败:', e);
        }
    }
    
    // 如果还是没有，初始化默认计划
    if (!trainingPlans || trainingPlans.length === 0) {
        console.log('初始化默认计划');
        initDefaultPlans();
    }
    
    console.log('最终计划数量:', trainingPlans.length);
    
    if (trainingPlans.length === 0) {
        container.innerHTML = '<p style="color: #a0a0a0;">暂无训练计划，请创建一个新计划</p>';
        return;
    }
    
    let html = '';
    trainingPlans.forEach((plan, index) => {
        const progress = Math.round((plan.currentDay / plan.days) * 100);
        const status = plan.completed ? '✅ 已完成' : '🔄 进行中';
        const currentPlanId = localStorage.getItem('currentPlanId');
        const isActive = currentPlanId == plan.id;
        const defaultBadge = plan.isDefault ? '<span style="background: #48dbfb; color: #1a1a2e; padding: 2px 8px; border-radius: 10px; font-size: 0.7em; margin-left: 5px;">🔒 锁定</span>' : '';
        
        // 检查是否有独立数据
        const hasCustomData = plan.customData && Object.keys(plan.customData).length > 0;
        const dataStatus = hasCustomData ? '<span style="color: #2ecc71;">📦 独立数据</span>' : '<span style="color: #f39c12;">📋 共享数据</span>';
        
        const videoSources = plan.videoSources && plan.videoSources.length > 0 
            ? `<p style="color: #ff6b6b; margin: 5px 0;">📹 视频来源: ${plan.videoSources.join(', ')}</p>` 
            : '';
        
        html += `
            <div style="padding: 15px; margin-bottom: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; border-left: 4px solid ${isActive ? '#2ecc71' : '#a55eea'};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4>${index + 1}. ${plan.name} ${defaultBadge}</h4>
                    <div>
                        ${isActive ? '<span style="margin-right: 10px; color: #2ecc71;">✓ 当前使用</span>' : `<button onclick="switchToPlan(${plan.id})" style="padding: 5px 15px; background: #48dbfb; border: none; border-radius: 5px; color: #1a1a2e; cursor: pointer; margin-right: 5px;">🎯 使用</button>`}
                        ${plan.isDefault ? `<button onclick="viewPlanDetails(${plan.id})" style="padding: 5px 15px; background: #9b59b6; border: none; border-radius: 5px; color: white; cursor: pointer; margin-right: 5px;">👁️ 查看</button>` : `
                        <button onclick="editPlanDetails(${plan.id})" style="padding: 5px 15px; background: #f39c12; border: none; border-radius: 5px; color: white; cursor: pointer; margin-right: 5px;">✏️ 编辑</button>
                        <button onclick="openEditSection(${plan.currentDay || 1})" style="padding: 5px 15px; background: #9b59b6; border: none; border-radius: 5px; color: white; cursor: pointer; margin-right: 5px;">📝 训练项目</button>
                        <button onclick="deletePlan(${plan.id})" style="padding: 5px 10px; background: #e74c3c; border: none; border-radius: 5px; color: white; cursor: pointer;">🗑️</button>
                        `}
                    </div>
                </div>
                ${plan.description ? `<p style="color: #a0a0a0; margin: 5px 0;">${plan.description}</p>` : ''}
                ${videoSources}
                <p style="color: #a0a0a0; margin: 5px 0;">📦 数据状态: ${dataStatus}</p>
                <p style="color: #a0a0a0; margin: 5px 0;">📅 ${plan.days}天训练计划</p>
                <p style="color: #a0a0a0; margin: 5px 0;">📊 进度: 第${plan.currentDay}天 (${progress}%)</p>
                <p style="color: #a0a0a0; margin: 5px 0;">${status}</p>
                ${plan.isDefault ? '<p style="color: #e74c3c; margin: 5px 0; font-size: 0.8em;">⚠️ 默认计划锁定，无法修改训练项目</p>' : ''}
                <p style="color: #666; margin: 5px 0; font-size: 0.8em;">创建于: ${plan.createdAt}</p>
                <div style="margin-top: 10px; background: rgba(0,0,0,0.3); border-radius: 5px; height: 10px; overflow: hidden;">
                    <div style="width: ${progress}%; background: linear-gradient(90deg, #ff6b6b, #feca57); height: 100%;"></div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 编辑训练计划详情
function editPlanDetails(planId) {
    const plan = trainingPlans.find(p => p.id === planId);
    if (!plan) return;
    
    const newName = prompt('请输入新的计划名称：', plan.name);
    if (newName && newName.trim() !== '') {
        plan.name = newName.trim();
    }
    
    const newDays = prompt('请输入训练天数：', plan.days);
    if (newDays && !isNaN(newDays) && newDays > 0) {
        plan.days = parseInt(newDays);
    }
    
    // 所有计划都可以编辑描述
    const newDesc = prompt('请输入计划描述：', plan.description || '');
    if (newDesc !== null) {
        plan.description = newDesc.trim();
    }
    
    // 允许编辑默认计划的当前天数
    const newCurrentDay = prompt('请输入当前进行到第几天：', plan.currentDay);
    if (newCurrentDay && !isNaN(newCurrentDay) && newCurrentDay > 0 && newCurrentDay <= plan.days) {
        plan.currentDay = parseInt(newCurrentDay);
    }
    
    localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
    updatePlansList();
    alert('计划信息已更新！');
}

// 查看计划详情（用于锁定的计划）
function viewPlanDetails(planId) {
    const plan = trainingPlans.find(p => p.id === planId);
    if (!plan) return;
    
    let details = `📋 ${plan.name}\n\n`;
    details += `📝 描述: ${plan.description || '无'}\n`;
    details += `📅 总天数: ${plan.days}天\n`;
    details += `📊 当前进度: 第${plan.currentDay}天\n`;
    details += `🔒 状态: 锁定（不可修改）\n`;
    
    if (plan.videoSources && plan.videoSources.length > 0) {
        details += `📹 视频来源: ${plan.videoSources.join(', ')}\n`;
    }
    
    details += `\n创建时间: ${plan.createdAt}`;
    details += `\n\n点击"确定"查看全部30天训练内容`;
    
    if (confirm(details)) {
        showPlanAllDays(planId);
    }
}

// 显示计划的全部30天训练内容
function showPlanAllDays(planId) {
    const plan = trainingPlans.find(p => p.id === planId);
    if (!plan) return;
    
    const customData = plan.customData || TRAINING_PLAN;
    let html = `
        <div style="padding: 20px;">
            <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">📋 ${plan.name} - 全部训练内容</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
    `;
    
    // 显示30天的选择按钮
    for (let day = 1; day <= 30; day++) {
        const week = Math.ceil(day / 7);
        const dayInWeek = (day - 1) % 7 + 1;
        const weekKey = 'week' + week;
        
        if (customData[weekKey] && customData[weekKey].days[dayInWeek]) {
            const dayData = customData[weekKey].days[dayInWeek];
            const title = dayData.title || `第${day}天`;
            
            html += `
                <button onclick="viewDayContent(${planId}, ${day})" 
                    style="padding: 10px 20px; background: linear-gradient(45deg, #667eea, #764ba2); 
                    border: none; border-radius: 8px; color: white; cursor: pointer; font-size: 14px;">
                    第${day}天
                </button>
            `;
        }
    }
    
    html += `
            </div>
            <div id="dayContentArea" style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 20px; min-height: 200px;">
                <p style="color: #aaa; text-align: center;">点击上方某天查看详细训练内容</p>
            </div>
            <button onclick="updatePlansList()" style="margin-top: 20px; padding: 10px 30px; background: #48dbfb; border: none; border-radius: 5px; color: #1a1a2e; cursor: pointer;">← 返回计划列表</button>
        </div>
    `;
    
    const container = document.getElementById('plans-list');
    if (container) {
        container.innerHTML = html;
    }
}

// 显示某一天的详细训练内容
function viewDayContent(planId, day) {
    const plan = trainingPlans.find(p => p.id === planId);
    if (!plan) return;
    
    const customData = plan.customData || TRAINING_PLAN;
    const week = Math.ceil(day / 7);
    const dayInWeek = (day - 1) % 7 + 1;
    const weekKey = 'week' + week;
    const dayData = customData[weekKey].days[dayInWeek];
    
    if (!dayData) {
        alert('未找到第' + day + '天的训练内容');
        return;
    }
    
    let html = `
        <div style="padding: 20px;">
            <h3 style="color: #fff; margin-bottom: 15px;">📅 第${day}天 - ${dayData.title || '训练日'}</h3>
            <p style="color: #aaa; margin-bottom: 20px;">${dayData.description || ''}</p>
    `;
    
    const periods = [
        { key: 'morning', name: '🌅 早晨' },
        { key: 'noon', name: '☀️ 下午' },
        { key: 'afternoon', name: '🌤️ 傍晚' },
        { key: 'evening', name: '🌙 晚上' }
    ];
    
    periods.forEach(period => {
        if (dayData.schedule && dayData.schedule[period.key] && dayData.schedule[period.key].length > 0) {
            html += `
                <div style="margin-bottom: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px;">
                    <h4 style="color: #feca57; margin-bottom: 10px;">${period.name}</h4>
            `;
            
            dayData.schedule[period.key].forEach(activity => {
                const videoBtn = activity.video ? `<a href="${activity.video}" target="_blank" style="color: #48dbfb; margin-left: 10px;">🎬 视频</a>` : '';
                const duration = activity.duration || '';
                
                html += `
                    <div style="margin-bottom: 8px; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                        <span style="color: #fff;">⏰ ${activity.time || ''}</span>
                        <span style="color: #aaa; margin-left: 10px;">${activity.activity || ''}</span>
                        ${videoBtn}
                        ${duration ? `<span style="color: #888; margin-left: 10px;">(${duration})</span>` : ''}
                    </div>
                `;
            });
            
            html += `</div>`;
        }
    });
    
    html += `
            <button onclick="showPlanAllDays(${planId})" style="margin-top: 10px; padding: 10px 20px; background: #48dbfb; border: none; border-radius: 5px; color: #1a1a2e; cursor: pointer;">← 返回全部天数</button>
        </div>
    `;
    
    const contentArea = document.getElementById('dayContentArea');
    if (contentArea) {
        contentArea.innerHTML = html;
    }
}

// 打开编辑训练项目页面
function openEditSection(day) {
    showSection('plans');
    document.getElementById('edit-day-select').value = day;
    loadDayForEdit();
    
    // 显示编辑区域
    const editSection = document.getElementById('plan-edit-section');
    if (editSection) {
        editSection.style.display = 'block';
        editSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 切换单个训练项目的展开/折叠状态
function toggleEditItem(index) {
    const content = document.getElementById('edit-item-content-' + index);
    const icon = document.querySelector('#edit-item-content-' + index).parentNode.querySelector('span');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        if (icon) icon.textContent = '📄';
    } else {
        content.style.display = 'none';
        if (icon) icon.textContent = '📂';
    }
}

// 展开/折叠全部训练项目
let allItemsExpanded = false;

function toggleAllEditItems() {
    allItemsExpanded = !allItemsExpanded;
    
    const btn = document.getElementById('btn-toggle-all');
    if (btn) {
        btn.textContent = allItemsExpanded ? '📄 折叠全部' : '📂 展开全部';
    }
    
    editScheduleData.forEach((item, index) => {
        const content = document.getElementById('edit-item-content-' + index);
        if (content) {
            content.style.display = allItemsExpanded ? 'block' : 'none';
        }
    });
}

// 切换到指定训练计划
function switchToPlan(planId) {
    try {
        const plan = trainingPlans.find(p => p.id === planId);
        if (!plan) {
            alert('未找到该训练计划！');
            return;
        }
        
        const currentPlanId = localStorage.getItem('currentPlanId');
        
        // 如果已经是当前计划
        if (currentPlanId && currentPlanId == planId) {
            alert('该计划已经是当前使用的计划！');
            return;
        }
        
        // 确认切换
        if (!confirm(`确定要切换到训练计划"${plan.name}"吗？\n\n当前进度将会保存到当前计划中。`)) {
            return;
        }
        
        // 保存当前计划的数据
        if (currentPlanId) {
            const currentPlan = trainingPlans.find(p => p.id == currentPlanId);
            if (currentPlan) {
                // 确保当前计划有customData
                if (!currentPlan.customData) {
                    currentPlan.customData = JSON.parse(JSON.stringify(TRAINING_PLAN));
                } else {
                    // 更新当前计划的自定义数据
                    currentPlan.customData = JSON.parse(JSON.stringify(TRAINING_PLAN));
                }
            }
        }
        
        // 保存所有计划到localStorage
        localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
        
        // 更新当前计划ID
        localStorage.setItem('currentPlanId', planId);
        
        // 加载目标计划的训练数据
        if (plan.customData) {
            Object.assign(TRAINING_PLAN, JSON.parse(JSON.stringify(plan.customData)));
            localStorage.setItem('customTrainingPlan', JSON.stringify(TRAINING_PLAN));
        } else {
            // 如果计划没有自定义数据，从默认数据加载
            localStorage.removeItem('customTrainingPlan');
        }
        
        // 刷新显示
        updateTodaySection();
        updatePlansList();
        
        // 切换到今日训练页面
        showSection('today');
        
        // 显示成功提示
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; padding: 15px 25px; border-radius: 10px; z-index: 10000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
        successMsg.innerHTML = `✅ 已切换到: ${plan.name}`;
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 2500);
        
        console.log('计划切换成功:', plan.name);
        
    } catch (e) {
        console.error('切换计划错误:', e);
        alert('切换计划时出错: ' + e.message);
    }
}

// 删除训练计划
function deletePlan(planId) {
    if (!confirm('确定要删除这个训练计划吗？')) return;
    
    const plan = trainingPlans.find(p => p.id === planId);
    const planName = plan ? plan.name : '该计划';
    
    trainingPlans = trainingPlans.filter(p => p.id !== planId);
    localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
    updatePlansList();
    
    // 显示成功提示
    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 15px 25px; border-radius: 10px; z-index: 10000;';
    successMsg.innerHTML = `🗑️ 已删除: ${planName}`;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 2000);
}

// 重置所有数据到默认状态
function resetAllData() {
    if (!confirm('⚠️ 确定要恢复默认计划吗？\n\n这将：\n- 删除所有自定义训练计划\n- 恢复默认的3个训练计划\n- 恢复完整的30天训练内容\n\n此操作不可恢复！')) {
        return;
    }
    
    try {
        // 1. 先清除所有localStorage数据
        localStorage.removeItem('trainingPlans');
        localStorage.removeItem('currentPlanId');
        localStorage.removeItem('customTrainingPlan');
        
        // 2. 清空内存中的trainingPlans
        trainingPlans = [];
        
        // 3. 重新创建默认训练计划（强制重新创建）
        // B站视频版本 - 放在第一位
        const bilibiliPlan = {
            id: 1,
            name: '📺 B站视频速成计划',
            description: '根据B站视频定制的30天训练计划（第1-4天已配置B站教学视频）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: false,
            hasVideos: true,
            videoSources: ['B站'],
            videoLinks: {
                1: ['https://www.bilibili.com/video/BV1GJ411x7h7/'],
                2: ['https://www.bilibili.com/video/BV1yp4o1W7Jd/'],
                3: ['https://www.bilibili.com/video/BV1Vh411G7gS/'],
                4: ['https://www.bilibili.com/video/BV1D54y1o7Vc/']
            },
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        // 自定义训练计划 - 放在第二位（锁定状态 - 模板计划）
        const customPlan = {
            id: 2,
            name: '📋 训练模板计划',
            description: '标准训练模板 - 30天完整训练内容（锁定不可修改）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: true,
            hasVideos: false,
            videoSources: [],
            videoLinks: {},
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        // 抖音视频计划 - 放在第三位（可编辑）
        const defaultPlan = {
            id: 3,
            name: '📱 抖音视频速成计划',
            description: '根据抖音视频定制的30天训练计划（第1-4天已配置抖音视频）',
            days: 30,
            createdAt: new Date().toLocaleString(),
            currentDay: 1,
            completed: false,
            isDefault: false,
            hasVideos: true,
            videoSources: ['抖音'],
            videoLinks: {
                1: ['https://v.douyin.com/zNTinaxbPm8/'],
                2: ['https://v.douyin.com/kwCQH5p_HIg/'],
                3: ['https://v.douyin.com/l62UQn2L1zs/'],
                4: ['https://v.douyin.com/AgqYYDGzskE/']
            },
            customData: JSON.parse(JSON.stringify(TRAINING_PLAN))
        };
        
        trainingPlans = [bilibiliPlan, customPlan, defaultPlan];
        localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
        
        // 保存当前选中的计划ID
        localStorage.setItem('currentPlanId', 1);
        
        // 4. 刷新显示
        updatePlansList();
        updateTodaySection();
        
        alert('✅ 已恢复默认训练计划模板！\n\n包含：\n📺 B站视频速成计划\n📋 训练模板计划\n📱 抖音视频速成计划');
    } catch (e) {
        alert('❌ 恢复失败: ' + e.message);
        console.error('Reset error:', e);
    }
}

// 强制刷新页面并重新加载数据
function forceRefresh() {
    if (!confirm('⚠️ 确定要强制刷新吗？\n\n这将清除浏览器缓存并重新加载最新设置。')) {
        return;
    }
    
    // 清除所有localStorage数据
    localStorage.clear();
    
    // 显示提示
    alert('✅ 缓存已清除，正在刷新页面...');
    
    // 刷新页面
    location.reload();
}

// 加载当前使用的训练计划
function loadCurrentPlan() {
    const currentPlanId = localStorage.getItem('currentPlanId');
    if (currentPlanId) {
        const plan = trainingPlans.find(p => p.id == currentPlanId);
        if (plan) {
            return plan;
        }
    }
    return null;
}

// 快速计时器 - 从训练计划中启动
function quickTimer(taskName, minutes) {
    document.getElementById('timer-task').value = taskName;
    document.getElementById('timer-duration').value = minutes;
    
    resetTimer();
    showSection('timer');
    
    setTimeout(() => {
        startTimer();
    }, 500);
    
    alert(`开始训练: ${taskName}，时长: ${minutes}分钟`);
}

// ==================== 训练项目库 ====================
// 前4天默认训练项目（基于抖音视频教程）
const TRAINING_PROJECTS = [
    // ====== 第1天：游戏基础与设置优化 ======
    {
        id: 1,
        name: "📺 观看游戏基础教学视频",
        category: "theory",
        duration: "1小时",
        difficulty: "入门",
        description: "观看枪法篇教学视频，熟悉游戏界面和基本操作",
        tips: "了解游戏界面布局、角色选择、技能系统和游戏规则",
        video: "https://v.douyin.com/zNTinaxbPm8/",
        day: 1
    },
    {
        id: 2,
        name: "🎮 训练场熟悉所有武器",
        category: "aim",
        duration: "1.5小时",
        difficulty: "入门",
        description: "在训练场熟悉所有武器，每把武器打50发子弹",
        tips: "感受不同武器后坐力，找到顺手的主战武器",
        video: "",
        day: 1
    },
    {
        id: 3,
        name: "⚙️ 调整灵敏度+准星设置",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "推荐灵敏度1600-4000，准星选择实心圆，设置准星颜色为绿色",
        tips: "找到适合自己的灵敏度，不要频繁调整",
        video: "",
        day: 1
    },
    {
        id: 4,
        name: "🎯 训练场压枪练习",
        category: "aim",
        duration: "1小时",
        difficulty: "入门",
        description: "练习Phantom三连发和Vandal单点，感受压枪轨迹",
        tips: "从近距离到远距离逐步增加难度",
        video: "",
        day: 1
    },
    {
        id: 5,
        name: "🎮 非排位赛 - 熟悉操作",
        category: "game",
        duration: "1.5小时",
        difficulty: "入门",
        description: "在非排位赛中熟悉操作，不要在意输赢",
        tips: "专注于基本操作，遇到敌人不要紧张",
        video: "",
        day: 1
    },
    {
        id: 6,
        name: "💀 死斗模式练习",
        category: "aim",
        duration: "1.5小时",
        difficulty: "入门",
        description: "在死斗模式中熟悉地图点位和击杀敌人",
        tips: "熟悉地图点位，练习瞄准和击杀，不要在意排名",
        video: "",
        day: 1
    },
    {
        id: 7,
        name: "📺 观看急停基础教学",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "学习什么是急停、急停的重要性和基础急停技巧",
        tips: "理解急停原理，为第二天训练做准备",
        video: "https://v.douyin.com/l62UQn2L1zs/",
        day: 1
    },
    // ====== 第2天：瞄准基础训练 ======
    {
        id: 8,
        name: "🎯 Aim Lab基础训练",
        category: "aim",
        duration: "1.5小时",
        difficulty: "入门",
        description: "Gridshot快速瞄准、Spidershot跟枪、Tracking跟踪训练",
        tips: "每天至少30分钟，重点练习跟踪和定位",
        video: "",
        day: 2
    },
    {
        id: 9,
        name: "💀 死斗模式练习（专注急停）",
        category: "aim",
        duration: "1.5小时",
        difficulty: "进阶",
        description: "在死斗模式中专注瞄准头部和练习急停",
        tips: "练习急停射击，不要见人就开枪",
        video: "",
        day: 2
    },
    {
        id: 10,
        name: "📺 观看跟枪技巧视频",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "学习跟枪节奏、掌握手腕瞄准、练习目标切换",
        tips: "理解跟枪技巧，为实战做准备",
        video: "https://v.douyin.com/kwCQH5p_HIg/",
        day: 2
    },
    {
        id: 11,
        name: "🎮 训练场练习急停",
        category: "movement",
        duration: "1小时",
        difficulty: "入门",
        description: "A/D键急停、松开方向键瞬间开火、形成肌肉记忆",
        tips: "急停是FPS核心基础，多花时间练习",
        video: "",
        day: 2
    },
    {
        id: 12,
        name: "🎮 排位赛（专注急停）",
        category: "game",
        duration: "3小时",
        difficulty: "进阶",
        description: "在排位赛中应用急停技巧，专注于急停和爆头",
        tips: "不要急于开枪，保持冷静，专注于急停",
        video: "",
        day: 2
    },
    // ====== 第3天：准星放置训练 ======
    {
        id: 13,
        name: "🎯 Aim Lab - 准星放置专项",
        category: "aim",
        duration: "1.5小时",
        difficulty: "进阶",
        description: "Flick Shot快速定位、Headshot爆头专项、Reflex Shot反应训练",
        tips: "准星永远放头部高度，养成肌肉记忆",
        video: "",
        day: 3
    },
    {
        id: 14,
        name: "💀 死斗模式（专注准星放置）",
        category: "aim",
        duration: "1.5小时",
        difficulty: "进阶",
        description: "准星永远放头部高度，预瞄常见点位，不要见人就开枪",
        tips: "专注于准星放置，形成肌肉记忆",
        video: "",
        day: 3
    },
    {
        id: 15,
        name: "📺 学习急停技巧（复习）",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "复习急停要点、掌握急停时机、实战应用技巧",
        tips: "结合准星放置练习，形成完整习惯",
        video: "https://v.douyin.com/l62UQn2L1zs/",
        day: 3
    },
    {
        id: 16,
        name: "🎮 训练场练习急停+准星",
        category: "movement",
        duration: "1小时",
        difficulty: "进阶",
        description: "结合准星放置练习，移动到点位再开火",
        tips: "形成肌肉记忆，养成正确习惯",
        video: "",
        day: 3
    },
    {
        id: 17,
        name: "🎮 排位赛（专注准星+爆头）",
        category: "game",
        duration: "3小时",
        difficulty: "进阶",
        description: "专注于准星放置和瞄准头部开枪",
        tips: "每天提醒自己：头部！头部！头部！",
        video: "",
        day: 3
    },
    // ====== 第4天：武器掌握日 ======
    {
        id: 18,
        name: "🎯 训练场练习枪械后坐力",
        category: "aim",
        duration: "1.5小时",
        difficulty: "入门",
        description: "练习Vandal压枪、Phantom弹道、对比两把主战枪",
        tips: "掌握两把主战枪的特点和弹道",
        video: "",
        day: 4
    },
    {
        id: 19,
        name: "💀 死斗模式（专注压枪）",
        category: "aim",
        duration: "1.5小时",
        difficulty: "进阶",
        description: "练习压枪击杀，感受不同距离的压枪",
        tips: "不要在意排名，专注于压枪技巧",
        video: "",
        day: 4
    },
    {
        id: 20,
        name: "📺 学习急停时机",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "掌握开火时机、学习移动节奏、实战应用技巧",
        tips: "掌握急停时机是击杀的关键",
        video: "https://v.douyin.com/AgqYYDGzskE/",
        day: 4
    },
    {
        id: 21,
        name: "🎮 排位赛（应用压枪技巧）",
        category: "game",
        duration: "3小时",
        difficulty: "进阶",
        description: "在排位赛中应用今天所学的压枪技巧",
        tips: "Phantom适合中距离泼射，Vandal适合远距离单点",
        video: "",
        day: 4
    },
    {
        id: 22,
        name: "📝 总结武器使用心得",
        category: "theory",
        duration: "30分钟",
        difficulty: "入门",
        description: "记录最顺手的武器、压枪心得、制定明天目标",
        tips: "找到最适合自己的主战武器",
        video: "",
        day: 4
    }
];

// 渲染训练项目库
function renderProjects(filter = 'all') {
    const container = document.getElementById('project-list');
    if (!container) return;
    
    currentFilter = filter;
    
    let filtered;
    
    // 按天筛选
    if (filter.startsWith('day')) {
        const dayNum = parseInt(filter.replace('day', ''));
        filtered = TRAINING_PROJECTS.filter(p => p.day === dayNum);
    } else {
        filtered = filter === 'all' 
            ? [...TRAINING_PROJECTS] 
            : TRAINING_PROJECTS.filter(p => p.category === filter);
    }
    
    // 排序
    if (currentSort && currentSort !== 'default') {
        const difficultyOrder = { '入门': 1, '进阶': 2, '高级': 3 };
        
        // 提取时间数字
        const getTimeMinutes = (duration) => {
            const match = duration.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        
        switch(currentSort) {
            case 'time-asc':
                filtered.sort((a, b) => getTimeMinutes(a.duration) - getTimeMinutes(b.duration));
                break;
            case 'time-desc':
                filtered.sort((a, b) => getTimeMinutes(b.duration) - getTimeMinutes(a.duration));
                break;
            case 'difficulty-asc':
                filtered.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0));
                break;
            case 'difficulty-desc':
                filtered.sort((a, b) => (difficultyOrder[b.difficulty] || 0) - (difficultyOrder[a.difficulty] || 0));
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));
                break;
        }
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: #a0a0a0;">暂无该项目</p>';
        return;
    }
    
    const categoryNames = {
        aim: '🎯 瞄准',
        movement: '🏃 身法',
        utility: '💥 技能',
        game: '🎮 实战',
        theory: '📖 理论'
    };
    
    const difficultyColors = {
        '入门': '#2ecc71',
        '进阶': '#f39c12',
        '高级': '#e74c3c'
    };
    
    let html = '';
    filtered.forEach(project => {
        const borderColors = {
            aim: '#ff6b6b',
            movement: '#48dbfb',
            utility: '#a55eea',
            game: '#ff9f43',
            theory: '#2ecc71'
        };
        const borderColor = borderColors[project.category] || '#ff9ff3';
        
        html += `
            <div style="background: linear-gradient(145deg, rgba(40, 40, 80, 0.8), rgba(30, 30, 60, 0.9)); border-radius: 12px; padding: 20px; margin-bottom: 15px; border-left: 4px solid ${borderColor}; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="color: #ffffff; font-size: 1.1em; margin: 0; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${project.name}</h4>
                    <span style="background: ${difficultyColors[project.difficulty] || '#666'}; color: #1a1a2e; padding: 3px 10px; border-radius: 10px; font-size: 0.8em; font-weight: bold;">${project.difficulty}</span>
                </div>
                <p style="color: #b0b0b0; margin: 5px 0;">📂 ${categoryNames[project.category]}</p>
                <p style="color: #48dbfb; margin: 5px 0;">⏱️ ${project.duration}</p>
                <div style="background: rgba(0, 0, 0, 0.3); padding: 12px; border-radius: 8px; margin-top: 10px; border: 1px solid rgba(255,255,255,0.1);">
                    <p style="color: #e0e0e0; margin: 5px 0;"><strong style="color: #48dbfb;">📝 训练说明：</strong>${project.description}</p>
                    <p style="color: #feca57; margin: 5px 0;"><strong>💡 训练要点：</strong>${project.tips}</p>
                </div>
                <button onclick="quickTimer('${project.name}', 30)" style="margin-top: 15px; padding: 10px 20px; background: linear-gradient(45deg, #48dbfb, #0abde3); border: none; border-radius: 8px; color: #1a1a2e; cursor: pointer; font-weight: bold;">⏱️ 开始训练30分钟</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 筛选训练项目
function filterProjects(category) {
    // 更新按钮样式 - 分类按钮
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (!btn.classList.contains('day-filter-btn')) {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.color = '#fff';
        }
    });
    if (event && event.target) {
        event.target.style.background = '#48dbfb';
        event.target.style.color = '#1a1a2e';
    }
    
    // 处理按天筛选
    if (category.startsWith('day')) {
        const dayNum = parseInt(category.replace('day', ''));
        // 显示对应的天
        document.querySelectorAll('.category-btn.day-filter-btn').forEach(btn => {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.color = '#fff';
        });
        if (event && event.target) {
            event.target.style.background = '#9b59b6';
            event.target.style.color = '#fff';
        }
    }
    
    renderProjects(category);
}

// 排序训练项目
let currentFilter = 'all';
let currentSort = 'default';

function sortProjects(sortType) {
    currentSort = sortType;
    renderProjects(currentFilter);
}

// 恢复默认训练项目
function resetProjects() {
    if (!confirm('确定要恢复默认训练项目吗？\n\n将显示前4天的训练项目（第1-4天）')) return;
    
    // 重置排序选择器
    const sortSelect = document.getElementById('project-sort');
    if (sortSelect) {
        sortSelect.value = 'default';
    }
    currentSort = 'default';
    
    // 重置筛选到前4天
    filterProjects('day1');
    
    // 同时重置分类按钮样式
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.style.color = '#fff';
    });
    
    // 设置第1天按钮为激活状态
    const dayBtns = document.querySelectorAll('.day-filter-btn');
    if (dayBtns.length > 0) {
        dayBtns[0].style.background = '#9b59b6';
        dayBtns[0].style.color = '#fff';
    }
    
    alert('✅ 已恢复前4天默认训练项目！');
}

// 编辑训练计划功能 - 恢复某天的默认训练项目
function resetEditDay() {
    if (!confirm('确定要以第2个计划为初始模板恢复吗？\n\n将从第2个计划中恢复对应天数的训练项目。')) return;
    
    const day = parseInt(document.getElementById('edit-day-select').value);
    
    // 直接找到第2个计划（id: 2）
    const templatePlan = trainingPlans.find(p => p.id === 2);
    
    if (!templatePlan || !templatePlan.customData) {
        alert('❌ 未找到第2个计划！');
        return;
    }
    
    // 从第2个计划中获取对应天数的训练项目作为模板
    // day 就是当前选择要编辑的天数
    const week = Math.ceil(day / 7);
    const dayInWeek = (day - 1) % 7 + 1;
    const weekKey = 'week' + week;
    
    // 从第2个计划的customData获取对应天数的训练项目
    const sourceDayData = templatePlan.customData[weekKey].days[dayInWeek];
    
    // 重新构建 editScheduleData
    editScheduleData = [];
    const periods = ['morning', 'noon', 'afternoon', 'evening'];
    periods.forEach(period => {
        if (sourceDayData.schedule[period]) {
            sourceDayData.schedule[period].forEach(activity => {
                editScheduleData.push({
                    time: activity.time,
                    activity: activity.activity,
                    type: activity.type,
                    video: activity.video || '',
                    period: period
                });
            });
        }
    });
    
    // 重新渲染编辑界面
    renderEditSchedule();
    
    // 自动保存到当前计划
    saveEditedDay('current');
    
    alert('✅ 已以第2个计划为模板恢复第' + day + '天训练项目！');
}

let editScheduleData = [];

function loadDayForEdit() {
    const day = parseInt(document.getElementById('edit-day-select').value);
    const week = Math.ceil(day / 7);
    const dayInWeek = (day - 1) % 7 + 1;
    const weekKey = 'week' + week;
    
    // 从当前计划中获取数据
    let sourceData = TRAINING_PLAN;
    const currentPlanId = localStorage.getItem('currentPlanId');
    const planIndex = trainingPlans.findIndex(p => p.id == currentPlanId);
    
    console.log('loadDayForEdit - 当前计划ID:', currentPlanId, '计划索引:', planIndex);
    
    if (planIndex !== -1 && trainingPlans[planIndex].customData) {
        sourceData = trainingPlans[planIndex].customData;
        console.log('从customData加载:', trainingPlans[planIndex].name);
    } else {
        console.log('从默认TRAINING_PLAN加载');
    }
    
    const dayData = sourceData[weekKey].days[dayInWeek];
    
    editScheduleData = [];
    
    const periods = ['morning', 'noon', 'afternoon', 'evening'];
    periods.forEach(period => {
        if (dayData.schedule[period]) {
            dayData.schedule[period].forEach(activity => {
                editScheduleData.push({
                    time: activity.time,
                    activity: activity.activity,
                    type: activity.type,
                    video: activity.video || '',
                    period: period
                });
            });
        }
    });
    
    console.log('加载了', editScheduleData.length, '个训练项目');
    renderEditSchedule();
}

function renderEditSchedule() {
    const container = document.getElementById('edit-schedule-container');
    if (!container) return;
    
    if (editScheduleData.length === 0) {
        container.innerHTML = '<p style="color: #a0a0a0;">暂无训练项目</p>';
        return;
    }
    
    const periodNames = {
        morning: '🌅 早晨',
        noon: '🌞 中午',
        afternoon: '🌆 下午',
        evening: '🌙 晚上'
    };
    
    const typeNames = {
        aim: '🎯 瞄准训练',
        dm: '💀 死斗模式',
        ranked: '🏆 排位赛',
        theory: '📖 理论学习',
        practice: '🏃 实战练习',
        game: '🎮 游戏匹配',
        rest: '😴 休息',
        review: '📝 复盘总结',
        test: '📊 测试'
    };
    
    let html = '<div style="margin-bottom: 15px;"><button onclick="toggleAllEditItems()" id="btn-toggle-all" style="padding: 8px 16px; background: #48dbfb; border: none; border-radius: 5px; color: #1a1a2e; cursor: pointer;">📂 展开全部</button></div>';
    
    editScheduleData.forEach((item, index) => {
        html += `
            <div style="padding: 15px; margin-bottom: 10px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="toggleEditItem(${index})">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2em;">📂</span>
                        <div>
                            <strong id="summary-time-${index}">${item.time}</strong> - <strong id="summary-activity-${index}">${item.activity}</strong>
                            <span style="background: #9b59b6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7em; margin-left: 5px;">${typeNames[item.type] || item.type}</span>
                            <span style="background: #3498db; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7em; margin-left: 5px;">${periodNames[item.period]}</span>
                        </div>
                    </div>
                    <button onclick="event.stopPropagation(); deleteEditActivity(${index})" style="padding: 5px 10px; background: #e74c3c; border: none; border-radius: 5px; color: white; cursor: pointer;">🗑️</button>
                </div>
                <div id="edit-item-content-${index}" style="display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <input type="text" id="edit-time-${index}" value="${item.time}" placeholder="时间" style="flex: 1; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                        <input type="text" id="edit-activity-${index}" value="${item.activity}" placeholder="训练项目" style="flex: 2; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                    </div>
                    <div style="margin-bottom: 10px;">
                        <input type="text" id="edit-description-${index}" value="${item.description || ''}" placeholder="训练简介（简要说明这个训练项目的内容）" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                    </div>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <select id="edit-type-${index}" style="flex: 1; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                            <option value="aim" ${item.type === 'aim' ? 'selected' : ''}>🎯 瞄准训练</option>
                            <option value="dm" ${item.type === 'dm' ? 'selected' : ''}>💀 死斗模式</option>
                            <option value="ranked" ${item.type === 'ranked' ? 'selected' : ''}>🏆 排位赛</option>
                            <option value="theory" ${item.type === 'theory' ? 'selected' : ''}>📖 理论学习</option>
                            <option value="practice" ${item.type === 'practice' ? 'selected' : ''}>🏃 实战练习</option>
                            <option value="game" ${item.type === 'game' ? 'selected' : ''}>🎮 游戏匹配</option>
                            <option value="rest" ${item.type === 'rest' ? 'selected' : ''}>😴 休息</option>
                            <option value="review" ${item.type === 'review' ? 'selected' : ''}>📝 复盘总结</option>
                            <option value="test" ${item.type === 'test' ? 'selected' : ''}>📊 测试</option>
                        </select>
                        <select id="edit-period-${index}" style="flex: 1; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                            <option value="morning" ${item.period === 'morning' ? 'selected' : ''}>🌅 早晨</option>
                            <option value="noon" ${item.period === 'noon' ? 'selected' : ''}>🌞 中午</option>
                            <option value="afternoon" ${item.period === 'afternoon' ? 'selected' : ''}>🌆 下午</option>
                            <option value="evening" ${item.period === 'evening' ? 'selected' : ''}>🌙 晚上</option>
                        </select>
                    </div>
                    <input type="text" id="edit-video-${index}" value="${item.video || ''}" placeholder="视频链接（可选）" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 10px;">
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function addEditActivity() {
    editScheduleData.push({
        time: "00:00-00:00",
        activity: "新训练项目",
        description: "",
        type: "practice",
        video: "",
        period: "morning"
    });
    renderEditSchedule();
}

function deleteEditActivity(index) {
    editScheduleData.splice(index, 1);
    renderEditSchedule();
}

function saveEditedDay(syncMode) {
    try {
        const day = parseInt(document.getElementById('edit-day-select').value);
        const week = Math.ceil(day / 7);
        const dayInWeek = (day - 1) % 7 + 1;
        const weekKey = 'week' + week;
        
        if (editScheduleData.length === 0) {
            alert('⚠️ 没有可保存的训练项目！');
            return;
        }
        
        // 首先：将表单中的数据同步到 editScheduleData
        editScheduleData.forEach((item, index) => {
            const timeInput = document.getElementById('edit-time-' + index);
            const activityInput = document.getElementById('edit-activity-' + index);
            const descriptionInput = document.getElementById('edit-description-' + index);
            const typeSelect = document.getElementById('edit-type-' + index);
            const periodSelect = document.getElementById('edit-period-' + index);
            const videoInput = document.getElementById('edit-video-' + index);
            
            if (timeInput && activityInput) {
                const newTime = timeInput.value.trim();
                const newActivity = activityInput.value.trim();
                
                if (!newTime || !newActivity) {
                    console.warn(`第${index + 1}项时间或活动为空`);
                }
                
                item.time = newTime;
                item.activity = newActivity;
                item.description = descriptionInput ? descriptionInput.value.trim() : '';
                if (typeSelect) item.type = typeSelect.value;
                if (periodSelect) item.period = periodSelect.value;
                if (videoInput) item.video = videoInput.value;
            }
        });
        
        // 从编辑表单中获取最新的数据
        const newSchedule = {
            morning: [],
            noon: [],
            afternoon: [],
            evening: []
        };
        
        // 过滤掉空项目
        const validItems = editScheduleData.filter(item => item.time && item.activity);
        
        // 遍历所有编辑项
        validItems.forEach((item) => {
            newSchedule[item.period].push({
                time: item.time,
                activity: item.activity,
                description: item.description || undefined,
                type: item.type,
                video: item.video || undefined
            });
        });
        
        // 获取当前计划的ID
        const currentPlanId = localStorage.getItem('currentPlanId');
        
        // 更新当前计划
        const planIndex = trainingPlans.findIndex(p => p.id == currentPlanId);
        
        // 默认模式：只保存到当前计划（不同步）
        const syncMode = 'current';
        
        if (syncMode === 'all') {
            // 同步到所有计划的customData
            trainingPlans.forEach((plan) => {
                if (!plan.customData) {
                    plan.customData = JSON.parse(JSON.stringify(TRAINING_PLAN));
                }
                plan.customData[weekKey].days[dayInWeek].schedule = JSON.parse(JSON.stringify(newSchedule));
            });
            localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
            
            // 更新主训练计划数据
            TRAINING_PLAN[weekKey].days[dayInWeek].schedule = JSON.parse(JSON.stringify(newSchedule));
            localStorage.setItem('customTrainingPlan', JSON.stringify(TRAINING_PLAN));
            
            showNotification('✅ 已同步到所有计划！');
        } else {
            // 仅保存到当前计划（不同步到其他计划）- 默认行为
            if (planIndex !== -1) {
                // 确保当前计划有独立的customData
                if (!trainingPlans[planIndex].customData) {
                    trainingPlans[planIndex].customData = JSON.parse(JSON.stringify(TRAINING_PLAN));
                }
                
                // 仅更新当前计划的customData
                trainingPlans[planIndex].customData[weekKey].days[dayInWeek].schedule = JSON.parse(JSON.stringify(newSchedule));
                
                // 保存到localStorage
                localStorage.setItem('trainingPlans', JSON.stringify(trainingPlans));
                
                // 同时更新当前使用的TRAINING_PLAN
                TRAINING_PLAN[weekKey].days[dayInWeek].schedule = JSON.parse(JSON.stringify(newSchedule));
                localStorage.setItem('customTrainingPlan', JSON.stringify(TRAINING_PLAN));
                
                console.log('已保存到当前计划:', trainingPlans[planIndex].name, '独立数据');
                showNotification('✅ 已保存到当前计划（独立数据）！');
            }
        }
        
        // 刷新显示
        updateTodaySection();
        renderEditSchedule();
        
    } catch (e) {
        alert('❌ 保存失败: ' + e.message);
        console.error('Save error:', e);
    }
}

// 根据视频生成一天训练计划
let generatedDayData = null;

function generateDayFromVideo() {
    const day = parseInt(document.getElementById('generate-day-select').value);
    const videoLinks = document.getElementById('generate-video-links').value.trim();
    const focus = document.getElementById('generate-focus').value.trim();
    const difficulty = document.getElementById('generate-difficulty') ? document.getElementById('generate-difficulty').value : 'beginner';
    
    if (!videoLinks) {
        alert('请输入抖音视频链接！');
        return;
    }
    
    const videos = videoLinks.split(',').map(v => v.trim()).filter(v => v);
    
    if (videos.length === 0) {
        alert('请输入有效的抖音视频链接！');
        return;
    }
    
    const week = Math.ceil(day / 7);
    const dayInWeek = (day - 1) % 7 + 1;
    const weekKey = 'week' + week;
    
    // 根据难度生成不同的训练计划
    let schedule;
    let tips;
    
    if (difficulty === 'beginner') {
        // 新手专用：轻松入门计划
        schedule = {
            morning: [
                { time: "08:00-08:30", activity: "起床+早餐", type: "rest" },
                { time: "08:30-09:00", activity: "简单热身拉伸", type: "practice" },
                { time: "09:00-10:00", activity: "🎬 观看新手教学视频", type: "theory", video: videos[0], subItems: ["了解游戏基本操作", "熟悉游戏界面", "掌握移动和瞄准基础"] },
                { time: "10:00-10:15", activity: "休息活动", type: "rest" },
                { time: "10:15-11:00", activity: "🎮 训练场基础练习", type: "practice", subItems: ["熟悉所有武器后坐力", "练习基本瞄准", "了解不同武器特点"] }
            ],
            noon: [
                { time: "11:00-12:00", activity: "午餐+休息", type: "rest" },
                { time: "12:00-13:00", activity: "🎬 观看进阶教学视频", type: "theory", video: videos[1] || videos[0], subItems: ["学习急停技巧", "了解瞄准原理"] }
            ],
            afternoon: [
                { time: "13:00-14:00", activity: "🎯 Aim Lab新手训练", type: "aim", subItems: ["定位训练", "跟枪基础", "反应速度"] },
                { time: "14:00-14:15", activity: "休息", type: "rest" },
                { time: "14:15-15:30", activity: "死斗模式入门", type: "dm", subItems: ["只打瞄准", "不要在乎输赢", "专注爆头线"] },
                { time: "15:30-16:00", activity: "休息+补充水分", type: "rest" }
            ],
            evening: [
                { time: "16:00-17:00", activity: "排位赛练习", type: "ranked", subItems: ["选择简单英雄", "跟随队友", "不要冲锋在前"] },
                { time: "17:00-18:00", activity: "晚餐+休息", type: "rest" },
                { time: "18:00-19:00", activity: "🎬 观看当天总结视频", type: "theory", video: videos[0] },
                { time: "19:00-20:00", activity: "训练场专项练习", type: "practice", subItems: ["练习今天学到的技巧", "熟悉武器皮肤"] },
                { time: "20:00-20:30", activity: "当日总结记录", type: "review", subItems: ["记录今天学到的3个要点", "记录需要改进的地方"] }
            ]
        };
        tips = focus ? `今天是新手入门日！重点：${focus}。建议放慢节奏，把基础打扎实！` : '今天是新手入门日！建议放慢节奏，把基础打扎实！';
    } else if (difficulty === 'intermediate') {
        // 中级计划
        schedule = {
            morning: [
                { time: "08:00-08:30", activity: "起床+早餐", type: "rest" },
                { time: "08:30-09:00", activity: "Aim Lab热身", type: "aim" },
                { time: "09:00-10:00", activity: "🎬 观看教学视频", type: "theory", video: videos[0], subItems: ["学习高级技巧", "理解游戏机制"] },
                { time: "10:00-10:15", activity: "休息", type: "rest" },
                { time: "10:15-11:30", activity: "死斗模式练习", type: "dm" }
            ],
            noon: [
                { time: "11:30-12:30", activity: "午餐+休息", type: "rest" },
                { time: "12:30-14:00", activity: "排位赛", type: "ranked" }
            ],
            afternoon: [
                { time: "14:00-14:15", activity: "休息", type: "rest" },
                { time: "14:15-15:45", activity: "训练场压枪练习", type: "practice" },
                { time: "15:45-16:00", activity: "休息", type: "rest" },
                { time: "16:00-17:30", activity: "排位赛", type: "ranked" }
            ],
            evening: [
                { time: "17:30-18:30", activity: "晚餐+休息", type: "rest" },
                { time: "18:30-20:00", activity: "排位赛", type: "ranked" },
                { time: "20:00-21:00", activity: "复盘总结", type: "review" }
            ]
        };
        tips = focus ? `今日重点：${focus}。观看视频后及时实践！` : '观看视频后及时实践所学内容！';
    } else {
        // 高级计划
        schedule = {
            morning: [
                { time: "07:00-07:30", activity: "起床+热身", type: "practice" },
                { time: "07:30-09:00", activity: "Aim Lab专项训练", type: "aim" },
                { time: "09:00-10:00", activity: "🎬 观看教学视频", type: "theory", video: videos[0] }
            ],
            noon: [
                { time: "10:00-12:00", activity: "排位赛", type: "ranked" },
                { time: "12:00-13:00", activity: "午餐+休息", type: "rest" }
            ],
            afternoon: [
                { time: "13:00-15:00", activity: "死斗高强度练习", type: "dm" },
                { time: "15:00-16:00", activity: "训练场身法练习", type: "practice" },
                { time: "16:00-18:00", activity: "排位赛", type: "ranked" }
            ],
            evening: [
                { time: "18:00-19:00", activity: "晚餐+休息", type: "rest" },
                { time: "19:00-21:00", activity: "排位赛", type: "ranked" },
                { time: "21:00-22:00", activity: "VOD复盘", type: "review" }
            ]
        };
        tips = focus ? `高强度训练日！重点：${focus}` : '高强度训练日！';
    }
    
    generatedDayData = {
        day: day,
        weekKey: weekKey,
        dayInWeek: dayInWeek,
        title: focus || `第${day}天 - 专项训练`,
        schedule: schedule,
        tips: tips
    };
    
    renderGeneratedPreview();
}

function renderGeneratedPreview() {
    const container = document.getElementById('generated-preview');
    const data = generatedDayData;
    
    if (!data) {
        container.innerHTML = '';
        return;
    }
    
    let html = `
        <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 20px;">
            <h3 style="color: #48dbfb; margin-bottom: 15px;">📋 第${data.day}天训练计划预览</h3>
            <p style="color: #a0a0a0; margin-bottom: 10px;"><strong>主题：</strong>${data.title}</p>
            <p style="color: #a0a0a0; margin-bottom: 15px;"><strong>提示：</strong>${data.tips}</p>
    `;
    
    const periodNames = {
        morning: '🌅 早晨',
        noon: '🌞 中午',
        afternoon: '🌆 下午',
        evening: '🌙 晚上'
    };
    
    Object.keys(data.schedule).forEach(period => {
        html += `<div style="margin-bottom: 15px;"><strong>${periodNames[period]}：</strong><ul style="margin-top: 5px;">`;
        data.schedule[period].forEach(activity => {
            const videoIcon = activity.video ? ' 📹' : '';
            html += `<li style="margin-bottom: 5px;">${activity.time} - ${activity.activity}${videoIcon}</li>`;
        });
        html += '</ul></div>';
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    document.getElementById('btn-apply-generated').style.display = 'block';
}

function applyGeneratedDay() {
    if (!generatedDayData) {
        alert('请先生成训练计划！');
        return;
    }
    
    const { weekKey, dayInWeek, title, schedule, tips } = generatedDayData;
    
    TRAINING_PLAN[weekKey].days[dayInWeek].title = title;
    TRAINING_PLAN[weekKey].days[dayInWeek].schedule = schedule;
    TRAINING_PLAN[weekKey].days[dayInWeek].tips = tips;
    
    localStorage.setItem('customTrainingPlan', JSON.stringify(TRAINING_PLAN));
    
    alert('训练计划已应用成功！');
    
    document.getElementById('generate-video-links').value = '';
    document.getElementById('generate-focus').value = '';
    document.getElementById('generated-preview').innerHTML = '';
    document.getElementById('btn-apply-generated').style.display = 'none';
    generatedDayData = null;
    
    updateTodaySection();
    showSection('today');
}

// 视频库管理
let videoLibrary = JSON.parse(localStorage.getItem('videoLibrary') || '[]');

// 初始化视频库
function initVideoLibrary() {
    if (videoLibrary.length === 0) {
        videoLibrary = [
            {
                id: 1,
                platform: 'bilibili',
                title: '基础枪法教学 - 移动补偿与预瞄',
                url: 'https://www.bilibili.com/video/BV1pVANenEgr/',
                category: 'aim',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 2,
                platform: 'bilibili',
                title: '新手枪法速成 - 5天提升爆头率',
                url: 'https://www.sohu.com/a/896179605_122375813',
                category: 'aim',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 3,
                platform: 'bilibili',
                title: '全方位实用技巧教学 - 枪法提升与Peek',
                url: 'https://www.gamersky.com/handbook/202301/1556723_9.shtml',
                category: 'aim',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 4,
                platform: 'bilibili',
                title: '无畏契约入门级练枪教程',
                url: 'https://m.3dmgame.com/ol/gl/231062.html',
                category: 'aim',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 5,
                platform: 'bilibili',
                title: '实用小技巧合集 - 上分必看',
                url: 'https://www.bilibili.com/video/BV1NsNPznEso/',
                category: 'movement',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 6,
                platform: 'bilibili',
                title: '急停身法技巧教学',
                url: 'https://v.douyin.com/l62UQn2L1zs/',
                category: 'movement',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 7,
                platform: 'bilibili',
                title: '身法与位移技巧',
                url: 'https://v.douyin.com/AgqYYDGzskE/',
                category: 'movement',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 8,
                platform: 'bilibili',
                title: 'peek与架枪技巧',
                url: 'https://www.gamersky.com/handbook/202301/1556723_9.shtml',
                category: 'movement',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 9,
                platform: 'bilibili',
                title: '雷兹进攻教学 - 幽邃地窟点位',
                url: 'https://www.bilibili.com/video/BV1G2NwztEki/',
                category: 'utility',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 10,
                platform: 'bilibili',
                title: '技能使用与combo教学',
                url: 'https://v.douyin.com/kwCQH5p_HIg/',
                category: 'utility',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 11,
                platform: 'bilibili',
                title: '新手指南 - 英雄技能详解',
                url: 'http://m.toutiao.com/group/7228926563889349153/',
                category: 'utility',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 12,
                platform: 'bilibili',
                title: '新手最应该练习的四个英雄',
                url: 'http://m.toutiao.com/group/7365901170551145010/',
                category: 'utility',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 13,
                platform: 'bilibili',
                title: '地图理解与点位教学',
                url: 'https://m.3dmgame.com/ol/mip/gl/91566.html',
                category: 'map',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 14,
                platform: 'bilibili',
                title: '排位上分技巧解析',
                url: 'http://news.17173.com/z/kfb/content/10102024/164526777.shtml',
                category: 'game',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 15,
                platform: 'bilibili',
                title: '排位段位上升攻略',
                url: 'https://m.php.cn/faq/1102824.html',
                category: 'game',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 16,
                platform: 'bilibili',
                title: '排位这样打才能上分快',
                url: 'https://a.9game.cn/biji/103686.html',
                category: 'game',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 17,
                platform: 'bilibili',
                title: '新手入门攻略全面解析',
                url: 'http://m.toutiao.com/group/7365901170551145010/',
                category: 'theory',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 18,
                platform: 'bilibili',
                title: '新手该如何练枪',
                url: 'http://m.toutiao.com/group/7578125772578259456/',
                category: 'theory',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 19,
                platform: 'bilibili',
                title: '游戏设置与灵敏度优化',
                url: 'http://m.toutiao.com/group/7578125772578259456/',
                category: 'theory',
                addedAt: new Date().toLocaleString()
            },
            {
                id: 20,
                platform: 'bilibili',
                title: '心态管理与竞技心理学',
                url: 'https://news.17173.com/z/kfb/content/10102024/164526777.shtml',
                category: 'mental',
                addedAt: new Date().toLocaleString()
            }
        ];
        localStorage.setItem('videoLibrary', JSON.stringify(videoLibrary));
    }
}

// 添加视频到视频库
function addVideoToLibrary() {
    const platform = document.getElementById('video-platform').value;
    const title = document.getElementById('video-title').value.trim();
    const url = document.getElementById('video-url').value.trim();
    const category = document.getElementById('video-category').value;
    
    if (!title || !url) {
        alert('请填写视频标题和链接！');
        return;
    }
    
    const video = {
        id: Date.now(),
        platform: platform,
        title: title,
        url: url,
        category: category,
        addedAt: new Date().toLocaleString()
    };
    
    videoLibrary.push(video);
    localStorage.setItem('videoLibrary', JSON.stringify(videoLibrary));
    
    document.getElementById('video-title').value = '';
    document.getElementById('video-url').value = '';
    
    updateVideoList();
    alert('视频已添加到视频库！');
}

// 更新视频列表显示
function updateVideoList() {
    const container = document.getElementById('video-list');
    if (!container) return;
    
    if (videoLibrary.length === 0) {
        container.innerHTML = '<p style="color: #a0a0a0;">视频库为空，请添加视频</p>';
        return;
    }
    
    const platformIcons = {
        douyin: '📱',
        bilibili: '📺',
        youtube: '🌐'
    };
    
    const categoryNames = {
        aim: '🎯 瞄准技巧',
        movement: '🏃 移动身法',
        utility: '💥 技能使用',
        map: '🗺️ 地图理解',
        game: '🎮 实战演练',
        theory: '📖 战术理论',
        mental: '🧠 心态管理'
    };
    
    let html = '';
    videoLibrary.forEach(video => {
        html += `
            <div style="padding: 15px; margin-bottom: 10px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${platformIcons[video.platform]} ${video.title}</strong>
                        <span style="background: #48dbfb; color: #1a1a2e; padding: 2px 8px; border-radius: 10px; font-size: 0.7em; margin-left: 5px;">${categoryNames[video.category]}</span>
                    </div>
                    <button onclick="deleteVideo(${video.id})" style="padding: 5px 10px; background: #e74c3c; border: none; border-radius: 5px; color: white; cursor: pointer;">🗑️</button>
                </div>
                <p style="color: #666; margin: 5px 0; font-size: 0.8em;">${video.url}</p>
                <p style="color: #666; margin: 5px 0; font-size: 0.7em;">添加于: ${video.addedAt}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 删除视频
function deleteVideo(videoId) {
    if (!confirm('确定要删除这个视频吗？')) return;
    
    videoLibrary = videoLibrary.filter(v => v.id !== videoId);
    localStorage.setItem('videoLibrary', JSON.stringify(videoLibrary));
    updateVideoList();
}

// 清空视频库
function clearVideoLibrary() {
    if (!confirm('确定要清空所有视频吗？此操作不可恢复！')) return;
    
    videoLibrary = [];
    localStorage.setItem('videoLibrary', JSON.stringify(videoLibrary));
    updateVideoList();
    alert('视频库已清空！');
}
