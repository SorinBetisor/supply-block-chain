import type { Employee, EmployeeRole } from '$lib/blockchain/types/types';

/**
 * Predefined Zara Employees
 * These are hardcoded employees for the demo
 */
export const ZARA_EMPLOYEES: Employee[] = [
	{
		id: 'EMP001',
		name: 'Sarah Johnson',
		email: 'sarah.johnson@zara.com',
		role: 'farm_manager',
		department: 'Supply Chain - Raw Materials',
		location: 'Texas, USA'
	},
	{
		id: 'EMP002',
		name: 'Michael Chen',
		email: 'michael.chen@zara.com',
		role: 'textile_manager',
		department: 'Supply Chain - Textile Production',
		location: 'North Carolina, USA'
	},
	{
		id: 'EMP003',
		name: 'Maria Garcia',
		email: 'maria.garcia@zara.com',
		role: 'textile_manager',
		department: 'Supply Chain - Textile Production',
		location: 'Georgia, USA'
	},
	{
		id: 'EMP004',
		name: 'João Silva',
		email: 'joao.silva@zara.com',
		role: 'manufacturing_manager',
		department: 'Manufacturing',
		location: 'Portugal'
	},
	{
		id: 'EMP005',
		name: 'Ana Rodrigues',
		email: 'ana.rodrigues@zara.com',
		role: 'qa_inspector',
		department: 'Quality Assurance',
		location: 'Portugal'
	},
	{
		id: 'EMP006',
		name: 'Carlos Martínez',
		email: 'carlos.martinez@zara.com',
		role: 'distribution_manager',
		department: 'Distribution',
		location: 'Madrid, Spain'
	},
	{
		id: 'EMP007',
		name: 'Elena López',
		email: 'elena.lopez@zara.com',
		role: 'retail_manager',
		department: 'Retail Operations',
		location: 'Barcelona, Spain'
	},
	{
		id: 'EMP008',
		name: 'David Kim',
		email: 'david.kim@zara.com',
		role: 'logistics_coordinator',
		department: 'Logistics',
		location: 'Global'
	},
	{
		id: 'ADMIN001',
		name: 'Admin User',
		email: 'admin@zara.com',
		role: 'admin',
		department: 'IT & Systems',
		location: 'Global'
	}
];

/**
 * Role to Step Type Mapping
 * Defines which employee roles can add which types of supply chain steps
 */
export const ROLE_PERMISSIONS: Record<EmployeeRole, string[]> = {
	farm_manager: ['Cotton Farm', 'Raw Material'],
	textile_manager: ['Cotton Processing', 'Textile Manufacturing', 'Fabric Production'],
	manufacturing_manager: ['Garment Manufacturing', 'Manufacturing', 'Assembly'],
	qa_inspector: ['Quality Control', 'Quality Assurance', 'Inspection'],
	distribution_manager: ['Distribution Center', 'Warehouse', 'Distribution'],
	retail_manager: ['Retail Store', 'Store', 'Retail'],
	logistics_coordinator: ['Transport', 'Logistics', 'Shipping'],
	admin: [] // Admin can add any step
};

/**
 * Get employee by ID
 */
export function getEmployeeById(id: string): Employee | undefined {
	return ZARA_EMPLOYEES.find(emp => emp.id === id);
}

/**
 * Get employees by role
 */
export function getEmployeesByRole(role: EmployeeRole): Employee[] {
	return ZARA_EMPLOYEES.filter(emp => emp.role === role);
}

/**
 * Check if employee can add a specific step type
 */
export function canEmployeeAddStep(employeeRole: EmployeeRole, stepType: string): boolean {
	// Admin can add any step
	if (employeeRole === 'admin') {
		return true;
	}

	const allowedSteps = ROLE_PERMISSIONS[employeeRole];
	return allowedSteps.some(allowed => 
		stepType.toLowerCase().includes(allowed.toLowerCase()) ||
		allowed.toLowerCase().includes(stepType.toLowerCase())
	);
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: EmployeeRole): string {
	const roleNames: Record<EmployeeRole, string> = {
		farm_manager: 'Farm Manager',
		textile_manager: 'Textile Manager',
		manufacturing_manager: 'Manufacturing Manager',
		qa_inspector: 'QA Inspector',
		distribution_manager: 'Distribution Manager',
		retail_manager: 'Retail Manager',
		logistics_coordinator: 'Logistics Coordinator',
		admin: 'Administrator'
	};
	return roleNames[role];
}
