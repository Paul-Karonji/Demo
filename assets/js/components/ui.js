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
