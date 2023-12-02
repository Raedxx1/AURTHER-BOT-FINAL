import { xpRange, canLevelUp } from '../lib/levelling.js';
import { createHash } from 'crypto';
import Canvacord from 'canvacord';

let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  
  if (!(who in global.db.data.users)) throw '✳️ المستخدم غير موجود ف قاعدة بياناتي';

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
  let user = global.db.data.users[who];
  let about = (await conn.fetchStatus(who).catch(console.error))?.status || '';
  let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn } = global.db.data.users[who];
  let { min, xp, max } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);
  let math = max - xp;
  let prem = global.prems.includes(who.split@[0]);
  let sn = createHash('md5').update(who).digest('hex');
  let customBackground = './Assets/rankbg.jpg';

  let crxp = exp - min;
  let requiredXpToLevelUp = xp;

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

  const str = *❃ ──────⊰ ❀ ⊱────── ❃*\n\n*🪪 الأسم:* ${username}${about ? '\n\n 🎌 *الوصف:* ' + about : ''}\n\n*⚠️ الأنذارات:* ${warn}/${maxwarn}\n\n*💰 الرصيد :* ${credit} *بيلي*\n\n*✨ المستوى :* ${level}\n\n*⬆️ الخبره :* (${user.exp - min} / ${xp})\n${math <= 0 ? 'أنت مستعد للترقي' : ''}\n\n*🏆 التصنيف :* ${role}\n\n*📇 الحساب :* ${registered ? 'مسحل' : 'غير مسجل'}\n\n*⭐️ العضوية :*  ${prem ? 'مميز' : 'عضو'}\n\n*❃ ──────⊰ ❀ ⊱────── ❃*;

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['combinedProfileRank'];
handler.tags = ['economy', 'group'];
handler.command = ['حسابي-رانك'];

export default handler;
