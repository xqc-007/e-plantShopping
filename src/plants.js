// Prices are fictional USD unit prices. All botanical artwork is bundled locally.
const plant = (id, name, price, description, care) => ({ id, name, price, description, care, image: `images/${id}.svg` });

export const plantCategories = [
  {
    name: 'Everyday Greens',
    description: 'Easygoing companions that make any corner feel a little more alive.',
    plants: [
      plant('monstera', 'Monstera Deliciosa', 28, 'Sculptural, split leaves with a wonderfully tropical feel.', 'Bright indirect light'),
      plant('snake', 'Snake Plant', 22, 'Architectural upright leaves for a calm, contemporary space.', 'Low maintenance'),
      plant('pothos', 'Golden Pothos', 16, 'Golden-flecked vines that love to trail from a shelf.', 'Easy to grow'),
      plant('zz', 'ZZ Plant', 26, 'Glossy emerald leaves and a relaxed watering routine.', 'Low maintenance'),
      plant('rubber', 'Rubber Plant', 32, 'Deep green, glossy foliage with a bold silhouette.', 'Bright indirect light'),
      plant('spider', 'Spider Plant', 15, 'Playful, arching ribbons of green with pale stripes.', 'Easy to grow'),
    ],
  },
  {
    name: 'Aromatic Plants',
    description: 'Fragrant favourites for a sunny windowsill and moments of everyday pleasure.',
    plants: [
      plant('lavender', 'Lavender', 18, 'Soft purple blooms with a familiar, gentle fragrance.', 'Sunny spot'),
      plant('rosemary', 'Rosemary', 14, 'Fine, fragrant foliage that brings a Mediterranean touch.', 'Sunny spot'),
      plant('mint', 'Spearmint', 12, 'Fresh, textured leaves for a bright kitchen windowsill.', 'Keep soil moist'),
      plant('basil', 'Sweet Basil', 12, 'Lush green leaves with a sweet, unmistakable aroma.', 'Sunny spot'),
      plant('jasmine', 'Arabian Jasmine', 24, 'Delicate white blossoms and a rich floral fragrance.', 'Bright light'),
      plant('thyme', 'Lemon Thyme', 13, 'Tiny leaves with a bright citrus scent and trailing habit.', 'Sunny spot'),
    ],
  },
  {
    name: 'Succulents & Cacti',
    description: 'Small in size, full of character. Meet our sun-loving collection.',
    plants: [
      plant('aloe', 'Aloe Vera', 17, 'A sculptural rosette of thick, gently serrated leaves.', 'Allow soil to dry'),
      plant('jade', 'Jade Plant', 20, 'Rounded, fleshy leaves on sturdy branching stems.', 'Bright light'),
      plant('echeveria', 'Echeveria', 14, 'A neat rosette of powdery, blue-green leaves.', 'Sunny spot'),
      plant('zebra', 'Zebra Haworthia', 13, 'Compact, pointed leaves with striking pale stripes.', 'Bright indirect light'),
      plant('barrel', 'Golden Barrel Cactus', 21, 'A round, ribbed cactus with a sunny golden crown.', 'Sunny spot'),
      plant('christmas', 'Christmas Cactus', 19, 'Arching segmented stems with cheerful pink flowers.', 'Bright indirect light'),
    ],
  },
];

export const allPlants = plantCategories.flatMap(category => category.plants);
export const formatPrice = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
