import type { Employee } from '$lib/blockchain/types/types';
import { getEmployeeById } from './employees';

/**
 * Auth Store using Svelte 5 Runes
 * Manages authentication state and session persistence
 */
class AuthStore {
	private _currentUser = $state<Employee | null>(null);
	private _isAuthenticated = $state(false);

	constructor() {
		// Load session from localStorage on initialization
		if (typeof window !== 'undefined') {
			this.loadSession();
		}
	}

	/**
	 * Get current authenticated user
	 */
	get currentUser(): Employee | null {
		return this._currentUser;
	}

	/**
	 * Check if user is authenticated
	 */
	get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	/**
	 * Login with employee ID
	 */
	login(employeeId: string): boolean {
		const employee = getEmployeeById(employeeId);
		
		if (!employee) {
			console.error('Employee not found:', employeeId);
			return false;
		}

		this._currentUser = employee;
		this._isAuthenticated = true;
		
		// Persist to localStorage
		this.saveSession(employee);
		
		return true;
	}

	/**
	 * Logout current user
	 */
	logout(): void {
		this._currentUser = null;
		this._isAuthenticated = false;
		
		// Clear localStorage
		if (typeof window !== 'undefined') {
			localStorage.removeItem('zara_auth_session');
		}
	}

	/**
	 * Save session to localStorage
	 */
	private saveSession(employee: Employee): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('zara_auth_session', JSON.stringify({
				employeeId: employee.id,
				timestamp: Date.now()
			}));
		}
	}

	/**
	 * Load session from localStorage
	 */
	private loadSession(): void {
		if (typeof window === 'undefined') return;

		try {
			const sessionData = localStorage.getItem('zara_auth_session');
			if (!sessionData) return;

			const { employeeId, timestamp } = JSON.parse(sessionData);
			
			// Session expires after 24 hours
			const SESSION_DURATION = 24 * 60 * 60 * 1000;
			if (Date.now() - timestamp > SESSION_DURATION) {
				this.logout();
				return;
			}

			// Restore session
			const employee = getEmployeeById(employeeId);
			if (employee) {
				this._currentUser = employee;
				this._isAuthenticated = true;
			} else {
				this.logout();
			}
		} catch (error) {
			console.error('Failed to load session:', error);
			this.logout();
		}
	}
}

// Export singleton instance
export const authStore = new AuthStore();
