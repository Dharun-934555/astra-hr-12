import React from 'react';
import { Outlet } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export function AuthLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flexjustify-center items-center text-center">
                    <Building2 className="mx-auto h-12 w-12 text-primary-600" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        AstraHR
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enterprise Employee Management
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
