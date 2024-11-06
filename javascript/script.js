$(document).ready(function() {
    let submenuTimeout;

    // 메인 메뉴 호버 이벤트
    $('.main-menu > li > a').hover(
        function() {
            clearTimeout(submenuTimeout);
            const submenuId = $(this).data('submenu');
            $('.sub-menu-content').hide();
            $(`#${submenuId}`).show();
            $('.sub-menu-container').addClass('expanded').show();
            $('header').addClass('expanded');
        },
        function() {
            submenuTimeout = setTimeout(function() {
                if (!$('.sub-menu-container:hover').length) {
                    $('.sub-menu-container').removeClass('expanded').hide();
                    $('header').removeClass('expanded');
                }
            }, 200);
        }
    );

    // 서브메뉴 호버 이벤트
    $('.sub-menu-container').hover(
        function() {
            clearTimeout(submenuTimeout);
        },
        function() {
            submenuTimeout = setTimeout(function() {
                $('.sub-menu-container').removeClass('expanded').hide();
                $('header').removeClass('expanded');
            }, 200);
        }
    );

    // 메인 카테고리 호버 이벤트
    $('.main-categories ul li a').hover(
        function() {
            $('.main-categories ul li a').removeClass('active');
            $(this).addClass('active');
            
            const subcategory = $(this).data('subcategory');
            $('.sub-menu-column.sub-categories ul').hide();
            $(`#${subcategory}-sub`).show();
        }
    );

    // 서브 카테고리 호버 이벤트
    $('.sub-categories ul li a').hover(
        function() {
            $('.sub-categories ul li a').removeClass('active');
            $(this).addClass('active');
        }
    );

    $('.hover-trigger').hover(function() {
        $(this).siblings('.hover-image').fadeIn(200);
    }, function() {
        $(this).siblings('.hover-image').fadeOut(200);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mainCategories = document.querySelectorAll('.sub-menu-column.main-categories a');
    
    mainCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            mainCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // 여기에 서브 카테고리 표시 로직 추가
        });
    });

    // Swiper 초기화
    const swiper = new Swiper('.product-scroll-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });

    const productContainer = document.querySelector('.product-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    productContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        productContainer.classList.add('active');
        startX = e.pageX - productContainer.offsetLeft;
        scrollLeft = productContainer.scrollLeft;
    });

    productContainer.addEventListener('mouseleave', () => {
        isDown = false;
        productContainer.classList.remove('active');
    });

    productContainer.addEventListener('mouseup', () => {
        isDown = false;
        productContainer.classList.remove('active');
    });

    productContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - productContainer.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        productContainer.scrollLeft = scrollLeft - walk;
    });

    // 스크롤 관성 추
    let momentum;
    let animationId;

    function momentumScroll() {
        productContainer.scrollLeft += momentum;
        momentum *= 0.95; // 감속률

        if (Math.abs(momentum) > 0.5) {
            animationId = requestAnimationFrame(momentumScroll);
        } else {
            cancelAnimationFrame(animationId);
        }
    }

    productContainer.addEventListener('mouseup', (e) => {
        isDown = false;
        productContainer.classList.remove('active');
        
        // 마우스를 뗄 때 관성 스크롤 시작
        momentum = (startX - (e.pageX - productContainer.offsetLeft)) * 0.1;
        requestAnimationFrame(momentumScroll);
    });

    // 마우스 휠 이벤트 리스너 추가
    productContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        productContainer.scrollLeft += e.deltaY;
    });

    const productGrid = document.querySelector('.product-grid');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const productCards = document.querySelectorAll('.product-card');
    
    let currentIndex = 0;
    const cardWidth = 320; // 카드 너비 + 마진

    function updateCarousel() {
        productGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // 버튼 활성화/비활성화
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= productCards.length - 3; // 한 번에 3개 카드 표시 가정
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < productCards.length - 3) { // 한 번에 3개 카드 표시 가정
            currentIndex++;
            updateCarousel();
        }
    });

    // 초기 상태 설정
    updateCarousel();

    // hires-sub 항목에 호버 효과 추가
    const hiresSubItems = document.querySelectorAll('#hires-sub li a');
    hiresSubItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#3498db';
        });
        item.addEventListener('mouseleave', function() {
            this.style.color = '#333';
        });
    });
});
