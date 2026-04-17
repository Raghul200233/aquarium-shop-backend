const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const checkUserRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin user
    const admin = await User.findOne({ email: 'admin@aquaworld.com' });
    
    if (admin) {
      console.log('✅ Admin user found:');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Name:', admin.name);
      
      if (admin.role !== 'admin') {
        console.log('⚠️  User role is not admin! Updating to admin...');
        admin.role = 'admin';
        await admin.save();
        console.log('✅ User role updated to admin');
      } else {
        console.log('✅ User already has admin role');
      }
    } else {
      console.log('❌ Admin user not found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkUserRole();