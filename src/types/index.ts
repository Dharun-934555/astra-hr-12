export type Role = 'HR' | 'Employee';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    department?: string;
    dateJoined: string;
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    type: string;
    fromDate: string;
    toDate: string;
    reason: string;
    status: LeaveStatus;
    appliedOn: string;
}

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'Completed';
export type TaskRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Task {
    id: string;
    employeeId: string;
    title: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignedBy: string; // HR ID
    assignedOn: string;
}

export interface TaskRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    title: string;
    description: string;
    category: string;
    status: TaskRequestStatus;
    requestedOn: string;
    reviewedOn?: string;
    reviewedBy?: string;
}
