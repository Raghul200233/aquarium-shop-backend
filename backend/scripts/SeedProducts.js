const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../src/models/Product');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// ========== HEATERS PRODUCTS ==========
const heaters = [
  {
    name: 'RS Electrical 25W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'Compact 25W submersible aquarium heater ideal for nano tanks and small aquariums up to 10 liters. Fully submersible with automatic temperature control.',
    price: 399,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-25W-Submersible-Heater-6.jpg', 
      alt: 'RS Electrical 25W Submersible Heater' 
    }],
    stock: 45,
    rating: 4.3,
    numReviews: 28,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '25W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks up to 10L',
      'Features': 'Automatic temperature control'
    }
  },
  {
    name: 'RS Electrical 50W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'Eco-friendly 50W submersible aquarium heater with automatic temperature control. Fully submersible design for efficient heating of small to medium tanks.',
    price: 549,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-50W-Submersible-Heater-.png', 
      alt: 'RS Electrical 50W Submersible Heater' 
    }],
    stock: 52,
    rating: 4.4,
    numReviews: 35,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '50W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 20-40L',
      'Features': 'Eco-friendly, automatic control'
    }
  },
  {
    name: 'RS Electrical 75W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'Reliable 75W submersible aquarium heater for medium-sized aquariums. Features automatic temperature regulation and durable construction.',
    price: 649,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-75W-Submersible-Heater.png', 
      alt: 'RS Electrical 75W Submersible Heater' 
    }],
    stock: 38,
    rating: 4.5,
    numReviews: 42,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '75W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 40-60L',
      'Features': 'Automatic temperature control'
    }
  },
  {
    name: 'RS Electrical 100W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'Powerful 100W submersible aquarium heater for medium to large tanks. Provides consistent and efficient heating for optimal fish health.',
    price: 749,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-100W-Submersible-Heater.png', 
      alt: 'RS Electrical 100W Submersible Heater' 
    }],
    stock: 65,
    rating: 4.6,
    numReviews: 51,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '100W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 60-80L',
      'Features': 'Automatic temperature control'
    }
  },
  {
    name: 'RS Electrical 100W Stainless Steel Heater',
    category: 'Heaters',
    description: 'Premium 100W stainless steel aquarium heater with model RS-399. Durable construction with corrosion-resistant stainless steel body for long-lasting performance.',
    price: 899,
    images: [{ 
      url: '/assets/heaters/RS-Electrical-100-W-Stainless-steel-Heater.jpg', 
      alt: 'RS Electrical 100W Stainless Steel Heater' 
    }],
    stock: 25,
    rating: 4.7,
    numReviews: 19,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '100W',
      'Type': 'Stainless Steel',
      'Model': 'RS-399',
      'Features': 'Corrosion resistant, durable'
    }
  },
  {
    name: 'RS Electrical 150W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'High-performance 150W submersible aquarium heater for larger tanks. Maintains stable temperature with automatic shut-off protection.',
    price: 849,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-150W-Submersible-Heater.png', 
      alt: 'RS Electrical 150W Submersible Heater' 
    }],
    stock: 32,
    rating: 4.5,
    numReviews: 37,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '150W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 80-120L',
      'Features': 'Auto shut-off'
    }
  },
  {
    name: 'RS Electrical 200W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'Powerful 200W submersible aquarium heater for large tanks. Fully submersible with automatic temperature regulation for consistent heating.',
    price: 949,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-200W-Submersible-Heater.png', 
      alt: 'RS Electrical 200W Submersible Heater' 
    }],
    stock: 28,
    rating: 4.6,
    numReviews: 33,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '200W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 120-180L',
      'Features': 'Automatic temperature control'
    }
  },
  {
    name: 'RS Electrical 200W Stainless Steel Heater',
    category: 'Heaters',
    description: 'Heavy-duty 200W stainless steel aquarium heater with CE certification. Ideal for large freshwater and marine aquariums.',
    price: 1199,
    images: [{ 
      url: '/assets/heaters/RS-Electrical-200W-Stainless-steel-Heater.jpg', 
      alt: 'RS Electrical 200W Stainless Steel Heater' 
    }],
    stock: 18,
    rating: 4.8,
    numReviews: 22,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '200W',
      'Type': 'Stainless Steel',
      'Certification': 'CE',
      'Origin': 'Made in China'
    }
  },
  {
    name: 'RS Electrical 300W Submersible Aquarium Heater',
    category: 'Heaters',
    description: 'High-wattage 300W submersible aquarium heater for extra-large tanks. Eco-friendly design with efficient heating performance.',
    price: 1099,
    images: [{ 
      url: '/assets/heaters/RS-ELECTRICAL-300W-Submersible-Heater.png', 
      alt: 'RS Electrical 300W Submersible Heater' 
    }],
    stock: 22,
    rating: 4.7,
    numReviews: 27,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '300W',
      'Type': 'Submersible',
      'Suitable For': 'Tanks 180-250L',
      'Features': 'Eco-friendly design'
    }
  },
  {
    name: 'RS Electrical 300W Stainless Steel Heater',
    category: 'Heaters',
    description: 'Professional-grade 300W stainless steel aquarium heater for large setups. Robust construction ensures long-lasting performance.',
    price: 1499,
    images: [{ 
      url: '/assets/heaters/RS-Electrical-300W-Stainless-steel-Heater.jpg', 
      alt: 'RS Electrical 300W Stainless Steel Heater' 
    }],
    stock: 15,
    rating: 4.8,
    numReviews: 16,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '300W',
      'Type': 'Stainless Steel',
      'Suitable For': 'Large tanks',
      'Features': 'Professional grade'
    }
  },
  {
    name: 'RS Electrical 500W Stainless Steel Heater',
    category: 'Heaters',
    description: 'Commercial-grade 500W stainless steel aquarium heater for very large tanks and ponds. Heavy-duty construction for reliable performance.',
    price: 1999,
    images: [{ 
      url: '/assets/heaters/RS-Electrical-500W-Stainless-steel-Heater.jpg', 
      alt: 'RS Electrical 500W Stainless Steel Heater' 
    }],
    stock: 10,
    rating: 4.9,
    numReviews: 12,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Wattage': '500W',
      'Type': 'Stainless Steel',
      'Suitable For': 'Extra-large tanks, ponds',
      'Features': 'Commercial grade'
    }
  },
  {
    name: 'Sobo 100W Stainless Steel Aquarium Heater',
    category: 'Heaters',
    description: 'Quality 100W stainless steel aquarium heater from Sobo. Features CE certification and durable 304 stainless steel construction.',
    price: 699,
    images: [{ 
      url: '/assets/heaters/Sobo-100W-stainless-Steel-Heater.jpg', 
      alt: 'Sobo 100W Stainless Steel Heater' 
    }],
    stock: 42,
    rating: 4.5,
    numReviews: 31,
    isFeatured: false,
    specifications: {
      'Brand': 'Sobo',
      'Wattage': '100W',
      'Type': 'Stainless Steel',
      'Material': '304 Stainless Steel',
      'Certification': 'CE'
    }
  },
  {
    name: 'Sobo 200W Stainless Steel Aquarium Heater',
    category: 'Heaters',
    description: 'Powerful 200W stainless steel aquarium heater model HC-200 from Sobo. Reliable heating for medium to large aquariums.',
    price: 899,
    images: [{ 
      url: '/assets/heaters/Sobo-200W-stainless-Steel-Heater.jpg', 
      alt: 'Sobo 200W Stainless Steel Heater' 
    }],
    stock: 35,
    rating: 4.6,
    numReviews: 28,
    isFeatured: true,
    specifications: {
      'Brand': 'Sobo',
      'Wattage': '200W',
      'Model': 'HC-200',
      'Type': 'Stainless Steel',
      'Certification': 'CE'
    }
  },
  {
    name: 'Sobo 300W Stainless Steel Aquarium Heater',
    category: 'Heaters',
    description: 'High-capacity 300W stainless steel aquarium heater model HC-300. Features anti-moisture and stainless steel freeze protection.',
    price: 1199,
    images: [{ 
      url: '/assets/heaters/Sobo-Stainless-Steel-Heater-3.jpg', 
      alt: 'Sobo 300W Stainless Steel Heater' 
    }],
    stock: 24,
    rating: 4.7,
    numReviews: 19,
    isFeatured: true,
    specifications: {
      'Brand': 'Sobo',
      'Wattage': '300W',
      'Model': 'HC-300',
      'Type': 'Stainless Steel',
      'Features': 'Anti-moisture, freeze protection'
    }
  }
];

