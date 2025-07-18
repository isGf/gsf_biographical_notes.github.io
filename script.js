document.addEventListener('DOMContentLoaded', () => {
    // 确保页面加载时滚动到顶部
    window.scrollTo(0, 0);

    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    const root = document.documentElement;
    
    // 检查本地存储中的主题设置，默认为浅色
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    function updateThemeButton(theme) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        themeText.textContent = theme === 'dark' ? '浅色' : '深色';
    }

    // 滚动动画
    const cards = document.querySelectorAll('.feature-card, .tutorial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // 按钮点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!e.target.classList.contains('theme-toggle')) {
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // 添加导航链接点击处理
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });

    // 返回顶部按钮功能
    const backToTopButton = document.getElementById('back-to-top');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {  // 当页面滚动超过300px时显示按钮
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // 点击按钮返回顶部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 平滑滚动
        });
    });

    const personQueryButton = document.getElementById('person-query-start');
    personQueryButton.addEventListener('click', () => {
        window.open('http://192.168.0.75:3000/chat/share?shareId=ox8wvb9t8f1q4d65gnta77cd&showHistory=0', '_blank');
    });

    // 添加资质查询按钮的事件
    const qualificationQueryButton = document.getElementById('qualification-query-start');
    qualificationQueryButton.addEventListener('click', () => {
        window.open('http://192.168.0.75:3000/chat/share?shareId=cxzqbsrg4t2dqnozj93lq91j&showHistory=0', '_blank');
    });

    // 添加随便聊聊按钮的事件
    const chatButton = document.getElementById('chat-button');
    chatButton.addEventListener('click', () => {
        window.open('http://192.168.0.75:3000/chat/share?shareId=jcx7em061jhl7rgvwk0ywzq1&showHistory=0', '_blank');
    });

    // 添加文件问答按钮的事件
    const documentParseButton = document.getElementById('document-parse-start');
    documentParseButton.addEventListener('click', () => {
        window.open('http://192.168.0.75/chat/Kbdq2SJCM4EeF69o', '_blank');
    });

    // 添加资料获取按钮的事件
    const getFilesButton = document.getElementById('file-get-start');
    getFilesButton.addEventListener('click', () => {
        window.open('http://192.168.0.75:3000/chat/share?shareId=imbxmginkrawoc5zs887xopt&showHistory=0', '_blank');
    });

    // 添加图表生成按钮的事件
    const chartmakeButton = document.getElementById('chart-make-start');
    chartmakeButton.addEventListener('click', () => {
        window.open('http://192.168.0.75/chat/dO0LrQe9IGOvmeWy', '_blank');
    });

    // 添加卜卦按钮的事件
    const divinationButton = document.getElementById('divination-start');
    divinationButton.addEventListener('click', () => {
        window.open('http://192.168.0.75/chat/qu7qAbJZDNeyI7VE', '_blank');
    });
    

    document.addEventListener('mousemove', (event) => {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            const deltaX = event.clientX - eyeX;
            const deltaY = event.clientY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(5, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
            const eyeBallX = Math.cos(angle) * distance;
            const eyeBallY = Math.sin(angle) * distance;
            eye.style.transform = `translate(${eyeBallX}px, ${eyeBallY}px)`;
        });
    });
}); 