import React from 'react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/ui/Card';
import { Users } from 'lucide-react';

export function EmployeeTeam() {
    const user = useAuthStore((state) => state.user);
    const allEmployees = useEmployeeStore((state) => state.employees).filter(e => e.role === 'Employee');

    // Exclude current user from "colleagues" list for some views if needed, 
    // but it's often good to see everyone including yourself in the directory.

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">Team Directory</h2>
                    <p className="mt-1 text-sm text-gray-500">Get to know your colleagues across the company.</p>
                </div>
                <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    {allEmployees.length} Team Member{allEmployees.length !== 1 && 's'}
                </div>
            </div>

            {allEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allEmployees.map((colleague) => (
                        <Card key={colleague.id} className="text-center p-6 hover:shadow-md transition-shadow">
                            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-2xl shadow-sm mb-4">
                                {colleague.name.charAt(0)}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {colleague.name}
                                {colleague.id === user?.id && <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">You</span>}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">{colleague.email}</p>

                            <div className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 border border-gray-200 text-xs font-medium text-gray-600">
                                {colleague.department || 'Employee'}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center flex flex-col items-center justify-center">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">It's quiet here</h3>
                    <p className="mt-1 text-sm text-gray-500 border-dashed">
                        You are the only one here right now.
                    </p>
                </Card>
            )}
        </div>
    );
}
