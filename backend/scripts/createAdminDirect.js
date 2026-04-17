const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const createAdminDirect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get direct access to the collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // First, delete any existing admin
    console.log('📝 Deleting existing admin users...');
    await usersCollection.deleteMany({ email: 'admin@eliteaquarium.com' });
    console.log('✅ Deleted existing admins');

    // Create a password hash manually
    console.log('📝 Creating password hash...');
    const password = 'Admin@123456';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Generated hash:', hashedPassword);
    console.log('Hash length:', hashedPassword.length);

    // Insert admin directly into collection
    console.log('📝 Inserting new admin...');
    const result = await usersCollection.insertOne({
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

    console.log('✅ Admin inserted with ID:', result.insertedId);

    // Verify the password works
    console.log('\n📊 VERIFYING ADMIN:');
    const verifyAdmin = await usersCollection.findOne({ email: 'admin@eliteaquarium.com' });
    
    if (verifyAdmin) {
      console.log('✅ Admin found in database');
      console.log('Email:', verifyAdmin.email);
      console.log('Role:', verifyAdmin.role);
      console.log('Stored hash:', verifyAdmin.password);
      
      // Test the password
      const isValid = await bcrypt.compare(password, verifyAdmin.password);
      console.log('Password verification:', isValid ? '✅ SUCCESS' : '❌ FAILED');
      
      if (isValid) {
        console.log('\n🎉 ADMIN READY!');
        console.log('Email: admin@eliteaquarium.com');
        console.log('Password: Admin@123456');
        
        // Also test with the model to see if model method works
        const User = require('../src/models/User');
        const modelUser = await User.findOne({ email: 'admin@eliteaquarium.com' }).select('+password');
        if (modelUser) {
          const modelCheck = await modelUser.comparePassword(password);
          console.log('Model method check:', modelCheck ? '✅ WORKS' : '❌ FAILS');
        }
      } else {
        console.log('❌ Password verification failed');
        
        // Try with a simpler password
        console.log('\n📝 Trying with simpler password...');
        const simplePassword = 'admin123';
        const simpleSalt = await bcrypt.genSalt(10);
        const simpleHash = await bcrypt.hash(simplePassword, simpleSalt);
        
        await usersCollection.updateOne(
          { email: 'admin@eliteaquarium.com' },
          { $set: { password: simpleHash } }
        );
        
        const simpleVerify = await usersCollection.findOne({ email: 'admin@eliteaquarium.com' });
        const simpleCheck = await bcrypt.compare(simplePassword, simpleVerify.password);
        console.log('Simple password check:', simpleCheck ? '✅ SUCCESS' : '❌ FAILED');
        
        if (simpleCheck) {
          console.log('\n⚠️  Using simpler password:');
          console.log('Email: admin@eliteaquarium.com');
          console.log('Password: admin123');
        }
      }
    } else {
      console.log('❌ Failed to find admin after insertion');
    }

    // List all users
    console.log('\n📊 All users in database:');
    const allUsers = await usersCollection.find({}).toArray();
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdminDirect();