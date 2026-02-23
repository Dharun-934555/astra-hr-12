import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskRequest } from '../types';

interface TaskRequestState {
    taskRequests: TaskRequest[];
    addTaskRequest: (request: TaskRequest) => void;
    updateRequestStatus: (requestId: string, status: TaskRequest['status']) => void;
    deleteRequest: (requestId: string) => void;
}

export const useTaskRequestStore = create<TaskRequestState>()(
    persist(
        (set) => ({
            taskRequests: [],
            addTaskRequest: (request) =>
                set((state) => ({ taskRequests: [...state.taskRequests, request] })),
            updateRequestStatus: (requestId, status) =>
                set((state) => ({
                    taskRequests: state.taskRequests.map((r) =>
                        r.id === requestId
                            ? { ...r, status, reviewedOn: new Date().toISOString() }
                            : r
                    ),
                })),
            deleteRequest: (requestId) =>
                set((state) => ({
                    taskRequests: state.taskRequests.filter((r) => r.id !== requestId),
                })),
        }),
        {
            name: 'astra-task-requests-storage',
        }
    )
);
