// 训练计划数据
const TRAINING_PLAN = {
    week1: {
        theme: "基础构建周 - 建立正确习惯",
        focus: "瞄准基础、急停、准星放置",
        days: {
            1: {
                title: "第1天：游戏基础与设置优化",
                subtitle: "🐣 新手入门 - 建立正确习惯",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["简单热身活动", "调整心态放松"] },
                        { time: "08:30-09:30", activity: "📺 观看游戏基础教学视频", type: "theory", video: "https://v.douyin.com/zNTinaxbPm8/", subItems: ["熟悉游戏界面和基本操作", "学习角色选择和技能系统", "了解游戏规则和胜利条件"] },
                        { time: "09:30-09:45", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "09:45-11:30", activity: "🎮 训练场 - 熟悉所有武器", type: "practice", subItems: ["每把武器打50发", "感受不同武器后坐力", "找到顺手的主战武器"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "⚙️ 调整灵敏度+准星设置", type: "practice", subItems: ["推荐灵敏度1600-4000", "准星选择实心圆", "设置准星颜色为绿色"] },
                        { time: "13:00-14:00", activity: "🎯 训练场压枪练习", type: "practice", subItems: ["练习Phantom三连发", "练习Vandal单点", "感受压枪轨迹"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 非排位赛 - 熟悉操作", type: "game", subItems: ["不要在意输赢", "专注于基本操作", "遇到敌人不要紧张"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "💀 死斗模式练习", type: "dm", subItems: ["熟悉地图点位", "练习瞄准和击杀", "不要在意排名"] },
                        { time: "17:30-18:00", activity: "📝 记录初始数据", type: "test", subItems: ["记录KD比", "记录场均伤害", "记录灵敏度设置"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 非排位赛", type: "game", subItems: ["继续熟悉操作", "尝试不同武器", "不要在乎输赢"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📺 观看急停基础教学", type: "theory", video: "https://v.douyin.com/l62UQn2L1zs/", subItems: ["什么是急停", "急停的重要性", "基础急停技巧"] }
                    ]
                },
                tips: "第一天以适应为主！重点：熟悉游戏，找到舒适的设置。不要急于求成，记住：游戏是为了快乐！"
            },
            2: {
                title: "第2天：瞄准基础训练",
                subtitle: "🎯 核心基础 - 急停与瞄准",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆昨天内容"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab基础训练", type: "aim", subItems: ["Gridshot快速瞄准", "Spidershot跟枪", "Tracking跟踪"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式练习", type: "dm", subItems: ["专注瞄准头部", "练习急停射击", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看跟枪技巧视频", type: "theory", video: "https://v.douyin.com/kwCQH5p_HIg/", subItems: ["学习跟枪节奏", "掌握手腕瞄准", "练习目标切换"] },
                        { time: "13:00-14:00", activity: "🎮 训练场练习急停", type: "practice", subItems: ["A/D键急停", "松开方向键瞬间开火", "形成肌肉记忆"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["专注于急停", "不要急于开枪", "保持冷静"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["继续练习急停", "尝试爆头", "保持专注"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录急停成功率", "记录击杀分布", "分析失误原因"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["继续实战应用", "保持节奏", "不要急于求成"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结今日表现", type: "review", subItems: ["记录今日进步", "记录需要改进的点", "制定明天目标"] }
                    ]
                },
                tips: "急停是FPS的核心基础！今天多花时间在训练场练习急停，形成肌肉记忆后再打排位。记住：慢就是快！"
            },
            3: {
                title: "第3天：准星放置训练",
                subtitle: "🎯 核心基础 - 准星放置与头部瞄准",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆昨天急停练习"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 准星放置专项", type: "aim", subItems: ["Flick Shot快速定位", "Headshot爆头专项", "Reflex Shot反应训练"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（专注准星放置）", type: "dm", subItems: ["准星永远放头部高度", "预瞄常见点位", "不要见人就开枪"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习急停技巧", type: "theory", video: "https://v.douyin.com/l62UQn2L1zs/", subItems: ["复习急停要点", "掌握急停时机", "实战应用技巧"] },
                        { time: "13:00-14:00", activity: "🎮 训练场练习急停", type: "practice", subItems: ["结合准星放置", "移动到点位再开火", "形成肌肉记忆"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["专注于准星放置", "瞄准头部开枪", "不要急于求成"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["继续专注准星", "练习预瞄", "保持节奏"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录爆头率", "记录准星放置问题", "分析改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["综合应用今天所学", "保持专注", "不要在意输赢"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "巩固今天所学"] }
                    ]
                },
                tips: "准星永远放在头部高度！这是FPS的核心习惯，养成后将大幅提升击杀效率。每天都要提醒自己：头部！头部！头部！"
            },
            4: {
                title: "第4天：武器掌握日",
                subtitle: "🔫 武器精通 - 压枪与弹道控制",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆前三天的内容"] },
                        { time: "08:30-10:00", activity: "🎯 训练场练习枪械后坐力", type: "practice", subItems: ["练习Vandal压枪", "练习Phantom弹道", "对比两把主战枪"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（专注压枪）", type: "dm", subItems: ["练习压枪击杀", "感受不同距离的压枪", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习急停时机", type: "theory", video: "https://v.douyin.com/AgqYYDGzskE/", subItems: ["掌握开火时机", "学习移动节奏", "实战应用技巧"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["应用今天所学", "专注压枪", "保持冷静"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["继续专注压枪", "尝试爆头", "保持节奏"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["综合应用", "巩固压枪", "不要急于求成"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录压枪效果", "记录爆头率", "分析需要改进的点"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛（2-3场）", type: "ranked", subItems: ["继续实战", "保持专注", "不要在意输赢"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结武器使用心得", type: "review", subItems: ["记录最顺手的武器", "记录压枪心得", "制定明天目标"] }
                    ]
                },
                tips: "掌握Phantom和Vandal的压枪是上分的关键！Phantom适合中距离泼射，Vandal适合远距离单点。找到适合自己的主战武器！"
            },
            5: {
                title: "地图认知日",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "早餐+准备", type: "rest" },
                        { time: "08:30-10:00", activity: "Aim Lab训练", type: "aim" },
                        { time: "10:00-10:15", activity: "休息", type: "rest" },
                        { time: "10:15-11:30", activity: "死斗模式", type: "dm" }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "学习地图点位", type: "theory" },
                        { time: "13:00-14:00", activity: "自定义游戏跑图", type: "practice" }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "休息", type: "rest" },
                        { time: "14:15-15:45", activity: "排位赛（专注地图意识）", type: "ranked" },
                        { time: "15:45-16:00", activity: "休息", type: "rest" },
                        { time: "16:00-17:30", activity: "排位赛", type: "ranked" },
                        { time: "17:30-18:00", activity: "复盘", type: "review" }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "准备", type: "rest" },
                        { time: "19:15-20:45", activity: "排位赛", type: "ranked" },
                        { time: "20:45-21:00", activity: "休息", type: "rest" },
                        { time: "21:00-21:30", activity: "总结地图理解", type: "review" }
                    ]
                },
                tips: "了解地图结构比枪法更重要！记住常见架枪点。"
            },
            6: {
                title: "英雄选择日",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "早餐+准备", type: "rest" },
                        { time: "08:30-10:00", activity: "Aim Lab训练", type: "aim" },
                        { time: "10:00-10:15", activity: "休息", type: "rest" },
                        { time: "10:15-11:30", activity: "死斗模式", type: "dm" }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "学习英雄技能", type: "theory" },
                        { time: "13:00-14:00", activity: "练习英雄技能连招", type: "practice" }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "休息", type: "rest" },
                        { time: "14:15-15:45", activity: "排位赛（专注使用选定英雄）", type: "ranked" },
                        { time: "15:45-16:00", activity: "休息", type: "rest" },
                        { time: "16:00-17:30", activity: "排位赛", type: "ranked" },
                        { time: "17:30-18:00", activity: "复盘", type: "review" }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "准备", type: "rest" },
                        { time: "19:15-20:45", activity: "排位赛", type: "ranked" },
                        { time: "20:45-21:00", activity: "休息", type: "rest" },
                        { time: "21:00-21:30", activity: "总结英雄使用心得", type: "review" }
                    ]
                },
                tips: "选择1-2个英雄精通，不要贪多！"
            },
            7: {
                title: "周总结与测试",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "早餐+准备", type: "rest" },
                        { time: "08:30-09:30", activity: "Aim Lab - 第7天测试", type: "test" },
                        { time: "09:30-09:45", activity: "休息", type: "rest" },
                        { time: "09:45-11:30", activity: "对比第1天数据", type: "review" }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "制定下周计划", type: "review" },
                        { time: "13:00-14:00", activity: "排位赛", type: "ranked" }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "休息", type: "rest" },
                        { time: "14:15-15:45", activity: "排位赛", type: "ranked" },
                        { time: "15:45-16:00", activity: "休息", type: "rest" },
                        { time: "16:00-17:30", activity: "排位赛", type: "ranked" },
                        { time: "17:30-18:00", activity: "复盘一周表现", type: "review" }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "准备", type: "rest" },
                        { time: "19:15-20:45", activity: "轻松游戏", type: "game" },
                        { time: "20:45-21:00", activity: "休息", type: "rest" },
                        { time: "21:00-21:30", activity: "庆祝第一周完成！", type: "review" }
                    ]
                },
                tips: "第一周辛苦了！对比第1天，你一定有了进步！"
            }
        }
    },
    week2: {
        theme: "技能强化周 - 深入理解游戏",
        focus: "地图控制、经济管理、英雄熟练度",
        days: {
            8: {
                title: "第8天：地图控制训练",
                subtitle: "🗺️ 地图控制 - 学会占领点位",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆第1周内容"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 地图预瞄训练", type: "aim", subItems: ["练习各地图常见点位预瞄", "熟悉狙击位和常规位", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（专注地图点位）", type: "dm", subItems: ["熟悉各地图点位", "练习跑图路线", "找到最快转点路径"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习地图控制理论", type: "theory", subItems: ["理解地图控制概念", "学习如何占领点位", "掌握防守和进攻节奏"] },
                        { time: "13:00-14:00", activity: "🎮 自定义游戏跑图", type: "practice", subItems: ["熟悉每张地图", "记忆关键点位", "练习快速转点"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（专注地图意识）", type: "ranked", subItems: ["尝试占领点位", "注意小地图", "学会卡点"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习地图控制", "注意队友位置", "保持沟通"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录点位占领情况", "分析转点时机", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用地图控制", "保持专注", "不要急于求成"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "放松心情"] }
                    ]
                },
                tips: "地图控制比杀敌更重要！学会为团队创造空间，控制地图节奏。"
            },
            9: {
                title: "第9天：经济管理训练",
                subtitle: "💰 经济管理 - 学会精打细算",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆昨天地图训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 定位训练", type: "aim", subItems: ["快速定位训练", "爆头线练习", "反应速度提升"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "练习各种距离击杀", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习经济管理策略", type: "theory", subItems: ["理解经济系统", "学会存枪和强起", "掌握eco和force时机"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（专注经济决策）", type: "ranked", subItems: ["练习经济分配", "学会存钱", "合理使用技能"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习经济管理", "注意团队经济", "不要盲目eco"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用经济策略", "学会存大枪", "合理购买装备"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录经济决策", "分析经济失误", "总结经验"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持专注", "继续练习经济管理", "不要让经济影响心态"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结经济管理心得", type: "review", subItems: ["回顾今天经济决策", "记录心得", "制定改进计划"] }
                    ]
                },
                tips: "经济管理是团队游戏的核心！学会存枪和强起，不要因为经济影响心态。"
            },
            10: {
                title: "第10天：英雄深度训练",
                subtitle: "🎭 英雄掌握 - 精通主战英雄",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "确认今天使用的英雄"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 专项训练", type: "aim", subItems: ["与主战英雄配合的瞄准", "适合英雄的瞄准方式", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（用主战英雄）", type: "dm", subItems: ["用主战英雄练习", "熟悉英雄武器", "找到顺手的感觉"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习英雄高级技巧", type: "theory", subItems: ["学习英雄技能连招", "掌握技能释放时机", "理解英雄定位"] },
                        { time: "13:00-14:00", activity: "🎮 练习英雄技能连招", type: "practice", subItems: ["熟练技能组合", "练习身法技巧", "掌握技能释放时机"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（专注主战英雄）", type: "ranked", subItems: ["使用主战英雄", "发挥英雄优势", "练习技能配合"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["继续使用主战英雄", "尝试不同位置", "找到最适合自己的玩法"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录英雄表现", "分析技能使用", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习英雄", "不要急于求成"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "放松心情"] }
                    ]
                },
                tips: "精通一个英雄比会玩多个英雄更有价值！找到适合自己的英雄并深入研究。"
            },
            11: {
                title: "第11天：团队配合训练",
                subtitle: "🤝 团队配合 - 学会与队友协作",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备团队训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 团队配合瞄准", type: "aim", subItems: ["快速瞄准训练", "与队友配合的瞄准", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "练习各种距离击杀", "模拟团队作战"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习团队配合技巧", type: "theory", subItems: ["理解团队配合重要性", "学习报点和交流", "掌握团队战术"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（专注团队配合）", type: "ranked", subItems: ["积极与队友交流", "学会配合队友", "注意团队位置"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习团队配合", "尝试指挥", "学会跟随队友"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用团队配合", "保持沟通", "不要单打独斗"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录团队配合情况", "分析沟通问题", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持专注", "继续练习团队配合", "不要让情绪影响团队"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结团队配合心得", type: "review", subItems: ["回顾今天团队配合", "记录心得", "制定改进计划"] }
                    ]
                },
                tips: "Valorant是团队游戏！学会配合队友，不要单打独斗。好的配合能让团队实力提升50%。"
            },
            12: {
                title: "第12天：残局处理训练",
                subtitle: "🎯 残局能力 - 学会以少胜多",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆之前残局训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 1vN训练", type: "aim", subItems: ["练习1vN情况", "提升心理素质", "模拟残局场景"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "练习1v1对战", "模拟残局压力"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习残局处理技巧", type: "theory", subItems: ["理解残局处理原则", "学习1v1、1v2技巧", "掌握残局心态"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注每一回合", "不要放弃任何机会", "练习残局处理"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（专注残局）", type: "ranked", subItems: ["尝试处理残局", "保持冷静", "不要急于求成"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习残局", "总结经验", "保持专注"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录残局处理情况", "分析成功和失败", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习残局", "保持冷静"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "放松心情"] }
                    ]
                },
                tips: "残局能力决定你的上限！冷静分析，逐个击破。不要放弃任何机会，每一分都很重要。"
            },
            13: {
                title: "第13天：心理素质训练",
                subtitle: "🧠 心理素质 - 学会控制情绪",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备今天训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 专注训练", type: "aim", subItems: ["专注力训练", "提升注意力", "模拟比赛压力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持专注", "不受排名影响", "保持平静心态"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习心态管理", type: "theory", subItems: ["理解心态重要性", "学习压力管理", "掌握情绪控制"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（心态练习）", type: "ranked", subItems: ["保持平静心态", "不要被对手影响", "专注比赛"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习心态控制", "不要让失误影响", "保持专注"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用心态管理", "保持冷静", "不要放弃"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录心态变化", "分析情绪影响", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持专注", "继续练习心态控制", "不要让一局影响下一局"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结心态管理心得", type: "review", subItems: ["回顾今天心态变化", "记录心得", "制定改进计划"] }
                    ]
                },
                tips: "心态决定表现！学会控制情绪，不要让一局比赛影响下一局。保持冷静是高分的关键。"
            },
            14: {
                title: "第14天：周总结与测试",
                subtitle: "📊 第二周总结 - 检验训练成果",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备测试"] },
                        { time: "08:30-09:30", activity: "🎯 Aim Lab - 第14天综合测试", type: "test", subItems: ["完整Aim Lab训练", "记录各项数据", "对比第7天进步"] },
                        { time: "09:30-09:45", activity: "☕ 休息", type: "rest" },
                        { time: "09:45-11:30", activity: "📝 对比第7天数据", type: "review", subItems: ["分析进步幅度", "找出薄弱环节", "制定下周计划"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📝 制定下周训练计划", type: "review", subItems: ["总结本周收获", "分析需要改进的地方", "明确下周目标"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["检验综合实力", "保持轻松心态", "不要过于在意输赢"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续检验实力", "保持专注", "不要过于在意结果"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所学", "保持状态", "不要放松"] },
                        { time: "17:30-18:00", activity: "📝 复盘两周表现", type: "review", subItems: ["总结两周进步", "分析整体表现", "制定改进计划"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 轻松娱乐局", type: "game", subItems: ["放松心情", "不要过于认真", "享受游戏"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎉 庆祝两周完成！", type: "review", subItems: ["回顾两周进步", "表扬自己的努力", "期待第三周训练"] }
                    ]
                },
                tips: "两周过去了！你已经完成了2/3的基础训练，继续保持！注意休息，保持状态迎接最后两周。"
            }
        }
    },
    week3: {
        theme: "战术提升周 - 高级技巧训练",
        focus: "高级技巧、战术理解、心态管理",
        days: {
            15: {
                title: "第15天：高级瞄准技巧",
                subtitle: "🎯 高级瞄准 - 精益求精",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆第2周内容"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 高级瞄准训练", type: "aim", subItems: ["微瞄准训练", "快速定位", "移动目标跟踪"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（专注高级技巧）", type: "dm", subItems: ["练习高级技巧", "模拟比赛节奏", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习高级瞄准技巧", type: "theory", subItems: ["学习高级瞄准技术", "掌握瞄准节奏", "理解瞄准心理"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["应用高级瞄准技巧", "专注瞄准质量", "不要急于开枪"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习高级技巧", "保持专注", "不要急于求成"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所学", "保持状态", "不要放松"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录高级技巧应用", "分析不足", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习高级技巧", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "放松心情"] }
                    ]
                },
                tips: "高级技巧需要大量练习，不要急于求成！专注质量而不是数量。"
            },
            16: {
                title: "第16天：战术理解训练",
                subtitle: "🧠 战术理解 - 智慧取胜",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回忆昨天内容"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 战术瞄准训练", type: "aim", subItems: ["结合战术的瞄准", "预判瞄准", "提升战术意识"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "练习战术走位", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习战术执行", type: "theory", subItems: ["理解战术执行原则", "学习团队战术", "掌握战术时机"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["尝试执行战术", "注意团队配合", "学会灵活变通"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习战术执行", "保持专注", "不要单打独斗"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用战术", "保持沟通", "不要急于求成"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录战术执行情况", "分析战术问题", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习战术", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结战术理解", type: "review", subItems: ["回顾今天战术应用", "记录心得", "制定改进计划"] }
                    ]
                },
                tips: "战术执行比个人能力更重要！学会为团队做出贡献，配合队友进攻和防守。"
            },
            17: {
                title: "第17天：沟通训练",
                subtitle: "📢 有效沟通 - 团队协作核心",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备沟通训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 沟通训练", type: "aim", subItems: ["快速瞄准训练", "模拟报点", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["练习报点", "保持瞄准节奏", "模拟沟通场景"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习沟通技巧", type: "theory", subItems: ["理解有效沟通", "学习报点技巧", "掌握指挥方法"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（专注沟通）", type: "ranked", subItems: ["积极报点", "主动交流", "尝试指挥"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习沟通", "保持交流", "不要沉默"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用沟通技巧", "保持专注", "不要让沟通影响心态"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录沟通情况", "分析沟通问题", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习沟通", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "保持手感", "放松心情"] }
                    ]
                },
                tips: "好的沟通能让团队战斗力提升50%！学会报点和指挥，但不要过度交流影响操作。"
            },
            18: {
                title: "第18天：录像分析训练",
                subtitle: "📹 录像分析 - 学习职业技巧",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "准备观看录像"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 分析训练", type: "aim", subItems: ["快速瞄准训练", "模拟比赛节奏", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "练习各种场景", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看职业比赛录像", type: "theory", subItems: ["选择经典比赛", "关注职业选手操作", "学习战术执行"] },
                        { time: "13:00-14:00", activity: "📝 分析职业选手决策", type: "review", subItems: ["分析站位选择", "学习瞄准方式", "理解决策逻辑"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["应用今天所学", "模仿职业选手", "保持专注"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习", "保持状态", "不要急于求成"] },
                        { time: "17:30-18:00", activity: "📝 复盘自己的比赛", type: "review", subItems: ["录制比赛", "分析自己的决策", "找出改进点"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续应用所学", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结分析心得", type: "review", subItems: ["回顾今天学习", "记录心得", "制定改进计划"] }
                    ]
                },
                tips: "看职业比赛能学到很多！注意他们的站位、瞄准方式和决策逻辑，但不要盲目模仿。"
            },
            19: {
                title: "第19天：压力测试训练",
                subtitle: "🔥 压力测试 - 高压环境适应",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备高压训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 压力训练", type: "aim", subItems: ["计时训练", "模拟高压场景", "提升抗压能力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（高压模式）", type: "dm", subItems: ["模拟比赛压力", "保持专注", "不受排名影响"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习压力管理", type: "theory", subItems: ["理解压力来源", "学习压力应对", "掌握心态调整"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "保持冷静", "不要被压力影响"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（高压环境）", type: "ranked", subItems: ["主动寻找压力", "学会在高压下操作", "保持专注"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习", "保持状态", "不要放弃"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录压力下表现", "分析心态变化", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习压力应对", "保持冷静"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "放松心情", "释放压力"] }
                    ]
                },
                tips: "学会在压力下保持冷静，这是高分段必备技能！不要让压力影响你的操作和决策。"
            },
            20: {
                title: "第20天：综合训练",
                subtitle: "🔄 综合运用 - 融会贯通",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "回顾前五天内容"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 综合训练", type: "aim", subItems: ["全面瞄准训练", "结合战术", "提升综合能力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["综合练习", "保持节奏", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📝 总结前几天的学习", type: "review", subItems: ["回顾本周学习", "总结收获", "找出不足"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所学", "保持专注", "不要急于求成"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续综合练习", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所有技巧", "保持专注", "不要在意输赢"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录综合表现", "分析各技能应用", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续综合练习", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结本周学习", type: "review", subItems: ["回顾本周所有学习", "记录心得", "制定最后一周计划"] }
                    ]
                },
                tips: "综合运用所学技能，开始看到真正的进步！将所有技巧融会贯通，形成自己的风格。"
            },
            21: {
                title: "第21天：周总结与测试",
                subtitle: "📊 第三周总结 - 检验训练成果",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备测试"] },
                        { time: "08:30-09:30", activity: "🎯 Aim Lab - 第21天综合测试", type: "test", subItems: ["完整Aim Lab训练", "记录各项数据", "对比第14天进步"] },
                        { time: "09:30-09:45", activity: "☕ 休息", type: "rest" },
                        { time: "09:45-11:30", activity: "📝 对比第14天数据", type: "review", subItems: ["分析进步幅度", "找出薄弱环节", "制定最后一周计划"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📝 制定最后一周计划", type: "review", subItems: ["总结本周收获", "分析需要改进的地方", "明确最后一周目标"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["检验综合实力", "保持轻松心态", "不要过于在意输赢"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续检验实力", "保持专注", "不要过于在意结果"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所学", "保持状态", "不要放松"] },
                        { time: "17:30-18:00", activity: "📝 复盘三周表现", type: "review", subItems: ["总结三周进步", "分析整体表现", "制定改进计划"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 轻松娱乐局", type: "game", subItems: ["放松心情", "不要过于认真", "享受游戏"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎉 庆祝三周完成！", type: "review", subItems: ["回顾三周进步", "表扬自己的努力", "期待最后一周冲刺"] }
                    ]
                },
                tips: "三周过去了！你已经完成了大部分训练，最后一周冲刺！保持状态，迎接最后的挑战。"
            }
        }
    },
    week4: {
        theme: "冲刺赋能周 - 高强度排位",
        focus: "高强度排位、综合实战、最终测试",
        days: {
            22: {
                title: "第22天：高强度排位日",
                subtitle: "🏃 冲刺开始 - 全力以赴",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态迎接冲刺"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 高强度训练", type: "aim", subItems: ["高强度瞄准训练", "模拟比赛节奏", "提升反应速度"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "模拟比赛压力", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看职业比赛", type: "theory", subItems: ["学习职业选手节奏", "关注高压环境处理", "学习最后冲刺技巧"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "全力以赴", "保持专注"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续冲刺", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "全力以赴"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录今天表现", "分析需要改进的地方", "总结冲刺状态"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续冲刺", "不要放弃"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "放松心情", "保持手感"] }
                    ]
                },
                tips: "最后一周！全力以赴，每一局都要认真对待！保持专注，不要放松警惕。"
            },
            23: {
                title: "第23天：英雄池扩展",
                subtitle: "🦸 扩展英雄池 - 适应团队需求",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "选择新英雄准备练习"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 英雄适配训练", type: "aim", subItems: ["针对新英雄的瞄准", "熟悉新英雄节奏", "提升综合能力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["用新英雄练习", "熟悉技能连招", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习第2个英雄", type: "theory", subItems: ["理解新英雄定位", "学习技能机制", "掌握战术运用"] },
                        { time: "13:00-14:00", activity: "🎮 练习英雄技能", type: "practice", subItems: ["熟悉技能组合", "练习技能接续", "掌握最佳使用时机"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛（用第2个英雄）", type: "ranked", subItems: ["实战中练习新英雄", "尝试不同位置", "找到最适合的玩法"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛（用第2个英雄）", type: "ranked", subItems: ["继续练习新英雄", "保持专注", "不要急于求成"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录新英雄表现", "分析技能使用", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛（用第2个英雄）", type: "ranked", subItems: ["保持状态", "继续练习新英雄", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结英雄技巧", type: "review", subItems: ["回顾今天英雄表现", "记录心得", "制定明天练习计划"] }
                    ]
                },
                tips: "会2-3个英雄可以更好适应团队需求！不要只依赖一个英雄，多面手更容易上分。"
            },
            24: {
                title: "第24天：排位冲刺日",
                subtitle: "🚀 冲刺强化 - 全力上分",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备冲刺"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 冲刺训练", type: "aim", subItems: ["高强度瞄准", "模拟高压场景", "提升极限反应"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "模拟比赛压力", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看职业比赛", type: "theory", subItems: ["学习职业选手冲刺技巧", "关注高压处理", "学习最后阶段决策"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "全力以赴", "保持专注"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续冲刺", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "全力以赴"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录今天表现", "分析需要改进的地方", "总结冲刺经验"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续冲刺", "不要放弃"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "放松心情", "保持手感"] }
                    ]
                },
                tips: "冲刺阶段！每一局都要全力以赴，不要放过任何上分机会！保持专注到最后一刻。"
            },
            25: {
                title: "第25天：综合实战训练",
                subtitle: "⚔️ 综合实战 - 全面提升",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备高强度训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 高强度综合训练", type: "aim", subItems: ["全面瞄准训练", "结合所有技巧", "提升极限能力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["综合练习", "保持节奏", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看职业比赛", type: "theory", subItems: ["学习综合战术", "关注全面能力", "学习团队配合"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所有技巧", "保持专注", "全力以赴"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续综合练习", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "全力以赴"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录综合表现", "分析各技能应用", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续综合练习", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结今日表现", type: "review", subItems: ["回顾今天所有学习", "记录心得", "制定明天计划"] }
                    ]
                },
                tips: "今天训练量很大，保持专注，每一局都要全力以赴！将所有技能融会贯通。"
            },
            26: {
                title: "第26天：30天总结与测试",
                subtitle: "📊 30天总结 - 检验训练成果",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备测试"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 30天综合测试", type: "test", subItems: ["完整Aim Lab训练", "记录各项数据", "对比第1天和第14天进步"] },
                        { time: "10:00-10:15", activity: "☕ 休息", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["测试综合能力", "保持节奏", "记录表现数据"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📝 回顾30天训练", type: "review", subItems: ["总结30天进步", "回顾每个阶段", "找出最大进步和不足"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["检验综合实力", "保持轻松心态", "不要过于在意输赢"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续检验实力", "保持专注", "不要过于在意结果"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用所学", "保持状态", "不要放松"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录比赛表现", "分析综合实力", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续检验", "保持专注"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 记录最终数据", type: "test", subItems: ["记录最终KD比", "记录场均伤害", "记录灵敏度设置", "对比第1天进步"] }
                    ]
                },
                tips: "总结30天的进步，记录所有数据，见证自己的成长！无论结果如何，你已经完成了30天的训练！"
            },
            27: {
                title: "第27天：心态调整与巩固",
                subtitle: "🧠 心态管理 - 心理素质强化",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备训练"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 保持手感", type: "aim", subItems: ["轻松瞄准训练", "保持节奏", "调整心态"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "放松心情", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 学习心态管理", type: "theory", subItems: ["理解心态重要性", "学习压力调节", "掌握情绪控制"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "保持冷静", "实践心态管理"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续练习心态", "保持专注", "不要让情绪影响"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "不要放弃"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录心态变化", "分析情绪影响", "总结改进方向"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续练习心态", "保持冷静"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "📝 总结心态调整", type: "review", subItems: ["回顾今天心态表现", "记录心得", "制定未来计划"] }
                    ]
                },
                tips: "心态决定状态！学会控制情绪，保持冷静是成为高手的关键！不要让输赢影响你的心态。"
            },
            28: {
                title: "第28天：排位冲刺强化",
                subtitle: "💪 冲刺强化 - 最后阶段",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备冲刺"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 高强度冲刺训练", type: "aim", subItems: ["极限瞄准训练", "模拟最后冲刺", "提升极限能力"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "模拟比赛压力", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 观看职业比赛", type: "theory", subItems: ["学习最后冲刺技巧", "关注极限操作", "学习高压处理"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "全力以赴", "保持专注"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续冲刺", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "全力以赴"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录今天表现", "分析需要改进的地方", "总结冲刺经验"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "继续冲刺", "不要放弃"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "放松心情", "保持手感"] }
                    ]
                },
                tips: "最后几天！保持专注，全力冲刺！不要放松警惕，每一局都很重要。"
            },
            29: {
                title: "第29天：最终冲刺与巩固",
                subtitle: "🎯 最后的冲刺 - 巩固提升",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "调整心态准备最后冲刺"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 最终冲刺训练", type: "aim", subItems: ["全面瞄准训练", "保持最佳状态", "提升极限反应"] },
                        { time: "10:00-10:15", activity: "☕ 休息+补充水分", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式", type: "dm", subItems: ["保持瞄准节奏", "模拟比赛压力", "不要在意排名"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📺 回顾整个训练历程", type: "review", subItems: ["回顾30天进步", "总结学习心得", "展望未来发展方向"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛", type: "ranked", subItems: ["专注比赛", "全力以赴", "保持专注"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续冲刺", "保持状态", "不要放松"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "全力以赴"] },
                        { time: "17:30-18:00", activity: "📝 复盘", type: "review", subItems: ["记录今天表现", "分析整体实力", "总结最后冲刺经验"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 排位赛", type: "ranked", subItems: ["保持状态", "最后冲刺", "不要放弃"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎯 Aim Lab冷却训练", type: "aim", subItems: ["轻松瞄准训练", "放松心情", "庆祝完成训练"] }
                    ]
                },
                tips: "还剩最后一天！回顾30天的训练，你已经付出了很多努力！保持专注，准备迎接最后一天！"
            },
            30: {
                title: "第30天：30天训练完成！",
                subtitle: "🎉 训练完成 - 庆祝胜利！",
                schedule: {
                    morning: [
                        { time: "08:00-08:30", activity: "🛏️ 起床+早餐+准备", type: "rest", subItems: ["手指热身活动", "庆祝最后一天！"] },
                        { time: "08:30-10:00", activity: "🎯 Aim Lab - 最终测试", type: "test", subItems: ["完整Aim Lab训练", "记录最终数据", "对比第1天巨大进步"] },
                        { time: "10:00-10:15", activity: "☕ 休息", type: "rest" },
                        { time: "10:15-11:30", activity: "💀 死斗模式（庆祝）", type: "dm", subItems: ["轻松练习", "享受游戏", "庆祝完成训练"] }
                    ],
                    noon: [
                        { time: "11:30-12:30", activity: "🍚 午餐+休息", type: "rest" },
                        { time: "12:30-13:00", activity: "📝 总结30天训练", type: "review", subItems: ["回顾所有进步", "记录学习心得", "制定未来计划"] },
                        { time: "13:00-14:00", activity: "🎮 排位赛（庆祝）", type: "ranked", subItems: ["轻松比赛", "享受游戏", "不要过于在意输赢"] }
                    ],
                    afternoon: [
                        { time: "14:00-14:15", activity: "☕ 休息", type: "rest" },
                        { time: "14:15-15:45", activity: "🎮 排位赛", type: "ranked", subItems: ["继续庆祝", "保持状态", "享受游戏"] },
                        { time: "15:45-16:00", activity: "😴 短暂休息", type: "rest" },
                        { time: "16:00-17:30", activity: "🎮 排位赛", type: "ranked", subItems: ["综合应用", "保持专注", "不要放松"] },
                        { time: "17:30-18:00", activity: "📝 最终复盘", type: "review", subItems: ["记录最终表现", "总结30天成长", "展望未来发展"] }
                    ],
                    evening: [
                        { time: "18:00-19:00", activity: "🍜 晚餐+休息", type: "rest" },
                        { time: "19:00-19:15", activity: "🧘 放松手指", type: "rest" },
                        { time: "19:15-20:45", activity: "🎮 轻松娱乐局", type: "game", subItems: ["放松心情", "庆祝完成", "享受游戏"] },
                        { time: "20:45-21:00", activity: "☕ 休息", type: "rest" },
                        { time: "21:00-21:30", activity: "🎉 30天训练完成庆祝！", type: "review", subItems: ["回顾30天所有进步", "表扬自己的努力", "制定未来训练计划", "感谢自己的坚持！"] }
                    ]
                },
                tips: "🎉 恭喜你完成了30天训练计划！你已经付出了巨大的努力，无论结果如何，你都是最棒的！记住，训练只是开始，保持学习和进步的心态，你一定能达到超凡！加油！"
            }
        }
    }
};