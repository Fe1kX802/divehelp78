document.addEventListener('DOMContentLoaded', () => {

    const sitePages = [
        { name: 'Главная страница', url: 'index.html', icon: 'fa-house' },
        { name: 'Поиск личных вещей', url: 'personal-search.html', icon: 'fa-mobile-screen-button' },
        { name: 'Помощь катерам и яхтам', url: 'boat-help.html', icon: 'fa-anchor' },
        { name: 'Осмотр с видеосъемкой', url: 'instrument-work.html', icon: 'fa-magnifying-glass-location' },
        { name: 'Очистка акваторий', url: 'water-cleaning.html', icon: 'fa-leaf' },
        { name: 'Ремонт и обслуживание бассейнов', url: 'pool-cleaning.html', icon: 'fa-screwdriver-wrench'},
        { name: 'Сварочные работы и установка понтонов', url: 'welding.html', icon: 'fa-bolt'}
    ];

    const trigger = document.getElementById('logoDropdownTrigger');
    const menu = document.getElementById('logoDropdownMenu');
    const container = document.getElementById('logoDropdownContainer');
    const itemsContainer = document.getElementById('logoDropdownItemsContainer');
    const closeBtn = document.getElementById('mobileCloseBtn');

    if (menu && trigger && container && itemsContainer) {
        itemsContainer.innerHTML = '';

        sitePages.forEach(page => {
            const item = document.createElement('a');
            item.href = page.url;
            item.className = 'logo-dropdown-item';

            const currentFilename = window.location.pathname.split('/').pop() || 'service-template.html';
            if (page.url === currentFilename) {
                item.classList.add('active');
            }

            const iconClass = page.icon || 'fa-arrow-right';
            item.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${page.name}</span>`;

            itemsContainer.appendChild(item);
        });

        function openDropdown() {
            menu.style.display = window.innerWidth <= 768 ? 'flex' : 'block';
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
            setTimeout(() => {
                menu.classList.add('show');
                container.classList.add('active');
            }, 20);
        }

        function closeDropdown() {
            menu.classList.remove('show');
            container.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!menu.classList.contains('show')) {
                    menu.style.display = 'none';
                }
            }, 250);
        }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.contains('show');
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeDropdown();
            });
        }

        document.addEventListener('click', (e) => {
            if (window.innerWidth > 768 && !container.contains(e.target)) {
                closeDropdown();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
            }
        });
    }

    function smoothScrollTo(targetSelector, duration) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    const contactsLink = document.getElementById('headerContactsLink');
    if (contactsLink) {
        contactsLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (menu && menu.classList.contains('show')) {
                closeDropdown();
            }
            smoothScrollTo('#contacts', 1200);
        });
    }

    const servicesBtn = document.getElementById('heroServicesBtn');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#services', 1000);
        });
    }
});