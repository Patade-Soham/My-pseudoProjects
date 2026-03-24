export const products = [
  // Mars Rovers
  {
    id: 'mars-rover-001',
    name: 'Mars Rover Mini Model',
    category: 'mars-rovers',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 127,
    images: ['/images/mars_rover_mini.png'],
    description: "Detailed 1:32 scale replica of NASA's Perseverance Rover. Perfect for display or educational purposes.",
    features: ['Moving wheels', 'Articulated arm', 'Solar panels', 'Mission booklet'],
    specifications: { Scale: '1:32', Material: 'Die-cast metal', Dimensions: '15x10x8 cm' },
    inStock: true,
    isFeatured: true
  },
  {
    id: 'mars-rover-002',
    name: 'Mars Rover RC Edition',
    category: 'mars-rovers',
    price: 4999,
    rating: 4.6,
    reviews: 84,
    images: ['/images/mars_rover_rc.png'],
    description: "Remote control Mars Rover with built-in camera and all-terrain suspension.",
    features: ['HD Camera', 'App control', 'Suspension'],
    specifications: { Battery: 'Rechargeable', Range: '50m' },
    inStock: true,
    isFeatured: false
  },
  // Astronaut Gear
  {
    id: 'astro-gear-001',
    name: 'Astronaut Helmet Replica',
    category: 'astronaut-gear',
    price: 2799,
    rating: 4.9,
    reviews: 215,
    images: ['/images/astronaut_helmet.png'],
    description: "Museum-quality replica of an Apollo era astronaut helmet with gold-tinted visor.",
    features: ['Gold-tinted visor', 'Authentic decals', 'Padded interior'],
    specifications: { Material: 'Polycarbonate', Size: 'Adult Fit' },
    inStock: true,
    isFeatured: true
  },
  {
    id: 'astro-gear-002',
    name: 'Apollo Mission Patches',
    category: 'astronaut-gear',
    price: 599,
    rating: 4.7,
    reviews: 320,
    images: ['/images/mission_patches.png'],
    description: "Authentic reproductions of the Apollo mission patches. Set of 12.",
    features: ['Iron-on backing', 'High-quality embroidery'],
    specifications: { Count: '12 patches' },
    inStock: true,
    isFeatured: false
  },
  // Posters
  {
    id: 'poster-001',
    name: 'James Webb Deep Field',
    category: 'posters',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 5.0,
    reviews: 450,
    images: ['/images/jwst_poster.png'],
    description: "Stunning high-resolution poster of the James Webb Space Telescope's first deep field image.",
    features: ['Premium photo paper', 'Archival ink'],
    specifications: { Size: 'A2 (42x59.4 cm)' },
    inStock: true,
    isFeatured: true
  },
  // Telescopes
  {
    id: 'tele-001',
    name: 'Beginner Stargazing Kit',
    category: 'telescopes',
    price: 5999,
    rating: 4.5,
    reviews: 112,
    images: ['/images/telescope_kit.png'],
    description: "Perfect 70mm refractor telescope for beginners to explore the moon and planets.",
    features: ['Tripod included', '2 eyepieces', 'Moon map'],
    specifications: { Aperture: '70mm', FocalLength: '400mm' },
    inStock: true,
    isFeatured: true
  },
  // Gadgets
  {
    id: 'gadget-001',
    name: 'Levitating Moon Lamp',
    category: 'gadgets',
    price: 1299,
    originalPrice: 1599,
    discount: 18,
    rating: 4.8,
    reviews: 89,
    images: ['/images/moon_lamp.png'],
    description: "Magnetic levitating moon lamp that slowly rotates and changes color.",
    features: ['Magnetic levitation', '3 color modes', '3D printed texture'],
    specifications: { Diameter: '15cm', Power: 'AC Adapter' },
    inStock: true,
    isFeatured: true
  }
];
