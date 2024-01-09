let handler = async function (m, { conn, text, usedPrefix }) {
  let name = text.trim(); // Extract the name to unregister

  // Check if the user exists in the database
  const userId = Object.keys(global.db.data.users).find(
    id => global.db.data.users[id].name && typeof global.db.data.users[id].name === 'string' &&
    global.db.data.users[id].name.toLowerCase() === name.toLowerCase()
  );

  if (!userId) {
    throw `*أكتب اللقب الي تبيه ينحذف*`;
  }

  // Unregister the user
  global.db.data.users[userId].registered = false;
  global.db.data.users[userId].name = ''; // Clear the name
  global.db.data.users[userId].regTime = 0; // Reset registration time

  // Respond with a confirmation
  m.reply(`*تست اللقب صار متوفر*`);
};

// Rest of the handler definition (help, tags, command, etc.) remains the same


handler.help = ['unreg'].map(v => v + ' <الأسم>')
handler.tags = ['rg']
handler.command = ['ازاله', 'ازالة', 'unregister', 'unregistrar'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
