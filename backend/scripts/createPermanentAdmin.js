const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const createPermanentAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin credentials - CHANGE THESE TO YOUR PREFERRED CREDENTIALS
    const adminConfig = {
      email: 'admin@eliteaquarium.com',
      password: 'Admin@123456', // Strong password with special chars
      name: 'Super Admin',
      phone: '9876543210'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminConfig.email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Updating password...');
      
      // Update existing admin with new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(adminConfig.password, salt);
      
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('📝 Creating new admin user...');
      
      // Create new admin
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(adminConfig.password, salt);
      
      const admin = new User({
        name: adminConfig.name,
        email: adminConfig.email,
        password: hashedPassword,
        phone: adminConfig.phone,
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

      await admin.save();
      console.log('✅ New admin user created successfully!');
    }

    // Verify the admin works
    const verifyAdmin = await User.findOne({ email: adminConfig.email }).select('+password');
    const testLogin = await bcrypt.compare(adminConfig.password, verifyAdmin.password);
    
    console.log('\n📊 ADMIN VERIFICATION:');
    console.log('=======================');
    console.log('Email:', adminConfig.email);
    console.log('Password:', adminConfig.password);
    console.log('Login Test:', testLogin ? '✅ SUCCESSFUL' : '❌ FAILED');
    console.log('Role:', verifyAdmin.role);
    console.log('=======================');
    
    if (testLogin) {
      console.log('\n🎉 PERMANENT ADMIN IS READY!');
      console.log('Save these credentials securely:');
      console.log(`Email: ${adminConfig.email}`);
      console.log(`Password: ${adminConfig.password}`);
    } else {
      console.log('\n❌ Something went wrong. Please run the script again.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createPermanentAdmin();