const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const { products, payments, faq } = require('./data');

const app = express();
const port = process.env.PORT || 3000;
let lastQr = "";

// Serveur HTTP pour garder le bot actif et afficher le QR Code
app.get('/', (req, res) => {
    if (lastQr) {
        res.send(`
            <html>
                <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
                    <h1>Melly Shop Bot - Connexion</h1>
                    <p>Scannez ce code avec votre WhatsApp :</p>
                    <img src="${lastQr}" style="width:300px; height:300px;"/>
                    <p><i>Actualisez la page si le code ne s'affiche pas.</i></p>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
                    <h1>Melly Shop Bot - Prêt</h1>
                    <p>Le bot est en cours d'exécution ou déjà connecté.</p>
                </body>
            </html>
        `);
    }
});

app.listen(port, () => {
    console.log(`Serveur web démarré sur le port ${port}`);
});

const OWNER_NUMBER = '2250719347745';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
    }
});

client.on('qr', async (qr) => {
    console.log('Nouveau QR Code généré.');
    lastQr = await qrcode.toDataURL(qr);
});

client.on('ready', () => {
    console.log('Le bot Melly Shop est prêt !');
    lastQr = ""; // Effacer le QR une fois connecté
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const userMessage = msg.body.toLowerCase();
    const contact = await msg.getContact();
    const sender = contact.pushname || contact.number;

    if (chat.isGroup) return;

    if (userMessage === 'menu' || userMessage === 'salut' || userMessage === 'bonjour' || userMessage === 'hi' || userMessage === 'start') {
        const welcomeMessage = `🌟 *Bienvenue chez Melly Shop* 🌟\n_Recharge rapide, fiable et sécurisée_\n\nBonjour ${sender} ! Comment puis-je vous aider aujourd'hui ?\n\nVeuillez choisir une option en tapant le numéro correspondant :\n\n1️⃣ *Free Fire* (Diamants)\n2️⃣ *Blood Strike* (Gold)\n3️⃣ *PUBG Mobile* (UC)\n4️⃣ *Formation VPN*\n5️⃣ *Numéros Virtuels*\n6️⃣ *Moyens de Paiement*\n7️⃣ *Questions Fréquentes (FAQ)*\n8️⃣ *Parler à un conseiller*\n\n_Tapez "menu" à tout moment pour revenir ici._`;
        await client.sendMessage(msg.from, welcomeMessage);
        return;
    }

    switch (userMessage) {
        case '1':
            let ffMsg = `💎 *Tarifs Free Fire (Diamants)* 💎\n\n`;
            products.free_fire.items.forEach((item, index) => {
                ffMsg += `${index + 1}. ${item.amount} Diamants - ${item.price} FrCFA\n`;
            });
            ffMsg += `\n📝 *Pour commander* : Envoyez "Commander FF [Pack] [Votre ID]"`;
            await client.sendMessage(msg.from, ffMsg);
            break;
        case '2':
            let bsMsg = `⚔️ *Tarifs Blood Strike (Gold)* ⚔️\n\n`;
            products.blood_strike.items.forEach((item, index) => {
                bsMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
            });
            bsMsg += `\n📝 *Pour commander* : Envoyez "Commander BS [Pack] [Votre ID]"`;
            await client.sendMessage(msg.from, bsMsg);
            break;
        case '3':
            let pubgMsg = `🔫 *Tarifs PUBG Mobile (UC)* 🔫\n\n`;
            products.pubg.items.forEach((item, index) => {
                pubgMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
            });
            pubgMsg += `\n📝 *Pour commander* : Envoyez "Commander PUBG [Pack] [Votre ID]"`;
            await client.sendMessage(msg.from, pubgMsg);
            break;
        case '4':
            let vpnMsg = `🌐 *Formation VPN* 🌐\n\nOutils : ${products.vpn.tools}\n\n`;
            products.vpn.items.forEach((item, index) => {
                vpnMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
            });
            vpnMsg += `\n📝 *Pour commander* : Envoyez "Commander VPN [Pack]"`;
            await client.sendMessage(msg.from, vpnMsg);
            break;
        case '5':
            let vnMsg = `📱 *${products.virtual_numbers.name}* 📱\n\n${products.virtual_numbers.description}\n\n📝 *Pour commander* : Envoyez "Commander Numero"`;
            await client.sendMessage(msg.from, vnMsg);
            break;
        case '6':
            let payMsg = `💰 *Moyens de Paiement Acceptés* 💰\n\n`;
            payments.forEach(p => {
                payMsg += `• *${p.name}* : ${p.details}\n`;
            });
            payMsg += `\n_Une fois le paiement effectué, envoyez une capture d'écran ici._`;
            await client.sendMessage(msg.from, payMsg);
            break;
        case '7':
            let faqMsg = `❓ *Questions Fréquentes* ❓\n\n`;
            faq.forEach(f => {
                faqMsg += `*Q: ${f.q}*\nR: ${f.a}\n\n`;
            });
            await client.sendMessage(msg.from, faqMsg);
            break;
        case '8':
            await client.sendMessage(msg.from, `👨‍💻 Un conseiller va vous répondre dès que possible. Veuillez patienter.`);
            await client.sendMessage(`${OWNER_NUMBER}@c.us`, `🔔 *Alerte* : Le client ${sender} (${msg.from}) souhaite parler à un conseiller.`);
            break;
    }

    if (userMessage.startsWith('commander')) {
        await client.sendMessage(msg.from, `✅ *Commande enregistrée !*\n\nVeuillez procéder au paiement via Wave, MTN ou Orange Money, puis envoyez la capture d'écran ici.\n\nLe propriétaire a été notifié et traitera votre commande rapidement.`);
        const orderDetails = msg.body;
        await client.sendMessage(`${OWNER_NUMBER}@c.us`, `🛒 *Nouvelle Commande* de ${sender} (${msg.from}) :\n\n"${orderDetails}"\n\n_Veuillez vérifier le paiement et traiter la commande._`);
    }
});

client.initialize();
