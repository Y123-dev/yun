document.addEventListener('DOMContentLoaded', function() {
    let ethnicData;
    let currentEthnic;
    let filteredView = 'all';
    let festivalDetailData;

    // 加载民族数据
    fetch('data/ethnic-data.json')
        .then(response => response.json())
        .then(data => {
            ethnicData = data;
            createNavigation();
            // 默认显示第一个民族的信息
            showEthnicInfo(ethnicData.ethnicGroups[0]);
        });

    // 加载详细数据
    fetch('data/festival-detail-data.json')
        .then(response => response.json())
        .then(data => {
            festivalDetailData = data;
        });

    function createNavigation() {
        const nav = document.querySelector('.ethnic-nav');
        ethnicData.ethnicGroups.forEach(ethnic => {
            const button = document.createElement('button');
            button.textContent = ethnic.name;
            button.addEventListener('click', () => {
                document.querySelectorAll('.ethnic-nav button').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                showEthnicInfo(ethnic);
            });
            nav.appendChild(button);
        });
        // 激活第一个按钮
        nav.firstChild.classList.add('active');
    }

    // 添加搜索功能
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterContent(searchTerm);
    }, 300));

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 筛选功能
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active'));
            btn.classList.add('active');
            filteredView = btn.dataset.filter;
            showEthnicInfo(currentEthnic);
        });
    });

    // 内容筛选函数
    function filterContent(searchTerm) {
        const elements = document.querySelectorAll('.festival-card, .custom-content > div');
        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.display = 'block';
                // 添加淡入动画
                element.style.animation = 'fadeIn 0.5s ease';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // 增强的信息展示函数
    function showEthnicInfo(ethnic) {
        currentEthnic = ethnic;
        
        // 添加淡入动画
        const contentElements = document.querySelectorAll('.culture-display > *');
        contentElements.forEach((element, index) => {
            element.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        });

        // 更新基本信息
        document.querySelector('.ethnic-name').textContent = ethnic.name;
        document.querySelector('.population').textContent = 
            `人口：${ethnic.population.toLocaleString()} 人`;
        document.querySelector('.regions').textContent = 
            `主要分布地区：${ethnic.mainRegions.join('、')}`;

        // 更新节日展示
        const festivalList = document.querySelector('.festival-carousel');
        festivalList.innerHTML = '';
        ethnic.customs.festivals.forEach((festival, index) => {
            const festivalCard = createFestivalCard(festival, index);
            festivalList.appendChild(festivalCard);
        });

        // 更新民族特色内容
        updateCustomContent(ethnic);

        // 添加工具提示
        document.querySelectorAll('.festival-card h4').forEach(heading => {
            const festival = ethnic.customs.festivals.find(f => f.name === heading.textContent);
            if (festival) {
                heading.setAttribute('data-tooltip', festival.description);
            }
        });

        // 根据筛选条件显示/隐藏内容
        if (filteredView !== 'all') {
            document.querySelectorAll('section').forEach(section => {
                if (section.classList.contains(filteredView)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }
    }

    function createFestivalCard(festival, index) {
        const card = document.createElement('div');
        card.className = 'festival-card';
        card.innerHTML = `
            <h4>${festival.name}</h4>
            <p class="festival-time">${festival.time}</p>
            <p class="festival-brief">${festival.description.substring(0, 50)}...</p>
        `;

        // 添加点击事件显示详情
        card.addEventListener('click', () => showFestivalDetail(festival));
        
        return card;
    }

    // 添加地理位置展示功能
    function initLocationMap() {
        const map = new AMap.Map('location-map', {
            viewMode: '3D',
            zoom: 8,
            center: [102.712251, 25.040609], // 云南中心位置
            mapStyle: 'amap://styles/67d0c7c4fe969bfa53d92e223329ac80' // 使用提供的地图样式
        });

        // 添加地图控件
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    }

    // 更新节日详情展示函数
    function showFestivalDetail(festival) {
        const detailData = festivalDetailData.festivals[festival.name];
        const detail = document.querySelector('.festival-detail');
        const content = detail.querySelector('.detail-content');
        
        // 添加地理位置展示区域
        content.innerHTML = `
            <h2>${detailData.name}</h2>
            <div class="festival-info">
                <p class="festival-time">${detailData.time}</p>
                <p class="festival-location">${detailData.location}</p>
                <div id="location-map" class="festival-map"></div>
            </div>
            
            <div class="festival-description">
                <p>${detailData.description}</p>
            </div>

            <div class="festival-details">
                <div class="history">
                    <h3>历史渊源</h3>
                    <p>${detailData.details.历史渊源}</p>
                </div>

                <div class="activities">
                    <h3>节日活动</h3>
                    <ul>
                        ${detailData.details.节日活动.map(activity => 
                            `<li>${activity}</li>`).join('')}
                    </ul>
                </div>

                <div class="taboos">
                    <h3>民俗禁忌</h3>
                    <ul>
                        ${detailData.details.民俗禁忌.map(taboo => 
                            `<li>${taboo}</li>`).join('')}
                    </ul>
                </div>

                <div class="festival-food">
                    <h3>特色美食</h3>
                    <ul>
                        ${detailData.details.特色美食.map(food => 
                            `<li>${food}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="festival-gallery">
                ${detailData.images.map(image => `
                    <img src="images/festivals/${image}" alt="${detailData.name}"
                        onerror="this.src='images/placeholder.jpg'">
                `).join('')}
            </div>
        `;

        detail.classList.remove('hidden');
        
        // 初始化地图
        initLocationMap();
    }

    function updateCustomContent(ethnic) {
        const customData = festivalDetailData.customs;

        // 更新食物展示
        const foodGallery = document.querySelector('#food .food-gallery');
        foodGallery.innerHTML = customData.饮食文化.特色美食.map(food => `
            <div class="food-item">
                <img src="images/food/${food.images[0]}" alt="${food.name}">
                <div class="food-info">
                    <h4>${food.name}</h4>
                    <p class="food-origin">源自：${food.origin}</p>
                    <p class="food-desc">${food.description}</p>
                    <div class="food-detail hidden">
                        <h5>主要食材</h5>
                        <p>${food.ingredients.join('、')}</p>
                        <h5>制作方法</h5>
                        <p>${food.preparation}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // 添加点击展开详情功能
        document.querySelectorAll('.food-item').forEach(item => {
            item.addEventListener('click', () => {
                const detail = item.querySelector('.food-detail');
                detail.classList.toggle('hidden');
            });
        });

        // 更新服饰展示
        const clothingShowcase = document.querySelector('#clothing .clothing-showcase');
        clothingShowcase.innerHTML = `
            <div class="clothing-features">
                <h4>服饰特点</h4>
                <p>${ethnic.customs.clothing.features}</p>
            </div>
            <div class="clothing-symbols">
                <h4>特色图案</h4>
                <div class="symbol-gallery">
                    ${ethnic.customs.clothing.symbols.map(symbol => `
                        <div class="symbol-item" data-tooltip="${symbol}">
                            <img src="images/symbols/${symbol}.svg" alt="${symbol}"
                                onerror="this.src='images/placeholder-symbol.svg'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 更新建筑展示
        const architectureDisplay = document.querySelector('#architecture .architecture-display');
        architectureDisplay.innerHTML = `
            <div class="architecture-info">
                <p>${ethnic.customs.architecture}</p>
            </div>
        `;
    }

    // 标签页切换功能
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            document.querySelectorAll('.tab-btn').forEach(btn => 
                btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => 
                pane.classList.remove('active'));
            
            // 添加新的活动状态
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // 节日轮播控制
    let currentSlide = 0;
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        currentSlide = Math.max(currentSlide - 1, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const totalSlides = document.querySelectorAll('.festival-card').length;
        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
        updateCarousel();
    });

    function updateCarousel() {
        const carousel = document.querySelector('.festival-carousel');
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // 地图相关功能
    let culturalMap;
    let markers = [];
    let culturalSpots;

    // 初始化地图
    function initCulturalMap() {
        culturalMap = new AMap.Map('cultural-map', {
            viewMode: '3D',
            zoom: 7,
            center: [101.487656, 24.974994], // 云南中心位置
            mapStyle: 'amap://styles/67d0c7c4fe969bfa53d92e223329ac80'
        });

        // 加载景点数据
        fetch('data/cultural-spots.json')
            .then(response => response.json())
            .then(data => {
                culturalSpots = data;
                addSpotMarkers('all');
            });

        // 添加地图控件
        culturalMap.addControl(new AMap.ToolBar());
        culturalMap.addControl(new AMap.Scale());
    }

    // 添加标记点
    function addSpotMarkers(type) {
        // 清除现有标记
        markers.forEach(marker => marker.remove());
        markers = [];

        culturalSpots.spots.forEach(region => {
            if (type === 'all' || region.type === type) {
                region.spots.forEach(spot => {
                    const marker = new AMap.Marker({
                        position: spot.location,
                        content: createMarkerContent(spot),
                        anchor: 'bottom-center'
                    });

                    marker.on('click', () => showSpotInfo(spot, region));
                    marker.setMap(culturalMap);
                    markers.push(marker);
                });
            }
        });
    }

    // 创建自定义标记点内容
    function createMarkerContent(spot) {
        const div = document.createElement('div');
        div.className = 'custom-marker';
        div.innerHTML = `<span>${spot.name}</span>`;
        return div;
    }

    // 显示景点信息
    function showSpotInfo(spot, region) {
        const spotInfo = document.querySelector('.spot-info');
        const content = spotInfo.querySelector('.spot-content');

        content.innerHTML = `
            <h3>${spot.name}</h3>
            <p class="region-type">${region.type} - ${region.name}</p>
            <div class="spot-description">
                <p>${spot.description}</p>
            </div>
            <div class="spot-activities">
                <h4>文化体验活动</h4>
                <ul>
                    ${spot.activities.map(activity => `
                        <li>${activity}</li>
                    `).join('')}
                </ul>
            </div>
            ${spot.images ? `
                <div class="spot-images">
                    <img src="images/spots/${spot.images[0]}" 
                         alt="${spot.name}"
                         onerror="this.src='images/placeholder.jpg'">
                </div>
            ` : ''}
        `;

        spotInfo.classList.remove('hidden');
    }

    // 添加筛选功能
    document.querySelectorAll('.spot-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.spot-filters .filter-btn')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            addSpotMarkers(btn.dataset.type);
        });
    });

    // 关闭景点信息
    document.querySelector('.close-spot-info').addEventListener('click', () => {
        document.querySelector('.spot-info').classList.add('hidden');
    });

    // 初始化地图
    document.addEventListener('DOMContentLoaded', initCulturalMap);
});