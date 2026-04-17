const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');
const bcrypt = require('bcryptjs');

dotenv.config();

const sampleProducts = [
  // Fish Medicines
  {
    name: 'API Melafix Fish Remedy',
    category: 'Fish Medicines',
    description: 'All-natural antibacterial treatment for bacterial infections in fish. Helps repair damaged fins and heal open wounds.',
    price: 599,
    images: [{ url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'API Melafix' }],
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    isFeatured: true
  },
  {
    name: 'Seachem Paraguard',
    category: 'Fish Medicines',
    description: 'Broad-spectrum treatment for external parasites and fungal infections. Safe for use with all fish and plants.',
    price: 849,
    images: [{ url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Seachem Paraguard' }],
    stock: 35,
    rating: 4.8,
    numReviews: 95
  },
  {
    name: 'Tetra Lifeguard All-In-One Treatment',
    category: 'Fish Medicines',
    description: 'Complete treatment for bacterial, fungal, parasitic, and viral diseases. Dissolvable tablets for easy dosing.',
    price: 449,
    images: [{ url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Tetra Lifeguard' }],
    stock: 60,
    rating: 4.3,
    numReviews: 76
  },

  // Aquarium Tanks
  {
    name: 'Fluval Flex 57L Aquarium Kit',
    category: 'Aquarium Tanks',
    description: 'Curved-front 57-liter aquarium with integrated 3-stage filtration and LED lighting system. Includes pump and filter media.',
    price: 15999,
    images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Fluval Flex' }],
    stock: 10,
    rating: 4.9,
    numReviews: 45,
    isFeatured: true
  },
  {
    name: 'Juwel Rio 125 LED Aquarium',
    category: 'Aquarium Tanks',
    description: '125-liter aquarium with high-quality cabinet, powerful filtration system, and energy-efficient LED lighting.',
    price: 34999,
    images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Juwel Rio' }],
    stock: 5,
    rating: 4.7,
    numReviews: 32
  },
  {
    name: 'Marina 20L Nano Aquarium Kit',
    category: 'Aquarium Tanks',
    description: 'Compact 20-liter starter kit perfect for small spaces. Includes LED hood, filter, and basic accessories.',
    price: 3999,
    images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Marina Nano' }],
    stock: 25,
    rating: 4.4,
    numReviews: 89
  },

  // Filters
  {
    name: 'Fluval FX6 Canister Filter',
    category: 'Filters',
    description: 'High-performance canister filter for large aquariums up to 1500L. Multi-stage filtration with 1300 L/H flow rate.',
    price: 18999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Fluval FX6' }],
    stock: 8,
    rating: 4.9,
    numReviews: 67,
    isFeatured: true
  },
  {
    name: 'Eheim Classic 250 Canister Filter',
    category: 'Filters',
    description: 'German-engineered external canister filter. Reliable and energy-efficient with 5-year warranty.',
    price: 9999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Eheim Classic' }],
    stock: 12,
    rating: 4.8,
    numReviews: 54
  },
  {
    name: 'AquaClear 110 Power Filter',
    category: 'Filters',
    description: 'Hang-on-back power filter with adjustable flow. 3-stage customizable filtration for aquariums up to 380L.',
    price: 5499,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'AquaClear 110' }],
    stock: 20,
    rating: 4.6,
    numReviews: 112
  },

  // Heaters
  {
    name: 'Eheim Jager 100W Heater',
    category: 'Heaters',
    description: 'Precision German-made aquarium heater with automatic temperature control. Shatterproof glass construction.',
    price: 2999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Eheim Jager' }],
    stock: 30,
    rating: 4.8,
    numReviews: 143
  },
  {
    name: 'Fluval E300 Advanced Heater',
    category: 'Heaters',
    description: 'Electronic heater with digital temperature display. Dual temperature sensors for accurate control.',
    price: 4599,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Fluval E300' }],
    stock: 15,
    rating: 4.7,
    numReviews: 89,
    isFeatured: true
  },
  {
    name: 'Aqueon Pro 150W Heater',
    category: 'Heaters',
    description: 'Adjustable submersible heater with shatter-resistant casing. LED indicator for easy monitoring.',
    price: 1799,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Aqueon Pro' }],
    stock: 45,
    rating: 4.4,
    numReviews: 156
  },

  // Fish Foods
  {
    name: 'TetraMin Tropical Flakes',
    category: 'Fish Foods',
    description: 'Complete nutrition for tropical fish. Advanced formula with added vitamins and minerals.',
    price: 399,
    images: [{ url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'TetraMin Flakes' }],
    stock: 100,
    rating: 4.6,
    numReviews: 234
  },
  {
    name: 'Hikari Bio-Gold Plus',
    category: 'Fish Foods',
    description: 'Premium sinking pellets for goldfish. Enhanced with natural color enhancers and digestible ingredients.',
    price: 599,
    images: [{ url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Hikari Bio-Gold' }],
    stock: 75,
    rating: 4.9,
    numReviews: 167,
    isFeatured: true
  },
  {
    name: 'Ocean Nutrition Brine Shrimp',
    category: 'Fish Foods',
    description: 'Frozen brine shrimp for all marine and freshwater fish. Rich in protein and natural nutrients.',
    price: 299,
    images: [{ url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Ocean Nutrition' }],
    stock: 200,
    rating: 4.7,
    numReviews: 198
  },

  // Aquarium Lights
  {
    name: 'Fluval Plant 3.0 LED Light',
    category: 'Aquarium Lights',
    description: 'Full-spectrum LED light with customizable settings via Bluetooth app. Promotes plant growth and enhances colors.',
    price: 15999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Fluval Plant 3.0' }],
    stock: 7,
    rating: 4.9,
    numReviews: 43,
    isFeatured: true
  },
  {
    name: 'NICREW Classic LED Light',
    category: 'Aquarium Lights',
    description: 'Energy-efficient LED light with extendable brackets. Perfect for freshwater fish and low-light plants.',
    price: 2499,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'NICREW Classic' }],
    stock: 40,
    rating: 4.5,
    numReviews: 312
  },

  // Planted Tank Lights
  {
    name: 'Chihiros WRGB II Pro',
    category: 'Planted Tank Lights',
    description: 'Professional-grade RGB LED light for planted aquariums. Full spectrum with adjustable color channels.',
    price: 24999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Chihiros WRGB' }],
    stock: 5,
    rating: 5.0,
    numReviews: 28,
    isFeatured: true
  },
  {
    name: 'Twinstar 600S LED Light',
    category: 'Planted Tank Lights',
    description: 'Sleek, ultra-slim LED light designed specifically for planted tanks. Excellent light penetration and color rendering.',
    price: 12999,
    images: [{ url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', alt: 'Twinstar 600S' }],
    stock: 8,
    rating: 4.8,
    numReviews: 36
  }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@aquaworld.com',
    password: 'admin123',
    phone: '9876543210',
    address: {
      street: '123 Admin Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543211',
    address: {
      street: '456 Customer Road',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '9876543212',
    address: {
      street: '789 Aquarium Lane',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data');

    // Hash passwords for users
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`Created ${createdUsers.length} users`);

    // Insert products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} products`);

    // Create sample orders
    const sampleOrders = [
      {
        user: createdUsers[1]._id,
        items: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].name,
            price: createdProducts[0].price,
            quantity: 2,
            image: createdProducts[0].images[0].url
          },
          {
            product: createdProducts[3]._id,
            name: createdProducts[3].name,
            price: createdProducts[3].price,
            quantity: 1,
            image: createdProducts[3].images[0].url
          }
        ],
        shippingAddress: createdUsers[1].address,
        paymentMethod: 'COD',
        subtotal: createdProducts[0].price * 2 + createdProducts[3].price,
        totalAmount: createdProducts[0].price * 2 + createdProducts[3].price,
        orderStatus: 'Delivered'
      },
      {
        user: createdUsers[2]._id,
        items: [
          {
            product: createdProducts[1]._id,
            name: createdProducts[1].name,
            price: createdProducts[1].price,
            quantity: 1,
            image: createdProducts[1].images[0].url
          }
        ],
        shippingAddress: createdUsers[2].address,
        paymentMethod: 'COD',
        subtotal: createdProducts[1].price,
        totalAmount: createdProducts[1].price,
        orderStatus: 'Processing'
      }
    ];

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`Created ${createdOrders.length} orders`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();