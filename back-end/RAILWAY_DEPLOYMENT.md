# Railway Deployment Guide

This guide will help you deploy your backend to Railway.

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- GitHub repository with your code

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure all the changes are pushed to your GitHub repository:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create a New Project in Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Choose the "back-end" directory as the root directory

### 3. Set Environment Variables

In your Railway project, go to the "Variables" tab and add the following environment variables:

```
MONGO_URI=mongodb+srv://your-mongodb-atlas-connection-string
PORT=5000
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://my-ecommerce-two-phi.vercel.app
```

Replace the values with your actual MongoDB connection string, JWT secret, and frontend URL.

### 4. Deploy Your Application

1. Go to the "Deployments" tab
2. Click "Deploy Now"
3. Wait for the deployment to complete

### 5. Get Your Backend URL

Once deployed, Railway will provide you with a URL for your backend. It will look something like:
`https://your-app-name.up.railway.app`

### 6. Update Your Frontend

Update your Vercel frontend environment variables to use this new backend URL:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your Railway backend URL
4. Redeploy your frontend

### 7. Admin User Seeding

The admin user will be automatically created during deployment through the postinstall script. This happens in two ways:

1. **Automatic Seeding During Installation**:
   - When Railway installs dependencies, the postinstall script will run the admin seeding script
   - This creates the admin user if it doesn't already exist

2. **Automatic Seeding During Startup**:
   - The start.js script also checks for admin users when the server starts
   - If no admin user exists, it will create one

If you need to manually seed the admin user:

1. Go to your Railway project
2. Click on the "Shell" tab
3. Run the command:
```bash
npm run seed-admin
```

You can verify the admin user was created by checking the logs in the Railway dashboard.

The admin credentials are:
- Username: admin
- Password: adm1n#54321

## Troubleshooting

### Deployment Fails with "No start command found"

If you see this error, make sure:
1. Your package.json has a "start" script
2. You have a Procfile with "web: npm start"
3. You have a railway.json file with the correct configuration

### CORS Issues

If you encounter CORS errors:
1. Check that the CORS_ORIGIN environment variable is set correctly
2. Make sure there's no trailing slash in the URL
3. Verify that your backend CORS configuration is using this environment variable

### Database Connection Issues

If your app can't connect to MongoDB:
1. Check that the MONGO_URI environment variable is set correctly
2. Ensure your MongoDB Atlas cluster is properly configured to accept connections from Railway
3. Check Railway logs for any connection errors
