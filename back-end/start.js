import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';
import { spawn } from 'child_process';

// Load environment variables
dotenv.config();

const execPromise = promisify(exec);

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

// Function to check if admin users exist
async function needsAdminSeeding() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if there are any admin users
    const collections = await mongoose.connection.db.listCollections().toArray();
    const adminCollectionExists = collections.some(col => col.name === 'admins');

    if (!adminCollectionExists) {
      console.log('Admin collection does not exist');
      return true;
    }

    const adminsCount = await mongoose.connection.db.collection('admins').countDocuments();
    console.log(`Found ${adminsCount} admin users in the database`);

    // Need admin seeding if there are no admins
    return adminsCount === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return true; // Assume seeding needed on error to be safe
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Function to run admin seed script
async function runAdminSeed() {
  try {
    console.log('Running admin seed script...');
    const { stdout: adminOutput, stderr: adminError } = await execPromise('node seedAdmin.js');
    console.log('Admin seed output:', adminOutput);
    if (adminError) console.error('Admin seed error:', adminError);

    console.log('Admin seeding completed successfully');
  } catch (error) {
    console.error('Error running admin seed script:', error);
  }
}

// Function to start the server
function startServer() {
  console.log('Starting server...');
  const server = spawn('node', ['server.js'], { stdio: 'inherit' });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    server.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    server.kill('SIGTERM');
  });
}

// Main function
async function main() {
  console.log('Checking if admin user needs to be created...');
  const needsAdmin = await needsAdminSeeding();

  if (needsAdmin) {
    console.log('No admin users found, creating admin user...');
    await runAdminSeed();
  } else {
    console.log('Admin user already exists, skipping admin seeding');
  }

  // Start the server
  startServer();
}

// Run the main function
main().catch(console.error);
