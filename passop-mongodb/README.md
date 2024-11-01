# PassOP MongoDB Version

A full-stack password manager with MongoDB backend for cross-device password synchronization.

Live Demo: [https://password-manager-mongodb-sk.vercel.app](https://password-manager-mongodb-sk.vercel.app)

## Features

- 📊 MongoDB database for data persistence
- 🔄 Cross-device synchronization
- 🌐 RESTful API
- 🔒 Secure password storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed and running
- MongoDB URI

## Installation

1. Clone the repository and navigate to the PassOP-MongoDB directory:
```bash
cd passop-mongo
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Navigate to the backend directory and install backend dependencies:
```bash
cd backend
npm install
# or
yarn install
```

4. Create a `.env` file in the backend directory with your MongoDB URI:
```env
MONGODB_URI=your_mongodb_uri_here
PORT=3000
```

5. Start the backend server:
```bash
npm start
# or
yarn start
```

6. In a new terminal, navigate back to the root directory and start the frontend:
```bash
cd ..
npm run dev
# or
yarn dev
```

7. Open your browser and navigate to `http://localhost:5173`


## API Endpoints

- `GET /` - Retrieve all passwords
- `POST /` - Add new password
- `PUT /` - Update existing password
- `DELETE /` - Delete a password
- `DELETE /deleteAll` - Delete all passwords

## Dependencies

### Frontend
- React
- Tailwind CSS
- React Toastify
- UUID
- Vite

### Backend
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request