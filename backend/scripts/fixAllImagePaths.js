const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../src/models/Product');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const fixAllImagePaths = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all products
    const products = await Product.find({});
    console.log(`Found ${products.length} total products`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      if (product.images && product.images.length > 0) {
        const oldPath = product.images[0].url;
        
        // Skip if it's already a data URL (starts with data:image)
        if (oldPath && oldPath.startsWith('data:image')) {
          console.log(`\n📸 Product: ${product.name}`);
          console.log(`   Data URL image (keeping as is)`);
          skippedCount++;
          continue;
        }

        // Skip if it's already a proper /assets path
        if (oldPath && oldPath.startsWith('/assets/')) {
          console.log(`\n📸 Product: ${product.name}`);
          console.log(`   Already correct: ${oldPath}`);
          skippedCount++;
          continue;
        }

        // Extract just the filename from various possible paths
        let filename = '';
        
        if (oldPath.includes('/')) {
          filename = oldPath.split('/').pop();
        } else {
          filename = oldPath;
        }

        // Determine correct folder based on category
        let folder = '';
        const category = product.category.toLowerCase();
        
        if (category.includes('fish food') || category.includes('food')) {
          folder = 'fish_foods';
        } else if (category.includes('medicine')) {
          folder = 'fish_medicine';
        } else if (category.includes('tank')) {
          folder = 'aquarium_tanks';
        } else if (category.includes('filter')) {
          folder = 'filters';
        } else if (category.includes('heater')) {
          folder = 'heaters';
        } else if (category.includes('light')) {
          folder = 'aquarium_lights';
        } else if (category.includes('live fish')) {
          folder = 'live_fishes';
        } else {
          folder = 'misc';
        }

        // Construct new path
        const newPath = `/assets/${folder}/${filename}`;
        
        console.log(`\n📸 Product: ${product.name}`);
        console.log(`   Category: ${product.category}`);
        console.log(`   Old path: ${oldPath}`);
        console.log(`   New path: ${newPath}`);

        // Update the product
        product.images[0].url = newPath;
        await product.save();
        updatedCount++;
      }
    }

    console.log('\n📊 SUMMARY:');
    console.log(`   Total products: ${products.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Skipped: ${skippedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixAllImagePaths();