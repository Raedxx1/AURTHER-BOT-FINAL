import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(who in global.db.data.users)) throw `✳️ اهذا المستخدم غير موجود ف قاعدة بياناتي`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
  let user = global.db.data.users[who];
  let { exp, level, role } = global.db.data.users[who];
  let { min, xp } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);

  let crxp = exp - min
  let customBackground  = './Assets/rankbg.jpg'
  let requiredXpToLevelUp = xp

  const card = await new Canvacord.Rank()
  .setAvatar(pp)
  .setLevel(level)
  .setCurrentXP(crxp) 
  .setRequiredXP(requiredXpToLevelUp) 
  .setProgressBar('#e1d4a7', 'COLOR') // Set progress bar color here
  .setDiscriminator(who.substring(3, 7))
  .setCustomStatusColor('#e1d4a7')
  .setLevelColor('#FFFFFF', '#FFFFFF')
  .setOverlay('#000000')
  .setUsername(username)
  .setBackground('IMAGE', customBackground)
  .setRank(level, 'LEVEL', false)
  .renderEmojis(true)
  .build();

  const str = `*❃ ──────⊰ ❀ ⊱────── ❃*\n\n🏮 *الأسم :* ${username}\n\n⭐ *الخبره :* ${crxp} / ${requiredXpToLevelUp}\n\n🏅 *المستوى :* *${role}\n\n*❃ ──────⊰ ❀ ⊱────── ❃**`

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
  }}

handler.help = ['rank'];
handler.tags = ['economy'];
handler.command = ['رانك'];

export default handler;
