let handler = async (m, { conn, participants }) => {
  let teks = "*❃ ──────⊰ ❀ ⊱────── ❃* \n\n *مـنشــــــن عـــــــــام لأعــــــضاء ومشرفـــين*\n *كـــــوكـــــــب 〖 𝑼𝑹𝑨𝑵𝑼𝑺 ¦ 銀河💠 〗*\n *المنشن خاص للمشرفين نتأسف على الازعاج* \n\n";
  teks += "*❃ ──────⊰ ⚠️ ⊱────── ❃*\n\n"; // Add your custom text here

  // Sort participants based on names
  participants.sort((a, b) => {
    let userA = global.db.data.users[a.id] || { registered: false, name: "⚠️" };
    let userB = global.db.data.users[b.id] || { registered: false, name: "⚠️" };
    return userA.name.localeCompare(userB.name, 'ar', { sensitivity: 'base' });
  });

  let currentLetter = '';

  // Unregister users who are not in the participants list
  Object.keys(global.db.data.users).forEach(userId => {
    const user = global.db.data.users[userId];
    const isInParticipants = participants.some(mem => mem.id === userId);

    if (user.registered && !isInParticipants) {
      // Unregister the user
      user.registered = false;
      user.name = ''; // Clear the name
      user.regTime = 0; // Reset registration time
    }
  });

  for (let mem of participants) {
    let user = global.db.data.users[mem.id] || { registered: false, name: "⚠️" };
    let firstLetter = user.name.charAt(0);

    if (firstLetter !== currentLetter) {
      // Start a new section for the current letter
      teks += `*❃ ──────⊰ ${firstLetter} ⊱────── ❃*\n\n`;
      currentLetter = firstLetter;
    }

    teks += `◍ ${user.registered ? user.name : "⚠️"} @${mem.id.split('@')[0]}\n\n`;
  }

  teks += "*❃ ──────⊰ ❀ ⊱────── ❃*";

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) });
}

handler.help = ['mentionall'];
handler.tags = ['group'];
handler.command = /^منشن$/i;
handler.group = true;
handler.admin = true;

export default handler;
