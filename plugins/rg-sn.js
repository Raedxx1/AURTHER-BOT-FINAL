import {createHash} from 'crypto';
  const handler = async (m, { conn, args, groupMetadata}) => {
   let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
   if (!(who in global.db.data.users)) throw `المستخدم غير موجود ف قاعدة بياناتي`
  const user = global.db.data.users[who];
  const { name } = global.db.data.users[who];
  m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*
                             *${name}*
*❃ ──────⊰ ❀ ⊱────── ❃*`.trim());
};
handler.help = ['myns'];
handler.tags = ['xp'];
handler.command = /^(لقبه|الاسم)$/i;
handler.register = true;
export default handler;
