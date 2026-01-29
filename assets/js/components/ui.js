/**
 * Toast Notification Component
 */
const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        this.init();

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type} animate-slideInRight`;
        toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
      <div class="toast-close" onclick="this.parentElement.remove()">✕</div>
    `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 250ms ease';
            setTimeout(() => toast.remove(), 250);
        }, duration);
    },

    success(message, duration) {
        this.show(message, 'success', duration);
    },

    error(message, duration) {
        this.show(message, 'error', duration);
    },

    warning(message, duration) {
        this.show(message, 'warning', duration);
    },

    info(message, duration) {
        this.show(message, 'info', duration);
    }
};

/**
 * Modal Component
 */
const Modal = {
    show(options) {
        const {
            title,
            content,
            buttons = [],
            size = 'md',
            onClose
        } = options;

        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.innerHTML = `
      <div class="modal max-w-${size} animate-scaleIn">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" data-action="close">✕</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${buttons.length > 0 ? `
          <div class="modal-footer">
            ${buttons.map(btn => `
              <button class="btn ${btn.className || 'btn-secondary'}" data-action="${btn.action}">
                ${btn.text}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

        document.body.appendChild(backdrop);

        // Handle button clicks
        backdrop.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;

                if (action === 'close') {
                    this.close(backdrop);
                    if (onClose) onClose();
                } else {
                    const button = buttons.find(b => b.action === action);
                    if (button && button.onClick) {
                        button.onClick();
                    }
                }
            });
        });

        // Close on backdrop click
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                this.close(backdrop);
                if (onClose) onClose();
            }
        });

        return backdrop;
    },

    close(modal) {
        if (modal) {
            modal.style.animation = 'fadeOut 250ms ease';
            setTimeout(() => modal.remove(), 250);
        }
    },

    confirm(title, message, onConfirm) {
        return this.show({
            title,
            content: `<p>${message}</p>`,
            buttons: [
                {
                    text: 'Cancel',
                    action: 'cancel',
                    className: 'btn-secondary',
                    onClick: () => this.close(document.querySelector('.modal-backdrop'))
                },
                {
                    text: 'Confirm',
                    action: 'confirm',
                    className: 'btn-primary',
                    onClick: () => {
                        onConfirm();
                        this.close(document.querySelector('.modal-backdrop'));
                    }
                }
            ]
        });
    }
};

/**
 * Loading Spinner
 */
const Loading = {
    show(message = 'Loading...') {
        const existing = document.querySelector('.loading-overlay');
        if (existing) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-backdrop loading-overlay';
        overlay.innerHTML = `
      <div class="flex flex-col items-center gap-4">
        <div class="spinner spinner-lg"></div>
        <p class="text-white text-lg">${message}</p>
      </div>
    `;
        document.body.appendChild(overlay);
    },

    hide() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) overlay.remove();
    }
};

/**
 * Sidebar Navigation
 */
const Sidebar = {
    init() {
        // Elements
        this.sidebar = document.getElementById('sidebar');
        if (!this.sidebar) return;

        this.toggleBtn = document.querySelector('.mobile-menu-toggle');

        // Update toggle icon if button exists
        if (this.toggleBtn) {
            // Check if it already has the new icon to avoid duplicates if re-initialized
            if (!this.toggleBtn.querySelector('svg') || this.toggleBtn.textContent.trim() === '☰') {
                this.toggleBtn.innerHTML = '';
                this.toggleBtn.appendChild(Icons.create('menu', '', 24));
            }

            // Remove old onclick if present (handled via HTML update usually, but safety here)
            this.toggleBtn.removeAttribute('onclick');

            // Clone and replace to remove execution of inline onclick if it lingers
            // But easier to just add event listener and user might update HTML
            this.toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault(); // Prevent inline handler if possible
                this.toggle();
            });
        }

        // Create overlay if not exists
        if (!document.querySelector('.sidebar-overlay')) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'sidebar-overlay';
            document.body.appendChild(this.overlay);
            this.overlay.addEventListener('click', () => this.close());
        } else {
            this.overlay = document.querySelector('.sidebar-overlay');
        }

        // Create close button if not exists
        if (!this.sidebar.querySelector('.sidebar-close')) {
            this.closeBtn = document.createElement('button');
            this.closeBtn.className = 'sidebar-close';
            this.closeBtn.innerHTML = Icons.get('x', '', 20);
            this.closeBtn.setAttribute('aria-label', 'Close Menu');
            this.closeBtn.addEventListener('click', () => this.close());

            const header = this.sidebar.querySelector('.sidebar-header');
            if (header) {
                header.appendChild(this.closeBtn);
            } else {
                this.sidebar.appendChild(this.closeBtn);
            }
        }

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                this.close();
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar.classList.contains('open')) {
                this.close();
            }
        });
    },

    toggle() {
        const isOpen = this.sidebar.classList.contains('open');
        if (isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.sidebar.classList.add('open');
        if (this.overlay) this.overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.sidebar.classList.remove('open');
        if (this.overlay) this.overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Initialize Sidebar
document.addEventListener('DOMContentLoaded', () => {
    Sidebar.init();
});