// ========== FILTERS PRODUCTS - BluePet Series ==========
const filters = [
  // BluePet Internal Filters
  {
    name: 'BluePet BL-111F 20W Internal Aquarium Filter',
    category: 'Filters',
    description: 'BluePet BL-111F internal liquid filter with 20W power output. Designed for efficient mechanical and biological filtration in freshwater and marine aquariums. Made in China with reliable performance.',
    price: 899,
    images: [{ 
      url: '/assets/filters/BluePet-BL-111F-20W-Internal-Filter.jpg', 
      alt: 'BluePet BL-111F 20W Internal Filter' 
    }],
    stock: 25,
    rating: 4.3,
    numReviews: 18,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-111F',
      'Wattage': '20W',
      'Type': 'Internal Liquid Filter',
      'Suitable For': 'Freshwater & Marine',
      'Origin': 'Made in China'
    }
  },
  {
    name: 'BluePet BL-210F 4W Internal Aquarium Filter',
    category: 'Filters',
    description: 'Compact BluePet BL-210F internal liquid filter with 4W power consumption. Suitable for both freshwater and seawater applications. Features 400L/H maximum flow rate for small aquariums.',
    price: 599,
    images: [{ 
      url: '/assets/filters/BluePet-BL-210F-4W-Internal-Filter.jpg', 
      alt: 'BluePet BL-210F 4W Internal Filter' 
    }],
    stock: 35,
    rating: 4.2,
    numReviews: 22,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-210F',
      'Wattage': '4W',
      'Flow Rate': '400L/H',
      'Type': 'Internal Liquid Filter',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-220F 6W Internal Aquarium Filter',
    category: 'Filters',
    description: 'BluePet BL-220F internal liquid filter with 6W power. Compact design for small to medium aquariums. Provides efficient mechanical and biological filtration.',
    price: 649,
    images: [{ 
      url: '/assets/filters/BluePet-BL-220F-6W-Internal-Filter.jpg', 
      alt: 'BluePet BL-220F 6W Internal Filter' 
    }],
    stock: 30,
    rating: 4.3,
    numReviews: 19,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-220F',
      'Wattage': '6W',
      'Type': 'Internal Liquid Filter',
      'Origin': 'Made in China'
    }
  },
  {
    name: 'BluePet BL-222F 25W Internal Aquarium Filter',
    category: 'Filters',
    description: 'Powerful BluePet BL-222F internal liquid filter with 25W output. Designed for medium to large aquariums requiring robust filtration. Made in China with quality construction.',
    price: 999,
    images: [{ 
      url: '/assets/filters/BluePet-BL-222F-25W-Internal-Filter.jpg', 
      alt: 'BluePet BL-222F 25W Internal Filter' 
    }],
    stock: 20,
    rating: 4.4,
    numReviews: 15,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-222F',
      'Wattage': '25W',
      'Type': 'Internal Liquid Filter',
      'Origin': 'Made in China'
    }
  },
  {
    name: 'BluePet BL-333F 30W Internal Aquarium Filter',
    category: 'Filters',
    description: 'BluePet BL-333F 30W internal liquid filter with 3D filtration technology. CE certified for quality and safety. Ideal for larger freshwater and marine setups.',
    price: 1299,
    images: [{ 
      url: '/assets/filters/BluePet-BL-333F-30W-Internal-Filter.jpg', 
      alt: 'BluePet BL-333F 30W Internal Filter' 
    }],
    stock: 18,
    rating: 4.6,
    numReviews: 24,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-333F',
      'Wattage': '30W',
      'Type': 'Internal Liquid Filter',
      'Features': '3D filtration',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-1066F 15W Internal Filter Pump',
    category: 'Filters',
    description: 'BluePet BL-1066F filter pump suitable for both freshwater and seawater. 15W power with 880L/H maximum flow rate. CE certified for reliability.',
    price: 799,
    images: [{ 
      url: '/assets/filters/BluePet-BL-1066F-15W-Internal-Filter.jpg', 
      alt: 'BluePet BL-1066F 15W Internal Filter' 
    }],
    stock: 28,
    rating: 4.3,
    numReviews: 21,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-1066F',
      'Wattage': '15W',
      'Flow Rate': '880L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-1077F 15W Internal Filter Pump',
    category: 'Filters',
    description: 'BluePet BL-1077F filter pump with 15W power and 880L/H flow rate. Designed for both freshwater and marine aquariums. CE certified quality.',
    price: 799,
    images: [{ 
      url: '/assets/filters/BluePet-BL-1077F-15W-Internal-Filter.jpg', 
      alt: 'BluePet BL-1077F 15W Internal Filter' 
    }],
    stock: 26,
    rating: 4.2,
    numReviews: 17,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-1077F',
      'Wattage': '15W',
      'Flow Rate': '880L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-1088F 15W Internal Filter with Sprayer',
    category: 'Filters',
    description: 'BluePet BL-1088F internal filter with spray bar attachment. 15W power with 880L/H flow rate. Suitable for freshwater and marine aquariums. Includes adjustable sprayer for water circulation.',
    price: 899,
    images: [{ 
      url: '/assets/filters/BluePet-BL-1088F-15W-Internal-Filter.jpg', 
      alt: 'BluePet BL-1088F 15W Internal Filter with Sprayer' 
    }],
    stock: 22,
    rating: 4.5,
    numReviews: 29,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-1088F',
      'Wattage': '15W',
      'Flow Rate': '880L/H',
      'Includes': 'Spray bar',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-1200F 15W Internal Liquid Filter',
    category: 'Filters',
    description: 'BluePet BL-1200F internal liquid filter with 15W power output. Designed for efficient mechanical and biological filtration in medium-sized aquariums.',
    price: 849,
    images: [{ 
      url: '/assets/filters/BluePet-BL-1200F-15W-Internal-Filter.jpg', 
      alt: 'BluePet BL-1200F 15W Internal Filter' 
    }],
    stock: 24,
    rating: 4.3,
    numReviews: 16,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-1200F',
      'Wattage': '15W',
      'Type': 'Internal Liquid Filter',
      'Origin': 'Made in China'
    }
  },
  {
    name: 'BluePet BL-6001F 15W Internal Liquid Filter',
    category: 'Filters',
    description: 'BluePet BL-6001F internal liquid filter with 15W power and 880L/H flow rate. Suitable for both freshwater and seawater applications. CE certified.',
    price: 799,
    images: [{ 
      url: '/assets/filters/BluePet-BL-6001F-15W-Internal-Filter.jpg', 
      alt: 'BluePet BL-6001F 15W Internal Filter' 
    }],
    stock: 27,
    rating: 4.3,
    numReviews: 19,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-6001F',
      'Wattage': '15W',
      'Flow Rate': '880L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-8300F 20W Internal Liquid Filter',
    category: 'Filters',
    description: 'BluePet BL-8300F internal liquid filter with 20W power and 800L/H flow rate. Suitable for freshwater and marine aquariums. CE certified for quality.',
    price: 899,
    images: [{ 
      url: '/assets/filters/BluePet-BL-8300F-20W-Internal-Filter.jpg', 
      alt: 'BluePet BL-8300F 20W Internal Filter' 
    }],
    stock: 23,
    rating: 4.4,
    numReviews: 20,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-8300F',
      'Wattage': '20W',
      'Flow Rate': '800L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-8400F 25W Internal Liquid Filter',
    category: 'Filters',
    description: 'BluePet BL-8400F internal liquid filter with 25W power and 1000L/H flow rate. Designed for larger aquariums requiring higher flow rates. CE certified.',
    price: 1099,
    images: [{ 
      url: '/assets/filters/BluePet-BL-8400F-25W-Internal-Filter.jpg', 
      alt: 'BluePet BL-8400F 25W Internal Filter' 
    }],
    stock: 19,
    rating: 4.5,
    numReviews: 23,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-8400F',
      'Wattage': '25W',
      'Flow Rate': '1000L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BL-8500F 35W Internal Liquid Filter',
    category: 'Filters',
    description: 'Powerful BluePet BL-8500F internal liquid filter with 35W power and 1500L/H flow rate. Ideal for large aquariums and heavy bioloads. CE certified.',
    price: 1499,
    images: [{ 
      url: '/assets/filters/BluePet-BL-8500F-35W-Internal-Filter.jpg', 
      alt: 'BluePet BL-8500F 35W Internal Filter' 
    }],
    stock: 15,
    rating: 4.7,
    numReviews: 27,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-8500F',
      'Wattage': '35W',
      'Flow Rate': '1500L/H',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },

  // BluePet Power Heads
  {
    name: 'BluePet BL-550 15W 3-in-1 Power Head',
    category: 'Filters',
    description: 'BluePet BL-550 3-in-1 aquarium power head for fresh and marine water. 15W power with 1200L/H maximum flow. Versatile water circulation pump.',
    price: 999,
    images: [{ 
      url: '/assets/filters/BluePet-BL-550-15W-Power-Head.jpg', 
      alt: 'BluePet BL-550 15W Power Head' 
    }],
    stock: 32,
    rating: 4.4,
    numReviews: 31,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-550',
      'Wattage': '15W',
      'Flow Rate': '1200L/H',
      'Type': '3-in-1 Power Head',
      'Suitable For': 'Fresh & Marine'
    }
  },
  {
    name: 'BluePet BL-650 25W 3-in-1 Power Head',
    category: 'Filters',
    description: 'BluePet BL-650 3-in-1 aquarium power head with 25W power and 1800L/H flow rate. Ideal for medium to large tanks requiring strong water movement.',
    price: 1299,
    images: [{ 
      url: '/assets/filters/BluePet-BL-650-25W-Power-Head.jpg', 
      alt: 'BluePet BL-650 25W Power Head' 
    }],
    stock: 28,
    rating: 4.5,
    numReviews: 26,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-650',
      'Wattage': '25W',
      'Flow Rate': '1800L/H',
      'Type': '3-in-1 Power Head',
      'Suitable For': 'Fresh & Marine'
    }
  },
  {
    name: 'BluePet BL-750 35W 3-in-1 Power Head',
    category: 'Filters',
    description: 'Powerful BluePet BL-750 3-in-1 aquarium power head with 35W power and 2800L/H flow rate. Excellent water circulation for large aquariums.',
    price: 1599,
    images: [{ 
      url: '/assets/filters/BluePet-BL-750-35W-Power-Head.jpg', 
      alt: 'BluePet BL-750 35W Power Head' 
    }],
    stock: 22,
    rating: 4.6,
    numReviews: 29,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-750',
      'Wattage': '35W',
      'Flow Rate': '2800L/H',
      'Type': '3-in-1 Power Head',
      'Suitable For': 'Fresh & Marine'
    }
  },
  {
    name: 'BluePet BL-850 45W 3-in-1 Power Head',
    category: 'Filters',
    description: 'High-performance BluePet BL-850 3-in-1 aquarium power head with 45W power and 3200L/H maximum flow. Ideal for very large tanks and strong current requirements.',
    price: 1899,
    images: [{ 
      url: '/assets/filters/BluePet-BL-850-45W-Power-Head.jpg', 
      alt: 'BluePet BL-850 45W Power Head' 
    }],
    stock: 18,
    rating: 4.7,
    numReviews: 22,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-850',
      'Wattage': '45W',
      'Flow Rate': '3200L/H',
      'Type': '3-in-1 Power Head',
      'Suitable For': 'Fresh & Marine'
    }
  },
  {
    name: 'BluePet BL-5600 16W Filter Pump',
    category: 'Filters',
    description: 'BluePet BL-5600 filter pump with 16W power output. Reliable water circulation and filtration for medium-sized aquariums.',
    price: 899,
    images: [{ 
      url: '/assets/filters/BluePet-BL-5600-16W-Power-Head.jpg', 
      alt: 'BluePet BL-5600 16W Filter Pump' 
    }],
    stock: 30,
    rating: 4.2,
    numReviews: 18,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BL-5600',
      'Wattage': '16W',
      'Type': 'Filter Pump',
      'Suitable For': 'Medium aquariums'
    }
  },

  // BluePet Hang-on Filters
  {
    name: 'BluePet BLH-301 3W Hang-on Filter',
    category: 'Filters',
    description: 'BluePet BLH-301 hang-on filter with ultra-quiet operation. 3W power with 180L/H flow rate. Perfect for nano and small aquariums. Features innovative design for low noise.',
    price: 699,
    images: [{ 
      url: '/assets/filters/BluePet-BLH-301-3W-Hang-on-Filter.jpg', 
      alt: 'BluePet BLH-301 3W Hang-on Filter' 
    }],
    stock: 40,
    rating: 4.3,
    numReviews: 35,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BLH-301',
      'Wattage': '3W',
      'Flow Rate': '180L/H',
      'Type': 'Hang-on Filter',
      'Features': 'Ultra-quiet'
    }
  },
  {
    name: 'BluePet BLH-401 4W Hang-on Filter',
    category: 'Filters',
    description: 'BluePet BLH-401 hang-on filter with 4W power and 250L/H maximum output. Compact and efficient filtration for small to medium aquariums.',
    price: 799,
    images: [{ 
      url: '/assets/filters/BluePet-BLH-401-4W-Hang-on-Filter.jpg', 
      alt: 'BluePet BLH-401 4W Hang-on Filter' 
    }],
    stock: 35,
    rating: 4.3,
    numReviews: 28,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BLH-401',
      'Wattage': '4W',
      'Flow Rate': '250L/H',
      'Type': 'Hang-on Filter',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BLH-402 6W Hang-on Filter',
    category: 'Filters',
    description: 'BluePet BLH-402 hang-on filter with advanced air compressing technology for extremely low noise operation. 6W power with 400L/H flow rate.',
    price: 899,
    images: [{ 
      url: '/assets/filters/BluePet-BLH-402-6W-Hang-on-Filter.jpg', 
      alt: 'BluePet BLH-402 6W Hang-on Filter' 
    }],
    stock: 32,
    rating: 4.5,
    numReviews: 42,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BLH-402',
      'Wattage': '6W',
      'Flow Rate': '400L/H',
      'Type': 'Hang-on Filter',
      'Features': 'Ultra-quiet',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet BLH-403 8W Hang-on Filter',
    category: 'Filters',
    description: 'BluePet BLH-403 hang-on filter with 8W power and 500L/H flow rate. Efficient mechanical and biological filtration for medium aquariums.',
    price: 999,
    images: [{ 
      url: '/assets/filters/BluePet-BLH-403-8W-Hang-on-Filter.jpg', 
      alt: 'BluePet BLH-403 8W Hang-on Filter' 
    }],
    stock: 28,
    rating: 4.4,
    numReviews: 31,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BLH-403',
      'Wattage': '8W',
      'Flow Rate': '500L/H',
      'Type': 'Hang-on Filter',
      'Certification': 'CE'
    }
  },

  // BluePet Sponge Filters
  {
    name: 'BluePet XF-180 Bio-Sponge Filter',
    category: 'Filters',
    description: 'BluePet XF-180 bio-sponge filter suitable for freshwater and marine aquariums. Provides excellent biological filtration for healthy aquarium environment.',
    price: 399,
    images: [{ 
      url: '/assets/filters/BluePet-XF-180-Sponge-Filter.jpg', 
      alt: 'BluePet XF-180 Bio-Sponge Filter' 
    }],
    stock: 50,
    rating: 4.3,
    numReviews: 38,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'XF-180',
      'Type': 'Bio-Sponge Filter',
      'Suitable For': 'Fresh & Saltwater',
      'Certification': 'CE'
    }
  },
  {
    name: 'BluePet XF-2835 Bio-Sponge Filter',
    category: 'Filters',
    description: 'BluePet XF-2835 bio-sponge filter for efficient biological filtration. Perfect for fry tanks, shrimp tanks, and as secondary filtration.',
    price: 449,
    images: [{ 
      url: '/assets/filters/Bluepet-XF-2835-Bio-Sponge-Filter.jpg', 
      alt: 'BluePet XF-2835 Bio-Sponge Filter' 
    }],
    stock: 45,
    rating: 4.4,
    numReviews: 33,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'XF-2835',
      'Type': 'Bio-Sponge Filter',
      'Suitable For': 'Fry tanks, shrimp tanks'
    }
  },

  // PetRena Filters
  {
    name: 'PetRena XP-03 2.5W External Hanging Filter',
    category: 'Filters',
    description: 'PetRena XP-03 external hanging filter with 2.5W power. Features special cascade flow design for optimal filtration. Quiet operation and easy maintenance.',
    price: 699,
    images: [{ 
      url: '/assets/filters/PetRena-XP-03-2.5W-Hang-on-Filter.jpg', 
      alt: 'PetRena XP-03 2.5W Hang-on Filter' 
    }],
    stock: 38,
    rating: 4.2,
    numReviews: 24,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'XP-03',
      'Wattage': '2.5W',
      'Type': 'External Hanging Filter',
      'Features': 'Cascade flow design'
    }
  },
  {
    name: 'PetRena XP-05 3W External Hanging Filter',
    category: 'Filters',
    description: 'PetRena XP-05 external hanging filter with 3W power. Reliable super performance with optimal flow design. Quiet restart without adding water.',
    price: 799,
    images: [{ 
      url: '/assets/filters/PetRena-XP-05-3W-Hang-on-Filter.jpg', 
      alt: 'PetRena XP-05 3W Hang-on Filter' 
    }],
    stock: 34,
    rating: 4.3,
    numReviews: 27,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'XP-05',
      'Wattage': '3W',
      'Type': 'External Hanging Filter',
      'Features': 'Quiet restart'
    }
  },
  {
    name: 'PetRena XP-09D 3.5W Hang-on Filter with LED Indicator',
    category: 'Filters',
    description: 'PetRena XP-09D advanced hang-on filter with LED indicator that flashes when filter media needs cleaning. 3.5W power with adjustable flow regulating valve. Includes oil film processor and quiet restart technology.',
    price: 1299,
    images: [{ 
      url: '/assets/filters/PetRena-XP-09D-3.5W-Hang-on-Filter.jpg', 
      alt: 'PetRena XP-09D 3.5W Hang-on Filter with LED' 
    }],
    stock: 25,
    rating: 4.7,
    numReviews: 36,
    isFeatured: true,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'XP-09D',
      'Wattage': '3.5W',
      'Type': 'Hang-on Filter',
      'Features': 'LED clog indicator, Oil film processor, Adjustable flow',
      'Patent': 'Yes'
    }
  },
  {
    name: 'PetRena XP-11D 4.2W Hang-on Filter',
    category: 'Filters',
    description: 'PetRena XP-11D hang-on filter with 4.2W power. Reliable super performance with powerful filtration capacity. Ideal for medium-sized aquariums.',
    price: 899,
    images: [{ 
      url: '/assets/filters/PetRena-XP-11D-4.2W-Hang-on-Filter.jpg', 
      alt: 'PetRena XP-11D 4.2W Hang-on Filter' 
    }],
    stock: 30,
    rating: 4.4,
    numReviews: 22,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'XP-11D',
      'Wattage': '4.2W',
      'Type': 'Hang-on Filter',
      'Features': 'Super performance'
    }
  },

  // RS Electrical Power Heads
  {
    name: 'RS Electrical RS-720 15W Submersible Power Head',
    category: 'Filters',
    description: 'RS Electrical RS-720 multi-functional submersible pump with 15W power. Features water pumping, aeration, and super spray functions. Very quiet and reliable with safe submersible motor.',
    price: 999,
    images: [{ 
      url: '/assets/filters/RS-Electrical-RS-720-15W-Submersible-Power-Head.jpg', 
      alt: 'RS Electrical RS-720 15W Submersible Power Head' 
    }],
    stock: 32,
    rating: 4.4,
    numReviews: 28,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-720',
      'Wattage': '15W',
      'Type': 'Multi-functional Submersible Pump',
      'Features': 'Pumping, aeration, super spray',
      'Series': 'Green Series'
    }
  },
  {
    name: 'RS Electrical RS-730 25W Multi-functional Pump',
    category: 'Filters',
    description: 'RS Electrical RS-730 multi-functional submersible pump with 25W power. Designed for water pumping and aeration. Very quiet operation with safe submersible motor and suction cup mounting.',
    price: 1299,
    images: [{ 
      url: '/assets/filters/RS-Electrical-RS-730-25W-Power-Head.jpg', 
      alt: 'RS Electrical RS-730 25W Power Head' 
    }],
    stock: 28,
    rating: 4.5,
    numReviews: 24,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-730',
      'Wattage': '25W',
      'Type': 'Multi-functional Pump',
      'Features': 'Super spray, quiet operation'
    }
  },
  {
    name: 'RS Electrical RS-740 35W Submersible Power Head',
    category: 'Filters',
    description: 'RS Electrical RS-740 multi-functional submersible pump with 35W power from the Green Series. Features water pumping, aeration, and super spray. Eco-friendly design with quiet operation.',
    price: 1599,
    images: [{ 
      url: '/assets/filters/RS-Electrical-RS-740-35W-Submersible-Power-Head.jpg', 
      alt: 'RS Electrical RS-740 35W Submersible Power Head' 
    }],
    stock: 22,
    rating: 4.6,
    numReviews: 26,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-740',
      'Wattage': '35W',
      'Type': 'Multi-functional Submersible Pump',
      'Features': 'Pumping, aeration, super spray',
      'Series': 'Eco Green Series'
    }
  },

  // SeaPet Internal Power Filters
  {
    name: 'SeaPet SP-600BF 6W Internal Power Filter',
    category: 'Filters',
    description: 'SeaPet SP-600BF internal power filter with 6W power and 3-in-1 functionality. Compact design for efficient mechanical, chemical, and biological filtration.',
    price: 699,
    images: [{ 
      url: '/assets/filters/SeaPet-SP-600BF-6W-Internal-Power-Filter.jpg', 
      alt: 'SeaPet SP-600BF 6W Internal Power Filter' 
    }],
    stock: 35,
    rating: 4.2,
    numReviews: 19,
    isFeatured: false,
    specifications: {
      'Brand': 'SeaPet',
      'Model': 'SP-600BF',
      'Wattage': '6W',
      'Type': 'Internal Power Filter',
      'Features': '3-in-1 filtration'
    }
  },
  {
    name: 'SeaPet SP-800AF 8W Internal Power Filter',
    category: 'Filters',
    description: 'SeaPet SP-800AF internal power filter with 8W power and top choice 3-in-1 filtration. Ideal for medium aquariums requiring efficient multi-stage filtration.',
    price: 799,
    images: [{ 
      url: '/assets/filters/SeaPet-SP-800AF-8W-Internal-Power-Filter.jpg', 
      alt: 'SeaPet SP-800AF 8W Internal Power Filter' 
    }],
    stock: 32,
    rating: 4.3,
    numReviews: 22,
    isFeatured: false,
    specifications: {
      'Brand': 'SeaPet',
      'Model': 'SP-800AF',
      'Wattage': '8W',
      'Type': 'Internal Power Filter',
      'Features': '3-in-1 filtration'
    }
  },
  {
    name: 'SeaPet SP-1200BF 12W Internal Power Filter',
    category: 'Filters',
    description: 'SeaPet SP-1200BF internal power filter with 12W power and 3-in-1 filtration system. Provides comprehensive mechanical, chemical, and biological filtration.',
    price: 899,
    images: [{ 
      url: '/assets/filters/SeaPet-SP-1200BF-12W-Internal-Power-Filter.jpg', 
      alt: 'SeaPet SP-1200BF 12W Internal Power Filter' 
    }],
    stock: 28,
    rating: 4.4,
    numReviews: 25,
    isFeatured: true,
    specifications: {
      'Brand': 'SeaPet',
      'Model': 'SP-1200BF',
      'Wattage': '12W',
      'Type': 'Internal Power Filter',
      'Features': '3-in-1 filtration'
    }
  },
  {
    name: 'SeaPet SP-1500BF 15W Internal Power Filter',
    category: 'Filters',
    description: 'SeaPet SP-1500BF internal power filter with 15W power and top choice 3-in-1 filtration. Powerful filtration for larger aquariums.',
    price: 1099,
    images: [{ 
      url: '/assets/filters/SeaPet-SP-1500BF-15W-Internal-Power-Filter.jpg', 
      alt: 'SeaPet SP-1500BF 15W Internal Power Filter' 
    }],
    stock: 24,
    rating: 4.5,
    numReviews: 28,
    isFeatured: true,
    specifications: {
      'Brand': 'SeaPet',
      'Model': 'SP-1500BF',
      'Wattage': '15W',
      'Type': 'Internal Power Filter',
      'Features': '3-in-1 filtration'
    }
  },

  // Sobo Internal Filters
  {
    name: 'Sobo WP-1000F 15W Internal Filter',
    category: 'Filters',
    description: 'Sobo WP-1000F internal aquarium filter pump with 15W power. CE certified for quality and safety. Reliable filtration for medium-sized tanks.',
    price: 799,
    images: [{ 
      url: '/assets/filters/Sobo-WP1000F-15W-Internal-Filter.jpg', 
      alt: 'Sobo WP-1000F 15W Internal Filter' 
    }],
    stock: 30,
    rating: 4.3,
    numReviews: 21,
    isFeatured: false,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'WP-1000F',
      'Wattage': '15W',
      'Type': 'Internal Filter Pump',
      'Certification': 'CE'
    }
  },
  {
    name: 'Sobo WP-1200F 15W Internal Filter',
    category: 'Filters',
    description: 'Sobo WP-1200F internal aquarium filter pump with 15W power. Efficient mechanical and biological filtration for freshwater and marine setups.',
    price: 849,
    images: [{ 
      url: '/assets/filters/SOBO-WP-1200F-15W-Internal-Filter.jpg', 
      alt: 'Sobo WP-1200F 15W Internal Filter' 
    }],
    stock: 28,
    rating: 4.3,
    numReviews: 19,
    isFeatured: false,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'WP-1200F',
      'Wattage': '15W',
      'Type': 'Internal Filter Pump',
      'Certification': 'CE'
    }
  },

  // Venus Aqua Internal Filters
  {
    name: 'Venus Aqua VS-210F 4W Internal Filter',
    category: 'Filters',
    description: 'Venus Aqua VS-210F internal filter with 4W power. Compact design for nano and small aquariums. Efficient mechanical and biological filtration.',
    price: 599,
    images: [{ 
      url: '/assets/filters/Venus-Aqua-VS210F-4W-Internal-Filter.png', 
      alt: 'Venus Aqua VS-210F 4W Internal Filter' 
    }],
    stock: 40,
    rating: 4.1,
    numReviews: 16,
    isFeatured: false,
    specifications: {
      'Brand': 'Venus Aqua',
      'Model': 'VS-210F',
      'Wattage': '4W',
      'Type': 'Internal Filter'
    }
  },
  {
    name: 'Venus Aqua VS-1800F 30W Internal Filter',
    category: 'Filters',
    description: 'Venus Aqua VS-1800F internal filter with 30W power and 2000L/H flow rate. Powerful filtration for large aquariums. Designed for efficient water circulation.',
    price: 1299,
    images: [{ 
      url: '/assets/filters/Venus-Aqua-VS1800F-30W-Internal-Filter.jpg', 
      alt: 'Venus Aqua VS-1800F 30W Internal Filter' 
    }],
    stock: 22,
    rating: 4.5,
    numReviews: 24,
    isFeatured: true,
    specifications: {
      'Brand': 'Venus Aqua',
      'Model': 'VS-1800F',
      'Wattage': '30W',
      'Flow Rate': '2000L/H',
      'Type': 'Internal Filter'
    }
  },
  {
    name: 'Venus Aqua VS-2800F 40W Internal Filter',
    category: 'Filters',
    description: 'Venus Aqua VS-2800F internal filter with 40W power and 2800L/H flow rate. High-capacity filtration for very large aquariums and heavy bioloads.',
    price: 1599,
    images: [{ 
      url: '/assets/filters/Venus-Aqua-VS2800F-40W-Internal-Filter.jpg', 
      alt: 'Venus Aqua VS-2800F 40W Internal Filter' 
    }],
    stock: 18,
    rating: 4.6,
    numReviews: 20,
    isFeatured: true,
    specifications: {
      'Brand': 'Venus Aqua',
      'Model': 'VS-2800F',
      'Wattage': '40W',
      'Flow Rate': '2800L/H',
      'Type': 'Internal Filter'
    }
  },
  {
    name: 'Venus Aqua VS-9001F 18W Internal Filter',
    category: 'Filters',
    description: 'Venus Aqua VS-9001F internal filter with 18W power. Efficient mechanical and biological filtration for medium-sized aquariums.',
    price: 899,
    images: [{ 
      url: '/assets/filters/Venus-Aqua-VS9001F-18W-Internal-Filter.jpg', 
      alt: 'Venus Aqua VS-9001F 18W Internal Filter' 
    }],
    stock: 26,
    rating: 4.3,
    numReviews: 18,
    isFeatured: false,
    specifications: {
      'Brand': 'Venus Aqua',
      'Model': 'VS-9001F',
      'Wattage': '18W',
      'Type': 'Internal Filter'
    }
  },

  // Xiaoli Sunsun Multi-function Filters
  {
    name: 'Xiaoli Sunsun XQP-500F 6W Multi-function Filter',
    category: 'Filters',
    description: 'Xiaoli Sunsun XQP-500F multi-function submersible filter pump with 6W power. Versatile filtration for small to medium aquariums.',
    price: 699,
    images: [{ 
      url: '/assets/filters/Xiaoli-Sunsun-XQP-500F-6W-Multi-Function-Internal-FIlter.jpg', 
      alt: 'Xiaoli Sunsun XQP-500F 6W Multi-function Filter' 
    }],
    stock: 35,
    rating: 4.2,
    numReviews: 22,
    isFeatured: false,
    specifications: {
      'Brand': 'Xiaoli Sunsun',
      'Model': 'XQP-500F',
      'Wattage': '6W',
      'Type': 'Multi-function Filter'
    }
  },
  {
    name: 'Xiaoli Sunsun XQP-1000F 15W Multi-function Filter',
    category: 'Filters',
    description: 'Xiaoli Sunsun XQP-1000F multi-function submersible filter pump with 15W power. Designed for efficient mechanical and biological filtration.',
    price: 899,
    images: [{ 
      url: '/assets/filters/Xiaoli-Sunsun-XQP-15W-1000F-Multi-Function-FIlter.jpg', 
      alt: 'Xiaoli Sunsun XQP-1000F 15W Multi-function Filter' 
    }],
    stock: 30,
    rating: 4.4,
    numReviews: 26,
    isFeatured: true,
    specifications: {
      'Brand': 'Xiaoli Sunsun',
      'Model': 'XQP-1000F',
      'Wattage': '15W',
      'Type': 'Multi-function Filter'
    }
  },
  {
    name: 'Xiaoli Sunsun XQP-1500F 22W Multi-function Filter',
    category: 'Filters',
    description: 'Xiaoli Sunsun XQP-1500F multi-function submersible filter pump with 22W power. Powerful filtration for larger aquariums requiring higher flow rates.',
    price: 1199,
    images: [{ 
      url: '/assets/filters/Xiaoli-Sunsun-XQP-1500F-22W-Multi-Function-FIlter.jpg', 
      alt: 'Xiaoli Sunsun XQP-1500F 22W Multi-function Filter' 
    }],
    stock: 24,
    rating: 4.5,
    numReviews: 28,
    isFeatured: true,
    specifications: {
      'Brand': 'Xiaoli Sunsun',
      'Model': 'XQP-1500F',
      'Wattage': '22W',
      'Type': 'Multi-function Filter'
    }
  },

  // Xinyou Sponge Filters
  {
    name: 'Xinyou XY-380 Super Biochemical Sponge Filter',
    category: 'Filters',
    description: 'Xinyou XY-380 super biochemical sponge filter with advanced filtration media. Excellent biological filtration for healthy aquarium environment.',
    price: 449,
    images: [{ 
      url: '/assets/filters/Xinyou-XY-380-Sponge-Filter.jpg', 
      alt: 'Xinyou XY-380 Sponge Filter' 
    }],
    stock: 45,
    rating: 4.4,
    numReviews: 32,
    isFeatured: false,
    specifications: {
      'Brand': 'Xinyou',
      'Model': 'XY-380',
      'Type': 'Super Biochemical Sponge Filter'
    }
  },
  {
    name: 'Xinyou XY-2835 Aquarium Sponge Filter',
    category: 'Filters',
    description: 'Xinyou XY-2835 aquarium sponge filter for efficient biological filtration. Ideal for fry tanks, shrimp tanks, and as secondary filtration.',
    price: 399,
    images: [{ 
      url: '/assets/filters/Xinyou-XY-2835-Sponge-Filter.jpg', 
      alt: 'Xinyou XY-2835 Sponge Filter' 
    }],
    stock: 50,
    rating: 4.3,
    numReviews: 28,
    isFeatured: false,
    specifications: {
      'Brand': 'Xinyou',
      'Model': 'XY-2835',
      'Type': 'Aquarium Sponge Filter'
    }
  },
  {
    name: 'Xinyou XY-2836 Aquarium Sponge Filter',
    category: 'Filters',
    description: 'Xinyou XY-2836 aquarium sponge filter with enhanced filtration capacity. Provides excellent biological filtration for various aquarium setups.',
    price: 449,
    images: [{ 
      url: '/assets/filters/Xinyou-XY-2836-Sponge-Filter.jpg', 
      alt: 'Xinyou XY-2836 Sponge Filter' 
    }],
    stock: 42,
    rating: 4.4,
    numReviews: 30,
    isFeatured: true,
    specifications: {
      'Brand': 'Xinyou',
      'Model': 'XY-2836',
      'Type': 'Aquarium Sponge Filter'
    }
  }
];

