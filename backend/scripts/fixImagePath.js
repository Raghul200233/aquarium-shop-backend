const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../src/models/Product');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const fixImagePaths = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all products
    const products = await Product.find({ category: 'Fish Foods' });
    console.log(`Found ${products.length} fish food products`);

    let updatedCount = 0;

    for (const product of products) {
      if (product.images && product.images.length > 0) {
        const oldPath = product.images[0].url;
        
        // Fix the path - remove 'src' from the path
        let newPath = oldPath.replace('/src/assets/', '/assets/');
        
        // If it doesn't have the correct format, set it properly
        if (!newPath.startsWith('/assets/')) {
          // Extract just the filename
          const filename = oldPath.split('/').pop();
          newPath = `/assets/fish_foods/${filename}`;
        }

        console.log(`\nProduct: ${product.name}`);
        console.log(`Old path: ${oldPath}`);
        console.log(`New path: ${newPath}`);

        // Update the product
        product.images[0].url = newPath;
        await product.save();
        updatedCount++;
      }
    }

    console.log(`\n✅ Updated ${updatedCount} products with correct image paths`);

    // Show all updated paths
    console.log('\n📸 Current image paths in database:');
    const updatedProducts = await Product.find({ category: 'Fish Foods' });
    updatedProducts.forEach(p => {
      console.log(`${p.name}: ${p.images[0]?.url}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixImagePaths();