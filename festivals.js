// 节日数据
const festivalsData = [
    // 彝族节日
    {
        name: "火把节",
        ethnic: "彝族",
        time: "农历六月二十四日",
        description: "彝族最盛大的传统节日。届时村村寨寨火光万点，人们点燃火把游行，驱赶疫病和邪恶势力，同时还有唱歌跳舞、赛马等庆祝活动。"
    },
    {
        name: "赛装节",
        ethnic: "彝族",
        time: "农历正月十五日/三月二十八日",
        description: "楚雄彝族自治州永仁县和大姚县的传统节日。当地村民汇聚一堂，纵情歌舞、赛装比美、跳脚狂欢，被誉为古老的『原生态乡村T台秀』。"
    },
    // 白族节日
    {
        name: "三月街",
        ethnic: "白族",
        time: "农历三月十五日",
        description: "在大理古城西门外举行的传统集市，包括商品交易、民族体育交流和文艺表演等活动。持续7-10天。"
    },
    {
        name: "本主节",
        ethnic: "白族",
        time: "大年初四",
        description: "白族历史文化的重要组成分，也是当地最负盛名的一项春节民俗活动。上万名当地村民和游客会用木车拉着本主塑像沿街游走，锣鼓喧天，喜气洋洋。"
    },
    // 哈尼族节日
    {
        name: "十月年",
        ethnic: "哈尼族",
        time: "农历十月的第一个属龙日",
        description: "哈尼族一年中最长、内容最丰富的节日，历时五六天。节日期间，哈尼寨子会摆起长街宴，每户做一桌酒菜，抬到寨子街道上摆好，形成长街宴。"
    },
    // 傣族节日
    {
        name: "泼水节",
        ethnic: "傣族",
        time: "公历四月中旬",
        description: "亦称『宋干节』，傣族人将泼水节看作自己的新年，男女老少穿上节日盛装互相泼水以示祝福。"
    },
    // 苗族节日
    {
        name: "花山节",
        ethnic: "苗族",
        time: "农历正月初二至初七",
        description: "被誉为『东方狂欢节』。期间有苗族传统的歌舞表演、斗牛、赛马等活动。"
    },
    // 傈僳族节日
    {
        name: "阔时节",
        ethnic: "傈僳族",
        time: "农历十二月初五至正月初十",
        description: "每逢『阔时节』，傈僳人家家户户都要舂籼米粑和糯玉米粑，酿制香醇酒水、杀鸡宰猪，还会进行上刀山下火海、射弩��荡秋千比赛等趣味民族游戏。"
    },
    {
        name: "刀杆节",
        ethnic: "傈僳族",
        time: "农历六月",
        description: "主要流传于怒江地区的傈僳族中，在刀杆节这天，人们会举行爬刀杆、跳火堆等具有民族特色的活动，以祈求平安和丰收。"
    },
    // 佤族节日
    {
        name: "摸你黑狂欢节",
        ethnic: "佤族",
        time: "公历五月",
        description: "每年5月在佤山沧源举行，人们会用天然颜料互相涂抹，寓意祝福和吉祥，该节日被誉为『东方狂欢节』。"
    },
    // 景颇族节日
    {
        name: "目瑙纵歌节",
        ethnic: "景颇族",
        time: "农历正月十五前后",
        description: "『目瑙纵歌』是景颇语里『一起跳舞』的意思。节日期间，数万人穿上华美精致的盛装，伴随着铿锵顿挫的鼓点，踏歌起舞，场面十分震撼。"
    },
    // 纳西族节日
    {
        name: "三朵节",
        ethnic: "纳西族",
        time: "农历二月初八",
        description: "纳西族祭祀本民族的最大保护神——『三朵神』的盛大节日。期间，纳西族会前往丽江市玉峰寺附近的北岳和各地『三朵阁』祈福。"
    },
    // 藏族节日
    {
        name: "格冬节",
        ethnic: "藏族",
        time: "藏历冬月26日至29日",
        description: "迪庆藏族自治州的藏民会来到松赞林寺，观看喇嘛们带着面具跳神，庆贺当年丰收昌顺，祈求来年太平昌盛。"
    },
    // 其他民族节日...
    {
        name: "葫芦节",
        ethnic: "拉祜族",
        time: "公历四月八日",
        description: "人们会举行各种庆祝活动，以表达对葫芦的崇敬和对祖先的怀念之情。"
    },
    {
        name: "六月六节",
        ethnic: "布依族",
        time: "农历六月六日",
        description: "这一天人们会举行祭祀、对歌、跳舞等活动，祈求风调雨顺、五谷丰登。"
    },
    {
        name: "阿露窝罗节",
        ethnic: "阿昌族",
        time: "公历三月十九日",
        description: "节日期间人们会穿着节日盛装，聚集在一起唱歌跳舞，举行各种传统的民俗活动，以庆祝丰收和祈求幸福安康。"
    }
];

// 生成日历视图
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const months = [
        "正月", "二月", "三月", "四月", "五月", "六月",
        "七月", "八月", "九月", "十月", "冬月", "腊月"
    ];

    months.forEach(month => {
        const monthCell = document.createElement('div');
        monthCell.className = 'calendar-month';
        
        const monthTitle = document.createElement('h4');
        monthTitle.textContent = month;
        monthCell.appendChild(monthTitle);

        const monthFestivals = festivalsData.filter(festival => 
            festival.time.includes(month) || 
            (month === "正月" && festival.time.includes("大年"))
        );

        if (monthFestivals.length > 0) {
            const festivalList = document.createElement('ul');
            monthFestivals.forEach(festival => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="festival-name">${festival.name}</span>
                    <span class="festival-ethnic">${festival.ethnic}</span>
                `;
                li.addEventListener('click', () => showFestivalModal(festival));
                festivalList.appendChild(li);
            });
            monthCell.appendChild(festivalList);
        }

        calendarGrid.appendChild(monthCell);
    });
}

// 显示节日详情模态框
function showFestivalModal(festival) {
    const modal = document.getElementById('festivalModal');
    const modalName = document.getElementById('modalFestivalName');
    const modalEthnic = document.getElementById('modalEthnicTag');
    const modalTime = document.getElementById('modalTime');
    const modalDesc = document.getElementById('modalDescription');

    modalName.textContent = festival.name;
    modalEthnic.textContent = festival.ethnic;
    modalTime.textContent = festival.time;
    modalDesc.textContent = festival.description;

    modal.style.display = 'block';
}

// 初始化页面
function initializePage() {
    // 生成日历视图
    generateCalendar();

    // 添加模态框关闭功能
    const modal = document.getElementById('festivalModal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage); 