// Export the filters array to be used in your main seed file
module.exports = filters;

// ========== AQUARIUM LIGHTS ==========
const lights = [
  // BluePet Bracket Lights
  {
    name: 'BluePet BR-30 8W Bracket Aquarium Light',
    category: 'Aquarium Lights',
    description: 'BluePet BR-30 bracket aquarium light with 8W power. Features cool operation, energy efficiency, thin housing design, and integrated splash guard. Perfect for freshwater aquariums.',
    price: 1299,
    images: [{ 
      url: '/assets/aquarium_lights/Bluepet-BR-30-8W-Bracket-Aquarium-Light.jpg', 
      alt: 'BluePet BR-30 8W Bracket Aquarium Light' 
    }],
    stock: 35,
    rating: 4.3,
    numReviews: 24,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BR-30',
      'Wattage': '8W',
      'Type': 'Bracket Light',
      'Features': 'Cool operation, Energy efficient, Thin housing, Splash guard'
    }
  },
  {
    name: 'BluePet BR-40 11W Bracket Aquarium Light',
    category: 'Aquarium Lights',
    description: 'BluePet BR-40 bracket aquarium light with 11W power. Energy-efficient LED with cool operation and thin profile. Includes splash guard for protection.',
    price: 1499,
    images: [{ 
      url: '/assets/aquarium_lights/Bluepet-BR-40-11W-Bracket-Aquarium-Light.jpg', 
      alt: 'BluePet BR-40 11W Bracket Aquarium Light' 
    }],
    stock: 32,
    rating: 4.4,
    numReviews: 28,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'BR-40',
      'Wattage': '11W',
      'Type': 'Bracket Light',
      'Features': 'Cool operation, Energy efficient, Thin housing, Splash guard'
    }
  },

  // BluePet Flat Nano Series
  {
    name: 'BluePet Flat Nano S3 10W WRGB High Penetration Light',
    category: 'Planted Tank Lights',
    description: 'BluePet Flat Nano S3 advanced LED light with 10W power and WRGB technology. Features high concentrated light with excellent penetration for planted tanks. Ideal for nano aquariums.',
    price: 2499,
    images: [{ 
      url: '/assets/aquarium_lights/Bluepet-Flat-Nano-S3-WRGB-High-Penetration-Aquarium-Light-10W.jpg', 
      alt: 'BluePet Flat Nano S3 10W WRGB Light' 
    }],
    stock: 22,
    rating: 4.6,
    numReviews: 31,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'Flat Nano S3',
      'Wattage': '10W',
      'Type': 'WRGB LED',
      'Features': 'High penetration, Concentrated light',
      'Suitable For': 'Nano planted tanks'
    }
  },
  {
    name: 'BluePet Flat Nano S4 16W WRGB High Penetration Light',
    category: 'Planted Tank Lights',
    description: 'BluePet Flat Nano S4 powerful LED light with 16W power and WRGB technology. High concentrated light with exceptional penetration for demanding planted aquariums.',
    price: 2999,
    images: [{ 
      url: '/assets/aquarium_lights/Blue-pet-Flat-Nano-S4-WRGB-High-Penetration-Aquarium-Light-16W-1.jpg', 
      alt: 'BluePet Flat Nano S4 16W WRGB Light' 
    }],
    stock: 18,
    rating: 4.7,
    numReviews: 27,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'Flat Nano S4',
      'Wattage': '16W',
      'Type': 'WRGB LED',
      'Features': 'High penetration, Concentrated light',
      'Suitable For': 'Planted nano tanks'
    }
  },

  // BluePet Nano Lamps
  {
    name: 'BluePet N6 6W Color Changing Mini Aquarium Lamp',
    category: 'Aquarium Lights',
    description: 'BluePet N6 color changing mini aquarium lamp with 6W power. Compact design for small tanks with vibrant color options.',
    price: 899,
    images: [{ 
      url: '/assets/aquarium_lights/BluePet-N6-color-changing-6W-Mini-Aquarium-Lamp.jpg', 
      alt: 'BluePet N6 6W Color Changing Mini Lamp' 
    }],
    stock: 40,
    rating: 4.2,
    numReviews: 19,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'N6',
      'Wattage': '6W',
      'Type': 'Mini Aquarium Lamp',
      'Features': 'Color changing'
    }
  },
  {
    name: 'BluePet N-6 Mix Color Nano Aquarium Lamp 2.5W',
    category: 'Aquarium Lights',
    description: 'BluePet N-6 nano aquarium lamp with 2.5W power and mix color capability. Compact lighting solution for nano tanks and small aquariums.',
    price: 699,
    images: [{ 
      url: '/assets/aquarium_lights/Bluepet-N-6-Mix-color-Nano-Aquarium-Lamp-2.5.jpg', 
      alt: 'BluePet N-6 Mix Color Nano Aquarium Lamp' 
    }],
    stock: 45,
    rating: 4.1,
    numReviews: 16,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'N-6',
      'Wattage': '2.5W',
      'Type': 'Nano Aquarium Lamp',
      'Features': 'Mix color'
    }
  },
  {
    name: 'BluePet N6 Nano Aquarium Lamp 2.5W',
    category: 'Aquarium Lights',
    description: 'BluePet N6 nano aquarium lamp with 2.5W power. Compact and energy-efficient lighting for nano tanks and small freshwater setups.',
    price: 649,
    images: [{ 
      url: '/assets/aquarium_lights/Bluepet-N6-Nano-Aquarium-Lamp.jpg', 
      alt: 'BluePet N6 Nano Aquarium Lamp' 
    }],
    stock: 48,
    rating: 4.0,
    numReviews: 14,
    isFeatured: false,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'N6',
      'Wattage': '2.5W',
      'Type': 'Nano Aquarium Lamp',
      'Voltage': '220-240V 50Hz'
    }
  },

  // BluePet Submersible Lamps
  {
    name: 'BluePet T4-20F 20W Changing Submersible Lamp',
    category: 'Aquarium Lights',
    description: 'BluePet T4-20F changing submersible aquarium lamp with 20W power. Fully submersible design with color-changing capabilities for dramatic underwater effects.',
    price: 1799,
    images: [{ 
      url: '/assets/aquarium_lights/BLUEPET-T4-20-CHANGING-LED.png', 
      alt: 'BluePet T4-20F Changing Submersible Lamp' 
    }],
    stock: 25,
    rating: 4.5,
    numReviews: 22,
    isFeatured: true,
    specifications: {
      'Brand': 'BluePet',
      'Model': 'T4-20F',
      'Wattage': '20W',
      'Type': 'Submersible Lamp',
      'Features': 'Color changing'
    }
  },

  // RS Electrical Clip-on Lights
  {
    name: 'RS Electrical RS-S400 8W Ultra-Thin Clip-on LED Light',
    category: 'Aquarium Lights',
    description: 'RS Electrical RS-S400 ultra-thin clip-on LED light with 8W power. Features easy installation, beautiful concise design, and high-quality materials. CE certified with ISO9001质量管理体系认证.',
    price: 1599,
    images: [{ 
      url: '/assets/aquarium_lights/CLIP-LED-RS-S400-8W-light.jpg', 
      alt: 'RS Electrical RS-S400 8W Clip-on LED Light' 
    }],
    stock: 30,
    rating: 4.4,
    numReviews: 26,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-S400',
      'Wattage': '8W',
      'Type': 'Clip-on LED Light',
      'Features': 'Ultra-thin, Easy installation',
      'Series': 'Eco Green Series',
      'Certification': 'CE, ISO9001'
    }
  },
  {
    name: 'RS Electrical RS-S500 15W Ultra-Thin Clip-on LED Light',
    category: 'Planted Tank Lights',
    description: 'RS Electrical RS-S500 ultra-thin clip-on LED light with 15W power from the Eco Green Series. Designed for planted aquariums with easy operation and high-quality materials.',
    price: 2299,
    images: [{ 
      url: '/assets/aquarium_lights/CLIP-LED-RS-S500-15W-light.jpg', 
      alt: 'RS Electrical RS-S500 15W Clip-on LED Light' 
    }],
    stock: 24,
    rating: 4.6,
    numReviews: 29,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-S500',
      'Wattage': '15W',
      'Type': 'Clip-on LED Light',
      'Features': 'Ultra-thin, Easy operation',
      'Series': 'Eco Green Series',
      'Suitable For': 'Planted tanks'
    }
  },
  {
    name: 'RS Electrical RS-S40 8W Crystal Clip-on LED Light',
    category: 'Aquarium Lights',
    description: 'RS Electrical RS-S40 crystal clip-on LED aquarium light with 8W power. Elegant design with crystal-clear lighting for freshwater tanks.',
    price: 1299,
    images: [{ 
      url: '/assets/aquarium_lights/RS-Electrical-RS-S40-8W-Clip-LED-Aquarium-Light-1.jpg', 
      alt: 'RS Electrical RS-S40 8W Clip-on LED Light' 
    }],
    stock: 35,
    rating: 4.3,
    numReviews: 21,
    isFeatured: false,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-S40',
      'Wattage': '8W',
      'Type': 'Crystal Clip-on LED Light',
      'Features': 'Crystal design'
    }
  },
  {
    name: 'RS Electrical RS-S40 12W Crystal Clip-on LED Light',
    category: 'Aquarium Lights',
    description: 'RS Electrical RS-S40 crystal clip-on LED aquarium light with 12W power. Brighter version with the same elegant crystal design for enhanced illumination.',
    price: 1499,
    images: [{ 
      url: '/assets/aquarium_lights/RS-Electrical-RS-S40-12W-Clip-LED-Aquarium-Light-2.jpg', 
      alt: 'RS Electrical RS-S40 12W Clip-on LED Light' 
    }],
    stock: 32,
    rating: 4.4,
    numReviews: 23,
    isFeatured: true,
    specifications: {
      'Brand': 'RS Electrical',
      'Model': 'RS-S40',
      'Wattage': '12W',
      'Type': 'Crystal Clip-on LED Light',
      'Features': 'Crystal design'
    }
  },

  // PetRena Clip Lights
  {
    name: 'PetRena D-1 Mini Aquarium Clip Light',
    category: 'Aquarium Lights',
    description: 'PetRena D-1 mini aquarium clip light. Compact and versatile lighting solution for small tanks and nano aquariums. Easy clip-on installation.',
    price: 599,
    images: [{ 
      url: '/assets/aquarium_lights/Pet-Rena-D-1-Bowl-Light.jpg', 
      alt: 'PetRena D-1 Mini Aquarium Clip Light' 
    }],
    stock: 50,
    rating: 4.1,
    numReviews: 18,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'D-1',
      'Type': 'Mini Clip Light',
      'Suitable For': 'Nano tanks, Bowls'
    }
  },
  {
    name: 'PetRena D-15 8W Aquarium LED Light',
    category: 'Aquarium Lights',
    description: 'PetRena D-15 LED aquarium light with 8W power. Features good heat dissipation for durability and long life. High-quality LED lighting for freshwater tanks.',
    price: 1199,
    images: [{ 
      url: '/assets/aquarium_lights/Pet-Rena-D-15-8W-Aquarium-LED-Light.jpg', 
      alt: 'PetRena D-15 8W Aquarium LED Light' 
    }],
    stock: 38,
    rating: 4.3,
    numReviews: 25,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'D-15',
      'Wattage': '8W',
      'Type': 'LED Aquarium Light',
      'Features': 'Good heat dissipation, Durable'
    }
  },
  {
    name: 'PetRena D-16 Aquarium LED Light',
    category: 'Aquarium Lights',
    description: 'PetRena D-16 LED aquarium light with excellent heat dissipation. Designed for reliable long-term use in freshwater aquariums.',
    price: 1099,
    images: [{ 
      url: '/assets/aquarium_lights/Pet-Rena-D-16-Aquarium-LED-Light.jpg', 
      alt: 'PetRena D-16 Aquarium LED Light' 
    }],
    stock: 35,
    rating: 4.2,
    numReviews: 20,
    isFeatured: false,
    specifications: {
      'Brand': 'PetRena',
      'Model': 'D-16',
      'Type': 'LED Aquarium Light',
      'Features': 'Good heat dissipation'
    }
  },

  // Sobo Submersible Lamps
  {
    name: 'Sobo T4-20 5.5W Submersible Discolor Decorative Lamp',
    category: 'Aquarium Lights',
    description: 'Sobo T4-20 submersible discolor decorative lamp with 5.5W power. T4 LED technology for vibrant color-changing effects underwater. Fully submersible design.',
    price: 899,
    images: [{ 
      url: '/assets/aquarium_lights/Sobo-T4-20-5.5W-Submersible-Lamp.jpg', 
      alt: 'Sobo T4-20 5.5W Submersible Lamp' 
    }],
    stock: 42,
    rating: 4.2,
    numReviews: 22,
    isFeatured: false,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'T4-20',
      'Wattage': '5.5W',
      'Type': 'Submersible Discolor Lamp',
      'Features': 'Color changing, Decorative'
    }
  },
  {
    name: 'Sobo T4-30 5.5W Submersible Discolor Decorative Lamp',
    category: 'Aquarium Lights',
    description: 'Sobo T4-30 submersible discolor decorative lamp with 5.5W power. T4 LED technology creates beautiful underwater lighting effects. Fully submersible.',
    price: 949,
    images: [{ 
      url: '/assets/aquarium_lights/Sobo-T4-30-5.5W-Submersible-Lamp.jpg', 
      alt: 'Sobo T4-30 5.5W Submersible Lamp' 
    }],
    stock: 40,
    rating: 4.3,
    numReviews: 24,
    isFeatured: true,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'T4-30',
      'Wattage': '5.5W',
      'Type': 'Submersible Discolor Lamp',
      'Features': 'Color changing, Decorative'
    }
  },
  {
    name: 'Sobo T4-40 8W Submersible Discolor Decorative Lamp',
    category: 'Aquarium Lights',
    description: 'Sobo T4-40 submersible discolor decorative lamp with 8W power. Brighter version for larger tanks with vibrant color-changing effects.',
    price: 1099,
    images: [{ 
      url: '/assets/aquarium_lights/Sobo-T4-40-8W-Submersible-Lamp.jpg', 
      alt: 'Sobo T4-40 8W Submersible Lamp' 
    }],
    stock: 35,
    rating: 4.4,
    numReviews: 27,
    isFeatured: true,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'T4-40',
      'Wattage': '8W',
      'Type': 'Submersible Discolor Lamp',
      'Features': 'Color changing, Decorative'
    }
  },
  {
    name: 'Sobo T4-50 9W Submersible Discolor Decorative Lamp',
    category: 'Aquarium Lights',
    description: 'Sobo T4-50 submersible discolor decorative lamp with 9W power. Highest output in the T4 series for maximum visual impact and vibrant colors.',
    price: 1299,
    images: [{ 
      url: '/assets/aquarium_lights/Sobo-T4-50-9W-Submersible-Lamp.jpg', 
      alt: 'Sobo T4-50 9W Submersible Lamp' 
    }],
    stock: 30,
    rating: 4.5,
    numReviews: 29,
    isFeatured: true,
    specifications: {
      'Brand': 'Sobo',
      'Model': 'T4-50',
      'Wattage': '9W',
      'Type': 'Submersible Discolor Lamp',
      'Features': 'Color changing, Decorative'
    }
  }
];

