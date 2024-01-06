import fetch from 'node-fetch';

let handler = async function (m, conn) {
  try {
    // Fetch the list of MP3 URLs
    const response = await fetch('https://github.com/kimos71/AURTHER-BOT-FINAL/raw/main/Assets/mp3');
    const text = await response.text();

    // Extract MP3 URLs from the response
    const mp3URLs = text.match(/https:\/\/github\.com\/kimos71\/AURTHER-BOT-FINAL\/raw\/main\/Assets\/mp3\/[^"]+\.mp3/g);

    // Check if MP3 URLs are available
    if (!mp3URLs || mp3URLs.length === 0) {
      throw new Error('No MP3 URLs found');
    }

    // Choose a random MP3 URL from the list
    const randomIndex = Math.floor(Math.random() * mp3URLs.length);
    const vn = mp3URLs[randomIndex];

    // Rest of your handler code remains the same
    let url = "https://wa.me/212684151146";
    let murl = "https://www.instagram.com";
    let hash = global.botname;
    let img = "https://telegra.ph/file/ffe1bb51bfa1b5c224bc9.jpg";
    let num = "212684151146";

    let doc = {
      audio: {
        url: vn
      },
      mimetype: 'audio/mpeg',
      ptt: true,
      waveform: [0, 99, 0, 99, 0, 99, 0],
      fileName: "AURTHER",
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "↺ |◁   II   ▷|   ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
          showAdAttribution: true
        }
      }
    };

    // Sending the audio message with context information
    this.sendMessage(m.chat, doc, { quoted: m });
  } catch (error) {
    console.error('Handler error:', error);
    // Handle the error or send an error message back
    this.sendMessage(m.chat, 'There was an error. Please try again later.', { quoted: m });
  }
};

handler.all = handler.command = handler.regex = async function (m, conn) {
  // Ensure the handler is triggered properly
  await handler(m, conn);
};

export default handler;
