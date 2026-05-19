# Requirements & Dependencies

## System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **PostgreSQL**: 12.0 or higher (or Supabase)
- **Git**: 2.30.0 or higher
- **RAM**: Minimum 2GB
- **Disk Space**: Minimum 500MB

## Backend Dependencies

### Production Dependencies
```
@prisma/client: ^6.19.3          - ORM for database operations
bcrypt: ^6.0.0                   - Password hashing
cors: ^2.8.6                     - Cross-Origin Resource Sharing
dotenv: ^17.4.2                  - Environment variable management
express: ^5.2.1                  - Web framework
jsonwebtoken: ^9.0.3             - JWT authentication
prisma: ^6.19.3                  - Database toolkit
```

### Development Dependencies
```
nodemon: ^3.1.14                 - Auto-restart server during development
```

### Installation
```bash
cd backend
npm install
```

## Frontend Dependencies

### Production Dependencies
```
@tailwindcss/vite: ^4.3.0        - Tailwind CSS Vite plugin
axios: ^1.16.1                   - HTTP client
react: ^19.2.6                   - UI library
react-dom: ^19.2.6               - React DOM binding
react-router-dom: ^7.15.1        - Client-side routing
recharts: ^3.8.1                 - Charting library
tailwindcss: ^4.3.0              - CSS utility framework
```

### Development Dependencies
```
@eslint/js: ^10.0.1              - ESLint configuration
@types/react: ^19.2.14           - TypeScript types for React
@types/react-dom: ^19.2.3        - TypeScript types for ReactDOM
@vitejs/plugin-react: ^6.0.1     - Vite React plugin
eslint: ^10.3.0                  - Code linter
eslint-plugin-react-hooks: ^7.1.1
eslint-plugin-react-refresh: ^0.5.2
globals: ^17.6.0
vite: ^8.0.12                    - Build tool
```

### Installation
```bash
cd frontend
npm install
```

## Database Setup

### PostgreSQL (Self-Hosted)
1. Install PostgreSQL 12+
2. Create a new database:
   ```sql
   CREATE DATABASE result_analysis;
   ```
3. Get connection string:
   ```
   postgresql://username:password@localhost:5432/result_analysis
   ```

### Supabase (Recommended - Cloud)
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from project settings
4. Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres?sslmode=require`

## Environment Setup

### Backend .env
```
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_secret_key_at_least_32_characters"
PORT=5000
NODE_ENV="development"
```

### Frontend .env
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Installation & Setup Steps

### 1. Clone Repository
```bash
git clone https://github.com/Ajay-phx7/result-analysis.git
cd result-analysis
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev
npm run seed  # Optional: populate sample data
npm run dev   # Start development server
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env if needed (optional)
npm run dev   # Start development server
```

## Verification Checklist

- [ ] Node.js version 18+
- [ ] npm version 9+
- [ ] PostgreSQL/Supabase database setup
- [ ] `.env` files created and configured
- [ ] `npm install` completed for both backend and frontend
- [ ] Database migrations run: `npx prisma migrate dev`
- [ ] Database seeded: `npm run seed` (optional)
- [ ] Backend server starts: `npm run dev` (port 5000)
- [ ] Frontend server starts: `npm run dev` (port 5173)
- [ ] Login page loads at http://localhost:5173

## Available Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run seed         # Seed database with sample data
npx prisma studio   # Open Prisma Studio GUI
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Production Deployment

### Prerequisites
- Production database (PostgreSQL/Supabase)
- Environment variables configured
- Node.js 18+ on server

### Steps
1. Build frontend: `npm run build` (creates dist/ folder)
2. Set NODE_ENV=production
3. Deploy backend with proper database connection
4. Serve frontend dist/ with web server (Nginx/Apache)
5. Ensure CORS is properly configured

## Troubleshooting

### Port 5000 Already in Use
```bash
# Use different port
PORT=5001 npm run dev
```

### Database Connection Failed
- Verify DATABASE_URL format
- Check network connectivity to database
- Ensure database user has proper permissions

### Prisma Migration Issues
```bash
npx prisma migrate resolve --rolled-back migration_name
npx prisma migrate dev --name init
```

### Dependencies Conflict
```bash
rm -rf node_modules package-lock.json
npm install
```

## Performance Considerations

- **Frontend Build**: ~5-10 seconds (Vite optimized)
- **Backend Startup**: ~2-3 seconds
- **Database Query**: <100ms (with proper indexes)
- **CGPA Calculation**: <50ms (with caching)

## Security Notes

1. **JWT_SECRET**: Use strong, randomly generated string (32+ chars)
2. **Passwords**: Bcrypt hashing with 10 rounds
3. **Database**: Use SSL connections (sslmode=require)
4. **CORS**: Restrict to frontend domain in production
5. **.env**: Never commit .env files to version control

## Support & Documentation

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Last Updated**: May 20, 2026
