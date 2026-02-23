import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { toast } from 'sonner';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const employees = useEmployeeStore((state) => state.employees);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check HR fallback if no employees exist yet and user logs in as test@hr.com
        if (email === 'admin@astrahr.com' && password === 'password') {
            login({
                id: 'hr-admin-1',
                name: 'Super Admin',
                email: 'admin@astrahr.com',
                role: 'HR',
                dateJoined: new Date().toISOString()
            });
            navigate('/admin');
            return;
        }

        const user = employees.find((emp) => emp.email === email);

        if (user && password === 'password123') { // Simple mock password check
            login(user);
            if (user.role === 'HR') navigate('/admin');
            else navigate('/employee');
        } else {
            toast.error('Invalid email or password', { description: 'Please check your credentials and try again.' });
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
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
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">
                Sign in
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
                Not registered yet?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                    Create an account
                </Link>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-xs text-center text-gray-500">
                    For demo purposes: Use <span className="font-medium">admin@astrahr.com</span> / <span className="font-medium">password</span> for HR Admin access if no accounts exist.
                </p>
            </div>
        </form>
    );
}
