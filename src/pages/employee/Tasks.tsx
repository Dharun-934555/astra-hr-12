import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useTaskStore } from '../../store/useTaskStore';
import { useTaskRequestStore } from '../../store/useTaskRequestStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { CheckSquare, CheckCircle2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { TaskRequest } from '../../types';

export function EmployeeTasks() {
    const user = useAuthStore((state) => state.user);
    const tasks = useTaskStore((state) => state.tasks).filter(t => t.employeeId === user?.id);
    const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
    
    const taskRequests = useTaskRequestStore((state) => state.taskRequests).filter(r => r.employeeId === user?.id);
    const addTaskRequest = useTaskRequestStore((state) => state.addTaskRequest);
    const deleteRequest = useTaskRequestStore((state) => state.deleteRequest);

    const [showRequestForm, setShowRequestForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');

    const handleComplete = (taskId: string) => {
        updateTaskStatus(taskId, 'Completed');
        toast.success('Task marked as completed!');
    };

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !title.trim()) {
            toast.error('Please enter a task title');
            return;
        }

        const newRequest: TaskRequest = {
            id: `treq-${Date.now()}`,
            employeeId: user.id,
            employeeName: user.name,
            title,
            description,
            category,
            status: 'Pending',
            requestedOn: new Date().toISOString()
        };

        addTaskRequest(newRequest);
        toast.success('Task request submitted to HR');

        // Reset form
        setTitle('');
        setDescription('');
        setCategory('General');
        setShowRequestForm(false);
    };

    const handleCancelRequest = (requestId: string) => {
        deleteRequest(requestId);
        toast.success('Request cancelled');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">My Tasks</h2>
                    <p className="mt-1 text-sm text-gray-500">View assigned tasks and request new ones.</p>
                </div>
                <Button
                    onClick={() => setShowRequestForm(!showRequestForm)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Request Task
                </Button>
            </div>

            {/* Task Request Form */}
            {showRequestForm && (
                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle>Request New Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitRequest} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Task Title *</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Complete project documentation"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>General</option>
                                    <option>Development</option>
                                    <option>Documentation</option>
                                    <option>Testing</option>
                                    <option>Support</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide details about the task..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Button
                                    type="button"
                                    onClick={() => setShowRequestForm(false)}
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Submit Request
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Assigned Tasks Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Tasks</h3>
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <Card key={task.id} className="flex flex-col">
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'info'}>
                                            {task.priority} Priority
                                        </Badge>
                                        <Badge variant={task.status === 'Completed' ? 'success' : 'default'}>
                                            {task.status}
                                        </Badge>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                                    <p className="text-sm text-gray-500 flex-1 mb-6 break-words">{task.description}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex items-center">
                                            <CheckSquare className="h-4 w-4 mr-1.5 text-gray-400" />
                                            Due {new Date(task.dueDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {task.status === 'Pending' && (
                                    <div className="px-6 pb-6 pt-0">
                                        <Button
                                            className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                                            onClick={() => handleComplete(task.id)}
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Mark Complete
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <CheckSquare className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No assigned tasks</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-sm">
                            Once HR assigns tasks, they'll appear here.
                        </p>
                    </Card>
                )}
            </div>

            {/* Task Requests Section */}
            {taskRequests.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Task Requests</h3>
                    <div className="space-y-4">
                        {taskRequests.map((request) => (
                            <Card key={request.id}>
                                <div className="p-6 flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-gray-900">{request.title}</h4>
                                            <Badge
                                                variant={
                                                    request.status === 'Approved'
                                                        ? 'success'
                                                        : request.status === 'Rejected'
                                                            ? 'danger'
                                                            : 'warning'
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                                        <div className="flex gap-4 text-xs text-gray-500">
                                            <span>Category: {request.category}</span>
                                            <span>Requested: {new Date(request.requestedOn).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {request.status === 'Pending' && (
                                        <Button
                                            onClick={() => handleCancelRequest(request.id)}
                                            className="bg-red-50 text-red-600 hover:bg-red-100 ml-4"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
