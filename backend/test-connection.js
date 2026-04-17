const mongoose = require('mongoose');

// Replace with your actual connection string (copy from MongoDB Atlas)
const MONGODB_URI = 'mongodb+srv://rahulsls332002_db_user:2w2vnZhrQDaWOjpO@cluster0.jklhxvi.mongodb.net/aquarium-shop?retryWrites=true&w=majority&appName=Cluster0';

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  process.exit(0);
})
.catch((error) => {
  console.error('❌ MongoDB Connection Error:');
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  
  if (error.message.includes('bad auth')) {
    console.log('\n🔍 Authentication error - Check:');
    console.log('1. Username is correct: rahulsls332002_db_user');
    console.log('2. Password is correct: 2w2vnZhrQDaWOjpO');
    console.log('3. Database user has access to aquarium-shop database');
  }
  
  if (error.message.includes('getaddrinfo')) {
    console.log('\n🔍 Network error - Check:');
    console.log('1. The cluster address is correct (cluster0.abc123.mongodb.net)');
    console.log('2. Your IP is whitelisted in MongoDB Atlas');
    console.log('3. You have internet connectivity');
  }
  
  process.exit(1);
});