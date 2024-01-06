import fetch from 'node-fetch';

// List of three MP3 URLs
const mp3URLs = [
  "https://dl.sndup.net/mb86/AUD-20231225-WA0684.mp3",
  "https://dl.sndup.net/kcb6/AUD-20231229-WA0719.mp3",
  "https://dl.sndup.net/htb6/AUD-20231230-WA0712.mp3",
  "https://dl.sndup.net/k7z3/grsgtgv.mp3"
];

function getRandomMP3URL() {
  // Generate a random index within the range of the mp3URLs array
  const randomIndex = Math.floor(Math.random() * mp3URLs.length);
  // Return the randomly selected MP3 URL
  return mp3URLs[randomIndex];
}

let handler = async function(m, conn) {
  try {
    // Fetch a random MP3 URL using node-fetch
    const response = await fetch(getRandomMP3URL());
    
    if (!response.ok) {
      throw new Error('Failed to fetch MP3 URL');
    }
    
    // Rest of your handler code remains the same
    let url = "https://wa.me/212684151146";
    let murl = "https://www.instagram.com";
    let hash = global.botname;
    let img = "https://telegra.ph/file/ffe1bb51bfa1b5c224bc9.jpg";
    let num = "212684151146";

    let doc = {
      audio: {
        url: response.url
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

handler.all = handler.command = handler.regex = async function(m, conn) {
  // Ensure the handler is triggered properly
  await handler(m, conn);
};

export default handler;
