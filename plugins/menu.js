const config = require('../config')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["allmenu", "help", "cmd", "silamenu"],
    desc: "Show all bot commands with buttons",
    category: "main",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const sender = m.sender || m.key.remoteJid
        
        // Group commands by category
        let categories = {}
        commands.forEach(cmd => {
            if (!cmd.category) cmd.category = "general"
            if (!categories[cmd.category]) categories[cmd.category] = []
            categories[cmd.category].push({
                pattern: cmd.pattern,
                desc: cmd.desc || "No description",
                react: cmd.react || "🔹"
            })
        })

        // Create dynamic menu with ASCII art
        let menu = `╔═► *SILA MD MINI MENU* ◄═╗
╠═════════════════════╣
╠► 👑 Owner: *SILA TECH*
╠► 🔢 Number: *${config.OWNER_NUMBER}*
╠► ⚙️ Prefix: *${config.PREFIX}*
╠► ⏱️ Runtime: *${runtime(process.uptime())}*
╠► 📊 Commands: *${commands.length}*
╠► 📈 Status: *✅ Operational*
╚═════════════════════╝

╔═► *AVAILABLE COMMANDS* ◄═╗`

        // Add commands by category
        Object.keys(categories).forEach(category => {
            menu += `\n\n╔═► *${category.toUpperCase()}* ◄═╗`
            categories[category].forEach(cmd => {
                menu += `\n╠► ${cmd.react} *${config.PREFIX}${cmd.pattern}*
╠► ➤ ${cmd.desc}`
            })
            menu += `\n╚═════════════════════╝`
        })

        menu += `

╔═► *BOT INFORMATION* ◄═╗
╠► 🚀 Version: v2.1.0
╠► 🔧 Platform: Node.js
╠► 📦 Plugins: Loaded
╠► 🔐 Security: Enabled
╠► ⚡ Speed: Optimized
╚═════════════════════╝

> *${config.BOT_FOOTER}*`

        // Create interactive buttons
        const buttons = [
            {
                buttonId: `${config.PREFIX}owner`,
                buttonText: { displayText: '👑 Owner' },
                type: 1
            },
            {
                buttonId: `${config.PREFIX}ping`,
                buttonText: { displayText: '⚡ Ping' },
                type: 1
            },
            {
                buttonId: `${config.PREFIX}list`,
                buttonText: { displayText: '📋 List CMD' },
                type: 1
            }
        ]

        // Add category buttons
        const categoryButtons = []
        Object.keys(categories).slice(0, 5).forEach(category => {
            categoryButtons.push({
                buttonId: `${config.PREFIX}${category}`,
                buttonText: { displayText: `📂 ${category}` },
                type: 1
            })
        })

        // Send message with image and buttons
        await conn.sendMessage(from, {
            image: { 
                url: 'https://files.catbox.moe/277zt9.jpg' 
            },
            caption: menu,
            footer: '📱 Tap buttons below for quick access',
            buttons: [...buttons, ...categoryButtons],
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardingNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡',
                    serverMessageId: 428
                }
            }
        }, { quoted: mek })

    } catch (e) {
        console.log("Menu error:", e)
        await conn.sendMessage(from, {
            text: `╔═► ❌ ERROR ◄═╗\n╠► Failed to load menu\n╠► ${e.message}\n╚═► Contact owner for help`
        }, { quoted: mek })
    }
})