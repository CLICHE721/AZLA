$(document).ready(function() {
    let submenuTimeout;
    let isScrolling = false; // 스크롤 상태 추적
    const sections = document.querySelectorAll('section'); // 모든 섹션 선택

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

    // 섹션 스크롤 이벤트
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return; // 여러 번 스크롤 방지

        const delta = e.deltaY > 0 ? 1 : -1; // 스크롤 방향
        const currentSection = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight;
        });

        const nextSectionIndex = currentSection + delta;

        // 다음 섹션 인덱스가 유효한지 확인
        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            isScrolling = true; // 스크롤 상태 설정
            sections[nextSectionIndex].scrollIntoView({
                behavior: 'smooth' // 부드러운 스크롤
            });

            // 타임아웃 후 스크롤 상태 초기화
            setTimeout(() => {
                isScrolling = false;
            }, 800); // 스크롤 애니메이션 시간과 일치시킴
        }
    });

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

    // 마우스 휠 이벤트 리스너 추가
    productContainer.addEventListener('wheel', (e) => {
        e.preventDefault(); // 기본 스크롤 방지
        productContainer.scrollLeft += e.deltaY; // 가로 스크롤

        // 섹션 스크롤 비활성화
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 600); // 스크롤 애니메이션 시간과 일치시킴
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
