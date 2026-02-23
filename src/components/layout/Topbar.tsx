import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Bell, UserCircle } from 'lucide-react';

export function Topbar() {
    const user = useAuthStore((state) => state.user);
    const [open, setOpen] = useState(false);

    return (
        <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button 
                        type="button" 
                        onClick={() => setOpen(!open)}
                        className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {open && (
                        <div className="absolute right-4 top-14 w-64 bg-white shadow-lg rounded-xl p-4 border z-50">
                            <p className="text-sm text-gray-600 text-center">
                                🔔 No notifications yet
                            </p>
                        </div>
                    )}

                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                    <div className="flex items-center p-1.5 focus:outline-none h-full">
                        <span className="sr-only">Open user menu</span>
                        <UserCircle className="h-8 w-8 text-primary-600 bg-primary-50 rounded-full" />
                        <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                {user?.name || 'User'}
                            </span>
                            <span className="ml-2 text-xs text-gray-500 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 line-clamp-1 max-w-[120px]">
                                {user?.role}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
