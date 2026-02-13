// COCOGLAMWORLD - PRODUCTS DATA
// ========================================
// EASY TO UPDATE: Just add, remove, or modify products below
// No need to edit HTML files!

const productsData = [
    // LIP CARE PRODUCTS
    {
        id: 1,
        name: "Lip Gloss",
        category: "lips",
        icon: "💄",
        description: "High-shine, glossy lip color with hydrating formula",
        benefits: ["Long-lasting", "Hydrating", "Glossy finish"]
    },
    {
        id: 2,
        name: "Lip Balm",
        category: "lips",
        icon: "👄",
        description: "Nourishing, moisturizing lip care balm",
        benefits: ["Smoothens lips", "SPF protection", "Natural ingredients"]
    },
    {
        id: 3,
        name: "Lip Scrub",
        category: "lips",
        icon: "✨",
        description: "Gentle exfoliating lip scrub for soft lips",
        benefits: ["Exfoliates", "Moisturizes", "Smooth finish"]
    },
    {
        id: 4,
        name: "Pink Lip Cream",
        category: "lips",
        icon: "💋",
        description: "Rich, creamy lip color in beautiful pink shade",
        benefits: ["Moisturizing", "Pigmented", "Comfortable wear"]
    },
    {
        id: 5,
        name: "Lip Pencil",
        category: "lips",
        icon: "🖍️",
        description: "Precision lip liner for defined lips",
        benefits: ["Long-wearing", "Precision tip", "Comfortable"]
    },
    {
        id: 6,
        name: "Lip Mask",
        category: "lips",
        icon: "🫦",
        description: "Overnight lip treatment mask",
        benefits: ["Deep hydration", "Anti-aging", "Softening"]
    },
    {
        id: 7,
        name: "Lip Oil",
        category: "lips",
        icon: "💧",
        description: "Lightweight, nourishing lip oil",
        benefits: ["Hydrating", "Glossy", "Silky feel"]
    },

    // FACE CARE PRODUCTS
    {
        id: 8,
        name: "Face Mask",
        category: "face",
        icon: "🧴",
        description: "Deep cleansing and revitalizing face mask",
        benefits: ["Detoxifying", "Brightening", "Moisturizing"]
    },
    {
        id: 9,
        name: "Face Cleanser",
        category: "face",
        icon: "🧼",
        description: "Gentle daily face cleanser for all skin types",
        benefits: ["Removes makeup", "Non-stripping", "Refreshing"]
    },
    {
        id: 10,
        name: "Face Serum",
        category: "face",
        icon: "💧",
        description: "Anti-aging facial serum with vitamin C",
        benefits: ["Brightening", "Anti-aging", "Lightweight"]
    },
    {
        id: 11,
        name: "Face Moisturizer",
        category: "face",
        icon: "💎",
        description: "Rich hydrating moisturizer for dry skin",
        benefits: ["Long-lasting", "Non-greasy", "Nourishing"]
    },

    // BODY CARE PRODUCTS
    {
        id: 12,
        name: "Hand Cream",
        category: "body",
        icon: "🧴",
        description: "Rich, nourishing cream for soft hands",
        benefits: ["Moisturizing", "Protective", "Anti-aging"]
    },
    {
        id: 13,
        name: "Body Lotion",
        category: "body",
        icon: "🧴",
        description: "Silky body lotion for smooth skin",
        benefits: ["Hydrating", "Lightweight", "Fragrant"]
    },
    {
        id: 14,
        name: "Body Scrub",
        category: "body",
        icon: "🧴",
        description: "Exfoliating body scrub for radiant skin",
        benefits: ["Exfoliates", "Polishes", "Softening"]
    },
    {
        id: 15,
        name: "Contact Lens",
        category: "body",
        icon: "👁️",
        description: "Comfortable contact lenses for eye care",
        benefits: ["Comfortable", "Long-lasting", "Clear vision"]
    }
];

// FEATURED PRODUCTS FOR HOMEPAGE (displays first 4)
const featuredProducts = productsData.slice(0, 4);