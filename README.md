# 🎓 College Management System (HR Module)

A modern, full-featured HR management web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## ✨ Features

### 👨‍💼 Employee Features
- ✅ **View Assigned Tasks** - See tasks assigned by HR with priority levels and due dates
- ✅ **Mark Tasks Complete** - Update task status as you progress
- ✅ **Request New Tasks** - Submit task requests for HR to review and assign
- ✅ **Apply for Leaves** - Request time off with leave type, dates, and reason
- ✅ **Track Requests** - View status of submitted applications (Pending/Approved/Rejected)
- ✅ **Dashboard** - Quick overview of metrics and status

### 👔 HR/Admin Features
- ✅ **Assign Tasks** - Create and assign tasks to employees with priority and due dates
- ✅ **Review Task Requests** - Approve or reject employee task requests
- ✅ **Manage Leaves** - Review, approve, or reject leave requests from employees
- ✅ **Employee Management** - View and manage employee information
- ✅ **Task Tracking** - Monitor all assigned tasks and their completion status
- ✅ **Analytics** - View dashboards with key metrics

## 🏗️ Architecture

```
src/
├── components/       # Reusable UI components
│   ├── layout/      # Login, Dashboard, Sidebar layouts
│   └── ui/          # Button, Card, Input, Badge components
├── pages/           # Page components
│   ├── admin/       # HR/Admin pages (Tasks, Leaves, Overview, Employees)
│   └── employee/    # Employee pages (Tasks, Leaves, Team, Overview)
├── store/           # Zustand stores (state management)
│   ├── useAuthStore           # Authentication state
│   ├── useTaskStore           # Task management
│   ├── useTaskRequestStore    # Employee task requests
│   ├── useLeaveStore          # Leave requests
│   └── useEmployeeStore       # Employee data
├── types/           # TypeScript types
└── lib/             # Utility functions
```

## 🚀 Deployment

### Quick Deploy Options:

1. **Vercel** (Easiest)
   - Connect GitHub repo → Auto deploys
   - Domain: `your-project.vercel.app`

2. **Netlify**
   - Connect GitHub repo → Auto deploys
   - Domain: `your-project.netlify.app`

3. **GitHub Pages**
   - Already configured with GitHub Actions
   - Domain: `username.github.io/repo-name`

4. **Docker**
   - Dockerfile included
   - Ready for any cloud platform

📖 **See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for detailed deployment instructions**

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 4.2
- **State Management**: Zustand 5.0
- **UI Icons**: Lucide React
- **Notifications**: Sonner
- **Routing**: React Router 7.13

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/college-management.git
cd college-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Default Credentials

### Login as HR:
- **Email**: `hr@college.com`
- **Password**: `password`

### Login as Employee:
- **Email**: `employee@college.com`
- **Password**: `password`

## 📝 Usage Workflow

### For Employees:
1. Login with employee credentials
2. View dashboard with overview
3. Check assigned tasks and complete them
4. Request new tasks or leave
5. Track status of requests

### For HR:
1. Login with HR credentials
2. View all employees and their data
3. Assign tasks directly to employees
4. Review pending task requests from employees
5. Approve/reject leave applications
6. View analytics and reports

## 🔄 Task Assignment Workflow

```
Employee → Requests Task
           ↓
HR Reviews Request
           ↓
HR Approves/Rejects
           ├→ Approved: Task created and assigned
           └→ Rejected: Request marked as rejected
           ↓
Employee Sees Task & Completes It
```

## 💾 Data Storage

**Current Implementation**: Browser localStorage
- Data persists across sessions
- Data lost if browser cache is cleared

**For Production**: Implement backend with database
- Recommended: Node.js + MongoDB/PostgreSQL
- Add proper authentication (JWT)
- Enable HTTPS

## 🎨 UI Components

- **Card** - Container component
- **Button** - Interactive button with variants
- **Input** - Text input component
- **Label** - Form label component
- **Badge** - Status badges (success, danger, warning, info)

## 🔌 State Management (Zustand)

```typescript
// Example: useTaskStore
const tasks = useTaskStore((state) => state.tasks);
const addTask = useTaskStore((state) => state.addTask);
const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
```

## 📱 Responsive Design

- Mobile-first design
- Tailwind CSS responsive classes
- Fully responsive on all devices
  - Mobile (< 640px)
  - Tablet (640px - 1024px)
  - Desktop (> 1024px)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in package.json dev script or use:
npm run dev -- --port 5174
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

### Data Not Persisting
- Currently uses localStorage (browser memory)
- Check browser storage settings
- Use browser DevTools → Application → Local Storage

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real database
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-department support
- [ ] Performance reviews
- [ ] Attendance tracking
- [ ] Salary management
- [ ] Chat/Communication system
- [ ] Mobile app (React Native)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for effective HR management

---

## 📞 Quick Links

- [Deployment Guide](./DEPLOYMENT.md)
- [Quick Deploy](./QUICK_DEPLOY.md)
- [GitHub Repository](https://github.com/your-username/college-management)

---

**Ready to deploy?** Check [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for one-click deployment options!
