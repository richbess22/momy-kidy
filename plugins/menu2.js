const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')
const os = require('os')

// Common context info
const getContextInfo = (sender) => {
    return {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardingNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡',
            serverMessageId: 428
        }
    }
}

cmd({
    pattern: "menu2",
    alias: ["help2", "cmd2", "commands2"],
    desc: "Show all bot commands with system info",
    category: "main",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, sender, text, isGroup, isOwner }) => {
    try {
        const PREFIX = process.env.PREFIX || '.'
        
        // System info
        const totalMem = os.totalmem()
        const freeMem = os.freemem()
        const totalMemMB = Math.round(totalMem / (1024 * 1024))
        const freeMemMB = Math.round(freeMem / (1024 * 1024))
        
        // Uptime calculation
        const uptime = process.uptime()
        const hours = Math.floor(uptime / 3600)
        const minutes = Math.floor((uptime % 3600) / 60)
        const seconds = Math.floor(uptime % 60)
        
        // Build menu
        let menu = `╭─━━━━━━━━━━━━━━━━━━━━─╮
│ 🐢 𝗦𝗜𝗟𝗔 𝗠𝗗   
│ ✦ Hello User 👋  
│ ✦ Welcome to the command menu
╰─━━━━━━━━━━━━━━━━━━━━─╯

┌───〔 📊 𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗻𝗳𝗼 〕───┐
│• Version: 2.0.0
│• Prefix: ${PREFIX}
│• Total RAM: ${totalMemMB} MB
│• Free RAM: ${freeMemMB} MB
│• Uptime: ${hours}h ${minutes}m ${seconds}s
│• OS: ${os.type()}
│• Platform: ${os.platform()}
│• CPU Arch: ${os.arch()}
└────────────────────────┘

╭───《 ⚙️ 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮
│• alive ☺️
│• ping ⚡
│• video 🎥
│• song 🎵
│• menu 📜
│• chid 🆔
│• freebot 🆓
│• setemoji 🐢
│• settings ⚙️
│• imagine 🎨
│• pair 🔐
│• play 🎧
│• sora 🎬
│• textmaker 🎭
│• tts 🔊
│• fb 📹
│• openai 🧠
│• ai 🤖
│• deepseek 👾
│• vv 👁️
│• apk 📱
│• ig 📸
│• tiktok 🎶
│• url 🔗
│• repo 📦
│• update 🔄
│• uptime ⏱️
│• restart ♻️
│• owner 👑
│• bot on/off 🔛
│• broadcast 📢
│• sticker ✂️
│• joke 😂
│• trt 🔤
╰─────────────────────────╯

╭───《 👥 𝗚𝗿𝗼𝘂𝗽 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮
│• mute 🔇
│• unmute 🔊
│• delete 🗑️
│• kick 👢
│• tag 🏷️
│• tagall 📢
│• hidetag 🙈
│• kickall 🚫
│• getpic 📸
│• link 🔗
│• join ➕
│• add 👥
│• ginfo ℹ️
│• senddm 📨
│• listonline 👤
│• poll 📊
│• chatbot 💬
│• setgpp 🖼️
│• setgname 📝
│• setgdesc 📋
│• antitag ⚠️
│• warn ⚠️
│• clear 🧹
│• antilink 🔗
│• antimention 📢
│• ban 🚫
╰─────────────────────────╯

📢 Join our official channels & groups!
🎅 Merry Christmas from SILA MD! 🎄`

        // Create buttons
        const buttons = [
            {
                buttonId: `${PREFIX}ping`,
                buttonText: { displayText: '⚡ Ping' },
                type: 1
            },
            {
                buttonId: `${PREFIX}owner`,
                buttonText: { displayText: '👑 Owner' },
                type: 1
            },
            {
                buttonId: `${PREFIX}list`,
                buttonText: { displayText: '📋 All CMD' },
                type: 1
            }
        ]

        // Category buttons
        const categoryButtons = [
            {
                buttonId: `${PREFIX}group`,
                buttonText: { displayText: '👥 Group' },
                type: 1
            },
            {
                buttonId: `${PREFIX}media`,
                buttonText: { displayText: '🎬 Media' },
                type: 1
            },
            {
                buttonId: `${PREFIX}download`,
                buttonText: { displayText: '📥 Download' },
                type: 1
            }
        ]

        // Additional buttons for features
        const featureButtons = [
            {
                buttonId: `${PREFIX}alive`,
                buttonText: { displayText: '🤖 Bot Status' },
                type: 1
            },
            {
                buttonId: `${PREFIX}update`,
                buttonText: { displayText: '🔄 Update' },
                type: 1
            },
            {
                buttonId: `${PREFIX}settings`,
                buttonText: { displayText: '⚙️ Settings' },
                type: 1
            }
        ]

        // Send message with image and buttons
        await conn.sendMessage(from, {
            image: { 
                url: 'https://files.catbox.moe/277zt9.jpg' 
            },
            caption: menu,
            footer: '🐢 SILA MD | Tap buttons below for quick access',
            buttons: [...buttons, ...categoryButtons, ...featureButtons],
            headerType: 1,
            contextInfo: getContextInfo(sender)
        }, { quoted: mek })

    } catch (e) {
        console.log("Menu error:", e)
        await conn.sendMessage(from, {
            text: `╔► ❌ 𝐄𝐫𝐫𝐨𝐫\n╠► Failed to load menu\n╠► ${e.message}\n╚► Please try again later\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        }, { quoted: mek })
    }
})

// Additional menu commands for specific categories
cmd({
    pattern: "group",
    alias: ["groupcmds"],
    desc: "Show group commands only",
    category: "main",
    react: "👥",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    const groupMenu = `╭───《 👥 𝗚𝗿𝗼𝘂𝗽 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮
│• mute 🔇 - Mute group
│• unmute 🔊 - Unmute group
│• delete 🗑️ - Delete message
│• kick 👢 - Remove member
│• tag 🏷️ - Tag specific member
│• tagall 📢 - Tag all members
│• hidetag 🙈 - Silent mention
│• kickall 🚫 - Remove all non-admins
│• getpic 📸 - Group profile picture
│• link 🔗 - Group invite link
│• join ➕ - Join group
│• add 👥 - Add members
│• ginfo ℹ️ - Group information
│• senddm 📨 - Send direct message
│• listonline 👤 - Check online members
│• poll 📊 - Create poll
│• chatbot 💬 - Toggle chatbot
│• setgpp 🖼️ - Set group profile pic
│• setgname 📝 - Set group name
│• setgdesc 📋 - Set group description
│• antitag ⚠️ - Anti-tag protection
│• warn ⚠️ - Warn member
│• clear 🧹 - Clear chat
│• antilink 🔗 - Anti-link protection
│• antimention 📢 - Anti-mention
│• ban 🚫 - Ban member
╰─────────────────────────╯

📝 Usage: .command @user or text`

    const buttons = [
        { buttonId: '.menu', buttonText: { displayText: '📜 Main Menu' }, type: 1 },
        { buttonId: '.ping', buttonText: { displayText: '⚡ Ping' }, type: 1 },
        { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
    ]

    await conn.sendMessage(from, {
        text: groupMenu,
        footer: '👥 Group Commands | Admin permissions required',
        buttons: buttons,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek })
})

cmd({
    pattern: "list",
    alias: ["allcmds", "commands"],
    desc: "Show all available commands",
    category: "main",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    let cmdList = `╭───《 📋 𝗔𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮\n`
    
    // Group commands by category
    const categories = {}
    commands.forEach(cmd => {
        if (!cmd.category) cmd.category = "general"
        if (!categories[cmd.category]) categories[cmd.category] = []
        categories[cmd.category].push(cmd.pattern)
    })
    
    // List all categories and commands
    for (const category in categories) {
        cmdList += `\n╭─〔 📂 ${category.toUpperCase()} 〕─╮\n`
        const cmds = categories[category]
        for (let i = 0; i < cmds.length; i += 3) {
            const line = cmds.slice(i, i + 3).map(cmd => `• ${cmd}`).join('  ')
            cmdList += `│ ${line}\n`
        }
        cmdList += `╰────────────────────╯`
    }
    
    cmdList += `\n\n📊 Total: ${commands.length} commands`
    
    const buttons = [
        { buttonId: '.menu', buttonText: { displayText: '📜 Back to Menu' }, type: 1 },
        { buttonId: '.ping', buttonText: { displayText: '⚡ Test Speed' }, type: 1 }
    ]
    
    await conn.sendMessage(from, {
        text: cmdList,
        footer: '📋 All Commands | Use .help command for details',
        buttons: buttons,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek })
})