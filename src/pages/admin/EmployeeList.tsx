import React, { useState } from 'react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useLeaveStore } from '../../store/useLeaveStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Users } from 'lucide-react';

export function AdminEmployeeList() {
    const [searchTerm, setSearchTerm] = useState('');
    const employees = useEmployeeStore((state) => state.employees).filter(e => e.role === 'Employee');
    const leaves = useLeaveStore((state) => state.leaves);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const isEmployeeOnLeave = (empId: string) => {
        // Basic check for approved leave
        return leaves.some(l => l.employeeId === empId && l.status === 'Approved');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">Employees</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage your team members and view their status.</p>
                </div>
                <div className="relative w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Card className="overflow-hidden">
                {filteredEmployees.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEmployees.map((person) => {
                                    const onLeave = isEmployeeOnLeave(person.id);
                                    return (
                                        <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                                        {person.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                        <div className="text-sm text-gray-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.department || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {onLeave ? (
                                                    <Badge variant="warning">On Leave</Badge>
                                                ) : (
                                                    <Badge variant="success">Active</Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(person.dateJoined).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No employees found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {employees.length === 0
                                ? "There are no registered employees in the system yet."
                                : "No employees matched your search criteria."}
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
}
