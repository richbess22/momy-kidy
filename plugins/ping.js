const { cmd } = require('../command');

// Context info for SILA MD
const getContextInfo = (sender) => {
    return {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: "SILA MD",
            serverMessageId: 428
        }
    }
}

// Ping 1 - Simple (pong & speed)
cmd({
    pattern: "ping",
    alias: ["pong", "speed"],
    desc: "Check bot speed",
    category: "main",
    react: "🏓",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = Date.now();
        await conn.sendMessage(from, { react: { text: '🏓', key: mek.key } });
        const latency = Date.now() - start;
        
        const reactions = ['💻', '🖥️', '💾', '⚡', '🔌'];
        const randomReact = reactions[Math.floor(Math.random() * reactions.length)];
        
        await conn.sendMessage(from, {
            text: `╔► 𝐏𝐨𝐧𝐠! 🏓\n╠► 𝐒𝐩𝐞𝐞𝐝: ${latency}𝐦𝐬\n╚► ${randomReact}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: getContextInfo(sender)
        }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, {
            text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐐𝐮𝐢𝐜𝐤 𝐩𝐢𝐧𝐠 𝐟𝐚𝐢𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: getContextInfo(sender)
        }, { quoted: mek });
    }
});

// Ping 2 - Detailed with hacker reactions
cmd({
    pattern: "ping2",
    alias: ["speed2", "test"],
    desc: "Detailed speed test",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = Date.now();
        
        // Hacker reactions
        const hackerReactions = ['💾', '🖥️', '💻', '🔌', '⚡'];
        const randomReact = hackerReactions[Math.floor(Math.random() * hackerReactions.length)];
        
        await conn.sendMessage(from, { react: { text: randomReact, key: mek.key } });
        
        const latency = Date.now() - start;
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        // Speed status
        let status = '';
        let emoji = '';
        
        if (latency < 100) {
            status = '🚀 𝐔𝐋𝐓𝐑𝐀 𝐅𝐀𝐒𝐓';
            emoji = '💻';
        } else if (latency < 200) {
            status = '⚡ 𝐅𝐀𝐒𝐓';
            emoji = '🔌';
        } else if (latency < 300) {
            status = '💨 𝐆𝐎𝐎𝐃';
            emoji = '🖥️';
        } else if (latency < 500) {
            status = '🐢 𝐒𝐋𝐎𝐖';
            emoji = '💾';
        } else {
            status = '❌ 𝐕𝐄𝐑𝐘 𝐒𝐋𝐎𝐖';
            emoji = '⚠️';
        }
        
        const pingMessage = `╔► 𝐃𝐄𝐓𝐀𝐈𝐋𝐄𝐃 𝐒𝐏𝐄𝐄𝐃 𝐓𝐄𝐒𝐓 ${emoji}
╠► 𝐋𝐚𝐭𝐞𝐧𝐜𝐲: ${latency}𝐦𝐬
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ${status}
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${hours}h ${minutes}m ${seconds}s
╠► 𝐓𝐢𝐦𝐞: ${new Date().toLocaleTimeString()}
╚► 𝐒𝐞𝐫𝐯𝐞𝐫: ✅ 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧𝐚𝐥

╔► 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 𝐋𝐞𝐯𝐞𝐥:
╠► ${latency < 100 ? "🟢 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭" : latency < 200 ? "🟡 𝐆𝐨𝐨𝐝" : latency < 300 ? "🟠 𝐀𝐯𝐞𝐫𝐚𝐠𝐞" : "🔴 𝐒𝐥𝐨𝐰"}
╚► → 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞: ${latency}𝐦𝐬

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        await conn.sendMessage(from, {
            text: pingMessage,
            contextInfo: getContextInfo(sender)
        }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, {
            text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐃𝐞𝐭𝐚𝐢𝐥𝐞𝐝 𝐩𝐢𝐧𝐠 𝐟𝐚𝐢𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: getContextInfo(sender)
        }, { quoted: mek });
    }
});