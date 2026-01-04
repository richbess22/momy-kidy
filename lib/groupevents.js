const { isJidGroup } = require('@whiskeysockets/baileys');

const getContextInfo = (senderJid) => {
    return {
        mentionedJid: [senderJid],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: 'SILA MD',
            serverMessageId: 143,
        },
        stanzaId: 'SILA_BOT_' + Date.now(),
        participant: '0@s.whatsapp.net',
        quotedMessage: {
            conversation: "© 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡"
        }
    };
};

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const groupName = metadata.subject;

        for (const num of participants) {
            const userName = num.split("@")[0];
            
            // AUTO WELCOME
            if (update.action === "add") {
                await conn.sendMessage(update.id, {
                    text: `╔► 📲 WELCOME\n╠► Hey @${userName}\n╠► To: ${groupName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [num],
                    contextInfo: getContextInfo(num)
                });

            // AUTO GOODBYE  
            } else if (update.action === "remove") {
                await conn.sendMessage(update.id, {
                    text: `╔► 👋 GOODBYE\n╠► @${userName} left\n╠► Group: ${groupName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [num],
                    contextInfo: getContextInfo(num)
                });

            // AUTO PROMOTE EVENT
            } else if (update.action === "promote") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► ⬆️ PROMOTED\n╠► By: @${promoter}\n╠► To: @${userName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo(update.author)
                });

            // AUTO DEMOTE EVENT
            } else if (update.action === "demote") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► ⬇️ DEMOTED\n╠► By: @${demoter}\n╠► From: @${userName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP SETTINGS CHANGED
            } else if (update.action === "subject") {
                const oldName = update.prevSubject || "Unknown";
                await conn.sendMessage(update.id, {
                    text: `╔► ✏️ GROUP RENAMED\n╠► Old: ${oldName}\n╠► New: ${groupName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    contextInfo: getContextInfo('0@s.whatsapp.net')
                });

            // GROUP DESCRIPTION CHANGED
            } else if (update.action === "description") {
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 📝 DESC UPDATED\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP ANNOUNCE CHANGED
            } else if (update.action === "announcement") {
                const status = update.announcement ? "ON" : "OFF";
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 📢 ANNOUNCE: ${status}\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP RESTRICT CHANGED
            } else if (update.action === "restrict") {
                const status = update.restrict ? "ON" : "OFF";
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 🔒 RESTRICT: ${status}\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP MEMBERS ADD (BULK)
            } else if (update.action === "add" && participants.length > 1) {
                await conn.sendMessage(update.id, {
                    text: `╔► 👥 BULK ADD\n╠► ${participants.length} new members\n╠► Group: ${groupName}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    contextInfo: getContextInfo('0@s.whatsapp.net')
                });

            // GROUP PICTURE CHANGED
            } else if (update.action === "picture") {
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 🖼️ PICTURE CHANGED\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP INVITE LINK RESET
            } else if (update.action === "revoke_invite") {
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 🔗 LINK RESET\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP SETTINGS LOCK
            } else if (update.action === "lock") {
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 🔐 GROUP LOCKED\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // GROUP SETTINGS UNLOCK
            } else if (update.action === "unlock") {
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► 🔓 GROUP UNLOCKED\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });

            // EPHEMERAL MESSAGES SETTINGS
            } else if (update.action === "ephemeral") {
                const duration = update.ephemeral || "Unknown";
                const changer = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╔► ⏰ EPHEMERAL: ${duration}s\n╠► By: @${changer}\n╚► © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    mentions: [update.author],
                    contextInfo: getContextInfo(update.author)
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;