// Export the lights array
module.exports = lights;

// ========== FISH MEDICINES PRODUCTS ==========
const fishMedicines = [
  {
    name: 'Aquaria Clear 120ml - Water Clarifier',
    category: 'Fish Medicines',
    description: 'Quick effect water clarifier for pure aquarium water. Effectively removes blue-green algae and clears cloudy water for freshwater aquariums.',
    price: 299,
    images: [{ 
      url: '/assets/fish_medicine/aqua_clear_70ml.jpg', 
      alt: 'Aquaria Clear Water Clarifier' 
    }],
    stock: 75,
    rating: 4.5,
    numReviews: 42,
    isFeatured: true,
    specifications: {
      'Brand': 'Aquaria',
      'Volume': '120ml',
      'Type': 'Water Clarifier',
      'Usage': 'Removes blue-green algae, clears cloudy water',
      'Suitable For': 'Freshwater aquariums'
    }
  },
  {
    name: 'Bactonil 70ml - Anti-Bacterial Treatment',
    category: 'Fish Medicines',
    description: 'Comprehensive anti-bacterial treatment for internal and external infections. Treats inflammation, ulcerous wounds, skin discoloration, fin rot, pop eye, fish bite, cloudy eye, and mouth fungus.',
    price: 349,
    images: [{ 
      url: '/assets/fish_medicine/bactonil_70ml.jpg', 
      alt: 'Bactonil Anti-Bacterial Treatment' 
    }],
    stock: 60,
    rating: 4.8,
    numReviews: 87,
    isFeatured: true,
    specifications: {
      'Brand': 'Bactonil',
      'Volume': '70ml',
      'Type': 'Anti-Bacterial',
      'Treats': 'Internal & External infections',
      'Conditions': 'Fin rot, pop eye, mouth fungus, ulcers'
    }
  },
  {
    name: 'Betta Cure Twin Pack',
    category: 'Fish Medicines',
    description: 'Complete medication twin pack specially formulated for Betta fish. Treats common betta diseases and promotes recovery.',
    price: 249,
    images: [{ 
      url: '/assets/fish_medicine/betta_twin.jpeg', 
      alt: 'Betta Cure Twin Pack' 
    }],
    stock: 90,
    rating: 4.7,
    numReviews: 56,
    specifications: {
      'Brand': 'Betta Cure',
      'Type': 'Twin Pack',
      'Suitable For': 'Betta Fish',
      'Usage': 'General medication for bettas'
    }
  },
  {
    name: 'Flowerhorn Total Fire 5-in-1 Treatment',
    category: 'Fish Medicines',
    description: 'Complete 5-in-1 medication mix for Flowerhorn fish. Treats stress, white spots, parasites, and includes de-worming formula. Comprehensive health solution for Flowerhorn.',
    price: 449,
    images: [{ 
      url: '/assets/fish_medicine/Flower_Horn_5_In1.webp', 
      alt: 'Flowerhorn Total Fire 5-in-1 Treatment' 
    }],
    stock: 45,
    rating: 4.9,
    numReviews: 34,
    isFeatured: true,
    specifications: {
      'Brand': 'AquaTigremedies',
      'Type': '5-in-1 Treatment',
      'Suitable For': 'Flowerhorn',
      'Treats': 'Stress, White spots, Parasites, Worms',
      'Features': 'Complete medication mix'
    }
  },
  {
    name: 'Microlife-S2 70ml - Bacterial Suspension',
    category: 'Fish Medicines',
    description: 'Liquid bacterial suspension for quick aquarium maturation. Effectively removes ammonia and nitrite. Suitable for both saltwater and freshwater aquariums.',
    price: 279,
    images: [{ 
      url: '/assets/fish_medicine/microlife_70ml.jpg', 
      alt: 'Microlife-S2 Bacterial Suspension' 
    }],
    stock: 85,
    rating: 4.6,
    numReviews: 63,
    specifications: {
      'Brand': 'Microlife',
      'Volume': '70ml',
      'Type': 'Bacterial Suspension',
      'Usage': 'Quick maturation, Ammonia & Nitrite removal',
      'Suitable For': 'Freshwater & Saltwater'
    }
  },
  {
    name: 'Mr. Blue - Anti-Fungal Treatment',
    category: 'Fish Medicines',
    description: 'Specialized treatment for fungal infections in aquarium fish. Effectively treats cotton wool disease, mouth fungus, and other fungal conditions.',
    price: 199,
    images: [{ 
      url: '/assets/fish_medicine/mr-blue.jpg', 
      alt: 'Mr. Blue Anti-Fungal Treatment' 
    }],
    stock: 110,
    rating: 4.5,
    numReviews: 71,
    specifications: {
      'Brand': 'Mr. Blue',
      'Type': 'Anti-Fungal',
      'Treats': 'Fungal infections',
      'Usage': 'Cotton wool disease, mouth fungus'
    }
  },
  {
    name: 'Mr. Green - White Spot Treatment',
    category: 'Fish Medicines',
    description: 'Effective treatment for white spot disease (Ich) in aquarium fish. Quickly eliminates Ich parasites and helps fish recover.',
    price: 199,
    images: [{ 
      url: '/assets/fish_medicine/mr-green.png', 
      alt: 'Mr. Green White Spot Treatment' 
    }],
    stock: 105,
    rating: 4.6,
    numReviews: 68,
    specifications: {
      'Brand': 'Mr. Green',
      'Type': 'Anti-Parasitic',
      'Treats': 'White spots (Ich)',
      'Usage': 'Eliminates Ich parasites'
    }
  },
  {
    name: 'Mr. Yellow - Antiseptic Treatment',
    category: 'Fish Medicines',
    description: 'Broad-spectrum antiseptic treatment for aquarium fish. Prevents secondary infections and promotes healing of wounds and injuries.',
    price: 199,
    images: [{ 
      url: '/assets/fish_medicine/mr-yellow.jpg', 
      alt: 'Mr. Yellow Antiseptic Treatment' 
    }],
    stock: 100,
    rating: 4.4,
    numReviews: 52,
    specifications: {
      'Brand': 'Mr. Yellow',
      'Type': 'Antiseptic',
      'Usage': 'Prevents secondary infections',
      'Suitable For': 'All aquarium fish'
    }
  },
  {
    name: 'Mr. White - Anti-Parasite Treatment',
    category: 'Fish Medicines',
    description: 'Anti Parasite is a broad-spectrum aquarium medicine formulated to control external parasites, protozoan infections, and false fungal conditions in freshwater fish. It is highly effective during early disease stages and helps prevent rapid spread in aquariums.',
    price: 199,
    images: [{ 
      url: '/assets/fish_medicine/mr-white.jpeg', 
      alt: 'Mr. Yellow Antiseptic Treatment' 
    }],
    stock: 100,
    rating: 4.4,
    numReviews: 52,
    specifications: {
      'Brand': 'Mr. White',
      'Type': 'Anti-Parasite',
      'Usage': 'Prevents secondary infections',
      'Suitable For': 'All aquarium fish'
    }
  },
  {
    name: 'Paracidol 220ml - External Anti-Parasitic',
    category: 'Fish Medicines',
    description: 'Powerful freshwater external anti-parasitic treatment. Treats koi sleeping disease, argulus, anchor worm, and all external parasite diseases in Arowana, Discus, Flowerhorn, and all fish. Copper-based formulation.',
    price: 599,
    images: [{ 
      url: '/assets/fish_medicine/paracidol-fw.webp',
      alt: 'Paracidol External Anti-Parasitic' 
    }],
    stock: 40,
    rating: 4.8,
    numReviews: 45,
    isFeatured: true,
    specifications: {
      'Brand': 'Paracidol',
      'Volume': '220ml',
      'Type': 'External Anti-Parasitic',
      'Treats': 'Sleeping disease, Argulus, Anchor worm',
      'Suitable For': 'Arowana, Discus, Flowerhorn, Koi',
      'Warning': 'Not for use with invertebrates',
      'Base': 'Copper formulation'
    }
  },
  {
    name: 'Stress Heal 200ml - Premium Stress Reducer',
    category: 'Fish Medicines',
    description: 'Premium stress reducing formula for fish emergency aid. Helps fish recover from handling, shipping, and environmental stress. Suitable for both freshwater and saltwater.',
    price: 399,
    images: [{ 
      url: '/assets/fish_medicine/stress_heal_70ml.webp', 
      alt: 'Stress Heal Premium Stress Reducer' 
    }],
    stock: 70,
    rating: 4.7,
    numReviews: 59,
    specifications: {
      'Brand': 'Stress Heal',
      'Volume': '200ml',
      'Type': 'Stress Reducer',
      'Usage': 'Emergency aid, stress reduction',
      'Suitable For': 'Freshwater & Saltwater'
    }
  }
];

