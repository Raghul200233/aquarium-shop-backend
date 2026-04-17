const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const createFreshAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin
    await User.deleteOne({ email: 'admin@aquaworld.com' });
    console.log('✅ Deleted existing admin user');

    // Hash password properly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    // Create new admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@eliteaquarium.com',
      password: hashedPassword,
      phone: '9876543210',
      address: {
        street: '123 Admin Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      role: 'admin'
    });

    console.log('✅ New admin user created successfully!');
    console.log('Email: admin@eliteaquarium.com');
    console.log('Password: Admin@123');

    // Verify password works
    const verifyUser = await User.findOne({ email: 'admin@eliteaquarium.com' }).select('+password');
    const testPassword = 'Admin@123';
    const isValid = await verifyUser.comparePassword(testPassword);
    console.log('Password verification:', isValid ? '✅ WORKS!' : '❌ STILL FAILS');

    if (!isValid) {
      console.log('\n⚠️  Manual verification needed:');
      console.log('Try logging in with these exact credentials:');
      console.log('Email: admin@eliteaquarium.com');
      console.log('Password: Admin@123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createFreshAdmin();