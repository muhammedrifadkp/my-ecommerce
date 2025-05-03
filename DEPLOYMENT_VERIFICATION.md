# Deployment Verification Guide

This guide will help you verify that your e-commerce website deployment is working correctly.

## Backend Verification (Render)

1. **Check the API Status**
   - Open your browser and navigate to: [https://my-ecommerce-cwjr.onrender.com](https://my-ecommerce-cwjr.onrender.com)
   - You should see a JSON response with a status message indicating the API is running

2. **Check Products API**
   - Navigate to: [https://my-ecommerce-cwjr.onrender.com/api/products](https://my-ecommerce-cwjr.onrender.com/api/products)
   - You should see a JSON response with your products data
   - If you haven't added any products yet, you might see an empty array

3. **Check Render Logs**
   - Go to your Render dashboard
   - Select your e-commerce project
   - Click on the "Logs" tab
   - Look for any errors or warnings
   - Verify that the admin user was created successfully

## Frontend Verification (Vercel)

1. **Check Frontend Connection to Backend**
   - Open your browser and navigate to: [https://my-ecommerce-black.vercel.app](https://my-ecommerce-black.vercel.app)
   - Open the browser developer tools (F12)
   - Go to the Network tab
   - Refresh the page
   - Look for API requests to your Railway backend
   - Verify that they are successful (status 200)

2. **Test Product Browsing**
   - Click on the different category links (Vegetables, Fruits, Meat)
   - Verify that products are loading correctly
   - If no products appear, you may need to add some through the admin panel

3. **Test Admin Login**
   - Navigate to: [https://my-ecommerce-black.vercel.app/admin/login](https://my-ecommerce-black.vercel.app/admin/login)
   - Log in with the admin credentials:
     - Username: admin
     - Password: adm1n#54321
   - Verify that you can access the admin dashboard
   - Try adding a new product to test the full functionality

## Troubleshooting Common Issues

### CORS Errors

If you see CORS errors in the browser console:

1. Verify that your backend CORS configuration is correct:
   ```javascript
   const corsOptions = {
     origin: [
       process.env.CORS_ORIGIN || 'https://my-ecommerce-black.vercel.app',
       'https://my-ecommerce-two-phi.vercel.app',
       'http://localhost:3000'
     ],
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true
   };
   ```

2. Check that the CORS_ORIGIN environment variable is set correctly in Railway

### API Connection Issues

If your frontend can't connect to the backend:

1. Verify that the NEXT_PUBLIC_API_URL environment variable in Vercel is set to:
   ```
   https://my-ecommerce-cwjr.onrender.com
   ```

2. Make sure the URL includes the `https://` protocol

3. Test the API directly in your browser to ensure it's responding

### MongoDB Connection Issues

If your backend can't connect to MongoDB:

1. Check the Railway logs for any MongoDB connection errors
2. Verify that the MONGODB_URI environment variable is set correctly in Railway
3. Ensure your MongoDB Atlas network access settings allow connections from Railway

## Next Steps After Verification

Once you've verified that your deployment is working correctly:

1. **Add Products**: Use the admin panel to add products to your store
2. **Test the Full User Flow**: Try adding products to cart and completing the checkout process
3. **Monitor Performance**: Keep an eye on Railway and Vercel dashboards for any issues
4. **Set Up Monitoring**: Consider setting up uptime monitoring for your backend