// ========== FISH FOODS PRODUCTS ==========
const fishFoods = [
  {
    name: 'Taiyo Aini Fast Growth Fish Food',
    category: 'Fish Foods',
    description: 'Premium fish food specially formulated for fast growth. Enriched with essential nutrients for healthy development of all tropical fish.',
    price: 199,
    images: [{ 
      url: '/assets/fish_foods/Aini-Fast-Growth.png', 
      alt: 'Taiyo Aini Fast Growth Fish Food' 
    }],
    stock: 100,
    rating: 4.5,
    numReviews: 45,
    isFeatured: true,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Growth Formula',
      'Net Weight': '100g',
      'Suitable For': 'All Tropical Fish'
    }
  },
  {
    name: 'Taiyo Aini Fast Red Color Enhancing Food',
    category: 'Fish Foods',
    description: 'Color enhancing formula with natural carotenes. Enriched with complete nutritional formula for vibrant red coloration in fish.',
    price: 249,
    images: [{ 
      url: '/assets/fish_foods/Aini-Fast-Red.png', 
      alt: 'Taiyo Aini Fast Red Color Enhancing Food' 
    }],
    stock: 85,
    rating: 4.7,
    numReviews: 62,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Color Enhancing',
      'Features': 'Carotene enriched',
      'Suitable For': 'Red-colored fish species'
    }
  },
  {
    name: 'Champion Betta Food Micro Pellets 25g',
    category: 'Fish Foods',
    description: 'Specially formulated for all Betta fish. Micro pellets floating type with complete nutrition for healthy growth and vibrant colors.',
    price: 149,
    images: [{ 
      url: '/assets/fish_foods/champion_bettafood_25g.jpg', 
      alt: 'Champion Betta Food Micro Pellets' 
    }],
    stock: 120,
    rating: 4.8,
    numReviews: 89,
    isFeatured: true,
    specifications: {
      'Brand': 'Champion',
      'Type': 'Micro Pellets',
      'Net Weight': '25g',
      'Suitable For': 'Betta Fish',
      'Features': 'Floating Type'
    }
  },
  {
    name: 'Champion Guppy Food 25g',
    category: 'Fish Foods',
    description: 'Premium guppy food with DHA, EPA and amino acids. Semi-floating soft granules ideal for newborn, juvenile and parent fish. Micro-coating technology locks in nutrients.',
    price: 159,
    images: [{ 
      url: '/assets/fish_foods/champion_guppyfood_25g.jpg', 
      alt: 'Champion Guppy Food' 
    }],
    stock: 110,
    rating: 4.6,
    numReviews: 78,
    specifications: {
      'Brand': 'Champion',
      'Type': 'Soft Granule',
      'Net Weight': '25g',
      'Suitable For': 'Guppy Fish',
      'Features': 'With DHA, EPA & Amino Acids'
    }
  },
  {
    name: 'True Color Cichlids Fish Feed',
    category: 'Fish Foods',
    description: 'Specially formulated for cichlids. Enhances natural colors and provides complete nutrition for healthy growth and vibrant appearance.',
    price: 299,
    images: [{ 
      url: '/assets/fish_foods/cichlids_fish_food.jpg', 
      alt: 'True Color Cichlids Fish Feed' 
    }],
    stock: 75,
    rating: 4.5,
    numReviews: 52,
    specifications: {
      'Brand': 'True Color',
      'Type': 'Color Enhancing',
      'Suitable For': 'Cichlids',
      'Features': 'Natural color enhancement'
    }
  },
  {
    name: 'Elfins Guppy Bites 20g',
    category: 'Fish Foods',
    description: 'The healthy guppy color enhancing diet. Optimally balanced nutrition with perfectly sized pellets. Contains ingredients beneficial to guppies.',
    price: 129,
    images: [{ 
      url: '/assets/fish_foods/elfins_guppybits_20g.png', 
      alt: 'Elfins Guppy Bites' 
    }],
    stock: 150,
    rating: 4.4,
    numReviews: 63,
    specifications: {
      'Brand': 'Elfins',
      'Type': 'Protein Food',
      'Net Weight': '20g',
      'Suitable For': 'Guppies',
      'Features': 'Color Enhancing Diet'
    }
  },
  {
    name: 'Taiyo Tropical Flakes 50g',
    category: 'Fish Foods',
    description: 'Easy digest flakes for all tropical fishes. Complete nutrition with balanced formula for daily feeding.',
    price: 179,
    images: [{ 
      url: '/assets/fish_foods/Flakes-Tropical-Front.png', 
      alt: 'Taiyo Tropical Flakes' 
    }],
    stock: 200,
    rating: 4.5,
    numReviews: 112,
    isFeatured: true,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Flakes',
      'Net Weight': '50g',
      'Suitable For': 'All Tropical Fish',
      'Features': 'Easy Digest'
    }
  },
  {
    name: 'Taiyo Grow Fish Food 100g',
    category: 'Fish Foods',
    description: 'Fast growth formula with color enhancer. Floating type food for tropical fish and koi. Promotes healthy development and vibrant colors.',
    price: 249,
    images: [{ 
      url: '/assets/fish_foods/Food_Taiyo_Grow_100g.webp', 
      alt: 'Taiyo Grow Fish Food' 
    }],
    stock: 95,
    rating: 4.7,
    numReviews: 84,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Growth Formula',
      'Net Weight': '100g',
      'Features': 'Fast Growth, Color Enhancer',
      'Suitable For': 'Tropical Fish & Koi'
    }
  },
  {
    name: 'Taiyo Guppy Bits 45g',
    category: 'Fish Foods',
    description: 'Staple diet for guppies with digestive enzyme added. Better immune system support and easy absorption formula.',
    price: 139,
    images: [{ 
      url: '/assets/fish_foods/Guppy-Bites.png', 
      alt: 'Taiyo Guppy Bits' 
    }],
    stock: 180,
    rating: 4.5,
    numReviews: 96,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Pellets',
      'Net Weight': '45g',
      'Suitable For': 'Guppies',
      'Features': 'Digestive enzyme added'
    }
  },
  {
    name: 'Aura Healthy Betta Protein Food 25g',
    category: 'Fish Foods',
    description: 'Premium color enhancing diet for betta fish. Optimally balanced nutrition with perfectly sized pellets. Made in Thailand.',
    price: 169,
    images: [{ 
      url: '/assets/fish_foods/healthybetta_25g.jpg', 
      alt: 'Aura Healthy Betta Food' 
    }],
    stock: 130,
    rating: 4.8,
    numReviews: 105,
    specifications: {
      'Brand': 'Aura',
      'Type': 'Protein Food',
      'Net Weight': '25g',
      'Suitable For': 'Betta Fish',
      'Origin': 'Thailand'
    }
  },
  {
    name: 'Taiyo Humpy Head Growth Food 100g',
    category: 'Fish Foods',
    description: 'Special formula for head growth in flowerhorn and other large cichlids. Promotes hump development and overall health.',
    price: 349,
    images: [{ 
      url: '/assets/fish_foods/Humpy-Head.png', 
      alt: 'Taiyo Humpy Head Growth Food' 
    }],
    stock: 60,
    rating: 4.6,
    numReviews: 42,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Growth Formula',
      'Net Weight': '100g',
      'Suitable For': 'Flowerhorn, Large Cichlids',
      'Features': 'Head growth formula'
    }
  },
  {
    name: 'Inch-Gold Tropical Small Fish Food',
    category: 'Fish Foods',
    description: 'Premium Chinese formula with patented bioactive ingredients. Promotes fish health, enhances resistance, easy digestion, and minimal water pollution.',
    price: 219,
    images: [{ 
      url: '/assets/fish_foods/inch-gold-tropical_small_fish_food.webp', 
      alt: 'Inch-Gold Tropical Small Fish Food' 
    }],
    stock: 140,
    rating: 4.5,
    numReviews: 73,
    specifications: {
      'Brand': 'Inch-Gold',
      'Type': 'Balanced Formula',
      'Suitable For': 'All Tropical Fish',
      'Features': 'Patented bioactive formula'
    }
  },
  {
    name: 'Koi Gold Color Enhancing Food',
    category: 'Fish Foods',
    description: 'Special formula for koi fish to enhance orange and red coloration. Promotes vibrant colors and healthy growth.',
    price: 399,
    images: [{ 
      url: '/assets/fish_foods/koi-gold.jpg', 
      alt: 'Koi Gold Color Enhancing Food' 
    }],
    stock: 55,
    rating: 4.4,
    numReviews: 38,
    specifications: {
      'Brand': 'Koi Gold',
      'Type': 'Color Enhancing',
      'Suitable For': 'Koi Fish',
      'Features': 'Orienth color formula'
    }
  },
  {
    name: 'Taiyo Master Koi Growth Food 8kg',
    category: 'Fish Foods',
    description: 'Professional grade floating growth food for koi. Clear water formula with complete nutrition for healthy development.',
    price: 2499,
    images: [{ 
      url: '/assets/fish_foods/Master-Koi.png', 
      alt: 'Taiyo Master Koi Growth Food' 
    }],
    stock: 20,
    rating: 4.9,
    numReviews: 27,
    isFeatured: true,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Growth Food',
      'Net Weight': '8kg',
      'Suitable For': 'Koi Fish',
      'Features': 'Floating, Clear Water'
    }
  },
  {
    name: 'Gene Eleven Micro Pellets 100g',
    category: 'Fish Foods',
    description: 'Premium micro pellets for all aquarium fish. Complete nutrition in small pellet size suitable for small to medium fish.',
    price: 189,
    images: [{ 
      url: '/assets/fish_foods/micro_pellets_100g.jpeg', 
      alt: 'Gene Eleven Micro Pellets' 
    }],
    stock: 115,
    rating: 4.5,
    numReviews: 58,
    specifications: {
      'Brand': 'Gene Eleven',
      'Type': 'Micro Pellets',
      'Net Weight': '100g',
      'Suitable For': 'All Aquarium Fish'
    }
  },
  {
    name: 'Taiyo Micro Food 20g',
    category: 'Fish Foods',
    description: 'Daily diet for all small mouth tropical fish. Complete nutrition with color enhancement and immune disease resistant formula.',
    price: 119,
    images: [{ 
      url: '/assets/fish_foods/Micro-Food-Green-20g-Front.png', 
      alt: 'Taiyo Micro Food' 
    }],
    stock: 200,
    rating: 4.4,
    numReviews: 82,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Micro Food',
      'Net Weight': '20g',
      'Suitable For': 'Small Mouth Tropical Fish',
      'Features': 'Complete Nutrition, Color Enhancement'
    }
  },
  {
    name: 'Taiyo Micro Pellet 45g',
    category: 'Fish Foods',
    description: 'Color enhancer micro pellets with complete nutrition. Non-water fouling formula rich in vitamins C and E.',
    price: 149,
    images: [{ 
      url: '/assets/fish_foods/Micro-Pellet.png', 
      alt: 'Taiyo Micro Pellet' 
    }],
    stock: 165,
    rating: 4.6,
    numReviews: 94,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Micro Pellet',
      'Net Weight': '45g',
      'Features': 'Color Enhancer, Non-water Fouling',
      'Vitamins': 'Rich in C & E'
    }
  },
  {
    name: 'Optimum Pink Food for Aquarium Fish',
    category: 'Fish Foods',
    description: 'Highly nutritious food for all aquarium fish. Premium formula with optimal nutrition for health and vitality.',
    price: 179,
    images: [{ 
      url: '/assets/fish_foods/optimin_pink_food.webp', 
      alt: 'Optimum Pink Food' 
    }],
    stock: 135,
    rating: 4.3,
    numReviews: 47,
    specifications: {
      'Brand': 'Optimum',
      'Type': 'Complete Nutrition',
      'Suitable For': 'All Aquarium Fish'
    }
  },
  {
    name: 'Optimum Micro Pellet Food',
    category: 'Fish Foods',
    description: 'Premium micro pellet food for all aquarium fish. Perfect size for small to medium fish with complete nutrition.',
    price: 169,
    images: [{ 
      url: '/assets/fish_foods/optimum_mirco_food.webp', 
      alt: 'Optimum Micro Pellet Food' 
    }],
    stock: 125,
    rating: 4.4,
    numReviews: 56,
    specifications: {
      'Brand': 'Optimum',
      'Type': 'Micro Pellet',
      'Suitable For': 'All Aquarium Fish'
    }
  },
  {
    name: 'Optimum Cichlid Quick Red 100g',
    category: 'Fish Foods',
    description: 'Special formula for cichlids to enhance red coloration. Quick red formula for vibrant colors and healthy growth.',
    price: 279,
    images: [{ 
      url: '/assets/fish_foods/optimun_cichlid_100g.webp', 
      alt: 'Optimum Cichlid Quick Red' 
    }],
    stock: 90,
    rating: 4.7,
    numReviews: 68,
    specifications: {
      'Brand': 'Optimum',
      'Type': 'Color Enhancing',
      'Net Weight': '100g',
      'Suitable For': 'Cichlids',
      'Features': 'Quick Red Formula'
    }
  },
  {
    name: 'Taiyo Pro-Rich Arowana Food 280g',
    category: 'Fish Foods',
    description: 'Premium food for arowana and other large carnivorous fish. Brand of the Year winner with prompt acceptance and color promotion. Clear water formula.',
    price: 599,
    images: [{ 
      url: '/assets/fish_foods/Prorich-Arowana-Front.png', 
      alt: 'Taiyo Pro-Rich Arowana Food' 
    }],
    stock: 45,
    rating: 4.8,
    numReviews: 34,
    isFeatured: true,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Pro-Rich',
      'Net Weight': '280g',
      'Suitable For': 'Arowana, Large Carnivorous Fish',
      'Features': 'Clear Water Formula'
    }
  },
  {
    name: 'Taiyo Pro-Rich Red Parrot Food 350g',
    category: 'Fish Foods',
    description: 'High protein formula with natural flavor for red parrot fish. Enriched with yeast-krill, lutein, canthaxanthin and astaxanthin for vibrant red color.',
    price: 449,
    images: [{ 
      url: '/assets/fish_foods/Prorich-Red-Parrot-Front-600x600.png', 
      alt: 'Taiyo Pro-Rich Red Parrot Food' 
    }],
    stock: 55,
    rating: 4.8,
    numReviews: 42,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Pro-Rich',
      'Net Weight': '350g',
      'Suitable For': 'Red Parrot Fish',
      'Ingredients': 'Yeast-Krill, Lutein, Canthaxanthin, Astaxanthin'
    }
  },
  {
    name: 'Horizone Royal Breeding Feed for Guppy 22g',
    category: 'Fish Foods',
    description: '100% guaranteed nutritional support for breeding guppies. Comes with FREE breeding net. Specially formulated for optimal breeding conditions.',
    price: 199,
    images: [{ 
      url: '/assets/fish_foods/Royal-Breeding-Feed-For-Guppy.jpg', 
      alt: 'Horizone Royal Breeding Feed for Guppy' 
    }],
    stock: 80,
    rating: 4.6,
    numReviews: 51,
    specifications: {
      'Brand': 'Horizone',
      'Type': 'Breeding Feed',
      'Net Weight': '22g',
      'Suitable For': 'Guppy',
      'Bonus': 'FREE Breeding Net'
    }
  },
  {
    name: 'Horizone Royal Glow Fish Food',
    category: 'Fish Foods',
    description: 'Special formula for glow fish and fluorescent fish varieties. Enhances natural glow and provides complete nutrition.',
    price: 189,
    images: [{ 
      url: '/assets/fish_foods/Royal-glow-food.png', 
      alt: 'Horizone Royal Glow Fish Food' 
    }],
    stock: 95,
    rating: 4.5,
    numReviews: 37,
    specifications: {
      'Brand': 'Horizone',
      'Type': 'Glow Formula',
      'Suitable For': 'Glow Fish, Fluorescent Fish'
    }
  },
  {
    name: 'Saka Green-1 Spirulina Mini Pellet',
    category: 'Fish Foods',
    description: 'Spirulina enhanced formulation mini pellet. Rich in natural Spirulina for enhanced coloration and immune system support.',
    price: 159,
    images: [{ 
      url: '/assets/fish_foods/saka_fish_food.jpg', 
      alt: 'Saka Green-1 Spirulina Mini Pellet' 
    }],
    stock: 140,
    rating: 4.5,
    numReviews: 63,
    specifications: {
      'Brand': 'Saka',
      'Type': 'Spirulina Pellet',
      'Features': 'Spirulina Enhanced',
      'Suitable For': 'All Tropical Fish'
    }
  },
  {
    name: 'Taiyo Turtle Food 100g',
    category: 'Fish Foods',
    description: 'Complete floating sticks for turtles with added Spirulina and stabilized Vitamin C. 100% original formula for healthy shell and growth.',
    price: 229,
    images: [{ 
      url: '/assets/fish_foods/taiyo_turtlefood.jpg', 
      alt: 'Taiyo Turtle Food' 
    }],
    stock: 70,
    rating: 4.7,
    numReviews: 45,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Floating Sticks',
      'Net Weight': '100g',
      'Suitable For': 'Turtles',
      'Features': 'With Spirulina, Vitamin C'
    }
  },
  {
    name: 'Taiyo Vacation Weekend Fish Food',
    category: 'Fish Foods',
    description: 'New formula weekend food for all tropical fish. One block will feed 7-12 average sized fish. Never clouds the water, perfect for vacations.',
    price: 179,
    images: [{ 
      url: '/assets/fish_foods/Taiyo-Vacation-Food.png', 
      alt: 'Taiyo Vacation Weekend Fish Food' 
    }],
    stock: 110,
    rating: 4.8,
    numReviews: 92,
    isFeatured: true,
    specifications: {
      'Brand': 'Taiyo',
      'Type': 'Vacation Food',
      'Suitable For': 'All Tropical Fish',
      'Features': 'Non-clouding, 7-12 fish per block'
    }
  },
  {
    name: 'Tetra Bits Breeding Plus 100g',
    category: 'Fish Foods',
    description: 'BioActive formula daily diet for all tropical parent fishes. Improves quality of spawning and supports breeding health.',
    price: 299,
    images: [{ 
      url: '/assets/fish_foods/tetrabits_100g.jpeg', 
      alt: 'Tetra Bits Breeding Plus' 
    }],
    stock: 85,
    rating: 4.6,
    numReviews: 73,
    specifications: {
      'Brand': 'Tetra',
      'Type': 'Breeding Plus',
      'Net Weight': '100g',
      'Features': 'BioActive Formula',
      'Suitable For': 'Breeding Fish'
    }
  },
  {
    name: 'True Color Oscar Fish Feed',
    category: 'Fish Foods',
    description: 'Specially formulated for Oscar fish. Enhances natural colors and provides complete nutrition for healthy growth.',
    price: 269,
    images: [{ 
      url: '/assets/fish_foods/true-colour-oscarfood.jpg', 
      alt: 'True Color Oscar Fish Feed' 
    }],
    stock: 65,
    rating: 4.5,
    numReviews: 41,
    specifications: {
      'Brand': 'True Color',
      'Type': 'Color Enhancing',
      'Suitable For': 'Oscar Fish'
    }
  },
  {
    name: 'Ultima Micro Pellet 50g',
    category: 'Fish Foods',
    description: 'Krill energy formula with multi vitamins (A, C, E, B1, B2, B6, B12). Promotes growth, enhances color, complete nutrition, non-fouling of water.',
    price: 189,
    images: [{ 
      url: '/assets/fish_foods/ultima_micropellet_50g.jpg', 
      alt: 'Ultima Micro Pellet' 
    }],
    stock: 145,
    rating: 4.7,
    numReviews: 88,
    specifications: {
      'Brand': 'Ultima',
      'Type': 'Micro Pellet',
      'Net Weight': '50g',
      'Features': 'Krill Energy, Multi Vitamins',
      'Vitamins': 'A, C, E, B1, B2, B6, B12'
    }
  },
  {
    name: 'Ultima Betta Food Micro Pellets 20g',
    category: 'Fish Foods',
    description: 'Premium daily floating type micro pellets for all betta fish. Krill energy formula promotes growth and enhances color. Rich in multi vitamins.',
    price: 159,
    images: [{ 
      url: '/assets/fish_foods/ULTIMA-BETTA-Pouch-Front.png', 
      alt: 'Ultima Betta Food Micro Pellets' 
    }],
    stock: 155,
    rating: 4.9,
    numReviews: 112,
    isFeatured: true,
    specifications: {
      'Brand': 'Ultima',
      'Type': 'Micro Pellets',
      'Net Weight': '20g',
      'Suitable For': 'Betta Fish',
      'Features': 'Krill Energy, Multi Vitamins',
      'Vitamins': 'A, C, E, B1, B2, B6, B12'
    }
  }
];

// ========== LIVE FISHES ==========
const liveFishes = [
  {
    name: 'Neon Tetra',
    category: 'Live Fishes',
    description: 'Beautiful schooling fish with iridescent blue and red stripes. Peaceful and perfect for community tanks. Each pack contains 10 healthy, active Neon Tetras.',
    price: 499,
    images: [{ 
      url: '/assets/live_fishes/NeonTetra.webp', 
      alt: 'Neon Tetra Fish' 
    }],
    stock: 25,
    rating: 4.8,
    numReviews: 156,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Paracheirodon innesi',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '1.5 inches',
      'Minimum Tank Size': '10 gallons',
      'Diet': 'Omnivore',
      'Lifespan': '5-8 years'
    }
  },
  {
    name: 'Guppy Fish Normal(Pair - 1M + 1F)',
    category: 'Live Fishes',
    description: 'Colorful livebearers, easy to care for. One male and one female included. Males have vibrant colors, females are larger and ready to breed. Perfect for beginners.',
    price: 90,
    images: [{ 
      url: '/assets/live_fishes/Guppy.webp', 
      alt: 'Guppy Fish' 
    }],
    stock: 40,
    rating: 4.7,
    numReviews: 203,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Poecilia reticulata',
      'Care Level': 'Very Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2 inches',
      'Minimum Tank Size': '10 gallons',
      'Breeding': 'Livebearer',
      'Lifespan': '2-3 years'
    }
  },
  {
    name: 'Angelfish (Silver)',
    category: 'Live Fishes',
    description: 'Elegant cichlids with long flowing fins. Great centerpiece fish for larger aquariums. Each fish is 2-3 inches in size. Known for their graceful swimming pattern.',
    price: 150,
    images: [{ 
      url: '/assets/live_fishes/angel-fish.webp', 
      alt: 'Silver Angelfish' 
    }],
    stock: 15,
    rating: 4.9,
    numReviews: 89,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Pterophyllum scalare',
      'Care Level': 'Moderate',
      'Temperament': 'Semi-aggressive',
      'Max Size': '6 inches',
      'Minimum Tank Size': '30 gallons',
      'Diet': 'Carnivore',
      'Lifespan': '10-12 years'
    }
  },
  {
    name: 'Betta Fish (Male - Halfmoon)',
    category: 'Live Fishes',
    description: 'Siamese fighting fish with vibrant colors and flowing fins. Each one is unique with stunning halfmoon tail. Available in red, blue, purple, and multicolor varieties.',
    price: 200,
    images: [{ 
      url: '/assets/live_fishes/betta.webp', 
      alt: 'Halfmoon Betta Fish' 
    }],
    stock: 20,
    rating: 4.9,
    numReviews: 312,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Betta splendens',
      'Care Level': 'Easy',
      'Temperament': 'Aggressive (alone)',
      'Max Size': '3 inches',
      'Minimum Tank Size': '5 gallons',
      'Diet': 'Carnivore',
      'Lifespan': '3-5 years'
    }
  },
  {
    name: 'Corydoras Catfish',
    category: 'Live Fishes',
    description: 'Adorable bottom-dwellers that clean up leftover food. Peaceful community fish that do best in groups. Pack includes 6 healthy corydoras catfish.',
    price: 499,
    images: [{ 
      url: '/assets/live_fishes/corydoras_sterbai.jpg', 
      alt: 'Corydoras Catfish' 
    }],
    stock: 30,
    rating: 4.8,
    numReviews: 124,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Corydoras aeneus',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2.5 inches',
      'Minimum Tank Size': '20 gallons',
      'Diet': 'Omnivore (Bottom feeder)',
      'Lifespan': '5-7 years'
    }
  },
  {
    name: 'Molly Fish (Black) - Pair',
    category: 'Live Fishes',
    description: 'Hardy livebearers, perfect for beginners. Peaceful and active. One male and one female included. Solid black coloration adds elegance to any tank.',
    price: 80,
    images: [{ 
      url: '/assets/live_fishes/molly-black.jpg', 
      alt: 'Black Molly Fish' 
    }],
    stock: 25,
    rating: 4.6,
    numReviews: 78,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Poecilia sphenops',
      'Care Level': 'Very Easy',
      'Temperament': 'Peaceful',
      'Max Size': '3 inches',
      'Minimum Tank Size': '20 gallons',
      'Breeding': 'Livebearer',
      'Lifespan': '3-5 years'
    }
  },
  {
    name: 'Discus Fish (Red Turquoise)',
    category: 'Live Fishes',
    description: 'King of the aquarium! Stunning colors and patterns. Requires experienced care. 3-4 inches in size. Red turquoise variety features vibrant red and blue patterns.',
    price: 2499,
    images: [{ 
      url: '/assets/live_fishes/Red_Turq_Discus.webp', 
      alt: 'Discus Fish' 
    }],
    stock: 8,
    rating: 5.0,
    numReviews: 34,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Symphysodon discus',
      'Care Level': 'Expert',
      'Temperament': 'Peaceful',
      'Max Size': '6 inches',
      'Minimum Tank Size': '50 gallons',
      'Diet': 'Specialized',
      'Lifespan': '10-15 years'
    }
  },
  {
    name: 'Zebra Danio (Pack of 4)',
    category: 'Live Fishes',
    description: 'Active, hardy fish with distinctive zebra stripes. Great for community tanks. Pack of 6 active danios. Excellent choice for beginners.',
    price: 240,
    images: [{ 
      url: '/assets/live_fishes/zebrafish.webp', 
      alt: 'Zebra Danio' 
    }],
    stock: 35,
    rating: 4.7,
    numReviews: 92,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Danio rerio',
      'Care Level': 'Very Easy',
      'Temperament': 'Active, peaceful',
      'Max Size': '2 inches',
      'Minimum Tank Size': '10 gallons',
      'Diet': 'Omnivore',
      'Lifespan': '3-5 years'
    }
  },
  {
    name: 'Platy Fish (Red) - Pair',
    category: 'Live Fishes',
    description: 'Colorful livebearers with bright red coloration. Peaceful and active, great for community tanks. One male and one female included.',
    price: 90,
    images: [{ 
      url: '/assets/live_fishes/platy(red).webp', 
      alt: 'Red Platy Fish' 
    }],
    stock: 28,
    rating: 4.6,
    numReviews: 67,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Xiphophorus maculatus',
      'Care Level': 'Very Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2.5 inches',
      'Minimum Tank Size': '10 gallons',
      'Breeding': 'Livebearer',
      'Lifespan': '3-4 years'
    }
  },
  {
    name: 'Swordtail Fish (Red) - Pair',
    category: 'Live Fishes',
    description: 'Distinctive fish with sword-like tail extension in males. Bright red coloration. Active and peaceful community fish. One male and one female.',
    price: 100,
    images: [{ 
      url: '/assets/live_fishes/Swordtail-fish.jpg', 
      alt: 'Red Swordtail Fish' 
    }],
    stock: 22,
    rating: 4.5,
    numReviews: 58,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Xiphophorus hellerii',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '4 inches',
      'Minimum Tank Size': '20 gallons',
      'Breeding': 'Livebearer',
      'Lifespan': '3-5 years'
    }
  },
  {
    name: 'Cherry Barb (Pack of 4)',
    category: 'Live Fishes',
    description: 'Beautiful red schooling fish. Males develop intense cherry-red coloration. Peaceful community fish. Pack of 6 healthy cherry barbs.',
    price: 200,
    images: [{ 
      url: '/assets/live_fishes/CherryBarb.webp', 
      alt: 'Cherry Barb' 
    }],
    stock: 32,
    rating: 4.7,
    numReviews: 83,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Puntius titteya',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2 inches',
      'Minimum Tank Size': '20 gallons',
      'Diet': 'Omnivore',
      'Lifespan': '5-7 years'
    }
  },
  {
    name: 'Harlequin Rasbora (Pack of 6)',
    category: 'Live Fishes',
    description: 'Stunning schooling fish with distinctive black triangular patch. Peaceful and active. Pack of 6 healthy harlequin rasboras.',
    price: 499,
    images: [{ 
      url: '/assets/live_fishes/harlequin_rasboras.webp', 
      alt: 'Harlequin Rasbora' 
    }],
    stock: 26,
    rating: 4.8,
    numReviews: 71,
    isFeatured: false,
    specifications: {
      'Scientific Name': 'Trigonostigma heteromorpha',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2 inches',
      'Minimum Tank Size': '15 gallons',
      'Diet': 'Omnivore',
      'Lifespan': '5-8 years'
    }
  },
  {
    name: 'Kuhli Loach',
    category: 'Live Fishes',
    description: 'Unique eel-like bottom dwellers. Peaceful and entertaining to watch. Great for community tanks. Pack of 4 striped kuhli loaches.',
    price: 450,
    images: [{ 
      url: '/assets/live_fishes/kulhi-loach.webp', 
      alt: 'Kuhli Loach' 
    }],
    stock: 18,
    rating: 4.7,
    numReviews: 46,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Pangio kuhlii',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '4 inches',
      'Minimum Tank Size': '20 gallons',
      'Diet': 'Omnivore (Bottom feeder)',
      'Lifespan': '10-14 years'
    }
  },
  {
    name: 'Honey Gourami (Pair)',
    category: 'Live Fishes',
    description: 'Beautiful peaceful gouramis with honey-yellow coloration. Males develop darker throat during breeding. One male and one female included.',
    price: 150,
    images: [{ 
      url: '/assets/live_fishes/Honey-Gourami.jpg', 
      alt: 'Honey Gourami' 
    }],
    stock: 20,
    rating: 4.8,
    numReviews: 52,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Trichogaster chuna',
      'Care Level': 'Easy',
      'Temperament': 'Peaceful',
      'Max Size': '2 inches',
      'Minimum Tank Size': '15 gallons',
      'Diet': 'Omnivore',
      'Lifespan': '4-6 years'
    }
  },
  {
    name: 'Otocinclus Catfish (Pack of 4)',
    category: 'Live Fishes',
    description: 'Excellent algae eaters for planted tanks. Peaceful and small. Perfect for keeping glass and plants clean. Pack of 4 otocinclus catfish.',
    price: 599,
    images: [{ 
      url: '/assets/live_fishes/Otocinclus.webp', 
      alt: 'Otocinclus Catfish' 
    }],
    stock: 24,
    rating: 4.8,
    numReviews: 64,
    isFeatured: true,
    specifications: {
      'Scientific Name': 'Otocinclus affinis',
      'Care Level': 'Moderate',
      'Temperament': 'Peaceful',
      'Max Size': '1.5 inches',
      'Minimum Tank Size': '15 gallons',
      'Diet': 'Herbivore (Algae eater)',
      'Lifespan': '3-5 years'
    }
  }
];

