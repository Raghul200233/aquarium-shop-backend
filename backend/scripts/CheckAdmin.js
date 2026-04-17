const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@aquaworld.com' }).select('+password');
    
    if (admin) {
      console.log('✅ Admin user found:');
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Password hash exists:', !!admin.password);
      
      // Test password comparison
      const testPassword = 'admin123';
      const isMatch = await admin.comparePassword(testPassword);
      console.log('Password "admin123" matches:', isMatch);
    } else {
      console.log('❌ Admin user not found!');
    }

    // List all users
    const allUsers = await User.find({}).select('email role');
    console.log('\nAll users in database:');
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkAdmin();