import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { toast } from 'sonner';

export function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'HR' | 'Employee'>('Employee');

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const { employees, addEmployee } = useEmployeeStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (employees.some(emp => emp.email === email)) {
            toast.error('Email already exists');
            return;
        }

        const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            role,
            department: role === 'HR' ? 'Human Resources' : 'Engineering', // Default for demo
            dateJoined: new Date().toISOString()
        };

        addEmployee(newUser);
        login(newUser);

        toast.success('Account created successfully');

        if (role === 'HR') navigate('/admin');
        else navigate('/employee');
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className={`p-3 border rounded-lg text-sm font-medium transition-colors ${role === 'HR' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setRole('HR')}
                        >
                            HR Admin
                        </button>
                        <button
                            type="button"
                            className={`p-3 border rounded-lg text-sm font-medium transition-colors ${role === 'Employee' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setRole('Employee')}
                        >
                            Employee
                        </button>
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Create Account
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                    Sign in instead
                </Link>
            </div>
        </form>
    );
}
