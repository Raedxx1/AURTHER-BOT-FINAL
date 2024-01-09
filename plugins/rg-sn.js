import { createHash } from 'crypto';

const handler = async (m, { conn, args, groupMetadata }) => {
  let who =
    m.quoted?.sender ||
    (m.mentionedJid && m.mentionedJid[0]) ||
    (m.fromMe ? conn.user.jid : m.sender);

  if (!(who in global.db.data.users)) {
    throw 'المستخدم غير موجود في قاعدة البيانات';
  }

  const user = global.db.data.users[who];
  const { name, registered } = user;

  if (registered) {
    m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*\n\n                     *${name}*\n
*❃ ──────⊰ ❀ ⊱────── ❃*`.trim()
    );
  } else {
    m.reply('*هذا المستخدم لم يتم تسجيله بعد .*');
  }
};

handler.help = ['myns'];
handler.tags = ['xp'];
handler.command = /^(لقبه|الاسم)$/i;
handler.register = true;

export default handler;
