# Result Analysis System

A full-stack web application for managing student grades, marks, and academic performance tracking. Built with React + Vite for frontend and Express.js + Prisma for backend.

## 📋 Features

- **Student Dashboard**: View current semester marks, CGPA, and SPGA
- **Semester History**: Track performance across all completed semesters
- **Failed Subjects Tracking**: Identify and monitor failed subjects
- **Teacher Dashboard**: Manage subjects, view students, and enter marks
- **Authentication**: Secure login for students and teachers
- **Performance Analytics**: Visual charts and SPGA/CGPA calculations
- **Previous Semester Reports**: Detailed modal view for historical data

## 🛠️ Tech Stack

### Frontend
- React 19.2.6
- Vite 8.0.12
- Tailwind CSS 4.3.0
- Recharts 3.8.1
- React Router 7.15.1
- Axios 1.16.1

### Backend
- Node.js with Express 5.2.1
- Prisma ORM 6.19.3
- PostgreSQL (via Supabase)
- JWT Authentication
- Bcrypt for password hashing

## 📁 Project Structure

```
result/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── markController.js
│   │   └── subjectController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── markRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── testRoutes.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── utils/
│   │   └── prisma.js
│   ├── server.js
│   ├── seeds.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── layout/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── TeacherDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── assets/
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Supabase recommended)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase database URL:
```env
DATABASE_URL="your_supabase_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

5. Run Prisma migrations:
```bash
npx prisma migrate dev
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API endpoint in `src/services/api.js` if needed (default: `http://localhost:5000`)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📊 Database Schema

### Students Table
- `id` (INT, Primary Key)
- `name` (String)
- `rollNo` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `department` (String)
- `semester` (INT)

### Teachers Table
- `id` (INT, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `subject` (String)
- `role` (String, Default: "teacher")

### Subjects Table
- `id` (INT, Primary Key)
- `subjectName` (String)
- `subjectCode` (String, Unique)
- `credits` (INT)
- `semester` (INT)
- `teacherId` (INT, Foreign Key)

### Marks Table
- `id` (INT, Primary Key)
- `studentId` (INT, Foreign Key)
- `subjectId` (INT, Foreign Key)
- `internalMarks` (INT)
- `externalMarks` (INT)
- `total` (INT)
- `grade` (String)

## 🔐 Test Credentials

### Students (All Passed)
- Email: `arjun.verma@student.edu` | Password: `studentpass` (Sem 1)
- Email: `pooja.nair@student.edu` | Password: `studentpass` (Sem 2)
- Email: `varun.reddy@student.edu` | Password: `studentpass` (Sem 3)
- Email: `aditya.maurya@student.edu` | Password: `studentpass` (Sem 4)

### Students (Failed Subjects)
- Email: `rohan.joshi@student.edu` | Password: `studentpass` (Sem 1 - Failed 1)
- Email: `kunal.singh@student.edu` | Password: `studentpass` (Sem 2 - Failed 1)
- Email: `diya.kapoor@student.edu` | Password: `studentpass` (Sem 3 - Failed 1)

### Teachers
- Email: `rajesh.kumar@school.edu` | Password: `password123`
- Email: `priya.singh@school.edu` | Password: `password123`
- Email: `amit.patel@school.edu` | Password: `password123`
- Email: `neha.gupta@school.edu` | Password: `password123`
- Email: `vikram.sharma@school.edu` | Password: `password123`

## 📝 Available API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Dashboard
- `GET /api/dashboard/student/:studentId` - Get student dashboard data
- `GET /api/dashboard/teacher/:teacherId` - Get teacher dashboard data

### Marks
- `GET /api/marks/student/:studentId` - Get student marks
- `POST /api/marks/add` - Add marks for a student
- `PUT /api/marks/update/:markId` - Update mark

### Subjects
- `GET /api/subjects/:semesterId` - Get subjects for semester
- `POST /api/subjects/add` - Add new subject

## 🎓 Features Details

### Student Dashboard
- View current semester marks with internal/external breakdown
- See SPGA (Semester Performance Grade Average)
- View CGPA (Cumulative GPA) across all semesters
- Track failed subjects with alerts
- Performance history chart showing SPGA trends
- Previous semester details modal with full breakdown
- Color-coded grades (A+, A, B, C, D, F)

### Teacher Dashboard
- Manage subjects and students
- Enter/update student marks
- View class performance analytics
- Track failed students in subjects

## 🔄 Database Seeding

Run the following command to populate the database with sample data:
```bash
npm run seed
```

This creates:
- 5 teachers
- 10 subjects (5 per semester)
- 16 students (4 per semester)
- 140 mark records with realistic grades

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
No build step needed. Deploy `backend/` directory directly.

## 🚨 Important Notes

1. **Environment Variables**: Never commit `.env` files. Use `.env.example` as template.
2. **Database**: Ensure Supabase database URL is correctly configured.
3. **CORS**: Backend allows requests from frontend origin (configured in server.js).
4. **Prisma**: Generate client after schema changes:
   ```bash
   npx prisma generate
   ```

## 🐛 Troubleshooting

### Port Already in Use
Change PORT in `.env` or use: `PORT=5001 npm run dev`

### Database Connection Error
- Verify DATABASE_URL in `.env`
- Ensure Supabase project is active
- Check network connectivity

### CORS Issues
- Verify frontend URL in backend CORS config
- Check if API calls use correct base URL

## 📄 License

ISC

## 👥 Contributors

- Ajay Singh

---

**Last Updated**: May 20, 2026
