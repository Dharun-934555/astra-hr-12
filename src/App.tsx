import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthLayout } from './components/layout/AuthLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { AdminOverview } from './pages/admin/Overview';
import { AdminEmployeeList } from './pages/admin/EmployeeList';
import { AdminTasks } from './pages/admin/Tasks';
import { AdminLeaves } from './pages/admin/Leaves';
import { EmployeeOverview } from './pages/employee/Overview';
import { EmployeeTasks } from './pages/employee/Tasks';
import { EmployeeLeaves } from './pages/employee/Leaves';
import { EmployeeTeam } from './pages/employee/Team';
import { useAuthStore } from './store/useAuthStore';

// Protected Route Component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole: 'HR' | 'Employee' }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={user.role === 'HR' ? '/admin' : '/employee'} replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Redirect root to appropriate dashboard or login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="HR">
            <DashboardLayout role="HR" />
          </ProtectedRoute>
        }>
          <Route index element={<AdminOverview />} />
          <Route path="employees" element={<AdminEmployeeList />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="leaves" element={<AdminLeaves />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={
          <ProtectedRoute allowedRole="Employee">
            <DashboardLayout role="Employee" />
          </ProtectedRoute>
        }>
          <Route index element={<EmployeeOverview />} />
          <Route path="tasks" element={<EmployeeTasks />} />
          <Route path="leaves" element={<EmployeeLeaves />} />
          <Route path="team" element={<EmployeeTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
