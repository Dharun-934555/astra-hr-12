import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLeaveStore } from '../../store/useLeaveStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Badge } from '../../components/ui/Badge';
import { toast } from 'sonner';
import { CalendarOff } from 'lucide-react';
import type { LeaveRequest } from '../../types';

export function EmployeeLeaves() {
    const user = useAuthStore((state) => state.user);
    const leaves = useLeaveStore((state) => state.leaves).filter(l => l.employeeId === user?.id);
    const addLeave = useLeaveStore((state) => state.addLeave);

    const [type, setType] = useState('Sick Leave');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (new Date(fromDate) > new Date(toDate)) {
            toast.error('End date cannot be before start date');
            return;
        }

        const newRequest: LeaveRequest = {
            id: `leave-${Date.now()}`,
            employeeId: user.id,
            employeeName: user.name,
            type,
            fromDate,
            toDate,
            reason,
            status: 'Pending',
            appliedOn: new Date().toISOString()
        };

        addLeave(newRequest);
        toast.success('Leave request submitted successfully');

        // Reset form
        setType('Sick Leave');
        setFromDate('');
        setToDate('');
        setReason('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900">Apply Leave</h2>
                <p className="mt-1 text-sm text-gray-500">Request time off and view your leave history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>New Leave Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Leave Type</Label>
                                <select
                                    id="type"
                                    name="type"
                                    title="Leave Type"
                                    aria-label="Leave Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Annual Leave">Annual Leave</option>
                                    <option value="Unpaid Leave">Unpaid Leave</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fromDate">From</Label>
                                    <Input
                                        id="fromDate"
                                        type="date"
                                        required
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="toDate">To</Label>
                                    <Input
                                        id="toDate"
                                        type="date"
                                        required
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason</Label>
                                <textarea
                                    id="reason"
                                    required
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                    placeholder="Why do you need time off?"
                                />
                            </div>

                            <Button type="submit" className="w-full mt-2">Submit Request</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    {leaves.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied On</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {leaves.map((leave) => (
                                        <tr key={leave.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{leave.type}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 mt-1">{leave.reason}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(leave.appliedOn).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={
                                                    leave.status === 'Approved' ? 'success' :
                                                        leave.status === 'Rejected' ? 'danger' : 'warning'
                                                }>
                                                    {leave.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center h-full flex flex-col items-center justify-center">
                            <CalendarOff className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No leave requests</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                You haven't requested any time off yet.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
