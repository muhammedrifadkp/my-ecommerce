# Development Environment Setup Guide

This guide will help you set up your development environment to work with the e-commerce website, where the frontend is hosted on Vercel and the backend runs locally.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## Backend Setup (Local)

1. Navigate to the back-end directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the back-end directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/ecommerce
   PORT=5000
   JWT_SECRET=your_secret_key
   CORS_ORIGIN=https://my-ecommerce-two-phi.vercel.app
   ```

4. Seed the admin user (if needed):
   ```bash
   npm run seed-admin
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   The backend should now be running on http://localhost:5000

## Connecting Vercel Frontend to Local Backend

To connect your Vercel-hosted frontend to your local backend, you need to make your local backend accessible from the internet. Here are two options:

### Option 1: Use ngrok (Recommended for Development)

1. Install ngrok:
   ```bash
   npm install -g ngrok
   ```

2. Start your backend server:
   ```bash
   cd back-end
   npm start
   ```

3. In a new terminal, start ngrok to expose your local server:
   ```bash
   ngrok http 5000
   ```

4. Ngrok will provide a public URL (e.g., https://abc123.ngrok.io)

5. Update your Vercel environment variables:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Update NEXT_PUBLIC_API_URL to your ngrok URL
   - Redeploy your frontend

### Option 2: Deploy Backend to a Hosting Service

For a more permanent solution, consider deploying your backend to a hosting service like Render or Heroku.

## Testing the Connection

1. Visit your Vercel frontend: https://my-ecommerce-two-phi.vercel.app
2. Open the browser developer tools (F12)
3. Check the Network tab to ensure API requests are successfully connecting to your backend
4. Try to browse products, add items to cart, and test the admin functionality

## Troubleshooting

### CORS Issues

If you see CORS errors in the console:

1. Make sure your backend CORS configuration is correct:
   ```javascript
   const corsOptions = {
     origin: process.env.CORS_ORIGIN || 'https://my-ecommerce-two-phi.vercel.app',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true
   };
   ```

2. Ensure the CORS_ORIGIN in your .env file doesn't have a trailing slash

### Connection Issues

If the frontend can't connect to the backend:

1. Verify your backend is running
2. Check that the NEXT_PUBLIC_API_URL is correctly set
3. If using ngrok, make sure the tunnel is active
4. Test the API endpoint directly in a browser or with a tool like Postman

## Admin Access

After setting up, you can access the admin panel at:
https://my-ecommerce-two-phi.vercel.app/admin/login

Use the credentials created by the seed-admin script:
- Admin ID: rifadkp
- Password: rifadkp123
