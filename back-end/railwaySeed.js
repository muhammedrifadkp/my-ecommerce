import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

// Load environment variables
dotenv.config();

const execPromise = promisify(exec);

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/ecommerce';

console.log('Starting Railway admin seeding script...');
console.log('Using MongoDB URI:', MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:****@')); // Hide password in logs

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
    return true;
  } catch (error) {
    console.error('Error running admin seed script:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Checking if admin user needs to be created...');
  const needsAdmin = await needsAdminSeeding();
  
  if (needsAdmin) {
    console.log('No admin users found, creating admin user...');
    const success = await runAdminSeed();
    if (success) {
      console.log('Admin user created successfully');
    } else {
      console.error('Failed to create admin user');
    }
  } else {
    console.log('Admin user already exists, skipping admin seeding');
  }
  
  // Disconnect from MongoDB
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  
  // Exit the process
  process.exit(0);
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error in main function:', error);
  process.exit(1);
});
