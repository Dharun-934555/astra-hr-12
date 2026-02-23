import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LeaveRequest } from '../types';

interface LeaveState {
    leaves: LeaveRequest[];
    addLeave: (leave: LeaveRequest) => void;
    updateLeaveStatus: (leaveId: string, status: LeaveRequest['status']) => void;
}

export const useLeaveStore = create<LeaveState>()(
    persist(
        (set) => ({
            leaves: [],
            addLeave: (leave) => set((state) => ({ leaves: [...state.leaves, leave] })),
            updateLeaveStatus: (leaveId, status) =>
                set((state) => ({
                    leaves: state.leaves.map((l) => (l.id === leaveId ? { ...l, status } : l)),
                })),
        }),
        {
            name: 'astra-leaves-storage',
        }
    )
);
