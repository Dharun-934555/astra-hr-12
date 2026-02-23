import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { useTaskRequestStore } from '../../store/useTaskRequestStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Badge } from '../../components/ui/Badge';
import { toast } from 'sonner';
import { CheckSquare, CheckCircle2, Clock, X } from 'lucide-react';
import { Task } from '../../types';

export function AdminTasks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

    const employees = useEmployeeStore((state) => state.employees).filter(e => e.role === 'Employee');
    const tasks = useTaskStore((state) => state.tasks);
    const addTask = useTaskStore((state) => state.addTask);
    const taskRequests = useTaskRequestStore((state) => state.taskRequests);
    const updateRequestStatus = useTaskRequestStore((state) => state.updateRequestStatus);
    const { user } = useAuthStore();

    const pendingRequests = taskRequests.filter(r => r.status === 'Pending');

    const handleAssignTask = (e: React.FormEvent) => {
        e.preventDefault();

        if (!employeeId) {
            toast.error('Please select an employee');
            return;
        }

        const newTask: Task = {
            id: `task-${Date.now()}`,
            employeeId,
            title,
            description,
            dueDate,
            priority,
            status: 'Pending',
            assignedBy: user?.id || 'HR',
            assignedOn: new Date().toISOString()
        };

        addTask(newTask);
        toast.success('Task assigned successfully');

        // Reset form
        setTitle('');
        setDescription('');
        setEmployeeId('');
        setDueDate('');
        setPriority('Medium');
    };

    const handleApproveRequest = (requestId: string, empId: string, reqTitle: string, reqDescription: string) => {
        // Show date picker modal or directly create task with default date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // Default 7 days

        const newTask: Task = {
            id: `task-${Date.now()}`,
            employeeId: empId,
            title: reqTitle,
            description: reqDescription,
            dueDate: dueDate.toISOString().split('T')[0],
            priority: 'Medium',
            status: 'Pending',
            assignedBy: user?.id || 'HR',
            assignedOn: new Date().toISOString()
        };

        addTask(newTask);
        updateRequestStatus(requestId, 'Approved');
        toast.success('Task request approved and assigned to employee');
    };

    const handleRejectRequest = (requestId: string) => {
        updateRequestStatus(requestId, 'Rejected');
        toast.success('Task request rejected');
    };

    const getAssigneeName = (empId: string) => {
        return employees.find(e => e.id === empId)?.name || 'Unknown Employee';
    };

    const getEmployeeName = (empId: string) => {
        return employees.find(e => e.id === empId)?.name || 'Unknown Employee';
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900">Task Management</h2>
                <p className="mt-1 text-sm text-gray-500">Assign tasks to employees, review requests, and track progress.</p>
            </div>

            {/* Pending Task Requests Section */}
            {pendingRequests.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            Pending Task Requests ({pendingRequests.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-white rounded-lg border border-yellow-100"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{request.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                            <span>Requested by: <strong>{request.employeeName}</strong></span>
                                            <span>Category: {request.category}</span>
                                            <span>Date: {new Date(request.requestedOn).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleApproveRequest(request.id, request.employeeId, request.title, request.description)}
                                            className="bg-green-600 text-white hover:bg-green-700"
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleRejectRequest(request.id)}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Assign Task Form */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Assign New Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {employees.length === 0 ? (
                            <div className="text-center py-6 text-gray-500 text-sm">
                                No employees available to assign tasks. Wait for an employee to register.
                            </div>
                        ) : (
                            <form onSubmit={handleAssignTask} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="employee">Assign To</Label>
                                    <select
                                        id="employee"
                                        aria-label="Assign To Employee"
                                        title="Assign To Employee"
                                        required
                                        value={employeeId}
                                        onChange={(e) => setEmployeeId(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="" disabled>Select an employee</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Task Title</Label>
                                    <Input
                                        id="title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="E.g. Update monthly reports"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        placeholder="Task details..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dueDate">Due Date</Label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            required
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <select
                                            id="priority"
                                            aria-label="Task Priority"
                                            title="Task Priority"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full mt-2">Assign Task</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Existing Tasks List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>All Assigned Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasks.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tasks.map((task) => (
                                            <tr key={task.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{getAssigneeName(task.employeeId)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'info'}>
                                                        {task.priority}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={task.status === 'Completed' ? 'success' : 'default'}>
                                                        {task.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center h-full flex flex-col items-center justify-center">
                                <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks assigned</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    You haven't assigned any tasks yet. Use the form to assign tasks to employees.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