// Export the liveFishes array
module.exports = liveFishes;

// Sample users (admin and test user)
const users = [
  {
    name: 'Admin User',
    email: 'admin@eliteaquarium.com',
    password: 'Admin@123456',
    phone: '9876543210',
    address: {
      street: '123 Admin Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
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
      pincode: '110001',
      country: 'India'
    },
    role: 'user'
  }
];

// ========== MAIN SEEDING FUNCTION ==========
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🔄 Clearing existing products...');
    await Product.deleteMany({});
    console.log('🔄 Clearing existing users...');
    await User.deleteMany({});

    // Combine all products
    const allProducts = [
      ...fishFoods,
      ...fishMedicines,
      ...heaters,
      ...filters,
      ...lights,
      ...liveFishes
    ];
    
    // Insert all products
    console.log(`📦 Inserting ${allProducts.length} products...`);
    console.log(`   - Fish Foods: ${fishFoods.length} products`);
    console.log(`   - Fish Medicines: ${fishMedicines.length} products`);
    console.log(`   - Heaters: ${heaters.length} products`);
    console.log(`   - Filters: ${filters.length} products`);
    console.log(`   - Lights: ${lights.length} products`);
    console.log(`   - Live Fishes: ${liveFishes.length} products`);
    
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`✅ Inserted ${insertedProducts.length} total products`);

    // Hash passwords and insert users
    console.log('👤 Creating users...');
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );
    
    const insertedUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Created ${insertedUsers.length} users`);

    // Summary
    console.log('\n📊 SEEDING COMPLETE!');
    console.log('===================');
    console.log(`Total Products: ${insertedProducts.length}`);
    console.log(`- Fish Foods: ${fishFoods.length}`);
    console.log(`- Fish Medicines: ${fishMedicines.length}`);
    console.log(`- Heaters: ${heaters.length}`);
    console.log(`- Filters: ${filters.length}`);
    console.log(`- Lights: ${lights.length}`);
    console.log(`- Live Fishes: ${liveFishes.length}`);
    console.log(`Users added: ${insertedUsers.length}`);
    
    console.log('\n👤 User Credentials:');
    console.log('Admin - admin@eliteaquarium / Admin@123456');
    console.log('User - john@example.com / password123');
    
    console.log('\n📦 Products by Category:');
    
    // Count products by category
    const products = await Product.find({});
    const categoryCount = {};
    products.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();