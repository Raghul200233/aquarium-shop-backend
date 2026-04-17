const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const fixAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin user
    const admin = await User.findOne({ email: 'admin@aquaworld.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('Creating new admin user...');
      
      // Create new admin if doesn't exist
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const newAdmin = await User.create({
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
      
      console.log('✅ New admin created with ID:', newAdmin._id);
      console.log('Email: admin@eliteaquarium.com');
      console.log('Password: Admin@123456');
      
      process.exit(0);
    }

    console.log('✅ Found admin user:', admin.email);
    console.log('Current role:', admin.role);

    // Method 1: Update using pre-save hook (recommended)
    admin.password = 'Admin@123456'; // This will trigger the pre-save hook
    await admin.save();
    console.log('✅ Password updated using pre-save hook');

    // Verify the password
    const verifyUser = await User.findOne({ email: 'admin@eliteaquarium.com' }).select('+password');
    const isMatch = await verifyUser.comparePassword('admin123');
    
    if (isMatch) {
      console.log('✅ Password verification: SUCCESS - Login will work now!');
    } else {
      console.log('❌ Password verification: FAILED - Trying direct hash method...');
      
      // Method 2: Direct hash update (fallback)
      const salt = await bcrypt.genSalt(10);
      const directHash = await bcrypt.hash('Admin@123456', salt);
      
      await User.updateOne(
        { email: 'admin@eliteaquarium.com' },
        { $set: { password: directHash } }
      );
      
      console.log('✅ Password updated with direct hash');
      
      // Verify again
      const finalVerify = await User.findOne({ email: 'admin@aquaworld.com' }).select('+password');
      const finalMatch = await finalVerify.comparePassword('admin123');
      console.log('Final verification:', finalMatch ? '✅ SUCCESS' : '❌ FAILED');
    }

    // Show all users for reference
    const allUsers = await User.find({}).select('email role');
    console.log('\n📊 All users in database:');
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixAdminPassword();