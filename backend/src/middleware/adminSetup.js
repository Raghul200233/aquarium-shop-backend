const User = require('../models/User');
const bcrypt = require('bcryptjs');

// This will run once when the server starts to ensure admin exists
const ensureAdminExists = async () => {
  try {
    // These should be stored in environment variables in production
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@eliteaquarium.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminName = process.env.ADMIN_NAME || 'Super Admin';

    // Check if admin exists
    const admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('⚠️  Admin user not found. Creating default admin...');
      
      // Create admin with strong password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        phone: '9876543210',
        address: {
          street: 'Admin Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          country: 'India'
        },
        role: 'admin',
        createdAt: new Date()
      });
      
      console.log('✅ Default admin created successfully!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      console.log('✅ Admin user verified');
      
      // Optional: Ensure admin has correct role
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log('✅ Admin role updated');
      }
    }
  } catch (error) {
    console.error('❌ Error ensuring admin exists:', error);
  }
};

module.exports = ensureAdminExists;