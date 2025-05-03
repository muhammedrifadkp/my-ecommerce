# FreshMarket E-commerce Website

A modern e-commerce platform built with Next.js, Node.js, Express, and MongoDB, featuring product categories, shopping cart functionality, and WhatsApp checkout integration.

## Live Demo

- Frontend: [https://my-ecommerce-black.vercel.app](https://my-ecommerce-black.vercel.app)
- Backend: [https://my-ecommerce-production-11b0.up.railway.app](https://my-ecommerce-production-11b0.up.railway.app)

## Features

- **Product Categories**: Browse products by vegetables, fruits, and meat categories
- **Shopping Cart**: Add products to cart with quantity selection
- **User Accounts**: View order history and manage delivery information
- **Admin Panel**: Manage products and view orders
- **WhatsApp Integration**: Checkout process integrated with WhatsApp

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- React Context API for state management

### Backend
- Node.js
- Express
- MongoDB

## Project Structure

```
ecommerce-website/
├── front-end/         # Next.js frontend application
├── back-end/          # Express backend API
├── DEVELOPMENT_SETUP.md  # Guide for development setup
├── PRODUCTION_DEPLOYMENT.md  # Guide for production deployment
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/muhammedrifadkp/ecommerce-website.git
   cd ecommerce-website
   ```

2. Install all dependencies
   ```bash
   npm run install-all
   ```

3. Set up environment variables
   - Create `.env` file in the back-end directory with:
     ```
     MONGO_URI=mongodb://localhost:27017/ecommerce
     PORT=5000
     JWT_SECRET=your_secret_key
     CORS_ORIGIN=http://localhost:3000
     ```
   - Create `.env.local` file in the front-end directory with:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
     NEXT_PUBLIC_SITE_NAME=FreshMarket
     ```

4. Seed the admin user
   ```bash
   npm run seed-admin
   ```

5. Run the development servers
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## Admin Access

After setting up, you can access the admin panel at:
- Local: http://localhost:3000/admin/login
- Production: https://my-ecommerce-black.vercel.app/admin/login

Use the credentials created by the seed-admin script:
- Admin ID: admin
- Password: adm1n#54321

## Deployment

For detailed deployment instructions, see:
- [Development Setup Guide](DEVELOPMENT_SETUP.md) - For connecting Vercel frontend to local backend
- [Production Deployment Guide](PRODUCTION_DEPLOYMENT.md) - For deploying both frontend and backend to production

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to all contributors who have helped with this project
