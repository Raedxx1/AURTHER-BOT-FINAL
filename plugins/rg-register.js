import { createHash } from 'crypto';

let handler = async function (m, { conn, text, usedPrefix }) {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  // Check if the user is already registered
  if (!(who in global.db.data.users)) throw `المستخدم غير موجود ف قاعدة بياناتي`;

  let user = global.db.data.users[who];

  // Check if the user is already registered
  if (user.registered === true) throw `*لقد تم تسجيله ب الفعل*`;

  let Reg = /^\s*([^]*)\s*$/;
  if (!Reg.test(text)) throw `*المثال الصحيح: ${usedPrefix}تسجيل اسمك*`;

  let [_, name] = text.match(Reg);
  if (!name) throw '*أكتب اللقب*';
  if (name.length >= 30) throw '*الأسم طويل*';

  // Check for uniqueness of the name
  const isNameTaken = Object.values(global.db.data.users).some(existingUser => {
    if (typeof existingUser.name === 'string') {
      return existingUser.name.toLowerCase() === name.toLowerCase();
    }
    return false;
  });

  if (isNameTaken) {
    throw '*اللقب مأخوذ*';
  }

  // Register the user
  user.name = name.trim();
  user.regTime = +new Date();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 21);

  m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *تم تسجيلك في قاعدة البيانات*
*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *الأسم :* *${name}*
◍ *الايدي :* *${sn}*
*❃ ──────⊰ ❀ ⊱────── ❃*
`.trim());
};

// ... rest of the code remains unchanged


handler.help = ['reg'].map(v => v + ' <الأسم>')
handler.tags = ['rg']
handler.command = ['تسجيل', 'اشتراك', 'register', 'registrar'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
