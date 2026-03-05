// Data for spa services
// You can add a property `imageUrl` pointing to an image file in the
// `images` folder (e.g. "images/services/swedish-massage.jpg").
// If none is provided, a generic placeholder will be used.
const servicesData = [
    // Massages
    {
        category: 'Massages',
        name: 'Swedish Massage',
        imageUrl: 'images/services/swedish-massage.jpg',
        price: 20000,
        description: 'Relaxing full body massage using long, gliding strokes.',
        duration: '60–90 minutes',
        popular: true
    },
    {
        category: 'Massages',
        name: 'Deep Tissue Massage',
        imageUrl: 'images/services/deep-tissue-massage.jpg',
        price: 25000,
        description: 'Focused pressure to relieve deep muscle tension.',
        duration: '60–90 minutes',
        popular: false
    },
    // Nails
    {
        category: 'Nails',
        name: 'Manicure',
        imageUrl: 'images/services/manicure.jpg',
        price: 5000,
        description: 'Classic manicure to keep your hands neat and polished.',
        duration: '45–60 minutes',
        popular: false
    },
    {
        category: 'Nails',
        name: 'Pedicure',
        imageUrl: 'images/services/pedicure.jpg',
        price: 10000,
        description: 'Soothing pedicure for soft and beautiful feet.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Nails',
        name: 'Gel Polish + Fixing of Big Toes',
        imageUrl: 'images/services/gel-polish-big-toes.jpg',
        price: 7500,
        description: 'Long-lasting gel polish with special big toe care.',
        duration: '60 minutes',
        popular: true
    },
    // Facials
    {
        category: 'Facials',
        name: 'Basic Facial',
        imageUrl: 'images/services/basic-facial.jpg',
        price: 10000,
        description: 'Gentle cleanse, exfoliation and hydration for radiant skin.',
        duration: '45–60 minutes',
        popular: false
    },
    {
        category: 'Facials',
        name: 'Acne Facial',
        imageUrl: 'images/services/acne-facial.jpg',
        price: 15000,
        description: 'Targeted treatment to clear breakouts and calm irritation.',
        duration: '60 minutes',
        popular: false
    },
    {
        category: 'Facials',
        name: 'Whitening Facial',
        imageUrl: 'images/services/whitening-facial.jpg',
        price: 20000,
        description: 'Brightening facial for a more even complexion.',
        duration: '60 minutes',
        popular: false
    },
    {
        category: 'Facials',
        name: 'Treatment Facial',
        imageUrl: 'images/services/treatment-facial.jpg',
        price: 20000,
        description: 'Specialised treatment for specific skin concerns.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Facials',
        name: 'Back Facial',
        imageUrl: 'images/services/back-facial.jpg',
        price: 30000,
        description: 'Deep clean and exfoliate the back area for smooth skin.',
        duration: '60 minutes',
        popular: false
    },
    // Body Treatments
    {
        category: 'Body Treatments',
        name: 'Body Scrub',
        imageUrl: 'images/services/body-scrub.jpg',
        price: 25000,
        description: 'Full body exfoliation to remove dead skin cells and glow.',
        duration: '60 minutes',
        popular: false
    },
    {
        category: 'Body Treatments',
        name: 'Full Body Waxing',
        imageUrl: 'images/services/full-body-waxing.jpg',
        price: 50000,
        description: 'Complete hair removal for smooth skin everywhere.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Body Treatments',
        name: 'Armpit Waxing',
        imageUrl: 'images/services/armpit-waxing.jpg',
        price: 10000,
        description: 'Quick and clean underarm waxing session.',
        duration: '30 minutes',
        popular: false
    },
    {
        category: 'Body Treatments',
        name: 'Bikini Waxing',
        imageUrl: 'images/services/bikini-waxing.jpg',
        price: 15000,
        description: 'Neat and precise bikini line waxing.',
        duration: '30–45 minutes',
        popular: false
    },
    {
        category: 'Body Treatments',
        name: 'Vajacial',
        imageUrl: 'images/services/vajacial.jpg',
        price: 40000,
        description: 'Skincare treatment for the bikini area to soothe and smooth.',
        duration: '60 minutes',
        popular: true
    }
];