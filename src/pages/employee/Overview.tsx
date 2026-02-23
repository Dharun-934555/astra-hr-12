import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useTaskStore } from '../../store/useTaskStore';
import { useLeaveStore } from '../../store/useLeaveStore';
import { Card, CardContent } from '../../components/ui/Card';
import { CheckSquare, CalendarOff, Clock } from 'lucide-react';

export function EmployeeOverview() {
    const user = useAuthStore((state) => state.user);
    const tasks = useTaskStore((state) => state.tasks).filter(t => t.employeeId === user?.id);
    const leaves = useLeaveStore((state) => state.leaves).filter(l => l.employeeId === user?.id);

    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;

    const stats = [
        { name: 'Pending Tasks', value: pendingTasks, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
        { name: 'Completed Tasks', value: completedTasks, icon: CheckSquare, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Pending Leaves', value: pendingLeaves, icon: CalendarOff, color: 'text-blue-600', bg: 'bg-blue-100' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Welcome back, {user?.name.split(' ')[0]}!
                </h2>
                <p className="mt-1 text-sm text-gray-500">Here's an overview of your tasks and requests.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.name} className="overflow-hidden hover:shadow-md transition-shadow">
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

            {tasks.length === 0 && leaves.length === 0 && (
                <div className="mt-8 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center bg-white">
                    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">You're all caught up!</h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
                        You don't have any tasks assigned by HR yet, and you haven't requested any time off.
                    </p>
                </div>
            )}
        </div>
    );
}
