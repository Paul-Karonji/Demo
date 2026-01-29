// Auto-Icon Initializer
// This script automatically replaces emoji icons with SVG icons on page load
// Include this after icons.js on any page

(function () {
    'use strict';

    // Icon mapping for common emojis to Lucide icons
    const emojiToIcon = {
        // Navigation
        '⚕': 'heart-pulse',
        '📊': 'bar-chart',
        '👥': 'users',
        '⏱️': 'clock',
        '💊': 'pill',
        '🔬': 'flask',
        '💰': 'credit-card',
        '📈': 'trending-up',
        '🚪': 'log-out',

        // Actions
        '🔍': 'search',
        '🔔': 'bell',
        '☰': 'menu',
        '👤': 'user',
        '🔒': 'lock',
        '👁': 'eye',
        '🙈': 'eye-off',
        '⚙️': 'settings',
        '👨‍⚕️': 'stethoscope',
        '👩‍⚕️': 'user-nurse',
        '📋': 'clipboard',
        '✏️': 'edit',
        '🗑️': 'trash',
        '➕': 'plus',
        '✓': 'check',
        '✗': 'x',
        '⬇️': 'download',
        '⬆️': 'upload',
        '←': 'arrow-left',
        '→': 'arrow-right',
        '↗': 'trending-up',

        // Medical
        '🏥': 'activity',
        '💉': 'droplet',
        '🌡️': 'thermometer',
        '❤️': 'heart-pulse',

        // Misc
        '📅': 'calendar',
        '📄': 'file-text',
        '📦': 'package',
        '📞': 'phone',
        '✉️': 'mail',
        '📍': 'map-pin',
        '🖼️': 'image',
        '⋮': 'more-vertical',
    };

    // Initialize all icons on page load
    function initializeIcons() {
        // 1. Replace sidebar logo
        const sidebarLogo = document.querySelector('.sidebar-logo-icon');
        if (sidebarLogo && sidebarLogo.textContent.trim()) {
            const emoji = sidebarLogo.textContent.trim();
            const iconName = emojiToIcon[emoji] || 'heart-pulse';
            sidebarLogo.textContent = '';
            sidebarLogo.appendChild(Icons.create(iconName, '', 28));
        }

        // 2. Replace navigation icons
        document.querySelectorAll('.nav-icon').forEach(el => {
            const emoji = el.textContent.trim();
            if (emoji && emojiToIcon[emoji]) {
                el.textContent = '';
                el.appendChild(Icons.create(emojiToIcon[emoji], '', 20));
            }
        });

        // 3. Replace search icon
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon && searchIcon.textContent.trim()) {
            searchIcon.textContent = '';
            searchIcon.appendChild(Icons.create('search', '', 18));
        }

        // 4. Replace notification bell
        const notificationIcon = document.querySelector('.header-notification span');
        if (notificationIcon && notificationIcon.textContent.trim() === '🔔') {
            notificationIcon.textContent = '';
            notificationIcon.appendChild(Icons.create('bell', '', 20));
        }

        // 5. Replace mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle span');
        if (menuToggle && menuToggle.textContent.trim() === '☰') {
            menuToggle.textContent = '';
            menuToggle.appendChild(Icons.create('menu', '', 24));
        }

        // 6. Replace metric icons
        document.querySelectorAll('.metric-icon').forEach(el => {
            const emoji = el.textContent.trim();
            if (emoji && emojiToIcon[emoji]) {
                el.textContent = '';
                el.appendChild(Icons.create(emojiToIcon[emoji], '', 24));
            }
        });

        // 7. Replace activity icons
        document.querySelectorAll('.activity-icon').forEach(el => {
            const emoji = el.textContent.trim();
            if (emoji && emojiToIcon[emoji]) {
                el.textContent = '';
                el.appendChild(Icons.create(emojiToIcon[emoji], '', 20));
            }
        });

        // 8. Replace button icons (logout, etc.)
        document.querySelectorAll('.btn span:first-child').forEach(el => {
            const emoji = el.textContent.trim();
            if (emoji && emojiToIcon[emoji] && el.textContent.length < 3) {
                el.textContent = '';
                el.appendChild(Icons.create(emojiToIcon[emoji], '', 18));
            }
        });

        // 9. Replace any data-icon attributes
        document.querySelectorAll('[data-icon]').forEach(el => {
            if (!el.querySelector('svg')) {
                const iconName = el.dataset.icon;
                const size = el.dataset.iconSize || 20;
                el.appendChild(Icons.create(iconName, '', size));
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeIcons);
    } else {
        initializeIcons();
    }

    // Export for manual use
    window.IconInitializer = {
        init: initializeIcons,
        emojiToIcon: emojiToIcon
    };
})();
