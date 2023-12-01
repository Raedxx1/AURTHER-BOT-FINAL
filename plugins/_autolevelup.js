import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

export async function before(m, { conn }) {
  let user = global.db.data.users[m.sender];
  if (!user.autolevelup) return !0;

  let before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

  user.role = global.rpg.role(user.level).name;

  if (before !== user.level) {
    m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*\n
*🎊ازداد مستواك🎉*
 *المستوى :* *${before}* ‣  *${user.level}*
 *التصنيف :* *${user.role}*\n
 *❃ ──────⊰ ❀ ⊱────── ❃*`.trim());

    let who = m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
    let { exp, level } = global.db.data.users[who];
    let { min, xp } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);

    let crxp = exp - min;
    let customBackground = './Assets/rankbg.jpg';
    let requiredXpToLevelUp = xp;

    const card = await new Canvacord.Rank()
      .setAvatar(pp)
      .setLevel(level)
      .setCurrentXP(crxp)
      .setRequiredXP(requiredXpToLevelUp)
      .setProgressBar('#e1d4a7', 'COLOR')
      .setDiscriminator(who.substring(3, 7))
      .setCustomStatusColor('#e1d4a7')
      .setLevelColor('#FFFFFF', '#FFFFFF')
      .setOverlay('#000000')
      .setUsername(username)
      .setBackground('IMAGE', customBackground)
      .setRank(level, 'LEVEL', false)
      .renderEmojis(true)
      .build();

    try {
      conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
      m.react('✅');
    } catch (error) {
      console.error(error);
    }
  }
}
