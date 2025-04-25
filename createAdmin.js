const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI ;

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // First, delete any existing admin user with this email
    await User.deleteOne({ email: 'meghnakorimi@gmail.com' });

    // Create admin user
    const admin = await User.create({
      name: 'Vice Precident',
      email: 'vp-approval@woxsen.edu.in',
      password: 'VPapproval@123',
      role: 'admin',
      phone: '1234567890',
    });

    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
