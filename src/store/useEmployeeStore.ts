import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface EmployeeState {
    employees: User[];
    addEmployee: (employee: User) => void;
    removeEmployee: (id: string) => void;
    updateEmployee: (id: string, data: Partial<User>) => void;
}

export const useEmployeeStore = create<EmployeeState>()(
    persist(
        (set) => ({
            employees: [],
            addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
            removeEmployee: (id) =>
                set((state) => ({ employees: state.employees.filter((e) => e.id !== id) })),
            updateEmployee: (id, data) =>
                set((state) => ({
                    employees: state.employees.map((e) => (e.id === id ? { ...e, ...data } : e)),
                })),
        }),
        {
            name: 'astra-employees-storage',
        }
    )
);
