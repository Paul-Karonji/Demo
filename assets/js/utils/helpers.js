/**
 * Utility Functions
 */

/**
 * ID Generators
 */
const IDGenerator = {
    generateUPID() {
        const year = new Date().getFullYear();
        const patients = storage.getAll('patients');
        const nextNum = String(patients.length + 1).padStart(3, '0');
        return `UPID-${year}-${nextNum}`;
    },

    generateBillNumber() {
        const bills = storage.getAll('bills');
        const nextNum = String(bills.length + 1).padStart(4, '0');
        return `BILL-${nextNum}`;
    },

    generatePrescriptionNumber() {
        const prescriptions = storage.getAll('prescriptions');
        const nextNum = String(prescriptions.length + 1).padStart(4, '0');
        return `RX-${nextNum}`;
    },

    generateLabRequestNumber() {
        const requests = storage.getAll('lab_requests');
        const nextNum = String(requests.length + 1).padStart(4, '0');
        return `LAB-${nextNum}`;
    },

    generateVisitNumber() {
        const visits = storage.getAll('visits');
        const nextNum = String(visits.length + 1).padStart(4, '0');
        return `VISIT-${nextNum}`;
    },

    generateID(prefix) {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};

/**
 * Date Utilities
 */
const DateUtils = {
    formatDate(date, format = 'short') {
        const d = new Date(date);

        if (format === 'short') {
            return d.toLocaleDateString('en-GB');
        } else if (format === 'long') {
            return d.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else if (format === 'time') {
            return d.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (format === 'datetime') {
            return `${this.formatDate(d, 'short')} ${this.formatDate(d, 'time')}`;
        }

        return d.toISOString();
    },

    calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    },

    isExpiringSoon(expiryDate, days = 30) {
        const expiry = new Date(expiryDate);
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);

        return expiry <= threshold && expiry >= new Date();
    },

    isExpired(expiryDate) {
        return new Date(expiryDate) < new Date();
    },

    getDaysUntil(date) {
        const target = new Date(date);
        const today = new Date();
        const diffTime = target - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }

        return 'Just now';
    }
};

/**
 * Number Formatters
 */
const NumberUtils = {
    formatCurrency(amount, currency = 'KES') {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    },

    formatNumber(num) {
        return new Intl.NumberFormat('en-KE').format(num);
    },

    calculatePercentage(value, total) {
        if (total === 0) return 0;
        return ((value / total) * 100).toFixed(1);
    }
};

/**
 * String Utilities
 */
const StringUtils = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    truncate(str, length = 50) {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    },

    slugify(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    getInitials(firstName, lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
};

/**
 * Validation Utilities
 */
const Validators = {
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    isPhone(phone) {
        const re = /^\+?[1-9]\d{1,14}$/;
        return re.test(phone.replace(/[\s-]/g, ''));
    },

    isRequired(value) {
        return value !== null && value !== undefined && value !== '';
    },

    minLength(value, min) {
        return value && value.length >= min;
    },

    maxLength(value, max) {
        return value && value.length <= max;
    },

    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    isPositive(value) {
        return this.isNumber(value) && parseFloat(value) > 0;
    },

    isDate(value) {
        return !isNaN(Date.parse(value));
    }
};

/**
 * Array Utilities
 */
const ArrayUtils = {
    sortBy(array, key, order = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];

            if (aVal < bVal) return order === 'asc' ? -1 : 1;
            if (aVal > bVal) return order === 'asc' ? 1 : -1;
            return 0;
        });
    },

    groupBy(array, key) {
        return array.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
            return groups;
        }, {});
    },

    unique(array, key) {
        if (!key) {
            return [...new Set(array)];
        }

        const seen = new Set();
        return array.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    },

    sum(array, key) {
        return array.reduce((sum, item) => {
            return sum + (key ? item[key] : item);
        }, 0);
    }
};

/**
 * DOM Utilities
 */
const DOMUtils = {
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);

        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key.startsWith('on')) {
                const event = key.substring(2).toLowerCase();
                element.addEventListener(event, value);
            } else {
                element.setAttribute(key, value);
            }
        });

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });

        return element;
    },

    show(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) element.classList.remove('hidden');
    },

    hide(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) element.classList.add('hidden');
    },

    toggle(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) element.classList.toggle('hidden');
    }
};

/**
 * Debounce function
 */
function debounce(func, wait = 300) {
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

/**
 * Throttle function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
