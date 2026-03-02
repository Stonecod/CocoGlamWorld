// COCOGLAMWORLD - PRODUCTS DATA
// ========================================
// EASY TO UPDATE: Just add, remove, or modify products below
// No need to edit HTML files!

const productsData = [
    // LIP GLOSS COLLECTION
    {
        id: 1,
        name: "Ruby Red",
        category: "lips",
        swatch: "#C21807",
        imageUrl: "images/Brightorangegloss.jpg",
        price: 3500,
        description: "Rich ruby-red gloss with mirror-like shine.",
        benefits: ["High shine", "Hydrating", "Long-lasting"]
    },
    {
        id: 2,
        name: "Nude Glow",
        category: "lips",
        swatch: "#E0AC69",
        imageUrl: "images/Lipglossinbrown.jpg",
        price: 3500,
        description: "Subtle nude shade that enhances natural lip tone.",
        benefits: ["Sheer finish", "Moisturizing", "Non-sticky"]
    },
    {
        id: 3,
        name: "Pink Blossom",
        category: "lips",
        swatch: "#FF85A1",
        imageUrl: "images/Lightpinkgloss.jpg",
        price: 3500,
        description: "Soft pink gloss inspired by spring blossom.",
        benefits: ["Delicate color", "Vitamin E", "Smooth application"]
    },
    {
        id: 4,
        name: "Cocoa Shine",
        category: "lips",
        swatch: "#7B3F00",
        imageUrl: "images/Lipglosschocolate.jpg",
        price: 3500,
        description: "Warm cocoa shade with a kiss of shimmer.",
        benefits: ["Rich pigment", "Glossy finish", "Nourishing"]
    },
    {
        id: 5,
        name: "Clear Crystal",
        category: "lips",
        swatch: "#FFFFFF",
        imageUrl: "images/Transparentlipgloss.jpg",
        price: 3000,
        description: "Crystal clear gloss for an ultra-glassy look.",
        benefits: ["Crystal clarity", "Lightweight", "Universal"]
    },

    // FACE CARE PRODUCTS (Coming Soon)
    {
        id: 8,
        name: "Face Mask",
        category: "face",
        icon: "🧴",
        imageUrl: "",
        price: 0,
        description: "Deep cleansing and revitalizing face mask",
        benefits: ["Detoxifying", "Brightening", "Moisturizing"],
        comingSoon: true
    },
    {
        id: 9,
        name: "Face Cleanser",
        category: "face",
        icon: "🧼",
        imageUrl: "",
        price: 0,
        description: "Gentle daily face cleanser for all skin types",
        benefits: ["Removes makeup", "Non-stripping", "Refreshing"],
        comingSoon: true
    },
    {
        id: 10,
        name: "Face Serum",
        category: "face",
        icon: "💧",
        imageUrl: "",
        price: 0,
        description: "Anti-aging facial serum with vitamin C",
        benefits: ["Brightening", "Anti-aging", "Lightweight"],
        comingSoon: true
    },
    {
        id: 11,
        name: "Face Moisturizer",
        category: "face",
        icon: "💎",
        imageUrl: "",
        price: 0,
        description: "Rich hydrating moisturizer for dry skin",
        benefits: ["Long-lasting", "Non-greasy", "Nourishing"],
        comingSoon: true
    },

    // BODY CARE PRODUCTS (Coming Soon)
    {
        id: 12,
        name: "Hand Cream",
        category: "body",
        icon: "🧴",
        imageUrl: "",
        price: 0,
        description: "Rich, nourishing cream for soft hands",
        benefits: ["Moisturizing", "Protective", "Anti-aging"],
        comingSoon: true
    },
    {
        id: 13,
        name: "Body Lotion",
        category: "body",
        icon: "🧴",
        imageUrl: "",
        price: 0,
        description: "Silky body lotion for smooth skin",
        benefits: ["Hydrating", "Lightweight", "Fragrant"],
        comingSoon: true
    },
    {
        id: 14,
        name: "Body Scrub",
        category: "body",
        icon: "🧴",
        imageUrl: "",
        price: 0,
        description: "Exfoliating body scrub for radiant skin",
        benefits: ["Exfoliates", "Polishes", "Softening"],
        comingSoon: true
    },
    {
        id: 15,
        name: "Contact Lens",
        category: "body",
        icon: "👁️",
        imageUrl: "",
        price: 0,
        description: "Comfortable contact lenses for eye care",
        benefits: ["Comfortable", "Long-lasting", "Clear vision"],
        comingSoon: true
    }
];

// FEATURED PRODUCTS FOR HOMEPAGE (displays first 4 lips products)
const featuredProducts = productsData.filter(p => p.category === 'lips').slice(0, 4);