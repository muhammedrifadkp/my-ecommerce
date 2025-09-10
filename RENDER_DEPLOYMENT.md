# Render Deployment Guide

This guide will help you deploy your e-commerce website backend to Render.

## Prerequisites

- GitHub account with your repository
- Render account (sign up at [render.com](https://render.com))
- MongoDB Atlas account (for database)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step 2: Set Up MongoDB Atlas

1. Create a MongoDB Atlas account if you don't have one
2. Create a new cluster (free tier is sufficient to start)
3. Set up database access:
   - Create a database user with a secure password
   - Add your IP to the IP access list (or allow access from anywhere for deployment)
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `ecommerce`

## Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `al-mashhour-api`
   - **Root Directory**: `back-end`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: `mongodb+srv://muhammedrifadkp3:merntest@tseepacademy.rxgap.mongodb.net/ecommerce`
     - `JWT_SECRET`: `XqU6R9CJgShZGOSnNjILPjlNhLv6Va78FvUBhJATj2M=`
     - `CORS_ORIGIN`: `https://al-mashhour.vercel.app`
5. Click "Create Web Service"
6. Wait for the deployment to complete
7. Note the URL of your deployed backend (e.g., `https://al-mashhour-api.onrender.com`)

## Step 4: Update Frontend Configuration

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add or update the following environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://al-mashhour-api.onrender.com`)
4. Redeploy your frontend

## Step 5: Seed Admin User

After deploying your backend to Render, you need to create the admin user:

1. Go to your Render dashboard
2. Select your backend service
3. Click on the "Shell" tab
4. Run the admin seed command:
   ```bash
   npm run seed-admin
   ```

## Step 6: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test the functionality:
   - Browse products by category
   - Add products to cart
   - Complete the checkout process
   - Test admin functionality at `/admin/login` with the credentials:
     - Admin ID: admin
     - Password: adm1n#54321

## Troubleshooting Render Deployment

### CORS Issues

If you see CORS errors in the browser console:
1. Check that the `CORS_ORIGIN` environment variable in your Render service is set correctly
2. Ensure your backend CORS configuration is using this environment variable
3. Verify that your frontend URL exactly matches what's in the CORS configuration

### MongoDB Connection Issues

If your backend can't connect to MongoDB:
1. Check that the `MONGODB_URI` environment variable is set correctly in Render
2. Ensure you've replaced `<password>` with your actual password
3. Verify that your IP is allowed in the MongoDB Atlas network access settings

### Frontend API Connection Issues

If your frontend can't connect to the backend:
1. Check that the `NEXT_PUBLIC_API_URL` environment variable is set correctly in Vercel
2. Ensure your backend is actually running on Render
3. Test the backend URL directly in a browser to see if it responds

### Render Free Tier Limitations

Remember that Render's free tier has some limitations:
1. Your service will spin down after 15 minutes of inactivity
2. The first request after inactivity will be slow as the service spins up
3. You have limited compute hours per month
