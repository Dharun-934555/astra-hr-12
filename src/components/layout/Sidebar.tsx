import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    CalendarOff,
    LogOut,
    Building2
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
    role: 'HR' | 'Employee';
}

export function Sidebar({ role }: SidebarProps) {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const hrLinks = [
        { name: 'Overview', to: '/admin', icon: LayoutDashboard },
        { name: 'Employees', to: '/admin/employees', icon: Users },
        { name: 'Tasks', to: '/admin/tasks', icon: CheckSquare },
        { name: 'Leave Requests', to: '/admin/leaves', icon: CalendarOff },
    ];

    const employeeLinks = [
        { name: 'My Dashboard', to: '/employee', icon: LayoutDashboard },
        { name: 'My Tasks', to: '/employee/tasks', icon: CheckSquare },
        { name: 'Apply Leave', to: '/employee/leaves', icon: CalendarOff },
        { name: 'Team', to: '/employee/team', icon: Users },
    ];

    const links = role === 'HR' ? hrLinks : employeeLinks;

    return (
        <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
            <div className="flex h-16 items-center border-b border-gray-200 px-6">
                <Building2 className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-lg font-bold text-gray-900">AstraHR</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {links.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                end={item.to === '/admin' || item.to === '/employee'}
                                className={({ isActive }) =>
                                    cn(
                                        'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={cn(
                                                'mr-3 h-5 w-5 flex-shrink-0',
                                                isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500'
                                            )}
                                        />
                                        {item.name}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    Logout
                </button>
            </div>
        </div>
    );
}
