const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users
    const users = await User.find({}).select('-password');
    
    console.log('\n📊 REGISTERED USERS:');
    console.log('====================');
    
    if (users.length === 0) {
      console.log('No users found in database');
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Address:`);
        console.log(`     Street: ${user.address?.street}`);
        console.log(`     City: ${user.address?.city}`);
        console.log(`     State: ${user.address?.state}`);
        console.log(`     Pincode: ${user.address?.pincode}`);
        console.log(`     Country: ${user.address?.country}`);
        console.log(`   Registered: ${new Date(user.createdAt).toLocaleString()}`);
      });
      
      console.log(`\n✅ Total Users: ${users.length}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkUsers();