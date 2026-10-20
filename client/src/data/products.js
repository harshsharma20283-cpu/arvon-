export const CATEGORIES = [
  "All Pieces",
  "Mugs & Cups",
  "Vases & Vessels",
  "Bowls & Tableware",
  "Home Decor & Accents"
];

export const PRODUCTS = [
  {
    id: "arvon-mug-01",
    title: "Dune Speckled Stoneware Mug",
    subtitle: "Wheel-thrown raw clay with matte bone glaze",
    category: "Mugs & Cups",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    stockCount: 14,
    badge: "Bestseller",
    artisan: "Arvon Studio Kiln",
    image: "/images/dune-mug.svg",
    additionalImages: [
      "/images/dune-mug.svg",
      "/images/dune-mug-detail.svg"
    ],
    description: "Individually thrown on a kick-wheel using iron-rich terracotta stoneware. Glazed in a soft oat-white reactive dip that reveals subtle specks and fire-marks from the 1240°C high kiln firing. The broad thumb rest makes every morning brew comforting.",
    specs: {
      capacity: "340 ml (11.5 oz)",
      dimensions: "9.5 cm H × 8.5 cm Ø",
      clay: "Wild iron-bearing stoneware clay",
      finish: "Unglazed exposed base, food-safe satin interior",
      care: "Microwave & dishwasher safe (handwash recommended)"
    }
  },
  {
    id: "arvon-mug-02",
    title: "Terracotta Cloud Espresso Cup & Saucer",
    subtitle: "Fluted handle espresso duo with unglazed saucer",
    category: "Mugs & Cups",
    price: 749,
    originalPrice: 950,
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 8,
    badge: "Staff Pick",
    artisan: "Meera Sen, Pondicherry Studio",
    image: "/images/espresso-cup.svg",
    additionalImages: [
      "/images/espresso-cup.svg",
      "/images/espresso-cup-saucer.svg"
    ],
    description: "Designed for slow mornings and double shots. A thick thermal wall retains heat naturally, paired with a tactile rough-sanded saucer crafted from natural red alluvial earth. Each set bears the artisan's signature impressed seal on the base.",
    specs: {
      capacity: "120 ml (4 oz)",
      dimensions: "6 cm H × 6.5 cm Ø",
      clay: "Red alluvial earthenware & kaolin",
      finish: "Eggshell chalk slip interior",
      care: "Handwash with mild soap"
    }
  },
  {
    id: "arvon-mug-03",
    title: "Sienna Ribbed Cappuccino Mug",
    subtitle: "Deep umber ribbed body with ergonomic loop handle",
    category: "Mugs & Cups",
    price: 949,
    originalPrice: 1250,
    rating: 5.0,
    reviewCount: 91,
    inStock: true,
    stockCount: 11,
    badge: "Popular",
    artisan: "Arvon Studio Kiln",
    image: "/images/sienna-mug.svg",
    additionalImages: [
      "/images/sienna-mug.svg",
      "/images/sienna-mug-detail.svg"
    ],
    description: "Hand-grooved ridges provide a textured tactile grip that warms hands on cool evenings. Kiln-fired with natural copper oxide slip for a rustic autumnal ombre finish that deepens toward the base.",
    specs: {
      capacity: "380 ml (13 oz)",
      dimensions: "10 cm H × 9 cm Ø",
      clay: "Ball clay with crushed grog",
      finish: "Umber oxide wash with semi-matte sealant",
      care: "Microwave and dishwasher safe"
    }
  },
  {
    id: "arvon-mug-04",
    title: "Komorebi Matcha Chawan & Whisk Stand",
    subtitle: "Ceremonial ceramic tea bowl with wood-ash glaze",
    category: "Mugs & Cups",
    price: 1450,
    originalPrice: 1800,
    rating: 4.9,
    reviewCount: 35,
    inStock: true,
    stockCount: 5,
    badge: "Limited Batch",
    artisan: "Devraj Ceramic Arts",
    image: "/images/matcha-chawan.svg",
    additionalImages: [
      "/images/matcha-chawan.svg",
      "/images/matcha-whisk.svg"
    ],
    description: "Crafted following classic Wabi-Sabi aesthetics with intentional organic asymmetry. Coated with organic wood-ash glaze that puddles into rich celadon hues during high-temperature reduction firing.",
    specs: {
      capacity: "420 ml",
      dimensions: "8 cm H × 12 cm Ø",
      clay: "White high-fire stoneware",
      finish: "Natural wood-ash celadon glaze",
      care: "Rinse gently with warm water"
    }
  },
  {
    id: "arvon-vase-01",
    title: "Alba Fluted Sculptural Vase",
    subtitle: "Architectural fluted stoneware statement vessel",
    category: "Vases & Vessels",
    price: 2199,
    originalPrice: 2899,
    rating: 5.0,
    reviewCount: 54,
    inStock: true,
    stockCount: 6,
    badge: "New Release",
    artisan: "Ananya Rao Studio",
    image: "/images/alba-vase.svg",
    additionalImages: [
      "/images/alba-vase.svg",
      "/images/alba-vase-fluted.svg"
    ],
    description: "A commanding decorative vessel inspired by Brutalist columns and dry riverbeds. Its vertical fluting catches the ambient sunlight across rooms. Watertight interior suitable for fresh botanicals or dried pampas.",
    specs: {
      dimensions: "26 cm H × 14 cm Ø (Neck: 6 cm)",
      weight: "1.4 kg",
      clay: "Coarse grogged buff stoneware",
      finish: "Chalky bone matte finish",
      care: "Wipe with damp cloth"
    }
  },
  {
    id: "arvon-vase-02",
    title: "Terra Amphora Handle Vase",
    subtitle: "Dual-handled rustic vessel in unglazed terracotta",
    category: "Vases & Vessels",
    price: 1850,
    originalPrice: 2400,
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    stockCount: 9,
    badge: "Bestseller",
    artisan: "Khurja Heritage Collective",
    image: "/images/terra-amphora.svg",
    additionalImages: [
      "/images/terra-amphora.svg",
      "/images/terra-amphora-detail.svg"
    ],
    description: "Rooted in ancient Mediterranean and Indus pottery forms. Features pinched loop ears and a coarse textured exterior that celebrates the mineral rich Indian terracotta earth.",
    specs: {
      dimensions: "22 cm H × 16 cm W (Ear to Ear)",
      weight: "1.1 kg",
      clay: "Local red terracotta clay",
      finish: "Natural porous exterior with glazed waterproof interior liner",
      care: "Dust with dry soft brush"
    }
  },
  {
    id: "arvon-vase-03",
    title: "Solace Petite Bud Vase Trio",
    subtitle: "Set of three miniature stoneware vessels",
    category: "Vases & Vessels",
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 77,
    inStock: true,
    stockCount: 16,
    badge: "Gift Favorite",
    artisan: "Arvon Studio Kiln",
    image: "/images/solace-vases.svg",
    additionalImages: [
      "/images/solace-vases.svg",
      "/images/solace-vases-trio.svg"
    ],
    description: "Curated trio in complementary muted shades: Oatmeal, Dusty Olive, and Burnt Clay. Perfect for single wildflower stems, eucalyptus sprigs, or styling along bookshelves and window sills.",
    specs: {
      dimensions: "Approx. 11 cm H each",
      weight: "650 g combined",
      clay: "Porcelain-stoneware blend",
      finish: "Satin glaze with speckled undertones",
      care: "Handwash only"
    }
  },
  {
    id: "arvon-bowl-01",
    title: "Kintsugi-Inspired Ceramic Ramen Bowl",
    subtitle: "Deep flared serving bowl with chopstick rest notch",
    category: "Bowls & Tableware",
    price: 1199,
    originalPrice: 1550,
    rating: 4.9,
    reviewCount: 83,
    inStock: true,
    stockCount: 12,
    badge: "Bestseller",
    artisan: "Arvon Studio Kiln",
    image: "/images/kintsugi-bowl.svg",
    additionalImages: [
      "/images/kintsugi-bowl.svg",
      "/images/kintsugi-bowl-gold.svg"
    ],
    description: "Designed for steaming broths, grain bowls, and mindful dining. Each bowl features a subtle hand-painted gold oxide rim accent honoring the philosophy of finding beauty in imperfection.",
    specs: {
      capacity: "850 ml",
      dimensions: "9 cm H × 19 cm Ø",
      clay: "Stoneware clay with silica grog",
      finish: "Charcoal matte exterior, glossy reactive interior",
      care: "Microwave & dishwasher safe"
    }
  },
  {
    id: "arvon-bowl-02",
    title: "Organica Shallow Pasta Plates (Set of 2)",
    subtitle: "Wide undulating rim plates for artisan dining",
    category: "Bowls & Tableware",
    price: 1799,
    originalPrice: 2200,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    stockCount: 7,
    badge: "Hand-Pinched",
    artisan: "Meera Sen",
    image: "/images/organica-plates.svg",
    additionalImages: [
      "/images/organica-plates.svg",
      "/images/organica-plates-detail.svg"
    ],
    description: "Slab-rolled and slumped over organic molds for softly irregular edges. The subtle curve holds risottos, salads, or handmade pastas with effortless European bistro elegance.",
    specs: {
      dimensions: "4 cm H × 23 cm Ø",
      weight: "1.2 kg (pair)",
      clay: "Cream speckled stoneware",
      finish: "Silk matte white glaze",
      care: "Dishwasher safe"
    }
  },
  {
    id: "arvon-decor-01",
    title: "Monolith Ceramic Incense & Candleholder",
    subtitle: "Multifunctional sculptural brass-fitted clay stand",
    category: "Home Decor & Accents",
    price: 699,
    originalPrice: 899,
    rating: 4.7,
    reviewCount: 51,
    inStock: true,
    stockCount: 20,
    badge: "Popular",
    artisan: "Arvon Studio Kiln",
    image: "/images/monolith-candle.svg",
    additionalImages: [
      "/images/monolith-candle.svg",
      "/images/monolith-candle-holder.svg"
    ],
    description: "Accommodates both taper candles and dhoop/incense sticks. Cast in heavy stoneware to remain stable on coffee tables, altar nooks, and bedside nightstands.",
    specs: {
      dimensions: "7 cm H × 11 cm W",
      weight: "380 g",
      clay: "Charcoal iron clay",
      finish: "Matte raw stone texture",
      care: "Wipe wax gently with warm cloth"
    }
  },
  {
    id: "arvon-decor-02",
    title: "Sylvan Ceramic Oil Diffuser & Warmer",
    subtitle: "Porous ceramic aroma lamp with carved tea-light arch",
    category: "Home Decor & Accents",
    price: 1150,
    originalPrice: 1450,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 10,
    badge: "Relaxation",
    artisan: "Devraj Ceramic Arts",
    image: "/images/sylvan-diffuser.svg",
    additionalImages: [
      "/images/sylvan-diffuser.svg",
      "/images/sylvan-diffuser-lamp.svg"
    ],
    description: "Fill your space with botanical fragrances. The gently cupped basin holds water and pure essential oils above a flicker of tea-light warmth, radiating amber light through its hand-carved arch.",
    specs: {
      dimensions: "13 cm H × 10 cm Ø",
      clay: "Stoneware & grog",
      finish: "Raw terracotta base with glazed well",
      care: "Rinse dish after oil use"
    }
  },
  {
    id: "arvon-decor-03",
    title: "Arvon Clay Footed Catchall Dish",
    subtitle: "Three-legged trinket dish for jewelry and crystals",
    category: "Home Decor & Accents",
    price: 549,
    originalPrice: 750,
    rating: 4.8,
    reviewCount: 62,
    inStock: true,
    stockCount: 18,
    badge: "Under ₹600",
    artisan: "Ananya Rao Studio",
    image: "/images/arvon-catchall.svg",
    additionalImages: [
      "/images/arvon-catchall.svg",
      "/images/arvon-catchall-dish.svg"
    ],
    description: "Resting on three rounded tripod clay feet, this hand-pressed dish holds your daily rings, keys, or sage bundles with earthy grace.",
    specs: {
      dimensions: "4.5 cm H × 13 cm Ø",
      weight: "260 g",
      clay: "White stoneware",
      finish: "Speckled oatmeal glaze",
      care: "Wipe clean with a damp sponge"
    }
  }
];

export const STUDIO_FEATURES = [
  {
    title: "100% Lead-Free & Non-Toxic",
    desc: "All tablewares are fired at 1240°C with certified food-safe mineral glazes.",
    icon: "ShieldCheck"
  },
  {
    title: "Hand-Thrown in India",
    desc: "Supporting traditional studio potters and master artisans in Khurja & Pondicherry.",
    icon: "Sparkles"
  },
  {
    title: "Zero-Plastic Eco Packaging",
    desc: "Cushioned with honeycomb kraft paper and recycled plant-based cushioning.",
    icon: "PackageCheck"
  },
  {
    title: "Free Express Shipping Across India",
    desc: "Complimentary transit insurance on all orders above ₹1,499.",
    icon: "Truck"
  }
];
