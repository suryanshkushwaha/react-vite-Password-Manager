# PassOP MongoDB Version

A full-stack password manager with MongoDB backend for cross-device password synchronization.

Live Demo: [https://password-manager-mongodb-sk.vercel.app](https://password-manager-mongodb-sk.vercel.app)

## Table of Contents
- [Features](#features)
- [Live Deployments](#live-deployments)
- [Prerequisites](#prerequisites-for-local-development)
- [Local Development Setup](#local-development-setup)
- [Production Deployment](#production-deployment)
  - [Backend Deployment](#backend-deployment-rendercom)
  - [Frontend Deployment](#frontend-deployment-vercel)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Contributing](#contributing)
- [Environment Variables Setup](#environment-variables-setup)
- [Common Issues](#common-issues)

## Features
- 📊 MongoDB database for data persistence
- 🔄 Cross-device synchronization
- 🌐 RESTful API
- 🔒 Secure password storage
- ☁️ Cloud deployment with [Vercel](https://vercel.com) (frontend) and [Render](https://render.com) (backend)

## Live Deployments
- Frontend: [https://password-manager-mongodb-sk.vercel.app](https://password-manager-mongodb-sk.vercel.app)
- Backend: [https://react-vite-password-manager.onrender.com/](https://react-vite-password-manager.onrender.com/)

## Prerequisites for Local Development
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally (for local development)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for production)

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/passop-mongo.git
cd passop-mongo
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory for frontend:
```env
VITE_API_URL=http://localhost:3000
```

4. Navigate to the backend directory and install backend dependencies:
```bash
cd backend
npm install
# or
yarn install
```

5. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_uri_here
PORT=3000
```

6. Start the backend server:
```bash
npm start
# or
yarn start
```

7. In a new terminal, navigate back to the root directory and start the frontend:
```bash
cd ..
npm run dev
# or
yarn dev
```

8. Open your browser and navigate to `http://localhost:5173`

## Production Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: Will be automatically set by Render

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Create a new project on Vercel
3. Import your GitHub repository
4. Add environment variables:
   - `VITE_API_URL`: Your Render.com backend URL
5. Deploy!

## API Endpoints

Base URL: `[Your-Render-URL].onrender.com` or `http://localhost:3000` (local development)

- `GET /` - Retrieve all passwords
- `POST /` - Add new password
- `PUT /` - Update existing password
- `DELETE /` - Delete a password
- `DELETE /deleteAll` - Delete all passwords

## Dependencies

### Frontend
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications for React
- [UUID](https://github.com/uuidjs/uuid) - For generating unique identifiers
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

### Backend
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [CORS](https://github.com/expressjs/cors) - Express middleware for enabling CORS
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management

## Cloud Services
- [Vercel](https://vercel.com/) - Frontend Deployment Platform
- [Render](https://render.com/) - Backend Deployment Platform
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database Service

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables Setup

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000  # For local development
VITE_API_URL=https://your-app.onrender.com  # For production
```

### Backend (.env)
```env
MONGO_URI=your_mongodb_uri_here
PORT=3000  # Only needed for local development
```

## Common Issues

1. **Connection Issues**: Verify that your MongoDB Atlas connection string is correct and the IP whitelist includes your deployment addresses.
2. **Port Conflicts**: The backend port will be automatically assigned by Render in production, but make sure port 3000 is available for local development.
3. **Environment Variables**: Ensure that your environment variables are correctly set in both frontend and backend `.env` files.