# Campus Profile

Campus Profile is a full-stack student forum and profile management application. Students can create an account, maintain one detailed academic profile, review completion progress, update details, and remove the profile when needed.

## Stack

- Mobile: React Native, Expo, NativeWind, React Navigation, Axios, React Hook Form, Yup, AsyncStorage, Lucide icons
- API: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Project layout

```text
backend/   Express API with MVC folders
mobile/    Expo React Native application
```

## Backend setup

1. Create `backend/.env` from `backend/.env.example` and set a long random `JWT_SECRET`.
2. Ensure MongoDB is available locally, or replace `MONGO_URI` with a MongoDB Atlas connection string.
3. Install and start the API:

```bash
cd backend
npm install
npm run dev
```

The development server listens on `http://localhost:5000` by default. Check it with `GET /api/health`.

## Mobile setup

1. Install dependencies:

```bash
cd mobile
npm install
npx expo start
```

2. The default mobile API address in `mobile/src/services/api.js` is `http://10.0.2.2:5000/api`, which is correct for the Android emulator.
3. For an iOS simulator use `http://localhost:5000/api`. For a physical phone use your computer's LAN IP, such as `http://192.168.1.10:5000/api`.

## MongoDB

For a local instance, use the value from `.env.example` and run MongoDB before the API. MongoDB Compass can connect to the same URI for data inspection. For Atlas, create a database user, allow your development IP in Network Access, and place the Atlas URI in `MONGO_URI`.

## API

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Receive a JWT and safe user data |
| GET | `/api/auth/me` | Yes | Restore the signed-in user |
| POST | `/api/students` | Yes | Create the current user's profile |
| GET | `/api/students/me` | Yes | Retrieve the current user's profile |
| GET | `/api/students/:id` | Yes, owner | Retrieve a profile by ID |
| PUT | `/api/students/:id` | Yes, owner | Update a profile |
| DELETE | `/api/students/:id` | Yes, owner | Delete a profile |

Send protected requests with `Authorization: Bearer <token>`.

## Authentication and security

Passwords are hashed with bcryptjs and excluded from all responses. JWTs are read only from the authorization header by protected routes. Profile records are linked uniquely to one user, and the API checks ownership before reads by ID, updates, or deletes. Keep `.env` private; it is excluded by the repository `.gitignore`.
