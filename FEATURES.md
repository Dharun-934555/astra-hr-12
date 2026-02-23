# 🎯 Features Documentation

## Complete Feature Guide

### 📋 Task Management System

#### **1. Employee Task Requests** ⭐ NEW
Employees can now request tasks to be assigned to them.

**How it works:**
1. **Employee Dashboard** → Click "Request Task" button
2. Enter task details:
   - Task Title (required)
   - Description
   - Category (General, Development, Documentation, Testing, Support, Other)
3. Submit request
4. Status changes to "Pending"
5. HR reviews and approves/rejects

**View Submitted Requests:**
- Employees can see all their requests in "Your Task Requests" section
- Status indicators: Pending (yellow), Approved (green), Rejected (red)
- Can cancel pending requests

**Benefits:**
- Employees can self-assign work
- HR gets visibility into what employees need
- Reduces back-and-forth communication
- Better workload distribution

---

#### **2. HR Task Assignment** 
HR/Admin can assign tasks directly to employees.

**How to Assign:**
1. **HR Dashboard** → Go to "Task Management"
2. Fill "Assign New Task" form:
   - Select Employee
   - Enter Task Title
   - Write Description
   - Set Priority (Low, Medium, High)
   - Set Due Date
3. Click "Assign Task"
4. Employee receives task notification (via toast)

**Task Details:**
- Title & Description
- Priority level (affects badge color)
- Due date
- Status (Pending → Completed)

---

#### **3. Task Request Review Workflow** ⭐ NEW
HR reviews employee task requests.

**For HR:**
1. **"Pending Task Requests"** section at top of Tasks page
2. Shows:
   - Requested by (employee name)
   - Title & Description
   - Category
   - Request date
3. Click "Approve" → Task is created and assigned automatically
   - Default due date: 7 days from now
   - Priority: Medium
4. Click "Reject" → Request marked as rejected

**For Employees:**
- See request status in "Your Task Requests" section
- Approved requests appear as new tasks
- Receive toast notification when approved/rejected

---

### 🏖️ Leave Management System

#### **1. Apply for Leave**
Employees can request leave time off.

**How to Apply:**
1. **Employee Dashboard** → Go to "Leaves"
2. Click "Apply for Leave"
3. Fill form:
   - Leave Type (Sick Leave, Casual Leave, Annual Leave, Maternity Leave, etc.)
   - From Date & To Date
   - Reason
4. Submit
5. Status: "Pending"

**Key Features:**
- Date validation (end date cannot be before start date)
- Multiple leave types supported
- Reason tracking for approval
- Toast notifications for feedback

---

#### **2. HR Leave Management**
HR reviews and approves/rejects leave requests.

**For HR:**
1. **Admin Dashboard** → Go to "Leaves"
2. View all pending leave requests
3. Click "Approve" or "Reject"
4. Leave status updates

**Data Shown:**
- Employee name
- Leave type
- Date range
- Reason
- Current status
- Applied date

---

### 📊 Dashboard & Analytics

#### **1. Employee Dashboard**
Quick overview of employee's work.

**Shows:**
- Total assigned tasks
- Pending tasks count
- Completed tasks count
- Pending leave requests
- Upcoming due tasks

**Quick Actions:**
- View assigned tasks
- Request new task
- Apply for leave
- View leaf requests

---

#### **2. HR Dashboard**
Overview of company-wide metrics.

**Shows:**
- Total employees
- Active tasks
- Pending approvals (tasks + leaves)
- Leave requests status
- Employee list

**Quick Access:**
- Assign new task
- Review requests
- Manage employees
- View reports

---

### 👥 Employee Management

#### **For HR:**
- View all employees
- Filter by department
- See employee details:
  - Name & Email
  - Department
  - Role
  - Date joined
  - Number of assigned tasks
  - Pending leaves

#### **For Employees:**
- View team members
- See colleague information
- Team collaboration features

---

### 🔐 User Roles & Permissions

#### **Employee Role:**
- ✅ View own tasks
- ✅ Request new tasks
- ✅ Mark tasks complete
- ✅ Apply for leaves
- ✅ View own requests status
- ✅ View team members
- ❌ Cannot assign tasks
- ❌ Cannot approve requests
- ❌ Cannot manage other employees

#### **HR/Admin Role:**
- ✅ Assign tasks to employees
- ✅ Review task requests
- ✅ Approve/Reject requests
- ✅ Review leaves
- ✅ Approve/Reject leaves
- ✅ View all employees
- ✅ View all tasks
- ✅ Access analytics
- ✅ Manage employee data

---

## 🔄 Complete User Workflows

### **Workflow 1: Employee Requests Task → HR Assigns It**

```
1. Employee logs in
   ↓
2. Goes to "My Tasks" page
   ↓
3. Clicks "Request Task" button
   ↓
4. Fills form (title, description, category)
   ↓
5. Submits request
   ↓
6. Request appears in "Your Task Requests" (Status: Pending)
   ↓
7. Toast: "Task request submitted to HR"
   ↓
--------  HR Side  --------
8. HR logs in
   ↓
9. Goes to "Task Management"
   ↓
10. Sees "Pending Task Requests" section
    ↓
11. Reviews request details
    ↓
12. Clicks "Approve"
    ↓
13. System creates task with:
    - Title: From employee request
    - Description: From employee request
    - Assigned to: Employee
    - Due date: 7 days from now
    - Priority: Medium
    ↓
14. Request marked as "Approved"
    ↓
--------  Employee Side  --------
15. Employee sees new task appear in "Assigned Tasks"
    ↓
16. Toast: "Task request approved and assigned"
    ↓
17. Employee can now see and work on the task
```

