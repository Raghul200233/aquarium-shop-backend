const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const testEmail = 'admin@aquaworld.com';
    const testPassword = 'admin123';

    // Find user with password field
    const user = await User.findOne({ email: testEmail }).select('+password');
    
    if (!user) {
      console.log('❌ User not found:', testEmail);
      process.exit(1);
    }

    console.log('✅ User found:');
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Stored password hash:', user.password);

    // Test password comparison
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log('\n🔐 Password test with bcrypt.compare():', isMatch ? '✅ MATCH' : '❌ MISMATCH');

    // Test using the model method
    const isMatchMethod = await user.comparePassword(testPassword);
    console.log('🔐 Password test with user.comparePassword():', isMatchMethod ? '✅ MATCH' : '❌ MISMATCH');

    if (!isMatch) {
      console.log('\n⚠️  Password mismatch! Generating new hash for you to copy:');
      
      // Generate a new hash for reference
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(testPassword, salt);
      console.log('New hash for "admin123":', newHash);
      console.log('\nCopy this hash and update in MongoDB if needed');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testLogin();