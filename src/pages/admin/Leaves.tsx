import React from 'react';
import { useLeaveStore } from '../../store/useLeaveStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CalendarOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLeaves() {
    const leaves = useLeaveStore((state) => state.leaves);
    const updateLeaveStatus = useLeaveStore((state) => state.updateLeaveStatus);

    const handleStatusUpdate = (id: string, status: 'Approved' | 'Rejected') => {
        updateLeaveStatus(id, status);
        toast.success(`Leave request ${status.toLowerCase()}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900">Leave Requests</h2>
                <p className="mt-1 text-sm text-gray-500">Review and manage employee leave applications.</p>
            </div>

            <Card className="overflow-hidden">
                {leaves.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Details</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leaves.map((leave) => (
                                    <tr key={leave.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                                            <div className="text-sm text-gray-500">Applied: {new Date(leave.appliedOn).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 font-medium">{leave.type}</div>
                                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{leave.reason}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{new Date(leave.fromDate).toLocaleDateString()}</div>
                                            <div>to {new Date(leave.toDate).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={
                                                leave.status === 'Approved' ? 'success' :
                                                    leave.status === 'Rejected' ? 'danger' : 'warning'
                                            }>
                                                {leave.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {leave.status === 'Pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-2"
                                                        onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                                                        title="Approve"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 px-2"
                                                        onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                                                        title="Reject"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Resolved</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <CalendarOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No leave requests submitted yet.</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-sm">
                            When employees apply for time off, their requests will appear here for you to review and approve.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
}
