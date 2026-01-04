const { cmd } = require("../command");
const axios = require("axios");
const ytSearch = require("yt-search");

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

cmd({
  pattern: "video",
  alias: ["ytmp4", "v"],
  desc: "Download YouTube videos",
  category: "media",
  react: "🎬",
  filename: __filename
}, async (conn, mek, m, { from, q, sender }) => {
  if (!q) {
    return conn.sendMessage(from, { 
        text: `╔► ❌ 𝐄𝐫𝐫𝐨𝐫\n╠► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐯𝐢𝐝𝐞𝐨 𝐧𝐚𝐦𝐞\n╚► → 𝐄𝐱: .video 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek });
  }

  try {
    // Searching reaction
    await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });

    // Search YouTube
    const searchResult = await ytSearch(q);
    const video = searchResult.videos?.[0];
    if (!video) throw new Error("No video found");

    // Fetch download info
    const downloadInfo = await fetchVideoDownload(video);
    
    // Create buttons
    const buttons = [
        {
            buttonId: `https://youtube.com/watch?v=${video.videoId}`,
            buttonText: { displayText: '📺 Watch on YouTube' },
            type: 1
        },
        {
            buttonId: `.ytmp3 ${q}`,
            buttonText: { displayText: '🎵 Audio Only' },
            type: 1
        },
        {
            buttonId: `.search ${q}`,
            buttonText: { displayText: '🔍 More Results' },
            type: 1
        }
    ]

    // Send video with buttons
    const caption = `╔► 🎬 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐕𝐢𝐝𝐞𝐨\n╠► → 𝐓𝐢𝐭𝐥𝐞: ${video.title.substring(0, 100)}...\n╠► → 𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧: ${video.timestamp}\n╠► → 𝐕𝐢𝐞𝐰𝐬: ${video.views.toLocaleString()}\n╠► → 𝐐𝐮𝐚𝐥𝐢𝐭𝐲: HD\n╠► → 𝐑𝐞𝐪𝐮𝐞𝐬𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╚► → 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐒𝐈𝐋𝐀 𝐌𝐃\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

    await conn.sendMessage(from, {
      video: { url: downloadInfo.download_url },
      mimetype: "video/mp4",
      caption: caption,
      footer: '🎬 Download completed! Tap buttons below',
      buttons: buttons,
      mentions: [sender],
      contextInfo: getContextInfo(sender)
    }, { quoted: mek });

    // Success reaction
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { 
        text: `╔► ❌ 𝐄𝐫𝐫𝐨𝐫\n╠► → 𝐕𝐢𝐝𝐞𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐟𝐚𝐢𝐥𝐞𝐝\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
  }
});

// Video search with multiple results
cmd({
  pattern: "vsearch",
  alias: ["searchvideo"],
  desc: "Search YouTube videos",
  category: "media",
  react: "🔍",
  filename: __filename
}, async (conn, mek, m, { from, q, sender }) => {
  if (!q) {
    return conn.sendMessage(from, { 
        text: `╔► ❌ 𝐄𝐫𝐫𝐨𝐫\n╠► → 𝐄𝐧𝐭𝐞𝐫 𝐬𝐞𝐚𝐫𝐜𝐡 𝐤𝐞𝐲𝐰𝐨𝐫𝐝\n╚► → 𝐄𝐱: .vsearch 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek });
  }

  try {
    await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });

    const searchResult = await ytSearch(q);
    const videos = searchResult.videos.slice(0, 5);

    if (videos.length === 0) {
        throw new Error("No videos found");
    }

    let videoList = `╔► 🔍 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐒𝐞𝐚𝐫𝐜𝐡\n╠► → 𝐊𝐞𝐲𝐰𝐨𝐫𝐝: ${q}\n╠► → 𝐑𝐞𝐬𝐮𝐥𝐭𝐬: ${videos.length}\n\n`;

    videos.forEach((video, index) => {
        videoList += `╔► ${index + 1}. ${video.title.substring(0, 60)}...\n╠► ⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n╠► 🔗 .video ${video.title.substring(0, 30)}\n╚► ──────────────\n`;
    });

    videoList += `\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

    // Create buttons for each video
    const buttons = [];
    videos.slice(0, 3).forEach((video, index) => {
        buttons.push({
            buttonId: `.video ${video.title.substring(0, 20)}`,
            buttonText: { displayText: `🎬 Video ${index + 1}` },
            type: 1
        });
    });

    // Add extra buttons
    buttons.push({
        buttonId: `.ytmp3 ${q}`,
        buttonText: { displayText: '🎵 Get Audio' },
        type: 1
    });

    await conn.sendMessage(from, {
        text: videoList,
        footer: '🔍 Tap buttons to download videos',
        buttons: buttons,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { 
        text: `╔► ❌ 𝐄𝐫𝐫𝐨𝐫\n╠► → 𝐒𝐞𝐚𝐫𝐜𝐡 𝐟𝐚𝐢𝐥𝐞𝐝\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: getContextInfo(sender)
    }, { quoted: mek });
  }
});

// Fetch video download helper
async function fetchVideoDownload(video) {
  const apis = [
    `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(video.url)}`,
    `https://iamtkm.vercel.app/downloaders/ytmp4?url=${encodeURIComponent(video.url)}`
  ];

  for (let i = 0; i < apis.length; i++) {
    try {
      const res = await axios.get(apis[i]);
      const data = i === 0 ? res.data.result : res.data?.data;
      const url = data?.download_url || data?.url;
      if (!url) throw new Error("No download URL found");

      return {
        title: data.title || video.title,
        thumbnail: data.thumbnail || video.thumbnail,
        download_url: url,
        quality: data.quality || "HD",
      };
    } catch (e) {
      if (i === apis.length - 1) throw new Error("All APIs failed");
    }
  }
}