### **Workflow 2: Employee Applies Leave → HR Approves It**

```
1. Employee logs in
   ↓
2. Goes to "Leaves" page
   ↓
3. Fills leave request form
   - Type: Sick Leave
   - From: 2026-02-25
   - To: 2026-02-27
   - Reason: Medical appointment
   ↓
4. Submits request
   ↓
5. Request appears in "My Leaves" (Status: Pending)
   ↓
6. Toast: "Leave request submitted successfully"
   ↓
--------  HR Side  --------
7. HR logs in
   ↓
8. Goes to "Leaves" section
   ↓
9. Sees pending leave request
   ↓
10. Reviews employee, dates, reason
    ↓
11. Clicks "Approve" or "Reject"
    ↓
12. Request status updates
    ↓
--------  Employee Side  --------
13. Employee sees updated status in "My Leaves"
    ↓
14. Toast notification of approval/rejection
```

### **Workflow 3: Direct Task Assignment (HR Initiates)**

```
1. HR logs in
   ↓
2. Goes to "Task Management"
   ↓
3. Fills "Assign New Task" form:
   - Employee: John Doe
   - Title: Update monthly reports
   - Description: Compile Q1 data...
   - Due Date: 2026-03-15
   - Priority: High
   ↓
4. Clicks "Assign Task"
   ↓
5. Task is created and assigned
   ↓
6. Task appears in HR's task list
   ↓
--------  Employee Side  --------
7. Employee sees new task in "Assigned Tasks"
   ↓
8. Task shows:
   - Red "High Priority" badge
   - Due date
   - Full description
   ↓
9. Employee can click "Mark Complete" when done
   ↓
10. Task status changes to "Completed"
    ↓
--------  HR Side  --------
11. HR sees updated task status
    ↓
12. Can track employee progress
```

---

## 💻 Technical Data Structures

### **TaskRequest Type**
```typescript
interface TaskRequest {
    id: string;                    // Unique identifier
    employeeId: string;            // Employee who requested
    employeeName: string;          // Employee display name
    title: string;                 // Task title
    description: string;           // Task details
    category: string;              // General, Development, etc.
    status: 'Pending' | 'Approved' | 'Rejected';
    requestedOn: string;           // ISO date string
    reviewedOn?: string;           // When approved/rejected
    reviewedBy?: string;           // HR ID who reviewed
}
```

### **Task Type**
```typescript
interface Task {
    id: string;
    employeeId: string;
    title: string;
    description: string;
    dueDate: string;               // ISO date string
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'Completed';
    assignedBy: string;            // HR ID
    assignedOn: string;            // ISO date string
}
```

### **LeaveRequest Type**
```typescript
interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    type: string;                  // Leave type
    fromDate: string;              // ISO date string
    toDate: string;                // ISO date string
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    appliedOn: string;             // ISO date string
}
```

---

## 🎨 UI/UX Features

### **Status Badges**
- **Pending**: Yellow (warning) - Awaiting approval
- **Approved**: Green (success) - Ready/Assigned
- **Rejected**: Red (danger) - Declined
- **Completed**: Green - Task finished

### **Priority Colors**
- **High**: Red badge
- **Medium**: Yellow badge
- **Low**: Blue badge

### **Toast Notifications**
- Success messages (green)
- Error messages (red)
- Info messages (blue)
- Auto-dismiss after 3 seconds

### **Interactive Elements**
- Expandable forms
- Inline approvals
- Quick action buttons
- Responsive tables
- Mobile-friendly layouts

---

## 🚀 Performance Features

- **Local Storage**: Instant data persistence
- **Optimistic Updates**: Instant UI feedback
- **Client-side Filtering**: Fast list management
- **Minified Production Build**: 340KB gzipped
- **Lazy Loading**: Load components on demand
- **Responsive Images**: Optimized for all devices

---

## 🔒 Security Considerations

**Current (Development):**
- localStorage (browser only)
- No backend validation
- Mock authentication

**For Production:**
- Add backend API authentication
- Use JWT tokens
- Validate data server-side
- Use HTTPS/TLS
- Add rate limiting
- Implement CORS properly
- Add input sanitization

---

## 📱 Mobile Responsiveness

All features work on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

Special mobile optimizations:
- Touch-friendly buttons
- Vertical layout for forms
- Collapsible navigation
- Readable text sizes
- Optimized spacing

---

## 📈 Analytics & Reporting

**Metrics Available:**
- Total tasks assigned
- Tasks completed
- Completion rate
- Pending tasks
- Leave balance
- Department statistics
- Employee productivity

**Coming Soon:**
- Custom reports
- Export to PDF/Excel
- Performance graphs
- Trend analysis
- Team comparisons

---

**Last Updated**: February 21, 2026
**Version**: 1.0.0 - Public Release
