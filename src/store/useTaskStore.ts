import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types';

interface TaskState {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTaskStatus: (taskId: string, status: Task['status']) => void;
    deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            updateTaskStatus: (taskId, status) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
                })),
            deleteTask: (taskId) =>
                set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
        }),
        {
            name: 'astra-tasks-storage',
        }
    )
);
