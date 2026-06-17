const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode');
const express = require('express');
const { products, payments, faq } = require('./data');

const app = express();
const port = process.env.PORT || 3000;
let lastQr = "";
let connectionStatus = "disconnected";

// Serveur HTTP pour garder le bot actif et afficher le QR Code
app.get('/', (req, res) => {
    if (lastQr) {
        res.send(`
            <html>
                <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; background:#1a1a1a; color:white; padding:20px;">
                    <h1>🤖 Melly Shop Bot</h1>
                    <p>Scannez ce QR code avec votre WhatsApp :</p>
                    <p><b>Paramètres > Appareils connectés > Connecter un appareil</b></p>
                    <img src="${lastQr}" style="width:280px; height:280px; border-radius:10px;"/>
                    <p><i>Actualisez la page si le code expire.</i></p>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; background:#1a1a1a; color:white; padding:20px;">
                    <h1>🤖 Melly Shop Bot</h1>
                    <p>Statut : <b>${connectionStatus === 'connected' ? '✅ Connecté' : '⏳ En attente...'}</b></p>
                    <p>${connectionStatus === 'connected' ? 'Le bot est actif et répond aux messages.' : 'Patientez, le QR code va apparaître. Actualisez la page.'}</p>
                </body>
            </html>
        `);
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Serveur web démarré sur le port ${port}`);
});

const OWNER_NUMBER = '2250719347745';

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('Nouveau QR Code généré.');
            lastQr = await qrcode.toDataURL(qr);
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connexion fermée. Reconnexion :', shouldReconnect);
            connectionStatus = "disconnected";
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Le bot Melly Shop est connecté !');
            connectionStatus = "connected";
            lastQr = "";
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        // Ignorer les groupes
        if (from.endsWith('@g.us')) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const userMessage = text.toLowerCase().trim();
        const sender = msg.pushName || from.split('@')[0];

        async function sendMsg(to, message) {
            await sock.sendMessage(to, { text: message });
        }

        if (userMessage === 'menu' || userMessage === 'salut' || userMessage === 'bonjour' || userMessage === 'hi' || userMessage === 'hello' || userMessage === 'start' || userMessage === 'bonsoir') {
            const welcomeMessage = `🌟 *Bienvenue chez Melly Shop* 🌟\n_Recharge rapide, fiable et sécurisée_\n\nBonjour ${sender} ! Comment puis-je vous aider aujourd'hui ?\n\nVeuillez choisir une option en tapant le numéro correspondant :\n\n1️⃣ *Free Fire* (Diamants)\n2️⃣ *Blood Strike* (Gold)\n3️⃣ *PUBG Mobile* (UC)\n4️⃣ *Formation VPN*\n5️⃣ *Numéros Virtuels*\n6️⃣ *Moyens de Paiement*\n7️⃣ *Questions Fréquentes (FAQ)*\n8️⃣ *Parler à un conseiller*\n\n_Tapez "menu" à tout moment pour revenir ici._`;
            await sendMsg(from, welcomeMessage);
            return;
        }

        switch (userMessage) {
            case '1':
                let ffMsg = `💎 *Tarifs Free Fire (Diamants)* 💎\n\n`;
                products.free_fire.items.forEach((item, index) => {
                    ffMsg += `${index + 1}. ${item.amount} Diamants - ${item.price} FrCFA\n`;
                });
                ffMsg += `\n📝 *Pour commander* : Envoyez "Commander FF [numéro du pack] [Votre ID Free Fire]"\nExemple : Commander FF 3 123456789`;
                await sendMsg(from, ffMsg);
                break;
            case '2':
                let bsMsg = `⚔️ *Tarifs Blood Strike (Gold)* ⚔️\n\n`;
                products.blood_strike.items.forEach((item, index) => {
                    bsMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
                });
                bsMsg += `\n📝 *Pour commander* : Envoyez "Commander BS [numéro du pack] [Votre ID]"\nExemple : Commander BS 2 987654321`;
                await sendMsg(from, bsMsg);
                break;
            case '3':
                let pubgMsg = `🔫 *Tarifs PUBG Mobile (UC)* 🔫\n\n`;
                products.pubg.items.forEach((item, index) => {
                    pubgMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
                });
                pubgMsg += `\n📝 *Pour commander* : Envoyez "Commander PUBG [numéro du pack] [Votre ID]"\nExemple : Commander PUBG 1 456789123`;
                await sendMsg(from, pubgMsg);
                break;
            case '4':
                let vpnMsg = `🌐 *Formation VPN* 🌐\n\nOutils : ${products.vpn.tools}\n\n`;
                products.vpn.items.forEach((item, index) => {
                    vpnMsg += `${index + 1}. ${item.amount} - ${item.price} FrCFA\n`;
                });
                vpnMsg += `\n📝 *Pour commander* : Envoyez "Commander VPN [numéro du pack]"\nExemple : Commander VPN 1`;
                await sendMsg(from, vpnMsg);
                break;
            case '5':
                let vnMsg = `📱 *${products.virtual_numbers.name}* 📱\n\n${products.virtual_numbers.description}\n\n💰 Prix : ${products.virtual_numbers.price}\n\n📝 *Pour commander* : Envoyez "Commander Numero"`;
                await sendMsg(from, vnMsg);
                break;
            case '6':
                let payMsg = `💰 *Moyens de Paiement Acceptés* 💰\n\n`;
                payments.forEach(p => {
                    payMsg += `• *${p.name}* : ${p.details}\n`;
                });
                payMsg += `\n_Une fois le paiement effectué, envoyez une capture d'écran ici._`;
                await sendMsg(from, payMsg);
                break;
            case '7':
                let faqMsg = `❓ *Questions Fréquentes* ❓\n\n`;
                faq.forEach(f => {
                    faqMsg += `*Q: ${f.q}*\nR: ${f.a}\n\n`;
                });
                await sendMsg(from, faqMsg);
                break;
            case '8':
                await sendMsg(from, `👨‍💻 Un conseiller va vous répondre dès que possible. Veuillez patienter.`);
                await sendMsg(`${OWNER_NUMBER}@s.whatsapp.net`, `🔔 *Alerte* : Le client ${sender} (${from}) souhaite parler à un conseiller.`);
                break;
        }

        if (userMessage.startsWith('commander')) {
            await sendMsg(from, `✅ *Commande enregistrée !*\n\nVeuillez procéder au paiement via Wave, MTN ou Orange Money, puis envoyez la capture d'écran ici.\n\nLe propriétaire a été notifié et traitera votre commande rapidement. ⏱️`);
            await sendMsg(`${OWNER_NUMBER}@s.whatsapp.net`, `🛒 *Nouvelle Commande* de ${sender} (${from}) :\n\n"${text}"\n\n_Veuillez vérifier le paiement et traiter la commande._`);
        }
    });
}

startBot();
