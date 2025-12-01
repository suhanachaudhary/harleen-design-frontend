# Harveen Designs - Frontend

1. Copy this repo.
2. Create .env with REACT_APP_API_BASE_URL set to your backend (e.g. http://localhost:3000)
3. Install:
   npm install
4. Run:
   npm start
5. Build:
   npm run build
6. Admin
   email:akshachaudhary212@gmail.com
   psw:123456   

Notes:
- Ensure backend is running and CORS allows this frontend origin.
- The front uses localStorage for tokens; for production consider secure cookies.
- Axios interceptor will attempt to refresh access token automatically when a 401 occurs using endpoint POST /api/auth/refresh (body: { refreshToken }).
