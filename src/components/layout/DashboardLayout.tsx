import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuthStore } from '../../store/useAuthStore';

interface DashboardLayoutProps {
    role: 'HR' | 'Employee';
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
    const user = useAuthStore((state) => state.user);

    if (!user || user.role !== role) {
        return null; // Will be handled by ProtectedRoute redirecting, but prevents flicker
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <Sidebar role={role} />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />

                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 md:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
