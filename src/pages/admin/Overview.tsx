import React from 'react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useLeaveStore } from '../../store/useLeaveStore';
import { useTaskStore } from '../../store/useTaskStore';
import { Card, CardContent } from '../../components/ui/Card';
import { Users, UserCheck, CalendarOff, CheckSquare } from 'lucide-react';

export function AdminOverview() {
    const employees = useEmployeeStore((state) => state.employees).filter(e => e.role === 'Employee');
    const leaves = useLeaveStore((state) => state.leaves);
    const tasks = useTaskStore((state) => state.tasks);

    const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
    // Let's assume on leave if they have any approved leave overlapping today (for demo, just checking approved count)
    const onLeave = leaves.filter(l => l.status === 'Approved').length;

    const stats = [
        { name: 'Total Employees', value: employees.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Active Today', value: employees.length - onLeave, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'On Leave', value: onLeave, icon: CalendarOff, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Pending Leaves', value: pendingLeaves, icon: CheckSquare, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    HR Dashboard
                </h2>
                <p className="mt-1 text-sm text-gray-500">Overview of your organization's workforce.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.name} className="overflow-hidden relative group hover:shadow-md transition-shadow">
                            <CardContent className="p-5 flex items-center">
                                <div className={`rounded-md p-3 ${stat.bg}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                                    </dl>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {employees.length === 0 && (
                <div className="mt-8 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center relative bg-white">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No employees yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Share the signup link with your team to get started. Data will appear here once employees register.
                    </p>
                </div>
            )}
        </div>
    );
}
