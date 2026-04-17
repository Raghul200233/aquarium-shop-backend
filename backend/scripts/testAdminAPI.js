const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const testAdminAPI = async () => {
  try {
    // First, login to get token
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@aquaworld.com',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token received');

    // Test stats endpoint
    console.log('\n2. Testing /api/admin/stats endpoint...');
    try {
      const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Stats endpoint working!');
      console.log('Stats data:', statsResponse.data);
    } catch (error) {
      console.error('❌ Stats endpoint failed:', error.response?.data || error.message);
    }

    // Test users endpoint
    console.log('\n3. Testing /api/admin/users endpoint...');
    try {
      const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Users endpoint working!');
      console.log(`Found ${usersResponse.data.count} users`);
    } catch (error) {
      console.error('❌ Users endpoint failed:', error.response?.data || error.message);
    }

    // Test orders endpoint
    console.log('\n4. Testing /api/admin/orders endpoint...');
    try {
      const ordersResponse = await axios.get('http://localhost:5000/api/admin/orders?limit=5', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Orders endpoint working!');
      console.log(`Found ${ordersResponse.data.count} orders`);
    } catch (error) {
      console.error('❌ Orders endpoint failed:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
};

testAdminAPI();