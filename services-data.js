// Data for spa services with inclusive, professional imagery from Unsplash
const servicesData = [
    // Massages
    {
        category: 'Massages',
        name: 'Swedish Massage',
        imageUrl: 'https://images.unsplash.com/photo-1552821206-e4c7cb2b6d0a?w=800&q=80',
        price: 20000,
        description: 'Relaxing full body massage using long, gliding strokes.',
        duration: '60–90 minutes',
        popular: true
    },
    {
        category: 'Massages',
        name: 'Deep Tissue Massage',
        imageUrl: 'https://images.unsplash.com/photo-1600606667660-fc92659c2b16?w=800&q=80',
        price: 25000,
        description: 'Focused pressure to relieve deep muscle tension.',
        duration: '60–90 minutes',
        popular: false
    },
    // Nails
    {
        category: 'Nails',
        name: 'Manicure',
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
        price: 5000,
        description: 'Classic manicure to keep your hands neat and polished.',
        duration: '45–60 minutes',
        popular: false
    },
    {
        category: 'Nails',
        name: 'Pedicure',
        imageUrl: 'https://images.unsplash.com/photo-1604932160160-1c0e8fcdbf91?w=800&q=80',
        price: 10000,
        description: 'Soothing pedicure for soft and beautiful feet.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Nails',
        name: 'Gel Polish + Fixing of Big Toes',
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
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
    },
    {
        category: 'Massages',
        name: 'Aromatherapy Massage',
        imageUrl: 'images/services/aromatherapy-massage.jpg',
        price: 25000,
        description: 'Therapeutic massage with essential oils to promote relaxation and wellness.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Massages',
        name: 'Hot Stone Massage',
        imageUrl: 'images/services/hot-stone-massage.jpg',
        price: 40000,
        description: 'Therapeutic massage using heated stones to ease muscle tension and improve circulation.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Massages',
        name: 'Thai Massage',
        imageUrl: 'images/services/thai-massage.jpg',
        price: 40000,
        description: 'Traditional Thai massage combining acupressure and yoga-like stretching for deep relaxation.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Massages',
        name: 'Yoni Massage',
        imageUrl: 'images/services/yoni-massage.jpg',
        price: 40000,
        description: 'Specialized holistic massage for intimate wellness and rejuvenation.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Nails',
        name: 'Gel Pedicure',
        imageUrl: 'images/services/gel-pedicure.jpg',
        price: 15000,
        description: 'Professional gel pedicure for long-lasting shine and beautiful nails.',
        duration: '60–90 minutes',
        popular: false
    },
    {
        category: 'Facials',
        name: 'Face Hair Tweezing',
        imageUrl: 'images/services/face-hair-tweezing.jpg',
        price: 10000,
        description: 'Precise facial hair removal to maintain a smooth, polished complexion.',
        duration: '30 minutes',
        popular: false
    },
    {
        category: 'Body Treatments',
        name: 'Body Steaming',
        imageUrl: 'images/services/body-steaming.jpg',
        price: 15000,
        description: 'Relaxing steam treatment to open pores and rejuvenate your entire body.',
        duration: '45–60 minutes',
        popular: false
    }
];