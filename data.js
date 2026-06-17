const products = {
    free_fire: {
        name: "Free Fire (Diamants)",
        items: [
            { amount: "100", price: "750" },
            { amount: "221", price: "1 500" },
            { amount: "321", price: "2 200" },
            { amount: "442", price: "2 200" },
            { amount: "530+53", price: "3 500" },
            { amount: "1080+108", price: "7 000" },
            { amount: "2200+220", price: "14 000" }
        ]
    },
    blood_strike: {
        name: "Blood Strike (Gold)",
        items: [
            { amount: "100", price: "800" },
            { amount: "210", price: "1 600" },
            { amount: "320", price: "3 100" },
            { amount: "540", price: "2 100" },
            { amount: "700", price: "4 600" },
            { amount: "1100", price: "6 000" },
            { amount: "2260", price: "12 500" },
            { amount: "Strike Pass Elite", price: "2 500" },
            { amount: "Strike Pass Premium", price: "5 500" }
        ]
    },
    pubg: {
        name: "PUBG Mobile (UC)",
        items: [
            { amount: "60 UC", price: "800" },
            { amount: "180 UC", price: "2 300" },
            { amount: "300 UC", price: "3 200" },
            { amount: "600 UC", price: "1 500" },
            { amount: "3850 UC", price: "30 000" },
            { amount: "Elite Pass", price: "7 500" },
            { amount: "Elite Pass Plus", price: "19 500" }
        ]
    },
    vpn: {
        name: "Formation VPN",
        items: [
            { amount: "Formation Complète (Tous les VPN)", price: "5 500" },
            { amount: "Formation Seule (1 VPN au choix)", price: "1 800" }
        ],
        tools: "Netmod, HTTP Injector, Dark Tunnel, ZI VPN, Droid VPN"
    },
    virtual_numbers: {
        name: "Numéros Virtuels WhatsApp",
        description: "À partir de 2€\n- 100% virtuel, aucune carte physique\n- Livraison instantanée\n- Idéal pour: Business, Confidentialité, Multi-comptes, Flexibilité"
    }
};

const payments = [
    { name: "Wave", details: "Veuillez demander le numéro de dépôt." },
    { name: "MTN Money", details: "Veuillez demander le numéro de dépôt." },
    { name: "Orange Money", details: "Veuillez demander le numéro de dépôt." }
];

const faq = [
    { q: "Délai de livraison ?", a: "La livraison est généralement effectuée en moins de 15 minutes après confirmation du paiement." },
    { q: "Est-ce sécurisé ?", a: "Oui, Melly Shop est une boutique fiable. Nous utilisons les méthodes officielles de recharge." },
    { q: "Comment payer ?", a: "Nous acceptons Wave, MTN Money et Orange Money." }
];

module.exports = { products, payments, faq };
