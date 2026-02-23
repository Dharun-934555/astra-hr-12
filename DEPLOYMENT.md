# College Management System - Deployment Guide

## Overview
This is a React + TypeScript + Vite web application for college HR management. It supports employee and HR features.

## Deployment Options

### 1. **Vercel (Recommended - Easiest)**

#### Steps:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Select "Vite" as the framework
6. Click Deploy

**Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`

#### After Deployment:
Your site will be live at `https://your-project.vercel.app`

---

### 2. **Netlify**

#### Steps:
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "New site from Git"
4. Connect your GitHub account
5. Select your repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click Deploy

#### After Deployment:
Your site will be live at `https://your-site-name.netlify.app`

---

### 3. **GitHub Pages**

#### Steps:
1. Update `vite.config.ts` to add base path:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react(), tailwindcss()],
})
```

2. Run build: `npm run build`

3. Create GitHub Actions workflow file `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. Enable GitHub Pages in repository settings (set source to gh-pages branch)

#### After Deployment:
Your site will be live at `https://your-username.github.io/your-repo-name`

---

### 4. **Docker + Any Server**

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t college-hr .
docker run -p 3000:3000 college-hr
```

---

### 5. **Traditional Web Server (Nginx/Apache)**

1. Build the app: `npm run build`
2. Upload the `dist` folder to your server
3. Configure your web server to serve the `dist` folder

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/html/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Features

### Employee Features:
- ✅ **Apply for Leaves**: Request leave with date range and reason
- ✅ **View Assigned Tasks**: See tasks assigned by HR
- ✅ **Mark Tasks Complete**: Update task status
- ✅ **Request New Tasks**: Submit task requests for HR to review
- ✅ **View Task Requests**: Track status of submitted requests

### HR Features:
- ✅ **Assign Tasks**: Create and assign tasks to employees
- ✅ **Review Task Requests**: View and approve/reject employee task requests
- ✅ **Approve Leaves**: Review and manage employee leave requests
- ✅ **View Reports**: Monitor employee tasks and performance
- ✅ **Employee Management**: View and manage employee information

---

## Environment Variables

Create a `.env` file (optional):
```env
VITE_API_BASE_URL=your_api_url_if_needed
```

---

## Testing Before Deployment

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Security Recommendations

1. **Use HTTPS**: Enable HTTPS on your deployment
2. **Environment variables**: Use `.env` files for sensitive data (not committed to git)
3. **Authentication**: Add proper backend authentication
4. **Data Storage**: Currently uses browser localStorage; consider using a real backend database
5. **Backend API**: Replace mock data with a real backend API

---

## Support & Troubleshooting

- **Port already in use**: Change port in package.json dev script
- **Build fails**: Run `npm install` and ensure Node.js 16+ is installed
- **Blank page after deploy**: Check base path in vite.config.ts
- **Data not persisting**: Current app uses localStorage; data is lost on browser clear

---

## Next Steps

1. Set up a backend API (Node.js, Python, etc.)
2. Add database (MongoDB, PostgreSQL, etc.)
3. Implement proper authentication/authorization
4. Add more features based on requirements
