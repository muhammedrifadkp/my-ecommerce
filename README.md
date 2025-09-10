# Al MASHHOUR E-commerce Website

A premium e-commerce platform for luxury dry fruits and nuts, built with Next.js, Node.js, Express, and MongoDB, featuring exclusive product categories, shopping cart functionality, and WhatsApp checkout integration.

## Live Demo

- Frontend: [https://al-mashhour.vercel.app](https://al-mashhour.vercel.app)
- Backend: [https://al-mashhour-api.onrender.com](https://al-mashhour-api.onrender.com)

## Features

- **Product Categories**: Browse products by Premium Dry Fruits, Nuts & Seeds, and Dates & Exotic Items categories
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
al-mashhour/
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
   git clone https://github.com/muhammedrifadkp/al-mashhour.git
   cd al-mashhour
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
     NEXT_PUBLIC_SITE_NAME=Al MASHHOUR
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

After setting up, you can access the Al MASHHOUR Admin Panel at:
- Local: http://localhost:3000/admin/login
- Production: https://al-mashhour.vercel.app/admin/login

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
