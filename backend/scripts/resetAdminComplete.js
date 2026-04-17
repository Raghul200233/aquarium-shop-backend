const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const resetAdminComplete = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // First, let's see what users exist
    console.log('\n📊 Current users in database:');
    const allUsers = await User.find({}).select('email role');
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    // Find ALL admin users with this email (including any duplicates)
    console.log('\n🔍 Searching for admin users...');
    const adminUsers = await User.find({ email: 'admin@eliteaquarium.com' });
    console.log(`Found ${adminUsers.length} user(s) with this email`);

    if (adminUsers.length > 0) {
      console.log('📝 Deleting ALL users with this email...');
      const deleteResult = await User.deleteMany({ email: 'admin@eliteaquarium.com' });
      console.log(`✅ Deleted ${deleteResult.deletedCount} users`);
    }

    // Double-check they're gone
    const checkAgain = await User.findOne({ email: 'admin@eliteaquarium.com' });
    if (checkAgain) {
      console.log('❌ User still exists! Forcing direct database operation...');
      
      // If still exists, use direct MongoDB operation
      const db = mongoose.connection.db;
      const usersCollection = db.collection('users');
      await usersCollection.deleteMany({ email: 'admin@eliteaquarium.com' });
      console.log('✅ Force deleted using direct MongoDB operation');
    }

    // Create new admin with a simpler approach
    console.log('\n📝 Creating new admin user...');
    
    // Use a simpler password first for testing
    const password = 'admin123'; // Simple password for now
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      name: 'Super Admin',
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
      role: 'admin',
      createdAt: new Date()
    });

    await newAdmin.save();
    console.log('✅ New admin created with simple password: admin123');

    // Now update to stronger password if needed
    console.log('\n📝 Updating to stronger password...');
    const strongerPassword = 'Admin@123456';
    const strongerSalt = await bcrypt.genSalt(12);
    const strongerHash = await bcrypt.hash(strongerPassword, strongerSalt);
    
    newAdmin.password = strongerHash;
    await newAdmin.save();
    console.log('✅ Password updated to: Admin@123456');

    // Verify the final admin
    console.log('\n📊 VERIFYING ADMIN:');
    const verifyAdmin = await User.findOne({ email: 'admin@eliteaquarium.com' }).select('+password');
    
    if (verifyAdmin) {
      console.log('✅ Admin found in database');
      console.log('Email:', verifyAdmin.email);
      console.log('Role:', verifyAdmin.role);
      console.log('Password hash exists:', !!verifyAdmin.password);
      
      // Test the password
      const testSimple = await bcrypt.compare('admin123', verifyAdmin.password);
      const testStrong = await bcrypt.compare('Admin@123456', verifyAdmin.password);
      
      console.log('Simple password (admin123) works:', testSimple ? '✅' : '❌');
      console.log('Strong password (Admin@123456) works:', testStrong ? '✅' : '❌');
      
      if (testStrong) {
        console.log('\n🎉 ADMIN READY!');
        console.log('Email: admin@eliteaquarium.com');
        console.log('Password: Admin@123456');
      } else if (testSimple) {
        console.log('\n⚠️  Only simple password works');
        console.log('Email: admin@eliteaquarium.com');
        console.log('Password: admin123');
      } else {
        console.log('\n❌ Password verification failed completely');
      }
    } else {
      console.log('❌ Failed to verify admin');
    }

    // List all users after creation
    console.log('\n📊 Final users in database:');
    const finalUsers = await User.find({}).select('email role');
    finalUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

resetAdminComplete();