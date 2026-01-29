/**
 * Authentication Module
 */
const Auth = {
    /**
     * Check if user is logged in
     */
    isAuthenticated() {
        return localStorage.getItem('hms_current_user') !== null;
    },

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        const userJson = localStorage.getItem('hms_current_user');
        return userJson ? JSON.parse(userJson) : null;
    },

    /**
     * Login user
     */
    login(username, password) {
        const users = storage.getAll('users');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store user session
            const session = {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                email: user.email,
                phone: user.phone,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('hms_current_user', JSON.stringify(session));
            localStorage.setItem('hms_session_token', this.generateToken());

            return { success: true, user: session };
        }

        return { success: false, message: 'Invalid username or password' };
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('hms_current_user');
        localStorage.removeItem('hms_session_token');
        window.location.href = 'index.html';
    },

    /**
     * Check if user has permission
     */
    hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;

        // Admin has all permissions
        if (user.role === 'Administrator') return true;

        const permissions = {
            'Doctor': [
                'patients.view', 'patients.create', 'patients.edit',
                'queue.view', 'queue.manage',
                'prescriptions.create', 'prescriptions.view',
                'lab.request', 'lab.view_results',
                'billing.view'
            ],
            'Nurse': [
                'patients.view', 'patients.create',
                'queue.view', 'queue.manage',
                'vitals.record'
            ],
            'Pharmacist': [
                'pharmacy.view', 'pharmacy.manage',
                'prescriptions.view', 'prescriptions.dispense',
                'inventory.manage'
            ],
            'Lab Technician': [
                'lab.view', 'lab.process',
                'lab.enter_results', 'lab.verify'
            ],
            'Receptionist': [
                'patients.view', 'patients.create', 'patients.edit',
                'queue.view', 'queue.add',
                'billing.create', 'billing.view', 'billing.process_payment'
            ]
        };

        const userPermissions = permissions[user.role] || [];
        return userPermissions.includes(permission);
    },

    /**
     * Require authentication (redirect if not logged in)
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    /**
     * Generate session token
     */
    generateToken() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Get user initials for avatar
     */
    getUserInitials() {
        const user = this.getCurrentUser();
        if (!user) return '';

        const names = user.name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    }
};
